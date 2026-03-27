// ============================================================
// components/header.js — Site header with nav
// ============================================================

import { Session } from '../store.js';
import { navigate } from '../router.js';
import { showAuthModal } from './authModal.js';
import { logout } from '../auth.js';
import { showToast } from '../utils.js';

export function renderHeader() {
  const user = Session.currentUser();
  const app = document.getElementById('app');

  // Desktop Header
  let headerEl = document.getElementById('site-header');
  if (headerEl) headerEl.remove();

  headerEl = document.createElement('header');
  headerEl.id = 'site-header';
  headerEl.className = 'site-header';

  const currentHash = window.location.hash.replace('#', '') || 'home';
  const hashBase = currentHash.split('/')[0];

  headerEl.innerHTML = `
    <a href="#home" class="header-logo">ManhwaDB</a>
    <nav class="header-nav">
      <button class="nav-link ${hashBase === 'home' || hashBase === '' ? 'active' : ''}" data-hash="home">🏠 Головна</button>
      <button class="nav-link ${hashBase === 'faq' ? 'active' : ''}" data-hash="faq">❔ FAQ</button>
      ${user ? `<button class="nav-link ${hashBase === 'new-review' ? 'active' : ''}" data-hash="new-review">✍️ Написати</button>` : ''}
      ${user ? `<button class="nav-link ${hashBase === 'friends' ? 'active' : ''}" data-hash="friends">👥 Друзі</button>` : ''}
      ${user ? `<button class="nav-link ${hashBase === 'account' ? 'active' : ''}" data-hash="account">👤 Мій акаунт</button>` : ''}
    </nav>
    <div class="header-auth">
      ${user
        ? `<span>Вітаємо, <strong>${user.username}</strong></span>
           <button class="btn btn-secondary btn-xs" id="logout-btn">Вийти</button>`
        : `<button class="btn btn-ghost btn-xs" id="login-btn">Увійти</button>
           <button class="btn btn-primary btn-xs" id="register-btn">Реєстрація</button>`
      }
    </div>`;

  app.insertBefore(headerEl, app.firstChild);

  // Mobile Bottom Nav
  let mobileNav = document.getElementById('mobile-nav');
  if (mobileNav) mobileNav.remove();

  if (user) {
    mobileNav = document.createElement('nav');
    mobileNav.id = 'mobile-nav';
    mobileNav.className = 'mobile-nav';
    mobileNav.innerHTML = `
      <button class="mobile-nav-item ${hashBase === 'home' || hashBase === '' ? 'active' : ''}" data-hash="home">
        <span class="mobile-nav-icon">🏠</span>
        <span>Головна</span>
      </button>
      <button class="mobile-nav-item ${hashBase === 'new-review' ? 'active' : ''}" data-hash="new-review">
        <span class="mobile-nav-icon">✍️</span>
        <span>Написати</span>
      </button>
      <button class="mobile-nav-item ${hashBase === 'friends' ? 'active' : ''}" data-hash="friends">
        <span class="mobile-nav-icon">👥</span>
        <span>Друзі</span>
      </button>
      <button class="mobile-nav-item ${hashBase === 'account' ? 'active' : ''}" data-hash="account">
        <span class="mobile-nav-icon">👤</span>
        <span>Профіль</span>
      </button>
    `;
    app.appendChild(mobileNav);
  }

  // Event Listeners
  document.querySelectorAll('[data-hash]').forEach(btn => {
    btn.addEventListener('click', () => navigate(btn.dataset.hash));
  });

  document.getElementById('logout-btn')?.addEventListener('click', async () => {
    if (confirm('Вийти з акаунту?')) {
      await logout();
      showToast('Ви вийшли з акаунту', 'info');
      window.location.hash = 'home';
      window.location.reload();
    }
  });

  document.getElementById('login-btn')?.addEventListener('click', () => showAuthModal('login'));
  document.getElementById('register-btn')?.addEventListener('click', () => showAuthModal('register'));
}
