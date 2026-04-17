// ============================================================
// pages/account.js — My Account page (async Firestore)
// ============================================================

import { t, getCurrentLang, setLang } from '../i18n.js';
import { Users, Reviews, Playlists, Session } from '../store.js';
import { compressAvatar, starsHtml, avatarHtml, timeAgo, formatDate, escapeHtml, showToast, showLoader, applyTheme } from '../utils.js';
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

  const [user, reviews, playlists] = await Promise.all([
    Users.byId(userId),
    Reviews.byUser(userId),
    Playlists.byUser(userId)
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
            <div class="profile-stat"><div class="stat-value">${reviews.filter(r => r.status === 'done').length}</div><div class="stat-label">Прочитано</div></div>
            <div class="profile-stat"><div class="stat-value">${reviews.filter(r => r.status === 'reading').length}</div><div class="stat-label">Читаю</div></div>
            <div class="profile-stat"><div class="stat-value">${reviews.filter(r => r.status === 'planned').length}</div><div class="stat-label">В планах</div></div>
            <div class="profile-stat"><div class="stat-value">${reviews.filter(r => r.status === 'dropped').length}</div><div class="stat-label">Кинуто</div></div>
          </div>
          ${isOwn ? `<div style="margin-top:16px;display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-secondary btn-sm" id="edit-account-btn">⚙️ Налаштування</button><button class="btn btn-secondary btn-sm" id="stats-btn">📊 Детальна інформація</button></div>` : ''}
          <div id="friend-btn-area"></div>
        </div>
      </div>

      <!-- Top 4 -->
      <div style="margin-bottom:32px">
        <div class="section-title">⭐ Топ 4 манхви</div>
        <div class="top4-grid">
          ${top4Reviews.map((r, i) => `
            <div class="top4-slot-wrap">
              <div class="top4-slot${isOwn ? '' : ' no-hover'}" data-slot="${i}">
                ${r?.coverBase64 
                  ? `<a href="#review/${r.id}" style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;text-decoration:none;color:inherit">
                       <img src="${r.coverBase64}" alt="${escapeHtml(r?.title || '')}">
                     </a>` 
                  : (isOwn ? '+' : '?')}
                ${r && isOwn ? `<button class="top4-slot-remove" data-remove-slot="${i}">✕</button>` : ''}
              </div>
              ${r ? `<a href="#review/${r.id}" class="top4-slot-title">${escapeHtml(r.title)}</a>` : ''}
            </div>`).join('')}
        </div>
      </div>

      <!-- Recent Reviews -->
      <div style="margin-bottom:32px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
          <div class="section-title" style="margin:0">📚 Останні рецензії</div>
        </div>
        ${reviews.length === 0
      ? `<div class="empty-state"><div class="empty-icon">📖</div><h3>Ще немає рецензій</h3>${isOwn ? `<p><button class="btn btn-primary btn-sm" id="add-first-review">✍️ Написати першу</button></p>` : ''}</div>`
      : `<div class="manhwa-grid recent-grid">
              ${reviews.slice(0, 10).map(r => `
                <div class="manhwa-thumb-wrap" style="display:flex;flex-direction:column;align-items:center;cursor:pointer" data-review-id="${r.id}" title="${escapeHtml(r.title)}">
                  <div class="manhwa-thumb">
                    ${r.coverBase64 ? `<img src="${r.coverBase64}" alt="${escapeHtml(r.title)}">` : `<div class="manhwa-thumb-placeholder">📖</div>`}
                  </div>
                  <div style="font-size:0.75rem;font-weight:600;margin-top:6px;text-align:center;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;width:100%">${escapeHtml(r.title)}</div>
                </div>`).join('')}
             </div>
             <button class="btn btn-secondary" id="library-btn" style="width:100%;margin-top:16px">Дивитися всі манхви</button>`}
      </div>

      <!-- Playlists -->
      <div style="margin-bottom:32px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
          <div class="section-title" style="margin:0">📂 Мої плейлісти</div>
          ${isOwn ? `<button class="btn btn-primary btn-sm" id="create-playlist-btn">➕ Створити</button>` : ''}
        </div>
        ${playlists.length === 0
      ? `<div class="empty-state"><div class="empty-icon">📁</div><h3>Ще немає плейлістів</h3></div>`
      : `<div class="manhwa-grid">
              ${playlists.map(p => `
                <div class="playlist-card" data-playlist-id="${p.id}" style="background:var(--bg-surface);padding:16px;border-radius:var(--radius-md);border:1px solid var(--border);cursor:pointer;text-align:center;display:flex;flex-direction:column;justify-content:center;min-height:120px;transition:0.2s">
                  <div style="font-size:2rem;margin-bottom:8px">📑</div>
                  <div style="font-weight:600;font-size:0.9rem;line-height:1.2;margin-bottom:4px">${escapeHtml(p.name)}</div>
                  <div style="font-size:0.75rem;color:var(--text-muted)">${p.reviewIds.length} манхв</div>
                </div>`).join('')}
             </div>`}
      </div>
    </div>
    <div id="edit-modal-placeholder"></div>
    <div id="top4-modal-placeholder"></div>
    <div id="playlist-modal-placeholder"></div>`;

  // Wire events
  container.querySelectorAll('[data-review-id]').forEach(el => {
    el.addEventListener('click', () => navigate(`review/${el.dataset.reviewId}`));
  });
  document.getElementById('library-btn')?.addEventListener('click', () => navigate(`all-reviews/${userId}`));
  document.getElementById('add-first-review')?.addEventListener('click', () => navigate('new-review'));

  container.querySelectorAll('[data-playlist-id]').forEach(el => {
    el.addEventListener('click', () => {
      const p = playlists.find(x => x.id === el.dataset.playlistId);
      if (p) showPlaylistViewModal(p, reviews, userId, isOwn);
    });
  });

  if (isOwn) {
    // Avatar upload with crop/center modal
    const avatarWrap = document.getElementById('avatar-wrap');
    const avatarFile = document.getElementById('avatar-file');
    avatarWrap?.addEventListener('click', () => avatarFile.click());
    avatarFile?.addEventListener('change', async () => {
      const file = avatarFile.files[0]; if (!file) return;
      showAvatarCropModal(file, async (croppedBase64) => {
        const freshUser = Session.currentUser();
        await Users.save({ ...freshUser, avatarBase64: croppedBase64 });
        showToast('Аватар оновлено ✅', 'success');
        await renderAccountPage(userId, isOwn);
      });
    });

    document.getElementById('edit-account-btn')?.addEventListener('click', () => showEditModal(user));
    document.getElementById('stats-btn')?.addEventListener('click', () => navigate('stats'));

    // Top4 slots
    container.querySelectorAll('[data-slot]').forEach(slot => {
      slot.addEventListener('click', e => {
        if (e.target.dataset.removeSlot !== undefined) return;
        const slotIdx = parseInt(slot.dataset.slot);
        if (top4[slotIdx]) return; // Disable click for replacement - must remove first
        showTop4Picker(userId, slotIdx, reviews, top4);
      });
    });
    container.querySelectorAll('[data-remove-slot]').forEach(btn => {
      btn.addEventListener('click', async e => {
        e.stopPropagation();
        const slotIdx = parseInt(btn.dataset.removeSlot);
        const freshUser = await Users.byId(userId);
        const t4 = [...(freshUser.top4 || [null, null, null, null])];
        t4[slotIdx] = null;
        await Users.save({ ...freshUser, top4: t4 });
        await renderAccountPage(userId, isOwn);
      });
    });

    document.getElementById('create-playlist-btn')?.addEventListener('click', () => showPlaylistCreateModal(userId, reviews));
  }
}

function showPlaylistCreateModal(userId, reviews) {
  const holder = document.getElementById('playlist-modal-placeholder');
  holder.innerHTML = `
    <div class="modal-backdrop" id="playlist-create-modal">
      <div class="modal-box modal-box-lg">
        <div class="modal-header">
          <span class="modal-title">📑 Новий плейліст</span>
          <button class="modal-close" id="pc-close">✕</button>
        </div>
        <div class="modal-body">
          <div class="modal-body-scroll">
            <div class="form-group" style="margin-bottom:16px">
              <label class="form-label">Назва плейлісту <span style="color:var(--accent)">*</span></label>
              <input class="input" type="text" id="pc-name" placeholder="Мої улюблені...">
            </div>
            <div class="form-group" style="margin-bottom:16px">
              <label class="form-label">Виберіть манхви</label>
              <div style="display:flex;flex-direction:column;gap:8px;max-height:300px;overflow-y:auto;padding:8px" class="modal-body-scroll">
                ${reviews.length === 0 ? '<div style="color:var(--text-muted)">Немає рецензій для вибору</div>' :
      reviews.map(r => `
                    <label style="display:flex;align-items:center;gap:12px;cursor:pointer;padding:8px;background:var(--bg-surface);border-radius:var(--radius-sm)">
                      <input type="checkbox" value="${r.id}" class="pc-review-cb" style="width:18px;height:18px;cursor:pointer">
                      ${r.coverBase64 ? `<img src="${r.coverBase64}" style="width:36px;height:48px;object-fit:cover;border-radius:4px">` : `<div style="width:36px;height:48px;background:var(--bg-hover);border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:12px">📖</div>`}
                      <div style="flex:1;font-weight:500;font-size:0.9rem">${escapeHtml(r.title)}</div>
                    </label>
                  `).join('')}
              </div>
            </div>
            <div id="pc-error" class="form-error" style="display:none;margin-bottom:12px"></div>
            <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:20px">
              <button class="btn btn-secondary" id="pc-close2">Скасувати</button>
              <button class="btn btn-primary" id="pc-save-btn">Створити</button>
            </div>
          </div>
        </div>
      </div>
    </div>`;

  const close = () => { holder.innerHTML = ''; };
  document.getElementById('pc-close').addEventListener('click', close);
  document.getElementById('pc-close2').addEventListener('click', close);

  const saveBtn = document.getElementById('pc-save-btn');
  saveBtn.addEventListener('click', async () => {
    const name = document.getElementById('pc-name').value.trim();
    if (!name) {
      const err = document.getElementById('pc-error');
      err.textContent = "Назва обов'язкова"; err.style.display = 'block'; return;
    }
    const checked = Array.from(document.querySelectorAll('.pc-review-cb:checked')).map(cb => cb.value);
    saveBtn.disabled = true; saveBtn.textContent = '...';
    await Playlists.create(userId, name, checked);
    showToast('Плейліст створено!', 'success');
    close();
    await renderAccountPage(userId, true);
  });
}

function showPlaylistViewModal(playlist, reviews, userId, isOwn) {
  const holder = document.getElementById('playlist-modal-placeholder');
  const items = playlist.reviewIds.map(rid => reviews.find(r => r.id === rid)).filter(Boolean);

  holder.innerHTML = `
    <div class="modal-backdrop" id="playlist-view-modal">
      <div class="modal-box modal-box-lg">
        <div class="modal-header">
          <span class="modal-title">📑 ${escapeHtml(playlist.name)}</span>
          <button class="modal-close" id="pv-close">✕</button>
        </div>
        <div class="modal-body">
          <div class="modal-body-scroll" style="max-height:450px;overflow-y:auto;padding-right:8px">
            ${items.length === 0 ? '<div class="empty-state"><h3>Плейліст порожній</h3></div>' :
      items.map(r => `
                <div class="review-card" style="margin-bottom:10px;cursor:pointer" data-pv-review="${r.id}">
                  <div class="review-cover" style="width:60px">
                    ${r.coverBase64 ? `<img src="${r.coverBase64}" alt="">` : '<div class="review-cover-placeholder">📖</div>'}
                  </div>
                  <div class="review-body">
                    <div class="review-title">${escapeHtml(r.title)}</div>
                    <div style="font-size:0.8rem;color:var(--text-muted);margin-top:4px">📚 ${r.chapters || 0} глав | Оцінка: ${r.status === 'planned' ? '-' : (r.status === 'dropped' ? 'Кинуто' : r.rating)}</div>
                  </div>
                </div>
              `).join('')}
          </div>
          ${isOwn ? `
            <div style="margin-top:20px;border-top:1px solid var(--border);padding-top:16px">
              <button class="btn btn-danger btn-sm" id="pv-del-btn">🗑 Видалити плейліст</button>
            </div>
          ` : ''}
        </div>
      </div>
    </div>`;

  const close = () => { holder.innerHTML = ''; };
  document.getElementById('pv-close').addEventListener('click', close);

  holder.querySelectorAll('[data-pv-review]').forEach(el => {
    el.addEventListener('click', () => { close(); navigate(`review/${el.dataset.pvReview}`); });
  });

  if (isOwn) {
    document.getElementById('pv-del-btn').addEventListener('click', async () => {
      if (!window.confirm("Дійсно видалити цей плейліст?")) return;
      document.getElementById('pv-del-btn').disabled = true;
      await Playlists.delete(playlist.id);
      showToast('Плейліст видалено', 'info');
      close();
      await renderAccountPage(userId, isOwn);
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
            <label class="form-label">${t('lang_setting')}</label>
            <select class="select" id="edit-lang">
              <option value="uk" ${getCurrentLang() === 'uk' ? 'selected' : ''}>${t('lang_uk')}</option>
              <option value="en" ${getCurrentLang() === 'en' ? 'selected' : ''}>${t('lang_en')}</option>
              <option value="ru" ${getCurrentLang() === 'ru' ? 'selected' : ''}>${t('lang_ru')}</option>
            </select>
          </div>
          <div class="form-group" style="margin-bottom:14px">
            <label class="form-label">Тема сайту</label>
            <select class="select" id="edit-theme">
              <option value="system" ${localStorage.getItem('theme') === 'system' || !localStorage.getItem('theme') ? 'selected' : ''}>🖥️ Системна тема</option>
              <option value="dark" ${localStorage.getItem('theme') === 'dark' ? 'selected' : ''}>🌙 Темна тема</option>
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
            <textarea class="textarea" id="edit-bio" style="min-height:160px">${escapeHtml(user.bio || '')}</textarea>
          </div>
          <div class="form-group" style="margin-bottom:14px">
            <label class="form-label">Email</label>
            <input class="input" type="email" id="edit-email" value="${escapeHtml(user.email || '')}">
            <p style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;line-height:1.4">Цей Email використовується для надсилання сповіщень, якщо під вашу рецензію будуть залишені коментарі.</p>
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
            <button class="btn btn-secondary" id="save-edit-btn" style="flex:1;transition:0.2s" disabled>💾 Зберегти</button>
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

  const saveBtn = document.getElementById('save-edit-btn');
  const enableSave = () => {
    saveBtn.disabled = false;
    saveBtn.classList.remove('btn-secondary');
    saveBtn.classList.add('btn-active-green');
  };

  holder.querySelectorAll('#edit-old-password, #edit-new-password, #edit-bio').forEach(el => el.addEventListener('input', enableSave));
  holder.querySelectorAll('#edit-theme, #edit-push, #edit-lang').forEach(el => el.addEventListener('change', enableSave));

  saveBtn.addEventListener('click', async () => {
    const bio = document.getElementById('edit-bio').value.trim();
    const email = document.getElementById('edit-email').value.trim();
    const oldPw = document.getElementById('edit-old-password').value;
    const newPw = document.getElementById('edit-new-password').value;
    const theme = document.getElementById('edit-theme').value;
    const lang = document.getElementById('edit-lang').value;
    const pushEnabled = document.getElementById('edit-push').checked;
    const errEl = document.getElementById('edit-error');
    const saveBtn = document.getElementById('save-edit-btn');
    saveBtn.disabled = true; saveBtn.textContent = 'Збереження...';

    // Apply theme & push settings
    applyTheme(theme);
    localStorage.setItem('push_enabled', pushEnabled);
    if (lang !== getCurrentLang()) {
      setLang(lang); // This will reload the page automatically
    }

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

function showTop4Picker(userId, slotIdx, reviews, currentTop4Ids = []) {
  const holder = document.getElementById('top4-modal-placeholder');
  
  // Filter out reviews already in Top 4 to prevent duplicates
  const filteredReviews = reviews.filter(r => !currentTop4Ids.includes(r.id));

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
            ${filteredReviews.length === 0 ? `<div class='empty-state'><h3>Немає доступних рецензій</h3></div>` :
      filteredReviews.map(r => `
                <div class="manhwa-thumb-wrap" data-pick-review="${r.id}" title="${escapeHtml(r.title)}" style="cursor:pointer">
                  <div class="manhwa-thumb">
                    ${r.coverBase64 ? `<img src="${r.coverBase64}" alt="">` : `<div class="manhwa-thumb-placeholder" style="font-size:11px;padding:4px;text-align:center;word-break:break-word">${escapeHtml(r.title)}</div>`}
                  </div>
                  <div style="font-size:0.75rem;font-weight:600;margin-top:6px;text-align:center;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;width:100%">${escapeHtml(r.title)}</div>
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
      const t4 = [...(freshUser.top4 || [null, null, null, null])];
      t4[slotIdx] = el.dataset.pickReview;
      await Users.save({ ...freshUser, top4: t4 });
      close();
      await renderAccountPage(userId, true);
    });
  });
}

