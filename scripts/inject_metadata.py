"""
Direct metadata injection into Firestore — MANUAL FALLBACK ONLY.

Use this ONLY when the scraper cannot reach ToonGod.
Update values below with REAL data from ToonGod before running.

Run from project root:
    python scripts/inject_metadata.py
"""
import firebase_admin
from firebase_admin import credentials, firestore
import os
import sys
import re

SERVICE_ACCOUNT_KEY = 'scripts/serviceAccount.json'


def init_firebase():
    if not os.path.exists(SERVICE_ACCOUNT_KEY):
        print(f"ERROR: {SERVICE_ACCOUNT_KEY} not found.")
        return None
    cred = credentials.Certificate(SERVICE_ACCOUNT_KEY)
    if not firebase_admin._apps:
        firebase_admin.initialize_app(cred)
    return firestore.client()


# ── MANUAL METADATA ──────────────────────────────────────────────────────────
# IMPORTANT: Only add entries here if the scraper fails for a specific title.
# Always verify values against the actual ToonGod page before adding.
TITLES_METADATA = {
    # Example entry (commented out — use scraper.py --force instead):
    # "ani_XXXXXX": {
    #     "title": "Title Name",
    #     "official_rating": "4.3",
    #     "vote_count": "1,100",
    #     "bookmarks": "6,000",
    #     "status": "Completed",
    #     "chapters": "147",
    #     "chapter_count": 147,
    #     "author": "Author Name",
    #     "artist": "Artist Name",
    #     "genres": ["Drama", "Romance"],
    #     "url": "https://www.toongod.org/webtoon/...",
    # },
}


def slugify(title):
    slug = title.lower().strip()
    slug = re.sub(r'\s+', '_', slug)
    slug = re.sub(r'[^\w_]', '', slug)
    return slug


def main():
    if not TITLES_METADATA:
        print("No manual metadata entries defined.")
        print("Use 'python scripts/scraper.py --force' to scrape from ToonGod instead.")
        return

    db = init_firebase()
    if not db:
        sys.exit(1)

    print("=" * 60)
    print("Injecting MANUAL metadata into Firestore")
    print("=" * 60)

    for title_id, data in TITLES_METADATA.items():
        data_copy = dict(data)
        data_copy['last_updated'] = firestore.SERVER_TIMESTAMP

        db.collection('manga_metadata').document(title_id).set(data_copy, merge=True)
        print(f"  ✅ {title_id}: {data['title']} [{data.get('status','?')}] — {data.get('chapters','?')} chapters")

        manual_id = f"manual_{slugify(data['title'])}"
        if manual_id != title_id:
            db.collection('manga_metadata').document(manual_id).set(data_copy, merge=True)
            print(f"     ↳ fallback: {manual_id}")

    print()
    print("=" * 60)
    print("Done! All metadata injected into Firestore.")
    print("=" * 60)


if __name__ == "__main__":
    main()
