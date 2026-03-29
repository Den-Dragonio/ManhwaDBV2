"""
ToonGod Scraper — Syncs REAL metadata via Wayback Machine cached pages.

Since ToonGod uses CloudFlare Turnstile which blocks all automated browsers,
we use Wayback Machine's archived snapshots which contain the full page content.

Flow:
  1. Read all reviews from Firestore → collect unique titleIds + title names
  2. For each title: find the latest Wayback snapshot of its ToonGod page
  3. Parse the cached page → save to manga_metadata/{titleId}
  4. Extracts: rating, vote_count, bookmarks, status, chapters, genres, author, artist

Run from project root:
    python scripts/scraper.py [--force]   # --force re-scrapes even if already saved
"""

import requests
from bs4 import BeautifulSoup
import firebase_admin
from firebase_admin import credentials, firestore
import json
import os
import sys
import re
import time
import argparse
from urllib.parse import quote

# ── CONFIG ────────────────────────────────────────────────────────────────────
SERVICE_ACCOUNT_KEY = 'scripts/serviceAccount.json'

# Hard-coded mapping: app titleId → ToonGod page URL
TITLE_ID_TO_URL = {
    "ani_122138": "https://www.toongod.org/webtoon/stepmother-friends/",
    "ani_138564": "https://www.toongod.org/webtoon/private-tutoring-in-these-trying-times/",
    "ani_120166": "https://www.toongod.org/webtoon/childhood-friends/",
    "ani_119648": "https://www.toongod.org/webtoon/is-there-an-empty-room/",
    "ani_135790": "https://www.toongod.org/webtoon/springtime-for-blossom/",
    "ani_119913": "https://www.toongod.org/webtoon/boarding-diary/",
    "ani_121955": "https://www.toongod.org/webtoon/whats-for-dinner/",
    "ani_127854": "https://www.toongod.org/webtoon/punishing-my-pet-slave-elf/",
}

# Optional: title string → ToonGod URL
TITLE_NAME_TO_URL = {
    "my stepmother's friends":            "https://www.toongod.org/webtoon/stepmother-friends/",
    "fatal lessons in this pandemic":     "https://www.toongod.org/webtoon/private-tutoring-in-these-trying-times/",
    "private tutoring in these trying times": "https://www.toongod.org/webtoon/private-tutoring-in-these-trying-times/",
    "childhood friends":                  "https://www.toongod.org/webtoon/childhood-friends/",
    "got a room?":                        "https://www.toongod.org/webtoon/is-there-an-empty-room/",
    "is there an empty room?":            "https://www.toongod.org/webtoon/is-there-an-empty-room/",
    "springtime for blossom":             "https://www.toongod.org/webtoon/springtime-for-blossom/",
    "boarding diary":                     "https://www.toongod.org/webtoon/boarding-diary/",
    "what's for dinner?":                 "https://www.toongod.org/webtoon/whats-for-dinner/",
    "punishing my pet slave elf":         "https://www.toongod.org/webtoon/punishing-my-pet-slave-elf/",
}

DELAY_BETWEEN_REQUESTS = 4  # seconds, be polite to Wayback Machine
TOONGOD_BASE = "https://www.toongod.org"


# ── FIREBASE ──────────────────────────────────────────────────────────────────
def init_firebase():
    if not os.path.exists(SERVICE_ACCOUNT_KEY):
        print(f"ERROR: {SERVICE_ACCOUNT_KEY} not found.")
        print("Download it from Firebase Console → Project Settings → Service Accounts")
        return None
    cred = credentials.Certificate(SERVICE_ACCOUNT_KEY)
    if not firebase_admin._apps:
        firebase_admin.initialize_app(cred)
    return firestore.client()


def get_all_titles(db):
    """
    Scan the 'reviews' collection and collect every unique titleId + title name.
    Returns a dict: { titleId: title_string }
    """
    print("📖 Reading all reviews from Firestore…")
    reviews_snap = db.collection('reviews').get()
    titles = {}
    for doc in reviews_snap:
        data = doc.to_dict()
        tid = data.get('titleId') or ''
        name = data.get('title') or ''
        if tid and tid not in titles:
            titles[tid] = name
    print(f"   Found {len(titles)} unique title(s): {list(titles.keys())}")
    return titles


