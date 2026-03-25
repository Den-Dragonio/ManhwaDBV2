// ============================================================
// store.js — Firestore data layer (replaces localStorage)
// ============================================================
// All methods are async. Images stored as compressed base64.
// Collections auto-create on first write in Firestore.
// ============================================================

import {
  collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc,
  query, where, orderBy, limit, arrayUnion, arrayRemove, writeBatch,
  serverTimestamp, Timestamp,
} from 'firebase/firestore';
import { auth, db } from './firebase.js';

// ---- Helpers ----
function tsToIso(val) {
  if (!val) return null;
  if (val instanceof Timestamp) return val.toDate().toISOString();
  if (val?.seconds) return new Date(val.seconds * 1000).toISOString();
  return val;
}

function normalize(snap) {
  if (!snap.exists()) return null;
  const data = snap.data();
  Object.keys(data).forEach(k => {
    if (data[k] instanceof Timestamp || data[k]?.seconds)
      data[k] = tsToIso(data[k]);
  });
  return { id: snap.id, ...data };
}

function normalizeDocs(snap) {
  return snap.docs.map(d => normalize(d));
}

// Cached current user profile (set by main.js via onAuthStateChanged)
let _currentUserProfile = null;

// ---- SESSION ----
export const Session = {
  get: () => auth.currentUser?.uid || null,
  currentUser: () => _currentUserProfile,
  setProfile: (p) => { _currentUserProfile = p; },
  clear: () => { _currentUserProfile = null; },
};

// ---- USERS ----
export const Users = {
  byId: async (uid) => {
    if (!uid) return null;
    const snap = await getDoc(doc(db, 'users', uid));
    return normalize(snap);
  },
  byUsername: async (username) => {
    const unameSnap = await getDoc(doc(db, 'usernames', username.toLowerCase()));
    if (!unameSnap.exists()) return null;
    const { uid } = unameSnap.data();
    return Users.byId(uid);
  },
  save: async (user) => {
    const { id, ...data } = user;
    await setDoc(doc(db, 'users', id), data, { merge: true });
    // Update cached profile if it's the current user
    if (auth.currentUser?.uid === id) {
      Session.setProfile({ ...(_currentUserProfile || {}), ...data, id });
    }
  },
  delete: async (uid) => {
    await deleteDoc(doc(db, 'users', uid));
  },
};

// ---- REVIEWS ----
export const Reviews = {
  all: async () => {
    const snap = await getDocs(collection(db, 'reviews'));
    return normalizeDocs(snap).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },
  byId: async (id) => {
    const snap = await getDoc(doc(db, 'reviews', id));
    return normalize(snap);
  },
  byUser: async (userId) => {
    const q = query(collection(db, 'reviews'), where('userId', '==', userId));
    const snap = await getDocs(q);
    return normalizeDocs(snap).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },
  topRated: async (n = 10) => {
    // Fetch recent reviews and sort by rating client-side
    const snap = await getDocs(query(collection(db, 'reviews'), orderBy('createdAt', 'desc'), limit(200)));
    return normalizeDocs(snap).sort((a, b) => b.rating - a.rating).slice(0, n);
  },
  create: async (userId, data) => {
    const user = Session.currentUser();
    const docRef = await addDoc(collection(db, 'reviews'), {
      userId,
      username: user?.username || 'Unknown',
      title: data.title || '',
      coverBase64: data.coverBase64 || '',
      text: data.text || '',
      rating: data.rating ?? 0,
      status: data.status || 'done',
      tags: data.tags || [],
      date: data.date || '',
      likes: [],
      dislikes: [],
      createdAt: new Date().toISOString(),
      updatedAt: null,
    });
    return { id: docRef.id, userId, ...data };
  },
  update: async (id, data) => {
    await updateDoc(doc(db, 'reviews', id), { ...data, updatedAt: new Date().toISOString() });
    return { id, ...data };
  },
  delete: async (id) => {
    await deleteDoc(doc(db, 'reviews', id));
    // Delete related comments
    const commSnap = await getDocs(query(collection(db, 'comments'), where('reviewId', '==', id)));
    const batch = writeBatch(db);
    commSnap.docs.forEach(d => batch.delete(d.ref));
    await batch.commit();
  },
  // Reactions
  toggleLike: async (id, userId) => {
    const ref = doc(db, 'reviews', id);
    const snap = await getDoc(ref);
    if (!snap.exists()) return;
    const { likes = [], dislikes = [] } = snap.data();
    if (likes.includes(userId)) {
      await updateDoc(ref, { likes: arrayRemove(userId) });
    } else {
      await updateDoc(ref, { likes: arrayUnion(userId), dislikes: arrayRemove(userId) });
    }
  },
  toggleDislike: async (id, userId) => {
    const ref = doc(db, 'reviews', id);
    const snap = await getDoc(ref);
    if (!snap.exists()) return;
    const { likes = [], dislikes = [] } = snap.data();
    if (dislikes.includes(userId)) {
      await updateDoc(ref, { dislikes: arrayRemove(userId) });
    } else {
      await updateDoc(ref, { dislikes: arrayUnion(userId), likes: arrayRemove(userId) });
    }
  },
};

