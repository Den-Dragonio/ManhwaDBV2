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
          <div style="font-family:var(--font-display);font-weight:700;font-size:1.1rem">Бібліотека: ${escapeHtml(user.username)}</div>
          <div style="color:var(--text-muted);font-size:0.8rem">Всього збережено — ${reviews.length} манхв</div>
        </div>
      </div>

      <!-- Sorting Bar -->
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px;align-items:center" id="sort-controls">
        <div style="font-size:0.9rem;color:var(--text-muted);margin-right:8px">Сортувати:</div>
        <button class="btn btn-secondary btn-sm sort-btn active" data-sort="rating" data-dir="desc">⭐ Оцінка ⬇️</button>
        <button class="btn btn-secondary btn-sm sort-btn" data-sort="date" data-dir="desc">📅 Дата ⬇️</button>
        <button class="btn btn-secondary btn-sm sort-btn" data-sort="status" data-dir="desc">📌 Статус ⬇️</button>
        <button class="btn btn-secondary btn-sm sort-btn" data-sort="chapters" data-dir="desc">📚 Глави ⬇️</button>
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

  let currentSort = 'rating';
  let currentDir = 'desc';
  let currentSearch = '';
  const grid = document.getElementById('all-reviews-grid');

  const getSortVal = (r, by) => {
    if (by === 'rating') return r.rating;
    if (by === 'chapters') return r.chapters || 0;
    if (by === 'date') return new Date(r.date || r.createdAt).getTime();
    if (by === 'status') {
      const w = { done: 4, reading: 3, planned: 2, dropped: 1 };
      return w[r.status] || 0;
    }
    return 0;
  };

  const applySortAndFilter = () => {
    let filtered = [...reviews];
    if (currentSearch) filtered = filtered.filter(r => r.title.toLowerCase().includes(currentSearch));
    
    filtered.sort((a, b) => {
      const vA = getSortVal(a, currentSort);
      const vB = getSortVal(b, currentSort);
      if (vA < vB) return currentDir === 'desc' ? 1 : -1;
      if (vA > vB) return currentDir === 'desc' ? -1 : 1;
      return 0;
    });

    grid.innerHTML = renderGrid(filtered);
    wireClicks();
  };

  container.querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sortType = btn.dataset.sort;
      if (currentSort === sortType) {
        currentDir = currentDir === 'desc' ? 'asc' : 'desc';
        btn.dataset.dir = currentDir;
      } else {
        container.querySelectorAll('.sort-btn').forEach(b => {
          b.classList.remove('active');
          if (b !== btn) {
            b.dataset.dir = 'desc';
            b.innerHTML = b.innerHTML.replace('⬆️', '⬇️');
          }
        });
        btn.classList.add('active');
        currentSort = sortType;
        currentDir = 'desc';
        btn.dataset.dir = 'desc';
      }
      
      const emoji = currentDir === 'desc' ? '⬇️' : '⬆️';
      btn.innerHTML = btn.innerHTML.replace(/⬇️|⬆️/, emoji);
      applySortAndFilter();
    });
  });

  document.getElementById('all-reviews-search').addEventListener('input', e => {
    currentSearch = e.target.value.toLowerCase().trim();
    applySortAndFilter();
  });

  // Initial load sort
  applySortAndFilter();
}

function renderGrid(reviews) {
  if (reviews.length === 0) return `<div class="empty-state"><div class="empty-icon">📭</div><h3>Нічого не знайдено</h3></div>`;
  const statusLabels = { done: '✅ Завершено', reading: '📖 Читаю', planned: '⏳ В планах', dropped: '❌ Кинув' };
  const statusClass = { done: 'status-done', reading: 'status-reading', planned: 'status-planned', dropped: 'status-dropped' };
  
  return reviews.map(r => {
    const isDropped = r.status === 'dropped' || r.status === 'planned';
    return `<div class="review-card" style="cursor:pointer" data-review-id="${r.id}">
      <div class="review-cover" style="width:80px">
        ${r.coverBase64 ? `<img src="${r.coverBase64}" alt="${escapeHtml(r.title)}">` : '<div class="review-cover-placeholder">📖</div>'}
      </div>
      <div class="review-body">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px">
          <div class="review-date">${r.date ? formatDate(r.date) : timeAgo(r.createdAt)}</div>
          <span class="status-badge ${statusClass[r.status] || ''}" style="font-size:0.7rem">${statusLabels[r.status] || ''}</span>
          <span style="color:var(--text-muted);font-size:0.75rem">📚 ${r.chapters || 0} глав</span>
        </div>
        <div class="review-title">${escapeHtml(r.title)}</div>
        <div style="margin:6px 0">${r.status === 'planned' ? '<span style="color:var(--text-muted);font-size:0.8rem">Ще не оцінено</span>' : starsHtml(r.rating, isDropped)}</div>
        ${r.tags?.length ? `<div class="review-tags">${r.tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}</div>` : ''}
        ${r.text ? `<div class="review-text-preview" style="margin-top:6px">${escapeHtml(r.text)} <span style="color:var(--accent)">...</span></div>` : ''}
      </div>
    </div>`;
  }).join('');
}
