// ============================================================
// pages/allReviews.js — All reviews for a user (async Firestore)
// ============================================================

import { Reviews, Users, Session } from '../store.js';
import { starsHtml, avatarHtml, timeAgo, formatDate, escapeHtml, showLoader } from '../utils.js';
import { navigate } from '../router.js';

export async function renderAllReviews({ userId }) {
  const container = document.getElementById('page-root');
  showLoader(container);

  const [user, reviews] = await Promise.all([
    Users.byId(userId),
    Reviews.byUser(userId),
  ]);

  if (!user) {
    container.innerHTML = `<div class="page-container"><div class="empty-state"><h3>Користувача не знайдено</h3></div></div>`;
    return;
  }

  container.innerHTML = `
    <div class="page-container">
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:24px;flex-wrap:wrap">
        <button class="btn btn-ghost btn-sm" id="back-btn">← Назад</button>
        ${avatarHtml(user, 'sm')}
        <div>
          <div style="font-family:var(--font-display);font-weight:700;font-size:1.1rem">${escapeHtml(user.username)}</div>
          <div style="color:var(--text-muted);font-size:0.8rem">Всі рецензії — ${reviews.length} шт.</div>
        </div>
      </div>

      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px">
        <button class="btn btn-secondary btn-sm filter-btn active" data-filter="all">Всі</button>
        <button class="btn btn-secondary btn-sm filter-btn" data-filter="done">✅ Завершені</button>
        <button class="btn btn-secondary btn-sm filter-btn" data-filter="reading">📖 Читаю</button>
        <button class="btn btn-secondary btn-sm filter-btn" data-filter="dropped">❌ Кинуті</button>
        <input class="input" id="all-reviews-search" placeholder="🔍 Пошук..." style="max-width:220px;margin-left:auto">
      </div>

      <div id="all-reviews-grid" style="display:flex;flex-direction:column;gap:10px">
        ${renderGrid(reviews)}
      </div>
    </div>`;

  document.getElementById('back-btn').addEventListener('click', () => history.back());

  const wireClicks = () => {
    container.querySelectorAll('[data-review-id]').forEach(el => {
      el.addEventListener('click', () => navigate(`review/${el.dataset.reviewId}`));
    });
  };
  wireClicks();

  let currentFilter = 'all', currentSearch = '';
  const grid = document.getElementById('all-reviews-grid');

  const applyFilter = () => {
    let filtered = reviews;
    if (currentFilter !== 'all') filtered = filtered.filter(r => r.status === currentFilter);
    if (currentSearch) filtered = filtered.filter(r => r.title.toLowerCase().includes(currentSearch));
    grid.innerHTML = renderGrid(filtered);
    wireClicks();
  };

  container.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      applyFilter();
    });
  });

  document.getElementById('all-reviews-search').addEventListener('input', e => {
    currentSearch = e.target.value.toLowerCase();
    applyFilter();
  });
}

function renderGrid(reviews) {
  if (reviews.length === 0) return `<div class="empty-state"><div class="empty-icon">📭</div><h3>Нічого не знайдено</h3></div>`;
  const statusLabels = { done: '✅ Завершено', reading: '📖 Читаю', dropped: '❌ Кинув' };
  const statusClass = { done: 'status-done', reading: 'status-reading', dropped: 'status-dropped' };
  return reviews.map(r => {
    const isDropped = r.status === 'dropped';
    return `<div class="review-card" style="cursor:pointer" data-review-id="${r.id}">
      <div class="review-cover" style="width:80px">
        ${r.coverBase64 ? `<img src="${r.coverBase64}" alt="${escapeHtml(r.title)}">` : '<div class="review-cover-placeholder">📖</div>'}
      </div>
      <div class="review-body">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px">
          <div class="review-date">${r.date ? formatDate(r.date) : timeAgo(r.createdAt)}</div>
          <span class="status-badge ${statusClass[r.status]}" style="font-size:0.7rem">${statusLabels[r.status]}</span>
        </div>
        <div class="review-title">${escapeHtml(r.title)}</div>
        <div style="margin:6px 0">${starsHtml(r.rating, isDropped)}</div>
        ${r.tags?.length ? `<div class="review-tags">${r.tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}</div>` : ''}
        ${r.text ? `<div class="review-text-preview" style="margin-top:6px">${escapeHtml(r.text)} <span style="color:var(--accent)">...</span></div>` : ''}
      </div>
    </div>`;
  }).join('');
}