// ============================================================
// Avatar Crop / Center Modal
// ============================================================
function showAvatarCropModal(file, onSave) {
  const holder = document.getElementById('edit-modal-placeholder') || document.getElementById('top4-modal-placeholder');
  const reader = new FileReader();
  reader.onload = () => {
    const imgSrc = reader.result;

    holder.innerHTML = `
      <div class="modal-backdrop" id="avatar-crop-modal">
        <div class="modal-box" style="max-width:420px">
          <div class="modal-header">
            <span class="modal-title">✂️ Центрувати аватар</span>
            <button class="modal-close" id="crop-close">✕</button>
          </div>
          <div class="modal-body" style="display:flex;flex-direction:column;align-items:center;gap:16px">
            <div id="crop-area" style="width:220px;height:220px;border-radius:50%;overflow:hidden;position:relative;border:3px solid var(--accent);background:var(--bg-surface);cursor:grab;touch-action:none">
              <img id="crop-img" src="${imgSrc}" style="position:absolute;top:0;left:0;transform-origin:0 0;pointer-events:none;max-width:none">
            </div>
            <div style="width:100%;display:flex;align-items:center;gap:10px">
              <span style="font-size:0.8rem;color:var(--text-muted)">🔍</span>
              <input type="range" id="crop-zoom" min="100" max="400" value="100" style="flex:1;accent-color:var(--accent)">
              <span id="crop-zoom-label" style="font-size:0.75rem;color:var(--text-muted);min-width:40px;text-align:right">100%</span>
            </div>
            <div style="display:flex;gap:8px;width:100%">
              <button class="btn btn-primary" id="crop-save" style="flex:1">✅ Зберегти</button>
              <button class="btn btn-secondary" id="crop-cancel">Скасувати</button>
            </div>
          </div>
        </div>
      </div>`;

    const close = () => { holder.innerHTML = ''; };
    document.getElementById('crop-close').addEventListener('click', close);
    document.getElementById('crop-cancel').addEventListener('click', close);
    document.getElementById('avatar-crop-modal').addEventListener('click', e => { if (e.target.id === 'avatar-crop-modal') close(); });

    const cropArea = document.getElementById('crop-area');
    const cropImg = document.getElementById('crop-img');
    const zoomSlider = document.getElementById('crop-zoom');
    const zoomLabel = document.getElementById('crop-zoom-label');

    let scale = 1;
    let offsetX = 0, offsetY = 0;
    let dragging = false;
    let startX = 0, startY = 0;

    const img = new Image();
    img.onload = () => {
      // Fit image to cover circle initially
      const areaSize = 220;
      const minDim = Math.min(img.width, img.height);
      scale = areaSize / minDim;
      zoomSlider.min = Math.round(scale * 100);
      zoomSlider.max = Math.round(scale * 400);
      zoomSlider.value = Math.round(scale * 100);

      offsetX = -(img.width * scale - areaSize) / 2;
      offsetY = -(img.height * scale - areaSize) / 2;
      updateTransform();
    };
    img.src = imgSrc;

    function updateTransform() {
      cropImg.style.width = `${img.width * scale}px`;
      cropImg.style.height = `${img.height * scale}px`;
      cropImg.style.left = `${offsetX}px`;
      cropImg.style.top = `${offsetY}px`;
      zoomLabel.textContent = Math.round(scale * 100 / (220 / Math.min(img.width, img.height))) + '%';
    }

    function clampOffsets() {
      const areaSize = 220;
      const w = img.width * scale;
      const h = img.height * scale;
      offsetX = Math.min(0, Math.max(areaSize - w, offsetX));
      offsetY = Math.min(0, Math.max(areaSize - h, offsetY));
    }

    zoomSlider.addEventListener('input', () => {
      const oldCenter = { x: (110 - offsetX) / scale, y: (110 - offsetY) / scale };
      scale = parseInt(zoomSlider.value) / 100;
      offsetX = 110 - oldCenter.x * scale;
      offsetY = 110 - oldCenter.y * scale;
      clampOffsets();
      updateTransform();
    });

    cropArea.addEventListener('pointerdown', e => {
      dragging = true;
      startX = e.clientX - offsetX;
      startY = e.clientY - offsetY;
      cropArea.style.cursor = 'grabbing';
      cropArea.setPointerCapture(e.pointerId);
    });
    cropArea.addEventListener('pointermove', e => {
      if (!dragging) return;
      offsetX = e.clientX - startX;
      offsetY = e.clientY - startY;
      clampOffsets();
      updateTransform();
    });
    cropArea.addEventListener('pointerup', () => {
      dragging = false;
      cropArea.style.cursor = 'grab';
    });

    document.getElementById('crop-save').addEventListener('click', () => {
      const canvas = document.createElement('canvas');
      const size = 200;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');

      // Draw circular clip
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();

      const drawScale = size / 220;
      ctx.drawImage(
        img,
        offsetX * drawScale,
        offsetY * drawScale,
        img.width * scale * drawScale,
        img.height * scale * drawScale
      );

      const base64 = canvas.toDataURL('image/webp', 0.8);
      close();
      onSave(base64);
    });
  };
  reader.readAsDataURL(file);
}
