// ============================================================
// pages/account.js — My Account page (async Firestore)
// ============================================================

import { Users, Reviews, Session } from '../store.js';
import { compressAvatar, starsHtml, avatarHtml, timeAgo, formatDate, escapeHtml, showToast, showLoader } from '../utils.js';
import { navigate } from '../router.js';
import { changePassword, deleteCurrentUser } from '../auth.js';
import { doc, deleteDoc, collection, getDocs, query, where, writeBatch } from 'firebase/firestore';
import { db } from '../firebase.js';

export async function renderAccount() {
  const user = Session.currentUser();
  if (!user) { navigate('home'); return; }
  await renderAccountPage(user.id, true);
}

export async function renderAccountPage(userId, isOwn = false) {
  const container = document.getElementById('page-root');
  showLoader(container);

  const [user, reviews] = await Promise.all([
    Users.byId(userId),
    Reviews.byUser(userId),
  ]);

  if (!user) {
    container.innerHTML = `<div class="page-container"><div class="empty-state"><div class="empty-icon">😕</div><h3>Користувача не знайдено</h3></div></div>`;
    return;
  }

  const top4 = user.top4 || [null, null, null, null];
  const top4Reviews = await Promise.all(top4.map(id => id ? Reviews.byId(id) : Promise.resolve(null)));

  container.innerHTML = `
    <div class="page-container">
      <!-- Profile Header -->
      <div class="profile-header">
        <div id="avatar-wrap" style="cursor:${isOwn ? 'pointer' : 'default'};position:relative">
          ${avatarHtml(user, 'xl')}
          ${isOwn ? `<div style="position:absolute;bottom:4px;right:4px;background:var(--accent);border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-size:14px">📷</div>` : ''}
        </div>
        ${isOwn ? `<input type="file" id="avatar-file" accept="image/*" style="display:none">` : ''}
        <div class="profile-info">
          <div class="profile-name">${escapeHtml(user.username)}</div>
          ${user.bio ? `<div class="profile-bio">${escapeHtml(user.bio)}</div>` : (isOwn ? `<div class="profile-bio" style="color:var(--text-muted);font-style:italic">Додайте опис в налаштуваннях</div>` : '')}
          <div class="profile-stats">
            <div class="profile-stat"><div class="stat-value">${reviews.length}</div><div class="stat-label">Рецензій</div></div>
            <div class="profile-stat"><div class="stat-value">${reviews.filter(r => r.status === 'done').length}</div><div class="stat-label">Завершено</div></div>
            <div class="profile-stat"><div class="stat-value">${reviews.filter(r => r.status === 'reading').length}</div><div class="stat-label">Читаю</div></div>
            <div class="profile-stat"><div class="stat-value">${reviews.filter(r => r.status === 'planned').length}</div><div class="stat-label">В планах</div></div>
            <div class="profile-stat"><div class="stat-value">${reviews.filter(r => r.status === 'dropped').length}</div><div class="stat-label">Кинуто</div></div>
          </div>
          ${isOwn ? `<div style="margin-top:16px"><button class="btn btn-secondary btn-sm" id="edit-account-btn">⚙️ Налаштування</button></div>` : ''}
          <div id="friend-btn-area"></div>
        </div>
      </div>

      <!-- Top 4 -->
      <div style="margin-bottom:32px">
        <div class="section-title">⭐ Топ 4 манхви</div>
        <div class="top4-grid">
          ${top4Reviews.map((r, i) => `
            <div class="top4-slot${isOwn ? '' : ' no-hover'}" data-slot="${i}">
              ${r?.coverBase64 ? `<img src="${r.coverBase64}" alt="${escapeHtml(r?.title || '')}">` : (isOwn ? '+' : '?')}
              ${r && isOwn ? `<button class="top4-slot-remove" data-remove-slot="${i}">✕</button>` : ''}
            </div>`).join('')}
        </div>
        ${isOwn ? `<p style="color:var(--text-muted);font-size:0.78rem;margin-top:8px">Натисніть на слот, щоб обрати манхву</p>` : ''}
      </div>

      <!-- Recent Reviews -->
      <div style="margin-bottom:32px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
          <div class="section-title" style="margin:0">📚 Останні рецензії</div>
          ${reviews.length > 6 ? `<span class="see-all-link" id="see-all-btn">Дивитися всі →</span>` : ''}
        </div>
        ${reviews.length === 0
          ? `<div class="empty-state"><div class="empty-icon">📖</div><h3>Ще немає рецензій</h3>${isOwn ? `<p><button class="btn btn-primary btn-sm" id="add-first-review">✍️ Написати першу</button></p>` : ''}</div>`
          : `<div class="manhwa-grid">
              ${reviews.slice(0, 6).map(r => `
                <div class="manhwa-thumb" data-review-id="${r.id}" title="${escapeHtml(r.title)}">
                  ${r.coverBase64 ? `<img src="${r.coverBase64}" alt="${escapeHtml(r.title)}">` : `<div class="manhwa-thumb-placeholder">📖</div>`}
                </div>`).join('')}
            </div>`}
      </div>

      <!-- All reviews list -->
      ${reviews.length > 0 ? `
        <div>
          <div class="section-title">🗒️ Всі рецензії</div>
          <div>${reviews.slice(0, 5).map(r => renderReviewCard(r)).join('')}</div>
          ${reviews.length > 5 ? `<div style="text-align:center;margin-top:16px"><span class="see-all-link" id="see-all-btn2">Показати всі ${reviews.length} →</span></div>` : ''}
        </div>` : ''}
    </div>
    <div id="edit-modal-placeholder"></div>
    <div id="top4-modal-placeholder"></div>`;

  // Wire events
  container.querySelectorAll('[data-review-id]').forEach(el => {
    el.addEventListener('click', () => navigate(`review/${el.dataset.reviewId}`));
  });
  document.getElementById('see-all-btn')?.addEventListener('click', () => navigate(`all-reviews/${userId}`));
  document.getElementById('see-all-btn2')?.addEventListener('click', () => navigate(`all-reviews/${userId}`));
  document.getElementById('add-first-review')?.addEventListener('click', () => navigate('new-review'));

  if (isOwn) {
    // Avatar upload
    const avatarWrap = document.getElementById('avatar-wrap');
    const avatarFile = document.getElementById('avatar-file');
    avatarWrap?.addEventListener('click', () => avatarFile.click());
    avatarFile?.addEventListener('change', async () => {
      const file = avatarFile.files[0]; if (!file) return;
      const base64 = await compressAvatar(file);
      const freshUser = Session.currentUser();
      await Users.save({ ...freshUser, avatarBase64: base64 });
      showToast('Аватар оновлено ✅', 'success');
      await renderAccountPage(userId, isOwn);
    });

    document.getElementById('edit-account-btn')?.addEventListener('click', () => showEditModal(user));

    // Top4 slots
    container.querySelectorAll('[data-slot]').forEach(slot => {
      slot.addEventListener('click', e => {
        if (e.target.dataset.removeSlot !== undefined) return;
        showTop4Picker(userId, parseInt(slot.dataset.slot), reviews);
      });
    });
    container.querySelectorAll('[data-remove-slot]').forEach(btn => {
      btn.addEventListener('click', async e => {
        e.stopPropagation();
        const slotIdx = parseInt(btn.dataset.removeSlot);
        const freshUser = await Users.byId(userId);
        const t4 = [...(freshUser.top4 || [null,null,null,null])];
        t4[slotIdx] = null;
        await Users.save({ ...freshUser, top4: t4 });
        await renderAccountPage(userId, isOwn);
      });
    });
  }
}

