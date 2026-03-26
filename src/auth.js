// ============================================================
// auth.js — Firebase Auth (Email/Password via username)
// ============================================================
// Username is used for login. Internally Firebase needs email,
// so we map: email = username.toLowerCase() + "@manhwadb.app"
// A separate `usernames` collection maps username → uid.
// ============================================================

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser as firebaseDeleteUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc, deleteDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from './firebase.js';

function usernameToEmail(username) {
  return `${username.toLowerCase().replace(/[^a-z0-9]/g, '_')}@manhwadb.app`;
}

export async function register(username, password, email = '') {
  if (!username || username.trim().length < 3)
    return { error: "Ім'я користувача має бути мінімум 3 символи" };
  if (!/^[a-zA-Z0-9_а-яА-ЯіІїЇєЄ]+$/.test(username))
    return { error: "Логін може містити лише літери, цифри та _" };
  if (!password || password.length < 6)
    return { error: 'Пароль має бути мінімум 6 символів' };

  // Check username uniqueness in Firestore
  try {
    const unameSnap = await getDoc(doc(db, 'usernames', username.toLowerCase()));
    if (unameSnap.exists()) return { error: 'Такий логін вже зайнятий. Оберіть інший.' };
  } catch (e) {
    return { error: 'Помилка з\'єднання або доступу (Rules): ' + e.message };
  }

  // Create Firebase Auth account
  const internalEmail = usernameToEmail(username);
  let cred;
  try {
    cred = await createUserWithEmailAndPassword(auth, internalEmail, password);
  } catch (e) {
    if (e.code === 'auth/email-already-in-use') return { error: 'Такий логін вже зайнятий.' };
    return { error: e.message };
  }

  const uid = cred.user.uid;
  const now = new Date().toISOString();

  // Force token synchronization to prevent Firestore "request.auth == null" race condition
  try { await cred.user.getIdToken(true); } catch(e) {}
  await new Promise(r => setTimeout(r, 1500));

  // Resilient retry wrapper for Firestore writes
  const writeWithRetry = async (fn, retries = 3) => {
    for (let i = 0; i < retries; i++) {
      try {
        await fn();
        return null; // success
      } catch (e) {
        if (i === retries - 1) return e;
        await new Promise(r => setTimeout(r, 800 * (i + 1))); // backoff
      }
    }
  };

  // Write user profile
  const usersErr = await writeWithRetry(() => 
    setDoc(doc(db, 'users', uid), {
      username: username.trim(),
      email: email || '',
      bio: '',
      avatarBase64: '',
      top4: [null, null, null, null],
      createdAt: now,
    })
  );

  if (usersErr) {
    console.error('Registration DB Write Error (users):', usersErr);
    try { await firebaseDeleteUser(cred.user); } catch(err) {} 
    return { error: 'Помилка запису профілю (users): ' + usersErr.message };
  }

  // Write username → uid mapping
  const unamesErr = await writeWithRetry(() =>
    setDoc(doc(db, 'usernames', username.toLowerCase()), { uid, internalEmail })
  );

  if (unamesErr) {
    console.error('Registration DB Write Error (usernames):', unamesErr);
    try { await firebaseDeleteUser(cred.user); } catch(err) {} 
    return { error: 'Помилка реєстрації логіну (usernames): ' + unamesErr.message };
  }

  return { user: { id: uid, username: username.trim() } };
}

export async function login(username, password) {
  if (!username || !password) return { error: 'Заповніть всі поля' };

  // Look up UID/email from username
  const unameSnap = await getDoc(doc(db, 'usernames', username.toLowerCase()));
  if (!unameSnap.exists()) return { error: 'Користувача не знайдено' };

  const { internalEmail } = unameSnap.data();
  try {
    const cred = await signInWithEmailAndPassword(auth, internalEmail, password);
    return { user: cred.user };
  } catch (e) {
    if (e.code === 'auth/wrong-password' || e.code === 'auth/invalid-credential')
      return { error: 'Невірний пароль' };
    return { error: e.message };
  }
}

export async function logout() {
  await signOut(auth);
}

export async function changePassword(userId, oldPassword, newPassword) {
  const user = auth.currentUser;
  if (!user) return { error: 'Не авторизовано' };
  if (newPassword.length < 6) return { error: 'Новий пароль має бути мінімум 6 символів' };

  try {
    const credential = EmailAuthProvider.credential(user.email, oldPassword);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
    return { ok: true };
  } catch (e) {
    if (e.code === 'auth/wrong-password' || e.code === 'auth/invalid-credential')
      return { error: 'Старий пароль невірний' };
    return { error: e.message };
  }
}

export async function deleteCurrentUser(password) {
  const user = auth.currentUser;
  if (!user) return { error: 'Не авторизовано' };
  try {
    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);
    await firebaseDeleteUser(user);
    return { ok: true };
  } catch (e) {
    if (e.code === 'auth/wrong-password' || e.code === 'auth/invalid-credential')
      return { error: 'Невірний пароль' };
    return { error: e.message };
  }
}
