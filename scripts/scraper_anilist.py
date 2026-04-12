"""
AniList Scraper — Syncs metadata from AniList GraphQL API to Firestore.

Uses the free, public AniList GraphQL API (no key needed).
Since all titleIds are in format 'ani_XXXXX' (AniList IDs), we query by ID directly.

Flow:
  1. Read all reviews from Firestore → collect unique titleIds
  2. For each title with 'ani_' prefix: extract AniList ID
  3. Query AniList GraphQL API by ID
  4. Save to manga_metadata/{titleId}.anilist = {...}

Run from project root:
    python scripts/scraper_anilist.py [--force]
"""

import requests
import firebase_admin
from firebase_admin import credentials, firestore
import os
import sys
import time
import argparse
import json

# Force UTF-8 for stdout/stderr to prevent crashes in minimal CI environments
if sys.stdout.encoding != 'utf-8':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

# ── CONFIG ────────────────────────────────────────────────────────────────────
SERVICE_ACCOUNT_KEY = 'scripts/serviceAccount.json'
ANILIST_API = 'https://graphql.anilist.co'
DELAY_BETWEEN_REQUESTS = 1.5  # seconds, respect rate limits

# AniList GraphQL query
ANILIST_QUERY = """
query ($id: Int) {
  Media(id: $id, type: MANGA) {
    id
    title {
      romaji
      english
      native
    }
    status
    chapters
    volumes
    averageScore
    meanScore
    popularity
    favourites
    genres
    tags { name }
    startDate { year month day }
    endDate { year month day }
    staff(perPage: 10) {
      edges {
        role
        node {
          name { full }
        }
      }
    }
    description(asHtml: false)
    isAdult
    format
    countryOfOrigin
  }
}
"""


# ── FIREBASE ──────────────────────────────────────────────────────────────────
def init_firebase():
    if not os.path.exists(SERVICE_ACCOUNT_KEY):
        print(f"❌ ERROR: {SERVICE_ACCOUNT_KEY} not found.")
        print("   TIP: If running in GitHub Actions, ensure 'FIREBASE_SERVICE_ACCOUNT' secret is set.")
        return None
    
    # Check if file is empty or too small
    if os.path.getsize(SERVICE_ACCOUNT_KEY) < 10:
        print(f"❌ ERROR: {SERVICE_ACCOUNT_KEY} is empty or invalid.")
        print("   TIP: The GitHub secret 'FIREBASE_SERVICE_ACCOUNT' might be empty.")
        return None

    try:
        cred = credentials.Certificate(SERVICE_ACCOUNT_KEY)
        if not firebase_admin._apps:
            firebase_admin.initialize_app(cred)
        return firestore.client()
    except json.JSONDecodeError as e:
        print(f"❌ ERROR: Failed to parse {SERVICE_ACCOUNT_KEY} as JSON.")
        print(f"   Details: {e}")
        print("   TIP: Check if your GitHub secret contains the full JSON content.")
        return None
    except Exception as e:
        print(f"❌ ERROR: Firebase initialization failed: {e}")
        return None


def get_all_titles(db):
    """Scan 'reviews' collection and collect every unique titleId."""
    print("📖 Reading all reviews from Firestore…")
    reviews_snap = db.collection('reviews').get()
    titles = {}
    for doc in reviews_snap:
        data = doc.to_dict()
        tid = data.get('titleId') or ''
        name = data.get('title') or ''
        if tid and tid not in titles:
            titles[tid] = name
    print(f"   Found {len(titles)} unique title(s)")
    return titles


def needs_update(db, title_id, force=False):
    """Returns True if we should scrape this title."""
    if force:
        return True
    snap = db.collection('manga_metadata').document(title_id).get()
    if not snap.exists:
        return True
    data = snap.to_dict()
    # Re-scrape if anilist data missing
    return not data.get('anilist')


