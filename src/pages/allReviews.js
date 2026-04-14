// ============================================================
// pages/allReviews.js — All reviews for a user (async Firestore)
// ============================================================

import { Reviews, Users, Session } from '../store.js';
import { starsHtml, avatarHtml, timeAgo, formatDate, escapeHtml, showLoader, formatTag } from '../utils.js';
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
      <div class="all-reviews-controls" id="sort-controls">
        <div style="font-size:0.85rem;color:var(--text-muted);width:100%">Сортувати:</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <button class="btn btn-secondary btn-sm sort-btn active" data-sort="rating" data-dir="desc">⭐ Оцінка ⬇️</button>
          <button class="btn btn-secondary btn-sm sort-btn" data-sort="date" data-dir="desc">📅 Дата ⬇️</button>
          <button class="btn btn-secondary btn-sm sort-btn" data-sort="status" data-dir="desc">📌 Статус ⬇️</button>
          <button class="btn btn-secondary btn-sm sort-btn" data-sort="chapters" data-dir="desc">📚 Глави ⬇️</button>
        </div>
        <input class="input" id="all-reviews-search" placeholder="🔍 Пошук..." style="width:100%; margin-bottom: 8px;">
        
        <div style="font-size:0.85rem;color:var(--text-muted);width:100%;margin-top:4px">Фільтр статусів:</div>
        <div id="status-filter-wrap" style="display:flex;flex-wrap:wrap;gap:6px;width:100%;margin-bottom:8px">
          <button class="status-badge status-done filter-status-btn" data-status="done" style="cursor:pointer;border:1px solid transparent;opacity:0.6;transition:0.2s">Прочитано</button>
          <button class="status-badge status-reading filter-status-btn" data-status="reading" style="cursor:pointer;border:1px solid transparent;opacity:0.6;transition:0.2s">Читаю</button>
          <button class="status-badge status-planned filter-status-btn" data-status="planned" style="cursor:pointer;border:1px solid transparent;opacity:0.6;transition:0.2s">В планах</button>
          <button class="status-badge status-dropped filter-status-btn" data-status="dropped" style="cursor:pointer;border:1px solid transparent;opacity:0.6;transition:0.2s">Кинув</button>
        </div>

        <div style="font-size:0.85rem;color:var(--text-muted);width:100%;margin-top:4px">Фільтр тегів:</div>
        <div id="tag-filter-wrap" style="display:flex;flex-wrap:wrap;gap:6px;width:100%">
          <!-- Tag buttons injected dynamically -->
        </div>
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
  let activeTags = new Set();
  let activeStatuses = new Set();
  const grid = document.getElementById('all-reviews-grid');
  const tagWrap = document.getElementById('tag-filter-wrap');
  const statusWrap = document.getElementById('status-filter-wrap');

  // Populate dynamic tags
  const tagCounts = {};
  reviews.forEach(r => {
    (r.tags || []).forEach(t => {
      const q = t.trim().toLowerCase();
      if (q) {
        if (!tagCounts[q]) tagCounts[q] = { name: t.trim(), count: 0 };
        tagCounts[q].count++;
      }
    });
  });

  const tagEntries = Object.values(tagCounts).sort((a, b) => b.count - a.count);
  let tagHtml = '';
  tagEntries.forEach(tg => {
    tagHtml += `<button class="preset-tag filter-tag-btn" data-tag="${escapeHtml(tg.name.toLowerCase())}">${formatTag(tg.name)} <span style="opacity:0.6;font-size:0.8em">(${tg.count})</span></button>`;
  });
  tagWrap.innerHTML = tagHtml;

  // Tag toggle logic
  tagWrap.querySelectorAll('.filter-tag-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tag = btn.dataset.tag;
      if (activeTags.has(tag)) {
        activeTags.delete(tag);
        btn.classList.remove('active');
        btn.style.borderColor = '';
        btn.style.background = '';
      } else {
        activeTags.add(tag);
        btn.classList.add('active');
        btn.style.borderColor = 'var(--accent)';
        btn.style.background = 'rgba(var(--accent-rgb), 0.1)';
      }
      applySortAndFilter();
    });
  });

  // Status toggle logic
  statusWrap.querySelectorAll('.filter-status-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const status = btn.dataset.status;
      if (activeStatuses.has(status)) {
        activeStatuses.delete(status);
        btn.style.opacity = '0.6';
        btn.style.borderColor = 'transparent';
      } else {
        activeStatuses.add(status);
        btn.style.opacity = '1';
        btn.style.borderColor = 'var(--text-primary)';
      }
      applySortAndFilter();
    });
  });

  const getSortVal = (r, by) => {
    if (by === 'rating') return Number(r.rating) || 0;
    if (by === 'chapters') return Number(r.chapters) || 0;
    if (by === 'date') return new Date(r.date || r.createdAt).getTime();
    if (by === 'status') {
      const w = { done: 4, reading: 3, planned: 2, dropped: 1 };
      return w[r.status] || 0;
    }
    return 0;
  };

  const applySortAndFilter = () => {
    let list = [...reviews];

    if (currentSearch) {
      list = list.filter(r => {
        const matchesTitle = r.title.toLowerCase().includes(currentSearch);
        const matchesAlias = (r.search_names || []).some(alias => alias.toLowerCase().includes(currentSearch));
        return matchesTitle || matchesAlias;
      });
    }

    if (activeTags.size > 0) {
      list = list.filter(r => {
         const itemTags = (r.tags || []).map(t => t.trim().toLowerCase());
         // AND logic: Review must have ALL selected tags
         return Array.from(activeTags).every(activeTag => itemTags.includes(activeTag));
      });
    }

    if (activeStatuses.size > 0) {
      list = list.filter(r => activeStatuses.has(r.status));
    }

    list.sort((a, b) => {
      let va = getSortVal(a, currentSort);
      let vb = getSortVal(b, currentSort);

      let diff = va > vb ? 1 : (va < vb ? -1 : 0);
      if (diff === 0) {
        const da = new Date(a.date || a.createdAt);
        const dbDate = new Date(b.date || b.createdAt);
        diff = dbDate.getTime() - da.getTime();
        if (diff === 0) diff = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return currentDir === 'desc' ? diff : -diff;
      }
      return currentDir === 'desc' ? -diff : diff;
    });

    grid.innerHTML = renderGrid(list);
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

  // Scroll to Top logic
  const topBtn = document.createElement('div');
  topBtn.className = 'back-to-top';
  topBtn.innerHTML = '↑';
  container.appendChild(topBtn);

  const handleScroll = () => {
    if (!topBtn.isConnected) {
      window.removeEventListener('scroll', handleScroll);
      return;
    }
    if (window.scrollY > 400) {
      topBtn.classList.add('visible');
    } else {
      topBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleScroll);
  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function renderGrid(reviews) {
  if (reviews.length === 0) return `<div class="empty-state"><div class="empty-icon">📭</div><h3>Нічого не знайдено</h3></div>`;
  const statusLabels = { done: '✅ Прочитано', reading: '📖 Читаю', planned: '⏳ В планах', dropped: '❌ Кинув' };
  const statusClass = { done: 'status-done', reading: 'status-reading', planned: 'status-planned', dropped: 'status-dropped' };

  return reviews.map(r => {
    const isDropped = r.status === 'dropped' || r.status === 'planned';
    return `<div class="review-card all-reviews-card" style="cursor:pointer" data-review-id="${r.id}">
      <div class="review-cover">
        ${r.coverBase64 ? `<img src="${r.coverBase64}" alt="${escapeHtml(r.title)}">` : '<div class="review-cover-placeholder">📖</div>'}
      </div>
      <div class="review-body">
        <div class="review-title">${escapeHtml(r.title)}</div>
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:4px">
          <div class="review-date">${r.date ? formatDate(r.date) : timeAgo(r.createdAt)}</div>
          <span class="status-badge ${statusClass[r.status] || ''}" style="font-size:0.7rem">${statusLabels[r.status] || ''}</span>
          <span style="color:var(--text-muted);font-size:0.75rem">📚 ${r.chapters || 0} глав</span>
        </div>
        <div style="margin:6px 0">${r.status === 'planned' ? '<span style="color:var(--text-muted);font-size:0.8rem">Ще не оцінено</span>' : starsHtml(r.rating, r.status === 'dropped')}</div>
        ${r.tags?.length ? `<div class="review-tags">${r.tags.map(t => `<span class="tag">${escapeHtml(formatTag(t))}</span>`).join('')}</div>` : ''}
        ${r.text ? `<div class="review-text-preview" style="margin-top:6px">${escapeHtml(r.text)} <span style="color:var(--accent)">...</span></div>` : ''}
      </div>
    </div>`;
  }).join('');
}