def needs_update(db, title_id, force=False):
    """Returns True if we should scrape this title (not yet in DB, or force mode)."""
    if force:
        return True
    snap = db.collection('manga_metadata').document(title_id).get()
    if not snap.exists:
        return True
    data = snap.to_dict()
    # Re-scrape if key fields are missing
    return not data.get('official_rating') or not data.get('status')


# ── WAYBACK MACHINE ──────────────────────────────────────────────────────────
def get_wayback_url(original_url, retries=3):
    """Find the latest Wayback Machine snapshot for a URL. Returns WB URL or None."""
    cdx_url = 'https://web.archive.org/cdx/search/cdx'
    # Strip protocol for CDX search
    clean_url = re.sub(r'^https?://', '', original_url)
    params = {
        'url': clean_url,
        'output': 'json',
        'limit': '-5',  # Last 5 snapshots
        'fl': 'timestamp,statuscode',
    }
    for attempt in range(retries):
        try:
            resp = requests.get(cdx_url, params=params, timeout=30)
            if resp.status_code == 429:
                wait = (attempt + 1) * 10
                print(f"   ⏳ Rate limited, waiting {wait}s...")
                time.sleep(wait)
                continue
            if resp.status_code != 200:
                return None
            data = resp.json()
            if len(data) <= 1:  # Only header row
                return None
            # Find latest with 200 status
            for row in reversed(data[1:]):
                if row[1] == '200':
                    ts = row[0]
                    return f"https://web.archive.org/web/{ts}/{original_url}"
            return None
        except Exception as e:
            if attempt < retries - 1:
                wait = (attempt + 1) * 5
                print(f"   ⏳ Retry {attempt+1}/{retries} after {wait}s... ({type(e).__name__})")
                time.sleep(wait)
            else:
                print(f"   ❌ Wayback CDX error after {retries} retries: {e}")
                return None
    return None


def search_toongod_via_wayback(title_name):
    """
    Search for a title on ToonGod via Wayback Machine cached search results.
    Returns a ToonGod URL or None.
    """
    if not title_name:
        return None

    # Clean title for search
    search_query = re.sub(r'[^\w\s]', '', title_name).strip()
    search_url = f"{TOONGOD_BASE}/?s={quote(search_query)}&post_type=wp-manga"
    print(f"   🔍 Searching via Wayback: {search_query}")

    wb_url = get_wayback_url(search_url)
    if not wb_url:
        # Try a simpler search URL
        slug = re.sub(r'\s+', '-', search_query.lower())
        direct_url = f"{TOONGOD_BASE}/webtoon/{slug}/"
        wb_url = get_wayback_url(direct_url)
        if wb_url:
            print(f"   ✅ Found direct URL via Wayback: {direct_url}")
            return direct_url
        return None

    try:
        resp = requests.get(wb_url, timeout=20)
        if resp.status_code != 200:
            return None

        soup = BeautifulSoup(resp.text, 'html.parser')

        # Parse search results
        result_links = (
            soup.select('.c-tabs-item__content .post-title a') or
            soup.select('.tab-thumb a') or
            soup.select('.search-wrap .post-title a')
        )

        for link in result_links:
            href = link.get('href', '')
            # Extract original ToonGod URL from Wayback-modified URL
            m = re.search(r'(https?://www\.toongod\.org/webtoon/[^/"]+/)', href)
            if m:
                found_url = m.group(1)
                print(f"   ✅ Found: {found_url}")
                return found_url

        return None

    except Exception as e:
        print(f"   ❌ Search error: {e}")
        return None


# ── SCRAPER ───────────────────────────────────────────────────────────────────
def normalize_status(raw):
    if not raw:
        return None
    s = raw.strip().lower().rstrip('*').strip()
    if s in ('completed', 'complete', 'finished', 'end', 'ended'):
        return 'Completed'
    if s in ('ongoing', 'on going', 'on-going', 'active', 'releasing'):
        return 'Ongoing'
    return raw.strip().title()


def parse_count(text):
    """Parse count strings like '1.1K', '6K', '2,345', '980' → formatted string."""
    if not text:
        return None
    text = text.strip()
    text = re.sub(r'[^\d.,KkMm]+', '', text)
    if not text:
        return None
    m = re.match(r'^([\d.]+)\s*([KkMm]?)$', text.replace(',', ''))
    if m:
        num = float(m.group(1))
        suffix = m.group(2).upper()
        if suffix == 'K':
            num = int(num * 1000)
        elif suffix == 'M':
            num = int(num * 1_000_000)
        else:
            num = int(num)
        return f"{num:,}"
    plain = re.sub(r'[^\d]', '', text)
    if plain:
        return f"{int(plain):,}"
    return text