function renderReviewCard(r) {
  const isDropped = r.status === 'dropped' || r.status === 'planned';
  const tagsHtml = r.tags?.length ? r.tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('') : '';
  return `<div class="review-card" style="margin-bottom:10px;cursor:pointer" data-review-id="${r.id}">
    <div class="review-cover">
      ${r.coverBase64 ? `<img src="${r.coverBase64}" alt="">` : '<div class="review-cover-placeholder">📖</div>'}
    </div>
    <div class="review-body">
      <div class="review-date">${r.date ? formatDate(r.date) : timeAgo(r.createdAt)}</div>
      <div class="review-title">${escapeHtml(r.title)}</div>
      <div style="margin:4px 0">${r.status === 'planned' ? '<span style="color:var(--text-muted);font-size:0.8rem">Ще не оцінено</span>' : starsHtml(r.rating, isDropped)}</div>
      ${tagsHtml ? `<div class="review-tags" style="margin:4px 0">${tagsHtml}</div>` : ''}
      ${r.text ? `<div class="review-text-preview">${escapeHtml(r.text)}</div>` : ''}
    </div>
  </div>`;
}

function showEditModal(user) {
  const holder = document.getElementById('edit-modal-placeholder');
  holder.innerHTML = `
    <div class="modal-backdrop" id="edit-modal">
      <div class="modal-box">
        <div class="modal-header">
          <span class="modal-title">⚙️ Налаштування акаунту</span>
          <button class="modal-close" id="edit-modal-close">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group" style="margin-bottom:14px">
            <label class="form-label">Тема сайту</label>
            <select class="select" id="edit-theme">
              <option value="dark" ${localStorage.getItem('theme') !== 'light' ? 'selected' : ''}>🌙 Темна тема</option>
              <option value="light" ${localStorage.getItem('theme') === 'light' ? 'selected' : ''}>☀️ Світла тема</option>
            </select>
          </div>
          <div class="form-group" style="margin-bottom:14px; display:flex; flex-direction:row; align-items:center; justify-content:space-between;">
            <label class="form-label" for="edit-push" style="margin:0;cursor:pointer">Отримувати Push-повідомлення</label>
            <label class="ios-switch">
              <input type="checkbox" id="edit-push" ${localStorage.getItem('push_enabled') === 'true' ? 'checked' : ''}>
              <span class="ios-slider"></span>
            </label>
          </div>
          <div class="form-group" style="margin-bottom:14px">
            <label class="form-label">Опис</label>
            <textarea class="textarea" id="edit-bio" style="min-height:80px">${escapeHtml(user.bio || '')}</textarea>
          </div>
          <div class="form-group" style="margin-bottom:14px">
            <label class="form-label">Email</label>
            <input class="input" type="email" id="edit-email" value="${escapeHtml(user.email || '')}">
          </div>
          <div class="divider"></div>
          <div class="section-title" style="font-size:0.95rem;margin-bottom:12px">🔑 Змінити пароль</div>
          <div class="form-group" style="margin-bottom:10px">
            <label class="form-label">Старий пароль</label>
            <input class="input" type="password" id="edit-old-password">
          </div>
          <div class="form-group" style="margin-bottom:14px">
            <label class="form-label">Новий пароль</label>
            <input class="input" type="password" id="edit-new-password" placeholder="Мінімум 6 символів">
          </div>
          <div id="edit-error" class="form-error" style="display:none;margin-bottom:10px"></div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px">
            <button class="btn btn-primary" id="save-edit-btn" style="flex:1">💾 Зберегти</button>
            <button class="btn btn-secondary" id="edit-modal-close2">Скасувати</button>
          </div>
          <div class="divider"></div>
          <button class="btn btn-danger" style="width:100%" id="delete-account-btn">🗑️ Видалити акаунт</button>
        </div>
      </div>
    </div>`;

  const close = () => holder.innerHTML = '';
  document.getElementById('edit-modal-close').addEventListener('click', close);
  document.getElementById('edit-modal-close2').addEventListener('click', close);
  document.getElementById('edit-modal').addEventListener('click', e => { if (e.target.id === 'edit-modal') close(); });

  document.getElementById('save-edit-btn').addEventListener('click', async () => {
    const bio = document.getElementById('edit-bio').value.trim();
    const email = document.getElementById('edit-email').value.trim();
    const oldPw = document.getElementById('edit-old-password').value;
    const newPw = document.getElementById('edit-new-password').value;
    const theme = document.getElementById('edit-theme').value;
    const pushEnabled = document.getElementById('edit-push').checked;
    const errEl = document.getElementById('edit-error');
    const saveBtn = document.getElementById('save-edit-btn');
    saveBtn.disabled = true; saveBtn.textContent = 'Збереження...';

    // Apply theme & push settings
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('push_enabled', pushEnabled);

    if (oldPw || newPw) {
      const result = await changePassword(user.id, oldPw, newPw);
      if (result.error) {
        errEl.textContent = result.error; errEl.style.display = 'block';
        saveBtn.disabled = false; saveBtn.textContent = '💾 Зберегти';
        return;
      }
    }
    await Users.save({ ...await Users.byId(user.id), bio, email });
    close();
    showToast('Акаунт оновлено ✅', 'success');
    await renderAccountPage(user.id, true);
  });

  document.getElementById('delete-account-btn').addEventListener('click', () => {
    showDeleteConfirmModal(user);
  });
}

