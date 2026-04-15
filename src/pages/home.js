// ============================================================
// pages/home.js — Home page (async Firestore)
// ============================================================

import { Reviews, Users, News, TopSites, TopVideoSites, Session } from '../store.js';
import { starsHtml, timeAgo, escapeHtml, showLoader, formatTag, showToast } from '../utils.js';
import { navigate } from '../router.js';

export async function renderHome() {
  const container = document.getElementById('page-root');
  showLoader(container);

  const topSites = TopSites.all();
  const topVideoSites = TopVideoSites.all();
  const [allReviews, topReviews, newsItems] = await Promise.all([
    Reviews.all(),
    Reviews.topRated(10),
    News.recent(50),
  ]);

  container.innerHTML = `
    <div class="page-container">
      <!-- Search -->
      <div class="hero-search">
        <h1>Знайдіть вашу наступну манхву</h1>
        <p>Рецензії, рейтинги та рекомендації від спільноти</p>
        <div class="hero-search-input-wrap">
          <input class="input" id="home-search" placeholder="🔍  Пошук за назвою..." autocomplete="off">
          <button class="btn btn-primary" id="home-search-btn">Пошук</button>
        </div>
        <div id="search-results" style="margin-top:16px;text-align:left;max-width:600px;margin-left:auto;margin-right:auto;display:none"></div>
      </div>

      <div class="home-layout">
        <!-- LEFT -->
        <div class="home-left">
          <div class="two-col">
            <!-- Top Sites -->
             <div>
              <div class="section-title">🌐 Топ сайтів для читання</div>
              <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:24px">
                ${topSites.map((site, i) => `
                  <a class="top-site-item" href="${escapeHtml(site.url)}" target="_blank" rel="noopener">
                    <span class="top-site-rank">${i + 1}</span>
                    <div>
                      <div style="font-weight:600">${escapeHtml(site.name)}</div>
                      <div style="font-size:0.75rem;color:var(--text-muted)">${escapeHtml(site.desc)}</div>
                    </div>
                    <span style="margin-left:auto;color:var(--text-muted);font-size:12px">↗</span>
                  </a>`).join('')}
              </div>

              <div class="section-title">🎬 Топ сайтів для перегляду</div>
              <div style="display:flex;flex-direction:column;gap:8px">
                ${topVideoSites.map((site, i) => `
                  <a class="top-site-item" href="${escapeHtml(site.url)}" target="_blank" rel="noopener">
                    <span class="top-site-rank">${i + 1}</span>
                    <div>
                      <div style="font-weight:600">${escapeHtml(site.name)}</div>
                      <div style="font-size:0.75rem;color:var(--text-muted)">${escapeHtml(site.desc)}</div>
                    </div>
                    <span style="margin-left:auto;color:var(--text-muted);font-size:12px">↗</span>
                  </a>`).join('')}
              </div>
            </div>

            <div>
              <div class="section-title">🔥 Топ популярних</div>
              <div class="scrollable-feed">
                ${topReviews.length === 0
                  ? `<div class="empty-state"><div class="empty-icon">📖</div><h3>Ще немає рецензій</h3></div>`
                  : topReviews.map((r, i) => `
                      <div class="review-card" style="margin-bottom:10px;cursor:pointer" data-title-id="${r.titleId}">
                        <div class="review-cover">
                          ${r.coverBase64 ? `<img src="${r.coverBase64}" alt="">` : '<div class="review-cover-placeholder">📖</div>'}
                        </div>
                        <div class="review-body">
                          <div style="font-size:0.75rem;color:var(--accent2);font-weight:700;margin-bottom:2px">#${i + 1}</div>
                          <div class="review-title">${escapeHtml(r.title)}</div>
                          <div style="display:flex;align-items:center;gap:6px;margin:4px 0">
                            ${starsHtml(r.avgRating)}
                            <span style="font-size:0.75rem;color:var(--text-muted);font-weight:600">(${r.count})</span>
                          </div>
                          <div style="font-size:0.78rem;color:var(--text-muted)">Остання від ${escapeHtml(r.username || '')}</div>
                        </div>
                      </div>`).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT: News Feed -->
        <div>
          <div class="section-title">📡 Стрічка новин</div>
          <div class="scrollable-feed">
            <div class="news-feed">
              ${newsItems.length === 0
                ? `<div class="empty-state"><div class="empty-icon">📭</div><h3>Тут поки тихо</h3><p>Реєструйтесь та діліться рецензіями!</p></div>`
                : newsItems.map(renderNewsItem).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>`;

  // Wire clicks
  container.querySelectorAll('[data-review-id]').forEach(el => {
    el.addEventListener('click', () => navigate(`review/${el.dataset.reviewId}`));
  });
  container.querySelectorAll('[data-title-id]').forEach(el => {
    el.addEventListener('click', () => {
      if (!Session.currentUser()) {
        showToast('Щоб переглянути рецензії — зареєструйтеся 👤', 'warning');
        return;
      }
      navigate(`title/${el.dataset.titleId}`);
    });
  });

  // Search
  const searchInput = document.getElementById('home-search');
  const searchBtn = document.getElementById('home-search-btn');
  const resultsEl = document.getElementById('search-results');

  function doSearch() {
    const q = searchInput.value.trim().toLowerCase();
    if (!q) { resultsEl.style.display = 'none'; return; }
    const groups = {};
    allReviews.forEach(r => {
      const titleMatch = (r.title || '').toLowerCase().includes(q);
      const aliasMatch = (r.search_names || []).some(alias => alias.toLowerCase().includes(q));
      
      if (titleMatch || aliasMatch) {
        const tid = r.titleId || `manual_${(r.title || '').toLowerCase().replace(/\s+/g, '_')}`;
        if (!groups[tid]) groups[tid] = { ...r, titleId: tid, totalRating: 0, count: 0 };
        groups[tid].totalRating += r.rating;
        groups[tid].count += 1;
      }
    });

    const found = Object.values(groups).map(g => ({
      ...g,
      avgRating: g.totalRating / g.count
    }));

    if (found.length === 0) {
      resultsEl.style.display = 'block';
      resultsEl.innerHTML = `<div class="empty-state" style="padding:20px"><h3>Нічого не знайдено</h3></div>`;
      return;
    }
    resultsEl.style.display = 'block';
    resultsEl.innerHTML = found.slice(0, 12).map(r => `
      <div class="review-card" style="margin-bottom:8px;cursor:pointer" data-title-id="${r.titleId}">
        <div class="review-cover" style="width:50px">
          ${r.coverBase64 ? `<img src="${r.coverBase64}" alt="">` : '<div class="review-cover-placeholder" style="font-size:14px">📖</div>'}
        </div>
        <div class="review-body">
          <div class="review-title">${escapeHtml(r.title)}</div>
          <div style="display:flex;align-items:center;gap:6px;margin:4px 0">
            ${starsHtml(r.avgRating)}
            <span style="font-size:0.75rem;color:var(--text-muted);font-weight:600">(${r.count})</span>
          </div>
        </div>
      </div>`).join('');
    resultsEl.querySelectorAll('[data-title-id]').forEach(el => {
      el.addEventListener('click', () => navigate(`title/${el.dataset.titleId}`));
    });
  }

  searchBtn.addEventListener('click', doSearch);
  searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });
  searchInput.addEventListener('input', () => { if (!searchInput.value.trim()) resultsEl.style.display = 'none'; });
}