def scrape_toongod(url):
    """Scrape a ToonGod page via its Wayback Machine snapshot."""
    print(f"   🌐 Fetching Wayback snapshot for: {url}")

    wb_url = get_wayback_url(url)
    if not wb_url:
        print(f"   ⚠️  No Wayback snapshot found")
        return None

    print(f"   📦 Using: {wb_url}")

    try:
        resp = requests.get(wb_url, timeout=30)
        if resp.status_code != 200:
            print(f"   ⚠️  HTTP {resp.status_code}")
            return None

        soup = BeautifulSoup(resp.text, 'html.parser')
        data = {}

        # Title
        title_tag = soup.select_one('.post-title h1')
        if title_tag:
            for span in title_tag.find_all('span'):
                span.decompose()
            data['title'] = title_tag.get_text(strip=True)

        # Info widgets (Author, Artist, Status, Release, Alt Title)
        for item in soup.select('.post-content_item'):
            heading = item.select_one('.summary-heading h5, .summary-heading')
            content = item.select_one('.summary-content')
            if not heading or not content:
                continue
            key = heading.get_text(strip=True).lower()
            links = content.select('a')
            val = ', '.join(a.get_text(strip=True) for a in links) if links else content.get_text(strip=True)
            if not val:
                continue
            if 'author' in key:
                data['author'] = val
            elif 'artist' in key:
                data['artist'] = val
            elif 'release' in key:
                data['release_year'] = val
            elif 'status' in key:
                data['status'] = normalize_status(val)
            elif 'alternative' in key or 'alt title' in key:
                data['alt_title'] = val

        # Genres
        # Genres and Tags Mapping
        genre_links = soup.select('.genres-content a')
        raw_genres = [a.get_text(strip=True) for a in genre_links] if genre_links else []
        
        tag_links = soup.select('.tags-content a, .wp-manga-tags-list a')
        raw_tags = [a.get_text(strip=True) for a in tag_links] if tag_links else []
        
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
            
        if all_raw:
            data['genres'] = list(set(raw_genres + mapped_tags))

        # ── Official Rating ────────────────────────────────────────────────────
        # The rating section has text like "Average 4.3 / 5 out of 1.1K"
        # or the #averagerating element, or .post-total-rating .score
        rating_section = soup.select_one('.post-total-rating')
        if rating_section:
            full_text = rating_section.get_text(' ', strip=True)

            # Extract rating value
            rating_match = re.search(r'(\d+(?:\.\d+)?)\s*/\s*5', full_text)
            if rating_match:
                data['official_rating'] = rating_match.group(1)
            elif not data.get('official_rating'):
                # Try just the score element
                score_el = rating_section.select_one('.score, .total_votes, .num-count')
                if score_el:
                    m = re.search(r'(\d+(?:\.\d+)?)', score_el.get_text(strip=True))
                    if m:
                        data['official_rating'] = m.group(1)

            # Extract vote count — "out of X"
            vote_match = re.search(r'out\s+of\s+([\d.,KkMm]+)', full_text)
            if vote_match:
                parsed = parse_count(vote_match.group(1))
                if parsed:
                    data['vote_count'] = parsed

        # Fallback rating from #averagerating
        if not data.get('official_rating'):
            rating_tag = soup.select_one('#averagerating')
            if rating_tag:
                m = re.search(r'(\d+(?:\.\d+)?)', rating_tag.get_text(strip=True))
                if m:
                    data['official_rating'] = m.group(1)

        # ── Bookmarks (Popularity) ─────────────────────────────────────────────
        page_text = resp.text
        bm_match = re.search(r'([\d.,KkMm]+)\s*Users?\s*bookmarked', page_text, re.IGNORECASE)
        if bm_match:
            parsed = parse_count(bm_match.group(1))
            if parsed:
                data['bookmarks'] = parsed

        # ── Chapter Count — REMOVED ────────────────────────────────────────────
        # Chapters are user-provided during review creation.
        # Scraper data is from cached 2025 pages and often inaccurate.

        # Summary
        summary_tag = soup.select_one('.description-summary .summary__content, .manga-summary')
        if summary_tag:
            data['summary'] = summary_tag.get_text(strip=True)[:500]

        # Thumbnail
        thumb_tag = soup.select_one('.summary_image img')
        if thumb_tag:
            thumb_url = thumb_tag.get('data-src') or thumb_tag.get('src') or ''
            # Fix Wayback-modified URLs back to originals
            if '/web.archive.org/' in thumb_url:
                orig_match = re.search(r'https?://[^/]*toongod[^"\']+', thumb_url)
                if orig_match:
                    thumb_url = orig_match.group(0)
            if thumb_url:
                data['thumbnail_url'] = thumb_url

        data['url'] = url
        data['last_updated'] = firestore.SERVER_TIMESTAMP

        votes_str = data.get('vote_count', 'N/A')
        bm_str = data.get('bookmarks', 'N/A')
        print(f"   ✅ title={data.get('title','?')} | rating={data.get('official_rating','?')} ({votes_str} votes) | 🔥 popularity={bm_str} | status={data.get('status','?')}")
        return data

    except Exception as e:
        print(f"   ❌ Error: {e}")
        return None