function showDeleteConfirmModal(user) {
  const holder = document.getElementById('edit-modal-placeholder');
  holder.innerHTML = `
    <div class="modal-backdrop" id="delete-modal">
      <div class="modal-box">
        <div class="modal-header">
          <span class="modal-title" style="color:var(--accent)">⚠️ Видалення акаунту</span>
          <button class="modal-close" id="del-modal-close">✕</button>
        </div>
        <div class="modal-body">
          <p style="color:var(--text-secondary);margin-bottom:16px;line-height:1.6">
            Ця дія <strong style="color:var(--accent)">незворотна</strong>. Всі ваші рецензії та дані будуть видалені назавжди.
          </p>
          <div class="form-group" style="margin-bottom:16px">
            <label class="form-label">Введіть ваш пароль для підтвердження</label>
            <input class="input" type="password" id="delete-confirm-password" placeholder="Ваш пароль">
          </div>
          <div id="del-error" class="form-error" style="display:none;margin-bottom:12px"></div>
          <div style="display:flex;gap:8px">
            <button class="btn btn-danger" id="confirm-delete-btn" style="flex:1">🗑️ Так, видалити акаунт</button>
            <button class="btn btn-secondary" id="del-modal-close2">Скасувати</button>
          </div>
        </div>
      </div>
    </div>`;

  const close = () => holder.innerHTML = '';
  document.getElementById('del-modal-close').addEventListener('click', close);
  document.getElementById('del-modal-close2').addEventListener('click', close);

  document.getElementById('confirm-delete-btn').addEventListener('click', async () => {
    const password = document.getElementById('delete-confirm-password').value;
    const errEl = document.getElementById('del-error');
    const btn = document.getElementById('confirm-delete-btn');
    btn.disabled = true; btn.textContent = 'Видалення...';

    // Delete Firestore data first
    try {
      const userReviews = await Reviews.byUser(user.id);
      for (const r of userReviews) await Reviews.delete(r.id);
      await Users.delete(user.id);
      // Delete username mapping
      await deleteDoc(doc(db, 'usernames', user.username.toLowerCase()));
      // Delete Firebase Auth user
      const result = await deleteCurrentUser(password);
      if (result.error) {
        errEl.textContent = result.error; errEl.style.display = 'block';
        btn.disabled = false; btn.textContent = '🗑️ Так, видалити акаунт';
        return;
      }
      showToast('Акаунт видалено. До побачення!', 'info');
      setTimeout(() => { window.location.hash = 'home'; window.location.reload(); }, 800);
    } catch (e) {
      errEl.textContent = e.message; errEl.style.display = 'block';
      btn.disabled = false; btn.textContent = '🗑️ Так, видалити акаунт';
    }
  });
}