function renderNewsItem(item) {
  const username = item.username ? `<strong>${escapeHtml(item.username)}</strong>` : 'Хтось';
  let icon = '📢', text = '';
  if (item.type === 'joined') { icon = '🎉'; text = `${username} приєднався до ManhwaDB`; }
  else if (item.type === 'review') { icon = '📝'; text = `${username} залишив рецензію на <strong>${escapeHtml(item.extra || 'манхву')}</strong>`; }
  else if (item.type === 'friend') { icon = '🤝'; text = `${username} та <strong>${escapeHtml(item.friendName || 'Хтось')}</strong> тепер друзі!`; }
  else if (item.type === 'new_comment') { 
    icon = '💬'; 
    text = `<strong>${escapeHtml(item.commenterName || 'Хтось')}</strong> прокоментував рецензію на <strong>${escapeHtml(item.reviewTitle || 'манхву')}</strong>`; 
  }
  else if (item.type === 'comment_reply') { 
    icon = '↪️'; 
    text = `<strong>${escapeHtml(item.replierName || 'Хтось')}</strong> відповів на ваш коментар до <strong>${escapeHtml(item.reviewTitle || 'манхви')}</strong>`; 
  }
  else { icon = '📢'; text = `${username} щось зробив`; }
  return `<div class="news-item"><span class="news-icon">${icon}</span><div><div class="news-text">${text}</div><div class="news-ts">${timeAgo(item.createdAt)}</div></div></div>`;
}
