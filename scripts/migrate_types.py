import firebase_admin
from firebase_admin import credentials, firestore
import os
import sys

# Force UTF-8 output
if sys.stdout.encoding != 'utf-8':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

SERVICE_ACCOUNT_KEY = 'scripts/serviceAccount.json'

def init_firebase():
    if not os.path.exists(SERVICE_ACCOUNT_KEY) or os.path.getsize(SERVICE_ACCOUNT_KEY) < 10:
        print(f"❌ ERROR: {SERVICE_ACCOUNT_KEY} not found.")
        return None
    try:
        cred = credentials.Certificate(SERVICE_ACCOUNT_KEY)
        if not firebase_admin._apps:
            firebase_admin.initialize_app(cred)
        return firestore.client()
    except Exception as e:
        print(f"❌ ERROR: Firebase initialization failed: {e}")
        return None

def main():
    db = init_firebase()
    if not db:
        sys.exit(1)

    print("=" * 65)
    print("Database Migration: Separating Manga/Manhwa Content & Cleaning Tags")
    print("=" * 65)

    reviews_ref = db.collection('reviews')
    reviews_snap = reviews_ref.get()

    print(f"Found {len(reviews_snap)} reviews in Firestore.")
    updated_count = 0

    for doc in reviews_snap:
        rid = doc.id
        data = doc.to_dict()
        tags = data.get('tags') or []
        current_type = data.get('type')
        title = data.get('title', 'Unknown')

        # 1. Determine type based on tags if not explicitly set
        new_type = current_type
        if not new_type:
            lower_tags = [str(t).strip().lower() for t in tags]
            if any(t in lower_tags for t in ['манга', 'manga']):
                new_type = 'manga'
            else:
                new_type = 'manhwa'

        # 2. Filter out type tags
        clean_tags = []
        for t in tags:
            t_str = str(t).strip()
            q = t_str.lower()
            if q not in ['манхва', 'манга', 'manhwa', 'мaнhwa', 'манhwa', 'manga']:
                clean_tags.append(t_str)

        # 3. Update document if changes detected
        has_type_changed = (current_type != new_type)
        has_tags_changed = (len(tags) != len(clean_tags))

        if has_type_changed or has_tags_changed:
            doc.reference.update({
                'type': new_type,
                'tags': clean_tags
            })
            print(f"   ⚙️ Updated '{title}' ({rid}): type={new_type} | tags: {len(tags)} → {len(clean_tags)}")
            updated_count += 1

    print("=" * 65)
    print(f"Migration completed! Sync count: {updated_count} reviews updated.")
    print("=" * 65)

if __name__ == "__main__":
    main()