def slugify(title):
    slug = title.lower().strip()
    slug = re.sub(r'\s+', '_', slug)
    slug = re.sub(r'[^\w_]', '', slug)
    return slug


def sync_to_firestore(db, data, title_id):
    if not data:
        return False
    # Primary doc
    db.collection('manga_metadata').document(title_id).set(data, merge=True)
    print(f"   📝 Saved as '{title_id}'")

    # Slug-based fallback
    if 'title' in data:
        manual_id = f"manual_{slugify(data['title'])}"
        if manual_id != title_id:
            db.collection('manga_metadata').document(manual_id).set(data, merge=True)
            print(f"      ↳ fallback: '{manual_id}'")
    return True


# ── MAIN ──────────────────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(description='ToonGod metadata scraper (via Wayback Machine)')
    parser.add_argument('--force', action='store_true',
                        help='Re-scrape even titles already in the database')
    args = parser.parse_args()

    db = init_firebase()
    if not db:
        sys.exit(1)

    print("=" * 65)
    print("ToonGod Scraper (Wayback) — Syncing ALL titles to Firestore")
    print("=" * 65)

    # Step 1: Collect all unique titles from reviews
    all_titles = get_all_titles(db)

    # Step 2: Merge with hard-coded map (add any not yet in reviews)
    for tid in TITLE_ID_TO_URL:
        if tid not in all_titles:
            all_titles[tid] = ''

    success = 0
    skipped = 0
    failed = 0

    for title_id, title_name in all_titles.items():
        print(f"\n── {title_id} ({title_name or '?'}) ──")

        # Find URL
        url = TITLE_ID_TO_URL.get(title_id)
        if not url and title_name:
            url = TITLE_NAME_TO_URL.get(title_name.lower().strip())

        # Auto-search via Wayback if no URL mapping
        if not url and title_name:
            url = search_toongod_via_wayback(title_name)
            if url:
                print(f"   💡 Auto-discovered URL: {url}")

        if not url:
            print(f"   ⏭️  No URL mapping found — skipping.")
            print(f"   💡 Add to TITLE_ID_TO_URL in scraper.py to enable scraping.")
            skipped += 1
            continue

        # Check if update needed
        if not needs_update(db, title_id, force=args.force):
            print(f"   ✓ Already in DB and complete — skipping (use --force to re-scrape)")
            skipped += 1
            continue

        # Scrape via Wayback
        data = scrape_toongod(url)
        if data and data.get('title') and sync_to_firestore(db, data, title_id):
            success += 1
        else:
            failed += 1
            print(f"   ⚠️  Could not scrape (no Wayback snapshot or empty data).")

        time.sleep(DELAY_BETWEEN_REQUESTS)

    print()
    print("=" * 65)
    print(f"Done! ✅ {success} synced  ⏭️  {skipped} skipped  ❌ {failed} failed")
    print("=" * 65)

    if skipped > 0:
        print("\n💡 Tip: For titles without a URL mapping, add an entry to")
        print("   TITLE_ID_TO_URL in scripts/scraper.py and re-run.")


if __name__ == "__main__":
    main()