function showTop4Picker(userId, slotIdx, reviews) {
  const holder = document.getElementById('top4-modal-placeholder');
  holder.innerHTML = `
    <div class="modal-backdrop" id="top4-modal">
      <div class="modal-box modal-box-lg">
        <div class="modal-header">
          <span class="modal-title">🎬 Обрати манхву для топ 4</span>
          <button class="modal-close" id="top4-modal-close">✕</button>
        </div>
        <div class="modal-body">
          <input class="input" id="top4-search" placeholder="🔍  Пошук..." style="margin-bottom:16px">
          <div class="manhwa-grid">
            ${reviews.length === 0 ? `<div class='empty-state'><h3>Немає рецензій</h3></div>` :
              reviews.map(r => `
                <div class="manhwa-thumb" data-pick-review="${r.id}" title="${escapeHtml(r.title)}">
                  ${r.coverBase64 ? `<img src="${r.coverBase64}" alt="">` : `<div class="manhwa-thumb-placeholder" style="font-size:11px;padding:4px;text-align:center;word-break:break-word">${escapeHtml(r.title)}</div>`}
                </div>`).join('')}
          </div>
        </div>
      </div>
    </div>`;

  const close = () => holder.innerHTML = '';
  document.getElementById('top4-modal-close').addEventListener('click', close);
  document.getElementById('top4-modal').addEventListener('click', e => { if (e.target.id === 'top4-modal') close(); });

  document.getElementById('top4-search').addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    holder.querySelectorAll('[data-pick-review]').forEach(el => {
      el.style.display = !q || el.title.toLowerCase().includes(q) ? '' : 'none';
    });
  });

  holder.querySelectorAll('[data-pick-review]').forEach(el => {
    el.addEventListener('click', async () => {
      const freshUser = await Users.byId(userId);
      const t4 = [...(freshUser.top4 || [null,null,null,null])];
      t4[slotIdx] = el.dataset.pickReview;
      await Users.save({ ...freshUser, top4: t4 });
      close();
      await renderAccountPage(userId, true);
    });
  });
}
