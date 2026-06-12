import requests
import firebase_admin
from firebase_admin import credentials, firestore
import json
import os
import sys
import re
import time
import argparse
import cloudscraper
from datetime import datetime

# Force UTF-8 for output
if sys.stdout.encoding != 'utf-8':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

SERVICE_ACCOUNT_KEY = 'scripts/serviceAccount.json'

def init_firebase():
    if not os.path.exists(SERVICE_ACCOUNT_KEY) or os.path.getsize(SERVICE_ACCOUNT_KEY) < 10:
        print(f"❌ ERROR: {SERVICE_ACCOUNT_KEY} not found or invalid.")
        return None
    try:
        cred = credentials.Certificate(SERVICE_ACCOUNT_KEY)
        if not firebase_admin._apps:
            firebase_admin.initialize_app(cred)
        return firestore.client()
    except Exception as e:
        print(f"❌ ERROR: Firebase initialization failed: {e}")
        return None

def get_hitomi_title_ids(db):
    print("📖 Scanning reviews for Hitomi.la IDs...")
    reviews_snap = db.collection('reviews').get()
    hitomi_ids = set()
    for doc in reviews_snap:
        data = doc.to_dict()
        tid = data.get('titleId') or ''
        if tid.startswith('hitomi_'):
            hitomi_ids.add(tid)
    print(f"   Found {len(hitomi_ids)} unique Hitomi.la titles.")
    return list(hitomi_ids)

def scrape_hitomi_gallery(gallery_id):
    url = f"https://ltn.hitomi.la/galleries/{gallery_id}.js"
    print(f"   🌐 Fetching details from: {url}")
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://hitomi.la/'
    }
    
    try:
        # Use cloudscraper for CF bypass
        scraper = cloudscraper.create_scraper()
        resp = scraper.get(url, headers=headers, timeout=20)
        
        if resp.status_code != 200:
            print(f"   ⚠️ Hitomi.la returned status code {resp.status_code}")
            return None
            
        js_text = resp.text
        start_idx = js_text.find('{')
        end_idx = js_text.rfind('}')
        if start_idx == -1 or end_idx == -1:
            print("   ❌ Failed to parse JS JSON wrapper")
            return None
            
        json_str = js_text[start_idx:end_idx+1]
        info = json.loads(json_str)
        
        # Parse fields
        title = info.get('title', 'Unknown')
        
        # Extract artists
        artists = [a.get('artist') for a in info.get('artists', []) if a.get('artist')]
        author = ', '.join(artists) if artists else 'Unknown'
        
        # Extract tags
        raw_tags = []
        for t in info.get('tags', []):
            tag_name = t.get('tag')
            if tag_name:
                if ':' in tag_name:
                    tag_name = tag_name.split(':', 1)[1]
                raw_tags.append(tag_name)
                
        # Map specific tags
        mapped_tags = []
        for t in raw_tags:
            lower_t = t.lower()
            if 'x-ray' in lower_t: mapped_tags.append('рентген')
            if 'ahegao' in lower_t: mapped_tags.append('ахегао')
            if 'smut' in lower_t: mapped_tags.append('🔥🔞сцены')
            if 'ntr' in lower_t or 'netorare' in lower_t: mapped_tags.append('NTR')
            if 'animated' in lower_t: mapped_tags.append('animated')
            if 'foot fetish' in lower_t: mapped_tags.append('футфетиш')
            if 'bdsm' in lower_t: mapped_tags.append('бдсм')
            
        final_genres = list(set(raw_tags + mapped_tags))
        
        # Reconstruct standard big cover URL
        # e.g., https://tn.hitomi.la/bigcovers/2819401.jpg
        thumbnail_url = f"https://tn.hitomi.la/bigcovers/{gallery_id}.jpg"
        
        # Reconstruct reader/reading link
        reading_url = f"https://hitomi.la/reader/{gallery_id}.html"
        
        data = {
            'title': title,
            'author': author,
            'artist': author,
            'genres': final_genres,
            'thumbnail_url': thumbnail_url,
            'url': reading_url,
            'source': 'hitomi',
            'type': 'manga',
            'last_updated': firestore.SERVER_TIMESTAMP
        }
        
        print(f"   ✅ title={title} | author={author} | type=manga | genres={len(final_genres)}")
        return data
        
    except Exception as e:
        print(f"   ❌ Scrape error: {e}")
        return None

def main():
    parser = argparse.ArgumentParser(description='Hitomi.la metadata scraper')
    parser.add_argument('--force', action='store_true', help='Re-scrape even if already present')
    args = parser.parse_args()

    db = init_firebase()
    if not db:
        sys.exit(1)

    print("=" * 65)
    print(f"Hitomi.la Scraper — {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    print("=" * 65)

    hitomi_title_ids = get_hitomi_title_ids(db)
    success = 0
    skipped = 0
    failed = 0

    for title_id in hitomi_title_ids:
        print(f"\n── Processing {title_id} ──")
        
        # Check if already present in metadata
        doc_ref = db.collection('manga_metadata').document(title_id)
        doc_snap = doc_ref.get()
        if doc_snap.exists and not args.force:
            print("   ✓ Already exists — skipping (use --force to re-scrape)")
            skipped += 1
            continue
            
        gallery_id = title_id.replace('hitomi_', '')
        data = scrape_hitomi_gallery(gallery_id)
        
        if data:
            doc_ref.set(data, merge=True)
            # Add to search_names
            doc_ref.update({
                'search_names': firestore.ArrayUnion([data['title'].lower()])
            })
            print(f"   📝 Saved metadata to Firestore.")
            success += 1
        else:
            print("   ❌ Failed to scrape metadata.")
            failed += 1
            
        time.sleep(2) # be polite

    print("\n" + "=" * 65)
    print(f"Finished! ✅ {success} synced  ⏭️  {skipped} skipped  ❌ {failed} failed")
    print("=" * 65)

if __name__ == "__main__":
    main()
