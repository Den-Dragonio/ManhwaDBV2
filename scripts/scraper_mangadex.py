import requests
import firebase_admin
from firebase_admin import credentials, firestore
import os
import sys
import time
import argparse
import concurrent.futures
from datetime import datetime

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

def get_mdex_ids_from_db(db):
    """Collects unique MangaDex IDs from manga_metadata and reviews."""
    mdex_ids = {} # {title_id: mdex_id}
    
    # 1. From metadata
    meta_ref = db.collection('manga_metadata').stream()
    for doc in meta_ref:
        data = doc.to_dict()
        md_id = data.get('mangadex_id')
        if md_id:
            mdex_ids[doc.id] = md_id

    # 2. From reviews (in case metadata wasn't created yet)
    reviews_ref = db.collection('reviews').stream()
    for doc in reviews_ref:
        data = doc.to_dict()
        tid = data.get('titleId')
        md_id = data.get('mangadex_id')
        if tid and md_id and tid not in mdex_ids:
            mdex_ids[tid] = md_id
            
    return mdex_ids

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
        
        # Step 2: Get basic info (Author/Artist/Genres) if needed
        # We'll just fetch tags and creators
        info_url = f"https://api.mangadex.org/manga/{mdex_id}?includes[]=author&includes[]=artist"
        info_resp = requests.get(info_url, timeout=15)
        m_data = {}
        if info_resp.status_code == 200:
            m = info_resp.json().get('data', {})
            attr = m.get('attributes', {})
            m_data['genres'] = [t.get('attributes', {}).get('name', {}).get('en') for t in attr.get('tags', [])]
            
            author_rel = next((r for r in m.get('relationships', []) if r['type'] == 'author'), None)
            artist_rel = next((r for r in m.get('relationships', []) if r['type'] == 'artist'), None)
            
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
        print(f"      ⚠️  MangaDex API Error: {e}", flush=True)
        return None

def process_title(db, title_id, mdex_id):
    """Worker for parallel processing."""
    print(f"── Processing {title_id} (MD: {mdex_id}) ──", flush=True)
    
    stats = fetch_mangadex_stats(mdex_id)
    if stats:
        doc_ref = db.collection('manga_metadata').document(title_id)
        
        # Merge stats into 'mangadex' field
        update_data = {
            'mangadex': stats,
            'last_updated_md': firestore.SERVER_TIMESTAMP
        }
        
        # Also ensure top-level mangadex_id is set
        update_data['mangadex_id'] = mdex_id
        
        doc_ref.set(update_data, merge=True)
        print(f"   ✅ Saved: score={stats['score']} | follows={stats['popularity']}", flush=True)
        return True
    else:
        print(f"   ❌ Failed to fetch stats for {mdex_id}", flush=True)
        return False

def main():
    print("=" * 65, flush=True)
    print(f"MangaDex Stats Scraper — {datetime.now().strftime('%Y-%m-%d %H:%M')}", flush=True)
    print("=" * 65, flush=True)

    db = init_firebase()
    if not db:
        sys.exit(1)

    # Collect IDs
    mdex_map = get_mdex_ids_from_db(db)
    if not mdex_map:
        print("📭 No MangaDex IDs found to process.", flush=True)
        return

    print(f"🔍 Found {len(mdex_map)} IDs to update.", flush=True)

    success = 0
    failed = 0
    
    # Process in parallel
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:
        future_to_id = {
            executor.submit(process_title, db, tid, mid): tid 
            for tid, mid in mdex_map.items()
        }
        
        for future in concurrent.futures.as_completed(future_to_id):
            if future.result():
                success += 1
            else:
                failed += 1

    print("\n" + "=" * 65, flush=True)
    print(f"Done! ✅ {success} updated  ❌ {failed} failed", flush=True)
    print("=" * 65, flush=True)

if __name__ == "__main__":
    main()
