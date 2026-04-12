import requests
import firebase_admin
from firebase_admin import credentials, firestore
import os
import sys
import time
import argparse
import concurrent.futures
from datetime import datetime
from urllib.parse import quote

# Force UTF-8 for stdout/stderr to prevent crashes in minimal CI environments
if sys.stdout.encoding != 'utf-8':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

# ── CONFIG ────────────────────────────────────────────────────────────────────
SERVICE_ACCOUNT_KEY = 'scripts/serviceAccount.json'

def init_firebase():
    """Initializes Firebase Admin SDK."""
    if not firebase_admin._apps:
        cred_path = os.environ.get('FIREBASE_SERVICE_ACCOUNT')
        if cred_path and os.path.exists(cred_path):
            cred = credentials.Certificate(cred_path)
        elif os.path.exists(SERVICE_ACCOUNT_KEY):
            cred = credentials.Certificate(SERVICE_ACCOUNT_KEY)
        else:
            print("❌ Error: Firebase Service Account key not found.")
            return None
        firebase_admin.initialize_app(cred)
    return firestore.client()

def get_all_titles_to_process(db):
    """Collects unique title IDs and names from reviews to ensure all titles get MD IDs."""
    titles = {} # {title_id: {"name": str, "md_id": str}}
    
    # 1. From metadata
    meta_ref = db.collection('manga_metadata').stream()
    for doc in meta_ref:
        data = doc.to_dict()
        # Safely extract title — every nested field could be str or dict
        al_data = data.get('anilist')
        al_title = None
        if isinstance(al_data, str):
            al_title = al_data
        elif isinstance(al_data, dict):
            title_node = al_data.get('title')
            if isinstance(title_node, str):
                al_title = title_node
            elif isinstance(title_node, dict):
                al_title = title_node.get('english') or title_node.get('romaji')
            
        titles[doc.id] = {
            "name": data.get('title') or al_title,
            "md_id": data.get('mangadex_id')
        }

    # 2. From reviews
    reviews_ref = db.collection('reviews').stream()
    for doc in reviews_ref:
        data = doc.to_dict()
        tid = data.get('titleId')
        if tid:
            if tid not in titles:
                titles[tid] = {"name": data.get('title'), "md_id": data.get('mangadex_id')}
            elif not titles[tid]["md_id"] and data.get('mangadex_id'):
                titles[tid]["md_id"] = data.get('mangadex_id')
            
    return titles

def discover_mangadex_id(title_id, title_name):
    """Try to find MD ID via AniList link or Title search."""
    # Step A: By AniList ID (most accurate)
    if title_id.startswith('ani_'):
        al_id = title_id.replace('ani_', '')
        # New API format: includedExternalIds[]=al:12345
        url = f"https://api.mangadex.org/manga?includedExternalIds[]=al:{al_id}"
        try:
            resp = requests.get(url, timeout=10)
            if resp.status_code == 200:
                data = resp.json().get('data', [])
                if data:
                    print(f"      🔍 Discovered via AniList ID: {data[0]['id']}", flush=True)
                    return data[0]['id']
        except: pass

    # Step B: By Title search
    if title_name:
        url = f"https://api.mangadex.org/manga?title={quote(title_name)}&limit=1"
        try:
            resp = requests.get(url, timeout=10)
            if resp.status_code == 200:
                data = resp.json().get('data', [])
                if data:
                    print(f"      🔍 Discovered via Title: {data[0]['id']}", flush=True)
                    return data[0]['id']
        except: pass
        
    return None

def fetch_mangadex_stats(mdex_id):
    """Fetches stats (rating, follows) directly from MangaDex API."""
    try:
        # Step 1: Get Statistics
        stats_url = f"https://api.mangadex.org/statistics/manga/{mdex_id}"
        resp = requests.get(stats_url, timeout=15)
        if resp.status_code != 200:
            return None
        
        data = resp.json()
        stats = data.get('statistics', {}).get(mdex_id, {})
        
        rating = stats.get('rating', {}).get('average')
        follows = stats.get('follows', 0)
        
        # Step 2: Get basic info (Author/Artist/Genres)
        info_url = f"https://api.mangadex.org/manga/{mdex_id}?includes[]=author&includes[]=artist"
        info_resp = requests.get(info_url, timeout=15)
        m_data = {}
        if info_resp.status_code == 200:
            m = info_resp.json().get('data', {})
            attr = m.get('attributes', {})
            m_data['genres'] = [t.get('attributes', {}).get('name', {}).get('en') for t in attr.get('tags', [])]
            
            rels = m.get('relationships', [])
            author_rel = next((r for r in rels if r['type'] == 'author'), None)
            artist_rel = next((r for r in rels if r['type'] == 'artist'), None)
            
            m_data['author'] = author_rel.get('attributes', {}).get('name') if author_rel else None
            m_data['artist'] = artist_rel.get('attributes', {}).get('name') if artist_rel else None
            m_data['year'] = attr.get('year')

        return {
            'score': round(rating, 1) if rating else None,
            'popularity': follows,
            'genres': m_data.get('genres'),
            'author': m_data.get('author'),
            'artist': m_data.get('artist'),
            'year': m_data.get('year')
        }
    except Exception as e:
        print(f"      ⚠️  MangaDex API Error: {mdex_id}: {e}", flush=True)
        return None

def process_title(db, title_id, info, args):
    """Worker for parallel processing."""
    md_id = info.get('md_id')
    tname = info.get('name')
    
    # Discovery if ID missing
    if not md_id:
        print(f"── Discovering ID for {title_id} ({tname}) ──", flush=True)
        md_id = discover_mangadex_id(title_id, tname)
        if not md_id:
            print(f"   ⏭️  Could not find MangaDex ID.", flush=True)
            return False
    else:
        print(f"── Processing {title_id} (MD: {md_id}) ──", flush=True)
    
    stats = fetch_mangadex_stats(md_id)
    if stats:
        doc_ref = db.collection('manga_metadata').document(title_id)
        update_data = {
            'mangadex': stats,
            'mangadex_id': md_id,
            'last_updated_md': firestore.SERVER_TIMESTAMP
        }
        doc_ref.set(update_data, merge=True)
        print(f"   ✅ Saved: score={stats['score']} | follows={stats['popularity']}", flush=True)
        return True
    return False

def main():
    parser = argparse.ArgumentParser(description='MangaDex Stats Scraper')
    parser.add_argument('--workers', type=int, default=3, help='Max workers')
    args = parser.parse_args()

    print("=" * 65, flush=True)
    print(f"MangaDex Stats Scraper — {datetime.now().strftime('%Y-%m-%d %H:%M')}", flush=True)
    print("=" * 65, flush=True)

    db = init_firebase()
    if not db: sys.exit(1)

    # Collect all titles
    titles_map = get_all_titles_to_process(db)
    if not titles_map:
        print("📭 No titles found to process.", flush=True)
        return

    print(f"🔍 Found {len(titles_map)} titles to check/update.", flush=True)

    success = 0
    failed = 0
    
    with concurrent.futures.ThreadPoolExecutor(max_workers=args.workers) as executor:
        future_to_id = {
            executor.submit(process_title, db, tid, info, args): tid 
            for tid, info in titles_map.items()
        }
        for future in concurrent.futures.as_completed(future_to_id):
            if future.result(): success += 1
            else: failed += 1

    print("\n" + "=" * 65, flush=True)
    print(f"Done! ✅ {success} synced  ❌ {failed} failed", flush=True)
    print("=" * 65, flush=True)


if __name__ == "__main__":
    main()