// ---- COMMENTS ----
export const Comments = {
  byReview: async (reviewId) => {
    const q = query(collection(db, 'comments'), where('reviewId', '==', reviewId));
    const snap = await getDocs(q);
    return normalizeDocs(snap).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  },
  create: async (reviewId, userId, text, parentId = null) => {
    const user = Session.currentUser();
    const docRef = await addDoc(collection(db, 'comments'), {
      reviewId, userId,
      username: user?.username || 'Unknown',
      avatarBase64: user?.avatarBase64 || '',
      text, parentId,
      likes: [], dislikes: [],
      createdAt: new Date().toISOString(),
      updatedAt: null,
    });
    return { id: docRef.id, reviewId, userId, text, parentId };
  },
  delete: async (id) => {
    // Delete comment and its replies
    await deleteDoc(doc(db, 'comments', id));
    const repliesSnap = await getDocs(query(collection(db, 'comments'), where('parentId', '==', id)));
    const batch = writeBatch(db);
    repliesSnap.docs.forEach(d => batch.delete(d.ref));
    await batch.commit();
  },
  toggleLike: async (id, userId) => {
    const ref = doc(db, 'comments', id);
    const snap = await getDoc(ref);
    if (!snap.exists()) return;
    if (snap.data().likes?.includes(userId)) {
      await updateDoc(ref, { likes: arrayRemove(userId) });
    } else {
      await updateDoc(ref, { likes: arrayUnion(userId), dislikes: arrayRemove(userId) });
    }
  },
  toggleDislike: async (id, userId) => {
    const ref = doc(db, 'comments', id);
    const snap = await getDoc(ref);
    if (!snap.exists()) return;
    if (snap.data().dislikes?.includes(userId)) {
      await updateDoc(ref, { dislikes: arrayRemove(userId) });
    } else {
      await updateDoc(ref, { dislikes: arrayUnion(userId), likes: arrayRemove(userId) });
    }
  },
};

// ---- FRIENDS ----
// Document ID = sorted UIDs joined by underscore for O(1) lookup
function friendDocId(a, b) { return [a, b].sort().join('_'); }

export const Friends = {
  between: async (a, b) => {
    const snap = await getDoc(doc(db, 'friends', friendDocId(a, b)));
    return normalize(snap);
  },
  ofUser: async (userId) => {
    const q = query(collection(db, 'friends'), where('users', 'array-contains', userId), where('status', '==', 'accepted'));
    const snap = await getDocs(q);
    return normalizeDocs(snap);
  },
  pendingFor: async (userId) => {
    const q = query(collection(db, 'friends'), where('receiverId', '==', userId), where('status', '==', 'pending'));
    const snap = await getDocs(q);
    return normalizeDocs(snap);
  },
  sentBy: async (userId) => {
    const q = query(collection(db, 'friends'), where('requesterId', '==', userId), where('status', '==', 'pending'));
    const snap = await getDocs(q);
    return normalizeDocs(snap);
  },
  send: async (requesterId, receiverId) => {
    const existing = await Friends.between(requesterId, receiverId);
    if (existing) return false;
    const id = friendDocId(requesterId, receiverId);
    await setDoc(doc(db, 'friends', id), {
      users: [requesterId, receiverId],
      requesterId, receiverId, status: 'pending',
      createdAt: new Date().toISOString(),
    });
    return true;
  },
  accept: async (requesterId, receiverId) => {
    await updateDoc(doc(db, 'friends', friendDocId(requesterId, receiverId)), { status: 'accepted' });
  },
  remove: async (a, b) => {
    await deleteDoc(doc(db, 'friends', friendDocId(a, b)));
  },
};

// ---- NEWS ----
export const News = {
  recent: async (n = 40) => {
    const snap = await getDocs(collection(db, 'news'));
    return normalizeDocs(snap).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, n);
  },
  add: async (type, userId, targetId = null, extra = {}) => {
    await addDoc(collection(db, 'news'), {
      type, userId, targetId,
      createdAt: new Date().toISOString(),
      ...extra,
    });
  },
};

// ---- TOP SITES (kept in localStorage for easy editing) ----
const DEFAULT_TOP_SITES = [
  { name: 'Webtoon', url: 'https://www.webtoons.com', desc: 'Офіційна платформа' },
  { name: 'MangaDex', url: 'https://mangadex.org', desc: 'Велика база' },
  { name: 'Kakao Page', url: 'https://page.kakao.com', desc: 'Корейська платформа' },
  { name: 'Tapas', url: 'https://tapas.io', desc: 'Англомовна платформа' },
  { name: 'Bato.to', url: 'https://bato.to', desc: 'Читати безкоштовно' },
];

export const TopSites = {
  all: () => {
    try { const s = JSON.parse(localStorage.getItem('mdb_top_sites')); return s?.length ? s : DEFAULT_TOP_SITES; } catch { return DEFAULT_TOP_SITES; }
  },
  save: (sites) => localStorage.setItem('mdb_top_sites', JSON.stringify(sites)),
};
