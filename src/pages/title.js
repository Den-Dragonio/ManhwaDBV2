// ============================================================
// pages/title.js — Manga/Manhwa Detail Page (Aggregatory)
// ============================================================

import { Reviews, Users, Session, MangaMetadata } from '../store.js';
import { starsHtml, avatarHtml, timeAgo, escapeHtml, showLoader, formatTag } from '../utils.js';
import { navigate } from '../router.js';

export async function renderTitle({ id }) {
  const container = document.getElementById('page-root');
  showLoader(container);

  try {
    let [reviews, metadata] = await Promise.all([
      Reviews.byTitle(id),
      MangaMetadata.byId(id),
    ]);

    // Fallback if metadata not found by ID (e.g. ani_ vs manual_ mismatch)
    if (!metadata && reviews.length > 0) {
      metadata = await MangaMetadata.byTitle(reviews[0].title);
    }

    let currentUser = Session.currentUser();

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

    // Pre-compute status — prefer AniList (more current) over ToonGod
    let statusHtml = '';
    const alData = metadata?.anilist;
    const mdData = metadata?.mangadex;
    const alStatus = alData?.status;
    if (alStatus) {
      const alStatusMap = { 'FINISHED': 'Завершено', 'RELEASING': 'Онгоінг', 'NOT_YET_RELEASED': 'Анонс', 'CANCELLED': 'Скасовано', 'HIATUS': 'Пауза' };
      const label = alStatusMap[alStatus] || alStatus;
      const isFinished = alStatus === 'FINISHED';
      statusHtml = `<span class="meta-status-subtle ${isFinished ? 'status-done' : 'status-ongoing'}">${label}</span>`;
    } else if (metadata && metadata.status) {
      const s = metadata.status.toLowerCase();
      const isCompleted = s === 'completed';
      const label = isCompleted ? 'Завершено' : 'Онгоінг';
      statusHtml = `<span class="meta-status-subtle ${isCompleted ? 'status-done' : 'status-ongoing'}">${label}</span>`;
    }

    // Pre-compute author/artist HTML
    let authorArtistHtml = '';
    if (metadata) {
      const author = metadata.author || alData?.author || mdData?.author;
      const artist = metadata.artist || alData?.artist || mdData?.artist;
      if (author && artist && author.toLowerCase() === artist.toLowerCase()) {
        authorArtistHtml = `<div><span style="color:var(--accent3)">Автор та художник:</span> ${author}</div>`;
      } else {
        if (author) authorArtistHtml += `<div><span style="color:var(--accent3)">Автор:</span> ${author}</div>`;
        if (artist) authorArtistHtml += `<div><span style="color:var(--accent3)">Художник:</span> ${artist}</div>`;
      }
    }

    // Pre-compute genres HTML — merge TG + AniList genres
    let allGenres = [];
    if (metadata?.genres?.length) allGenres.push(...metadata.genres);
    if (alData?.genres?.length) {
      alData.genres.forEach(g => { if (!allGenres.some(x => x.toLowerCase() === g.toLowerCase())) allGenres.push(g); });
    }
    if (mdData?.genres?.length) {
      mdData.genres.forEach(g => { if (!allGenres.some(x => x.toLowerCase() === g.toLowerCase())) allGenres.push(g); });
    }
    const genresHtml = allGenres.length
      ? `<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px">${allGenres.map(g => `<span style="font-size:0.72rem;padding:3px 10px;border-radius:20px;background:var(--surface2);color:var(--text-muted);border:1px solid var(--border)">${g}</span>`).join('')}</div>`
      : '';

    container.innerHTML = `
      <div class="page-container" style="max-width:940px">
        <button class="btn btn-ghost btn-sm" id="back-btn" style="margin-bottom:24px">← Назад</button>

        <div class="title-header-layout">
          <div class="title-cover">
            ${cover ? `<img src="${cover}" alt="${escapeHtml(title)}">` : `<div class="title-cover-placeholder">📖</div>`}
          </div>
          <div class="title-info">
            <h1 class="title-name">${escapeHtml(title)}</h1>
            
            ${metadata ? `
            <div class="official-metadata-row">
              ${metadata.official_rating ? `
                <div class="tg-badge" title="Офіційний рейтинг ToonGod">
                  <div style="line-height:1.2">TG ${metadata.official_rating}</div>
                </div>` : ''}
              ${alData?.score ? `
                <div class="al-badge" title="Рейтинг AniList">
                  <div style="line-height:1.2">AL ${alData.score}</div>
                </div>` : ''}
              ${mdData?.score ? `
                <div class="md-badge" title="Рейтинг MangaDex">
                  <div style="line-height:1.2">MD ${mdData.score}</div>
                </div>` : ''}
              <div class="meta-badge" title="Рік випуску">📅 <span>Рік:</span> <strong>${metadata.release_year || alData?.year || mdData?.year || 'N/A'}</strong></div>
              
              ${(() => {
                const alPop = alData?.popularity || 0;
                const mdPop = mdData?.popularity || 0;
                const tgPop = Number(metadata.bookmarks) || 0;
                const maxPop = Math.max(alPop, mdPop, tgPop);
                
                if (maxPop === 0) return '';
                
                const breakdown = [
                  alPop ? `AniList: ${alPop.toLocaleString()}` : '',
                  mdPop ? `MangaDex: ${mdPop.toLocaleString()}` : '',
                  tgPop ? `ToonGod: ${tgPop.toLocaleString()}` : ''
                ].filter(Boolean).join(' | ');

                return `<div class="meta-badge meta-badge-popularity" title="Джерела: ${breakdown}">🔥 <span>Популярність:</span> <strong>${maxPop.toLocaleString()}</strong></div>`;
              })()}
            </div>
            <div style="margin-bottom:12px; font-size:0.85rem; color:var(--text-muted); display:flex; flex-wrap:wrap; gap:16px; align-items:center">
                ${statusHtml}
                ${authorArtistHtml}
            </div>
            ${genresHtml}
          ` : ''}

          <div class="title-meta-pills" style="display:flex;flex-wrap:wrap;gap:8px">
              <span class="pill">📚 ${latest.chapters || 0} глав</span>
              <span class="pill">📈 ${count} відгуків</span>
            </div>
            <button class="btn btn-primary" id="write-review-btn" style="width:100%;margin-top:16px;box-shadow:var(--shadow-float)">✍️ Написати рецензію</button>
            
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
  } catch (e) {
    console.error("Title render error:", e);
    container.innerHTML = `<div class="page-container"><div class="empty-state"><div class="empty-icon">⚠️</div><h3>Помилка завантаження</h3><p>${e.message}</p></div></div>`;
  }
}
