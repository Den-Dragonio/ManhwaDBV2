// ============================================================
// components/authModal.js — Login / Register modal (Firebase)
// ============================================================

import { login, register } from '../auth.js';
import { News } from '../store.js';
import { showToast } from '../utils.js';

let activeModal = null;

export function showAuthModal(tab = 'login') {
  closeAuthModal();

  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.id = 'auth-modal';
  backdrop.innerHTML = `
    <div class="modal-box">
      <div class="modal-header">
        <span class="modal-title">ManhwaDB</span>
        <button class="modal-close" id="auth-modal-close">✕</button>
      </div>
      <div class="modal-body">
        <div class="modal-tabs">
          <button class="modal-tab ${tab === 'login' ? 'active' : ''}" data-tab="login">Увійти</button>
          <button class="modal-tab ${tab === 'register' ? 'active' : ''}" data-tab="register">Зареєструватися</button>
        </div>
        <div id="auth-tab-content"></div>
      </div>
    </div>`;

  document.body.appendChild(backdrop);
  activeModal = backdrop;
  renderTab(backdrop, tab);

  backdrop.querySelectorAll('.modal-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      backdrop.querySelectorAll('.modal-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderTab(backdrop, btn.dataset.tab);
    });
  });

  document.getElementById('auth-modal-close').addEventListener('click', closeAuthModal);
  backdrop.addEventListener('click', e => { if (e.target === backdrop) closeAuthModal(); });
  document.addEventListener('keydown', escClose);
}

function escClose(e) { if (e.key === 'Escape') closeAuthModal(); }

export function closeAuthModal() {
  if (activeModal) { activeModal.remove(); activeModal = null; }
  document.removeEventListener('keydown', escClose);
}

function setLoading(btn, loading) {
  btn.disabled = loading;
  btn.textContent = loading ? 'Зачекайте...' : btn.dataset.label;
}

function renderTab(backdrop, tab) {
  const content = backdrop.querySelector('#auth-tab-content');

  if (tab === 'login') {
    content.innerHTML = `
      <div class="form-group" style="margin-bottom:16px">
        <label class="form-label">Логін</label>
        <input class="input" type="text" id="auth-username" placeholder="Ваш логін" autocomplete="username">
      </div>
      <div class="form-group" style="margin-bottom:20px">
        <label class="form-label">Пароль</label>
        <input class="input" type="password" id="auth-password" placeholder="Ваш пароль" autocomplete="current-password">
      </div>
      <div id="auth-error" class="form-error" style="display:none;margin-bottom:12px"></div>
      <button class="btn btn-primary" style="width:100%" id="auth-submit" data-label="Увійти">Увійти</button>`;

    const submit = async () => {
      const username = content.querySelector('#auth-username').value.trim();
      const password = content.querySelector('#auth-password').value;
      const errEl = content.querySelector('#auth-error');
      const submitBtn = content.querySelector('#auth-submit');
      setLoading(submitBtn, true);
      const result = await login(username, password);
      if (result.error) {
        errEl.textContent = result.error; errEl.style.display = 'block';
        setLoading(submitBtn, false);
      } else {
        closeAuthModal();
        showToast(`Вітаємо! 👋`, 'success');
        setTimeout(() => window.location.reload(), 300);
      }
    };
    content.querySelector('#auth-submit').addEventListener('click', submit);
    content.querySelectorAll('input').forEach(inp => inp.addEventListener('keydown', e => { if (e.key === 'Enter') submit(); }));

  } else {
    content.innerHTML = `
      <div class="form-group" style="margin-bottom:14px">
        <label class="form-label">Логін <span style="color:var(--accent)">*</span></label>
        <input class="input" type="text" id="auth-username" placeholder="Лише літери, цифри, _ (мін. 3)" autocomplete="username">
      </div>
      <div class="form-group" style="margin-bottom:14px">
        <label class="form-label">Email (необов'язково)</label>
        <input class="input" type="email" id="auth-email" placeholder="your@email.com" autocomplete="email">
      </div>
      <div class="form-group" style="margin-bottom:20px">
        <label class="form-label">Пароль <span style="color:var(--accent)">*</span></label>
        <input class="input" type="password" id="auth-password" placeholder="Мінімум 6 символів" autocomplete="new-password">
      </div>
      <div id="auth-error" class="form-error" style="display:none;margin-bottom:12px"></div>
      <button class="btn btn-primary" style="width:100%" id="auth-submit" data-label="Створити акаунт">Створити акаунт</button>`;

    const submit = async () => {
      const username = content.querySelector('#auth-username').value.trim();
      const email = content.querySelector('#auth-email').value.trim();
      const password = content.querySelector('#auth-password').value;
      const errEl = content.querySelector('#auth-error');
      const submitBtn = content.querySelector('#auth-submit');
      setLoading(submitBtn, true);
      const result = await register(username, password, email);
      if (result.error) {
        errEl.textContent = result.error; errEl.style.display = 'block';
        setLoading(submitBtn, false);
      } else {
        // Fire news event (no-await so it doesn't block UI)
        News.add('joined', result.user.id, null, { username: result.user.username }).catch(() => {});
        closeAuthModal();
        showToast(`Ласкаво просимо, ${result.user.username}! 🎉`, 'success');
        setTimeout(() => window.location.reload(), 500);
      }
    };
    content.querySelector('#auth-submit').addEventListener('click', submit);
    content.querySelectorAll('input').forEach(inp => inp.addEventListener('keydown', e => { if (e.key === 'Enter') submit(); }));
  }

  setTimeout(() => content.querySelector('input')?.focus(), 50);
}
