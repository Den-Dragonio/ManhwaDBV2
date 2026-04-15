// ============================================================
// main.js — App entry point (Firebase Auth aware)
// ============================================================

import './style.css';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { auth, db } from './firebase.js';
import { Users, Session } from './store.js';
import { renderHeader } from './components/header.js';
import { defineRoute, startRouter, onBeforeNavigate } from './router.js';
import { showLoader, showToast, initTheme } from './utils.js';

// ---- Page imports ----
import { renderHome } from './pages/home.js';
import { renderFaq } from './pages/faq.js';
import { renderNewReview } from './pages/newReview.js';
import { renderFriends } from './pages/friends.js';
import { renderAccount } from './pages/account.js';
import { renderProfile } from './pages/profile.js';
import { renderReview } from './pages/review.js';
import { renderAllReviews } from './pages/allReviews.js';
import { renderTitle } from './pages/title.js';
import { renderStats } from './pages/stats.js';


// Boot theme
initTheme();

let routerStarted = false;

function initApp() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop').forEach(m => {
        const closeBtn = m.querySelector('.modal-close, #edit-modal-close2, #del-modal-close2');
        if (closeBtn) closeBtn.click();
        else m.remove();
      });
    }
  });

  const app = document.getElementById('app');
  app.innerHTML = '';

  const root = document.createElement('div');
  root.id = 'page-root';
  app.appendChild(root);

  // Reload header and scroll to top on every navigation
  onBeforeNavigate(() => {
    renderHeader();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Routes
  defineRoute('home', () => renderHome());
  defineRoute('faq', () => renderFaq());
  defineRoute('new-review', () => {
    if (!Session.currentUser()) { import('./components/authModal.js').then(m => m.showAuthModal('login')); window.location.hash = 'home'; return; }
    renderNewReview(null);
  });
  defineRoute('new-review/:titleId', ({ titleId }) => {
    if (!Session.currentUser()) { import('./components/authModal.js').then(m => m.showAuthModal('login')); window.location.hash = 'home'; return; }
    renderNewReview(null, titleId);
  });
  defineRoute('edit-review/:id', ({ id }) => {
    if (!Session.currentUser()) { window.location.hash = 'home'; return; }
    renderNewReview(id);
  });
  defineRoute('friends', () => {
    if (!Session.currentUser()) { import('./components/authModal.js').then(m => m.showAuthModal('login')); window.location.hash = 'home'; return; }
    renderFriends();
  });
  defineRoute('account', () => {
    if (!Session.currentUser()) { import('./components/authModal.js').then(m => m.showAuthModal('login')); window.location.hash = 'home'; return; }
    renderAccount();
  });
  defineRoute('profile/:id', ({ id }) => renderProfile({ id }));
  defineRoute('review/:id', ({ id }) => renderReview({ id }));
  defineRoute('title/:id', ({ id }) => renderTitle({ id }));
  defineRoute('all-reviews/:userId', ({ userId }) => renderAllReviews({ userId }));
  defineRoute('stats', () => {
    if (!Session.currentUser()) { import('./components/authModal.js').then(m => m.showAuthModal('login')); window.location.hash = 'home'; return; }
    renderStats();
  });

  renderHeader();
  if (!routerStarted) { startRouter(); routerStarted = true; }
}

// Wait for Firebase Auth to initialize, then boot the app
onAuthStateChanged(auth, async (firebaseUser) => {
  if (firebaseUser) {
    // Load full user profile from Firestore
    try {
      const profile = await Users.byId(firebaseUser.uid);
      Session.setProfile(profile ? { ...profile, id: firebaseUser.uid } : { id: firebaseUser.uid, username: firebaseUser.displayName || 'User' });
    } catch (e) {
      console.warn("Could not fetch user profile on load (Firebase Rules or Network):", e);
      Session.setProfile({ id: firebaseUser.uid, username: firebaseUser.displayName || 'User' });
    }
  } else {
    Session.setProfile(null);
  }

  // Initialize app (or re-render header if already initialized)
  if (!routerStarted) {
    initApp();
  } else {
    renderHeader();
  }

  // Check for unread comment notifications
  if (firebaseUser) {
    checkCommentNotifications(firebaseUser.uid).catch(console.error);
  }
});

async function checkCommentNotifications(userId) {
  try {
    const q = query(
      collection(db, 'news'),
      where('type', 'in', ['new_comment', 'comment_reply']),
      where('targetId', '==', userId),
      where('read', '==', false)
    );
    const snap = await getDocs(q);
    snap.docs.forEach(d => {
      const data = d.data();
      let msg = '';
      if (data.type === 'new_comment') {
        msg = `💬 ${data.commenterName || 'Хтось'} прокоментував вашу рецензію "${data.reviewTitle || '...'}"`;
      } else if (data.type === 'comment_reply') {
        msg = `↪️ ${data.replierName || 'Хтось'} відповів на ваш коментар до "${data.reviewTitle || '...'}"`;
      }
      if (msg) showToast(msg, 'info', { persistent: true });
      // Mark as read
      updateDoc(doc(db, 'news', d.id), { read: true }).catch(console.error);
    });
  } catch (e) {
    console.warn('Could not check comment notifications:', e);
  }
}
