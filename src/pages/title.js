// ============================================================
// pages/title.js — Manga/Manhwa Detail Page (Aggregatory)
// ============================================================

import { Reviews, Users, Session } from '../store.js';
import { starsHtml, avatarHtml, timeAgo, escapeHtml, showLoader, formatTag } from '../utils.js';
import { navigate } from '../router.js';

export async function renderTitle({ id }) {
  const container = document.getElementById('page-root');
  showLoader(container);

  const [reviews, currentUser] = await Promise.all([
    Reviews.byTitle(id),
    Promise.resolve(Session.currentUser()),
  ]);

  if (reviews.length === 0) {
    container.innerHTML = `<div class="page-container"><div class="empty-state"><div class="empty-icon">❓</div><h3>Тайтл не знайдено</h3></div></div>`;
    return;
  }

  // Use the most recent review for metadata
  const latest = reviews[0];
  const title = latest.title;
  const cover = latest.coverBase64;
  
  // Aggregate stats
  const count = reviews.length;
  const avg = reviews.reduce((acc, r) => acc + r.rating, 0) / count;
  const distribution = new Array(11).fill(0); // 0 to 10
  reviews.forEach(r => {
    const rounded = Math.round(r.rating);
    distribution[rounded]++;
  });

  const maxFreq = Math.max(...distribution) || 1;

  container.innerHTML = `
    <div class="page-container" style="max-width:940px">
      <button class="btn btn-ghost btn-sm" id="back-btn" style="margin-bottom:24px">← Назад</button>

      <div class="title-header-layout">
        <div class="title-cover">
          ${cover ? `<img src="${cover}" alt="${escapeHtml(title)}">` : `<div class="title-cover-placeholder">📖</div>`}
        </div>
        <div class="title-info">
          <h1 class="title-name">${escapeHtml(title)}</h1>
          <div class="title-meta-pills" style="display:flex;flex-wrap:wrap;gap:8px">
            <span class="pill">📚 ${latest.chapters || 0} глав</span>
            <span class="pill">📈 ${count} відгуків</span>
            <button class="btn btn-primary btn-sm" id="write-review-btn" style="margin-left:auto;box-shadow:var(--shadow-float)">✍️ Написати рецензію</button>
          </div>
          
          <div class="title-rating-section">
            <div class="title-rating-main">
              <div class="title-rating-value">${avg.toFixed(1)}</div>
              <div class="title-rating-stars">${starsHtml(avg)}</div>
            </div>
            
            <div class="rating-distribution">
              ${[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map(val => `
                <div class="dist-row">
                  <span class="dist-label">${val}</span>
                  <div class="dist-bar-wrap">
                    <div class="dist-bar-fill" style="width:${(distribution[val] / maxFreq) * 100}%"></div>
                  </div>
                  <span class="dist-count">${distribution[val]}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>

      <div class="title-reviews-section">
        <div class="section-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
          <h2 class="section-title" style="margin:0">💬 Рецензії користувачів</h2>
        </div>
        <div class="reviews-grid-list">
          ${reviews.map(r => `
            <div class="review-card-item card" data-id="${r.id}">
              <div class="review-card-header">
                ${avatarHtml({ username: r.username, avatarBase64: r.avatarBase64 }, 'sm')}
                <div class="review-card-user">
                  <div class="user-name">${escapeHtml(r.username)}</div>
                  <div class="review-ts">${timeAgo(r.createdAt)}</div>
                </div>
                <div class="review-card-rating">
                   ${starsHtml(r.rating)}
                </div>
              </div>
              <div class="review-card-text-preview">
                ${r.text ? escapeHtml(r.text.substring(0, 180)) + (r.text.length > 180 ? '...' : '') : '<i style="color:var(--text-muted)">Без тексту</i>'}
              </div>
              <div class="review-card-footer">
                <button class="btn btn-ghost btn-xs">Читати повністю →</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  // UI Events
  document.getElementById('back-btn').addEventListener('click', () => history.back());
  
  const writeBtn = document.getElementById('write-review-btn');
  if (writeBtn) {
    writeBtn.addEventListener('click', () => navigate(`new-review/${id}`));
  }
  
  container.querySelectorAll('.review-card-item').forEach(card => {
    card.addEventListener('click', () => navigate(`review/${card.dataset.id}`));
  });
}
