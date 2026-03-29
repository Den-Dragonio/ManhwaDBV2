import { readFileSync } from 'fs';
import admin from 'firebase-admin';

// Initialize Firebase Admin
const serviceAccount = JSON.parse(readFileSync('./scripts/serviceAccount.json', 'utf8'));
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function run() {
  console.log("Fetching reviews...");
  const reviewsSnap = await db.collection('reviews').get();
  const reviews = reviewsSnap.docs.map(d => ({id: d.id, ...d.data()}));
  
  const silentWarReviews = reviews.filter(r => 
    r.title.toLowerCase().includes('silent war') || 
    r.title.toLowerCase().includes('hole is open')
  );
  
  console.log("Found matches:");
  silentWarReviews.forEach(r => {
    console.log(`- ID: ${r.id}, User: ${r.username}, Title: ${r.title}, TitleID: ${r.titleId}`);
  });

  process.exit();
}

run().catch(console.error);
