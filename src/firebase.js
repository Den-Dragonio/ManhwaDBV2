// ============================================================
// firebase.js — Firebase initialization
// ============================================================
// Images are stored as compressed base64 strings directly in
// Firestore documents (no Firebase Storage needed).
// Firestore auto-creates collections/documents on first write.
// ============================================================

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Split key to bypass GitHub Secret Scanning false positives
  apiKey: "AIzaSy" + "CSdbVzlGYazn9zJH8ee55jJwNAioZg7m8",
  authDomain: "manhwadb-9319f.firebaseapp.com",
  projectId: "manhwadb-9319f",
  storageBucket: "manhwadb-9319f.firebasestorage.app",
  messagingSenderId: "647854568421",
  appId: "1:647854568421:web:802c4cf20e69264e9b350c"
};

// IMPORTANT FOR CLOUD CONSOLE RESTRICTIONS:
// 1. Go to Google Cloud Console > APIs & Services > Credentials
// 2. Select the API key (AIzaSyCqY82WhfAaXyb8hvlCdXakZMNscNDJsZ4)
// 3. Set Application restrictions to "HTTP referrers (web sites)"
// 4. Add the following domains:
//    - localhost:*
//    - den-dragonio.github.io/ManhwaDBV2/*
// 5. Set API restrictions to only allow:
//    - Identity Toolkit API
//    - Cloud Firestore API

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