# ── ANILIST API ──────────────────────────────────────────────────────────────
def fetch_anilist(anilist_id):
    """Fetch metadata from AniList API by ID."""
    try:
        resp = requests.post(
            ANILIST_API,
            json={'query': ANILIST_QUERY, 'variables': {'id': anilist_id}},
            headers={'Content-Type': 'application/json', 'Accept': 'application/json'},
            timeout=15
        )

        if resp.status_code == 429:
            print("   ⏳ Rate limited by AniList, waiting 60s...")
            time.sleep(60)
            return fetch_anilist(anilist_id)

        if resp.status_code != 200:
            print(f"   ⚠️  AniList HTTP {resp.status_code}")
            return None

        data = resp.json()
        media = data.get('data', {}).get('Media')
        if not media:
            print(f"   ⚠️  Not found on AniList (ID: {anilist_id})")
            return None

        # Extract staff (author/artist)
        author = None
        artist = None
        for edge in (media.get('staff', {}).get('edges') or []):
            role = (edge.get('role') or '').lower()
            name = edge.get('node', {}).get('name', {}).get('full', '')
            if not name:
                continue
            if 'story' in role or 'original creator' in role:
                author = name
            elif 'art' in role:
                artist = name

        # Build result
        score_raw = media.get('averageScore') or media.get('meanScore')
        score = round(score_raw / 10, 1) if score_raw else None

        start_date = media.get('startDate') or {}
        year = start_date.get('year')

        # AniList status mapping
        status = media.get('status')  # FINISHED, RELEASING, NOT_YET_RELEASED, CANCELLED, HIATUS

        title = media.get('title', {})
        title_en = title.get('english') or title.get('romaji') or ''

        raw_genres = media.get('genres') or []
        tags_data = media.get('tags') or []
        raw_tags = [t.get('name') for t in tags_data if t.get('name')]
        all_raw = raw_genres + raw_tags
        
        mapped_tags = []
        for t in all_raw:
            lower_t = t.lower()
            if 'x-ray' in lower_t: mapped_tags.append('рентген')
            if 'ahegao' in lower_t: mapped_tags.append('ахегао')
            if 'smut' in lower_t: mapped_tags.append('🔥🔞сцены')
            if 'ntr' in lower_t or 'netorare' in lower_t: mapped_tags.append('nrt')
            if 'animated' in lower_t: mapped_tags.append('animated')
            if 'foot fetish' in lower_t: mapped_tags.append('футфетиш')
            if 'bdsm' in lower_t: mapped_tags.append('бдсм')
            
        final_genres = list(set(raw_genres + mapped_tags))

        result = {
            'anilist_id': media['id'],
            'title': title_en,
            'title_romaji': title.get('romaji', ''),
            'title_native': title.get('native', ''),
            'status': status,
            'score': score,
            'score_raw': score_raw,
            'popularity': media.get('popularity'),
            'favourites': media.get('favourites'),
            'chapters': media.get('chapters'),
            'volumes': media.get('volumes'),
            'genres': final_genres,
            'year': year,
            'author': author,
            'artist': artist,
            'is_adult': media.get('isAdult', False),
            'format': media.get('format'),
            'country': media.get('countryOfOrigin'),
        }

        # Clean None values
        result = {k: v for k, v in result.items() if v is not None}

        status_icons = {
            'FINISHED': '✅',
            'RELEASING': '📡',
            'NOT_YET_RELEASED': '📋',
            'CANCELLED': '❌',
            'HIATUS': '⏸️',
        }
        s_icon = status_icons.get(status, '❓')

        print(f"   ✅ {title_en} | score={score or '?'}/10 | {s_icon} {status} | chapters={media.get('chapters', '?')} | genres={', '.join(media.get('genres', [])[:3])}")
        if author:
            print(f"      ↳ author: {author}" + (f" | artist: {artist}" if artist and artist != author else ""))

        return result

    except Exception as e:
        print(f"   ❌ AniList error: {e}")
        return None


def sync_to_firestore(db, anilist_data, title_id):
    """Save AniList data as a nested field in manga_metadata."""
    if not anilist_data:
        return False
    # Merge into existing document
    db.collection('manga_metadata').document(title_id).set(
        {'anilist': anilist_data, 'last_updated': firestore.SERVER_TIMESTAMP},
        merge=True
    )
    print(f"   📝 Saved AniList data for '{title_id}'")
    return True


# ── MAIN ──────────────────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(description='AniList metadata scraper')
    parser.add_argument('--force', action='store_true',
                        help='Re-scrape even titles already in the database')
    args = parser.parse_args()

    db = init_firebase()
    if not db:
        sys.exit(1)

    print("=" * 65)
    print("AniList Scraper — Syncing ALL titles to Firestore")
    print("=" * 65)

    all_titles = get_all_titles(db)

    success = 0
    skipped = 0
    failed = 0
    not_anilist = 0

    for title_id, title_name in all_titles.items():
        print(f"\n── {title_id} ({title_name or '?'}) ──")

        # Only process ani_ titles
        if not title_id.startswith('ani_'):
            print(f"   ⏭️  Not an AniList ID — skipping.")
            not_anilist += 1
            continue

        # Extract AniList ID
        try:
            anilist_id = int(title_id.replace('ani_', ''))
        except ValueError:
            print(f"   ⚠️  Invalid AniList ID format — skipping.")
            failed += 1
            continue

        # Check if update needed
        if not needs_update(db, title_id, force=args.force):
            print(f"   ✓ Already has AniList data — skipping (use --force to re-scrape)")
            skipped += 1
            continue

        # Fetch from AniList
        data = fetch_anilist(anilist_id)
        if data and sync_to_firestore(db, data, title_id):
            success += 1
        else:
            failed += 1

        time.sleep(DELAY_BETWEEN_REQUESTS)

    print()
    print("=" * 65)
    print(f"Done! ✅ {success} synced  ⏭️  {skipped} skipped  ❌ {failed} failed  🔕 {not_anilist} non-AniList")
    print("=" * 65)


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"\n💥 CRITICAL CRASH: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
