// ============================================================
// main.js — App entry point (Firebase Auth aware)
// ============================================================

import './style.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.js';
import { Users, Session } from './store.js';
import { renderHeader } from './components/header.js';
import { defineRoute, startRouter, onBeforeNavigate } from './router.js';
import { showLoader } from './utils.js';

// ---- Page imports ----
import { renderHome } from './pages/home.js';
import { renderFaq } from './pages/faq.js';
import { renderNewReview } from './pages/newReview.js';
import { renderFriends } from './pages/friends.js';
import { renderAccount } from './pages/account.js';
import { renderProfile } from './pages/profile.js';
import { renderReview } from './pages/review.js';
import { renderAllReviews } from './pages/allReviews.js';

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
  defineRoute('all-reviews/:userId', ({ userId }) => renderAllReviews({ userId }));

  renderHeader();
  if (!routerStarted) { startRouter(); routerStarted = true; }
}

// Wait for Firebase Auth to initialize, then boot the app
onAuthStateChanged(auth, async (firebaseUser) => {
  if (firebaseUser) {
    // Load full user profile from Firestore
    const profile = await Users.byId(firebaseUser.uid);
    Session.setProfile(profile ? { ...profile, id: firebaseUser.uid } : { id: firebaseUser.uid, username: firebaseUser.displayName || 'User' });
  } else {
    Session.setProfile(null);
  }

  // Initialize app (or re-render header if already initialized)
  if (!routerStarted) {
    initApp();
  } else {
    renderHeader();
  }
});
