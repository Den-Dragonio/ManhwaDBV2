// ============================================================
// pages/stats.js — Detailed user statistics & recap page
// ============================================================

import { Reviews, Session, MangaMetadata } from '../store.js';
import { escapeHtml, showToast, showLoader } from '../utils.js';
import { navigate } from '../router.js';
import { t, getMonths } from '../i18n.js';

export async function renderStats() {
  const user = Session.currentUser();
  if (!user) { navigate('home'); return; }

  const container = document.getElementById('page-root');
  showLoader(container);

  const reviews = await Reviews.byUser(user.id);

  // Load manga_metadata for all unique titleIds (for author/artist data)
  const uniqueTitleIds = [...new Set(reviews.map(r => r.titleId).filter(Boolean))];
  const metaMap = {}; // titleId -> metadata doc
  await Promise.all(uniqueTitleIds.map(async tid => {
    try {
      const meta = await MangaMetadata.byId(tid);
      if (meta) metaMap[tid] = meta;
    } catch (e) { /* ignore */ }
  }));

  // ---- Pre-compute all statistics ----
  const stats = computeStats(reviews, metaMap);

  container.innerHTML = buildStatsHTML(stats, user);
  wireEvents(stats, user.id);
}

// ============================================================
// Data crunching
// ============================================================
function computeStats(reviews, metaMap = {}) {
  // --- Activity heatmap: count reviews per day ---
  const dayMap = {}; // "YYYY-MM-DD" → { count, titles }
  reviews.forEach(r => {
    const raw = r.date || r.createdAt;
    if (!raw) return;
    const d = new Date(raw);
    if (isNaN(d)) return;
    const key = d.toISOString().slice(0, 10);
    if (!dayMap[key]) dayMap[key] = { count: 0, titles: [] };
    dayMap[key].count++;
    if (r.title) dayMap[key].titles.push(r.title);
  });

  // --- Rating distribution ---
  const ratingDist = Array(11).fill(0); // index 0 unused, 1-10
  const ratingTitles = Array(11).fill().map(() => []);
  let ratingSum = 0, ratingCount = 0;
  reviews.forEach(r => {
    const rating = Math.round(r.rating);
    if (rating >= 1 && rating <= 10) {
      ratingDist[rating]++;
      if (r.title) ratingTitles[rating].push(r.title);
      ratingSum += r.rating;
      ratingCount++;
    }
  });
  const avgRating = ratingCount ? (ratingSum / ratingCount).toFixed(1) : '—';

  // --- Status distribution ---
  const statusMap = { done: 0, reading: 0, planned: 0, dropped: 0 };
  reviews.forEach(r => { if (statusMap[r.status] !== undefined) statusMap[r.status]++; });

  // --- Chapter stats ---
  const chapCounts = reviews.map(r => r.chapters || 0).filter(c => c > 0);
  const avgChapters = chapCounts.length ? Math.round(chapCounts.reduce((a, b) => a + b, 0) / chapCounts.length) : 0;
  const minChapters = chapCounts.length ? Math.min(...chapCounts) : 0;
  const maxChapters = chapCounts.length ? Math.max(...chapCounts) : 0;
  const medianChapters = chapCounts.length ? (() => {
    const s = [...chapCounts].sort((a, b) => a - b);
    const mid = Math.floor(s.length / 2);
    return s.length % 2 ? s[mid] : Math.round((s[mid - 1] + s[mid]) / 2);
  })() : 0;

  // --- Tags frequency ---
  const tagMap = {};
  reviews.forEach(r => (r.tags || []).forEach(t => { tagMap[t] = (tagMap[t] || 0) + 1; }));
  const topTags = Object.entries(tagMap).sort((a, b) => b[1] - a[1]).slice(0, 12);

  // --- Authors/Artists from manga_metadata (scraper data) ---
  const authorMap = {};
  const artistMap = {};
  reviews.forEach(r => {
    const meta = metaMap[r.titleId];
    if (!meta) return;
    // Priority: anilist.author > top-level author (ToonGod)
    const author = meta.anilist?.author || meta.author || null;
    const artist = meta.anilist?.artist || meta.artist || null;
    if (author) {
      // Could be comma-separated
      author.split(',').map(a => a.trim()).filter(Boolean).forEach(a => {
        authorMap[a] = (authorMap[a] || 0) + 1;
      });
    }
    if (artist && artist !== author) {
      artist.split(',').map(a => a.trim()).filter(Boolean).forEach(a => {
        artistMap[a] = (artistMap[a] || 0) + 1;
      });
    }
  });
  const topAuthors = Object.entries(authorMap).sort((a, b) => b[1] - a[1]).slice(0, 8);
  const topArtists = Object.entries(artistMap).sort((a, b) => b[1] - a[1]).slice(0, 8);

  // --- Release Years (Eras) ---
  const eraMap = {};
  reviews.forEach(r => {
    const meta = metaMap[r.titleId];
    if (!meta) return;
    let yearRaw = meta.anilist?.year || meta.release_year || null;
    if (!yearRaw) return;
    
    // Extract 4-digit year from string like "2024 (Ongoing)" or "2023*"
    const match = String(yearRaw).match(/\d{4}/);
    if (match) {
      const year = match[0];
      eraMap[year] = (eraMap[year] || 0) + 1;
    }
  });
  // Sort Eras chronologically (ascending)
  const eraStats = Object.entries(eraMap).sort((a, b) => Number(a[0]) - Number(b[0]));

  // --- Reviews by Year (for navigation) ---
  const reviewsByYear = {};
  reviews.forEach(r => {
    const raw = r.date || r.createdAt;
    if (!raw) return;
    const year = new Date(raw).getFullYear();
    reviewsByYear[year] = (reviewsByYear[year] || 0) + 1;
  });

  // --- Chapter Length frequencies (buckets of 20) ---
  const lengthFreq = {};
  reviews.forEach(r => {
    const caps = Number(r.chapters);
    if (caps > 20) {
      const bucketIdx = Math.floor((caps - 1) / 20);
      const start = bucketIdx * 20 + 1;
      const end = start + 19;
      const bucketKey = `${start}-${end}`;
      
      if (!lengthFreq[bucketKey]) {
        lengthFreq[bucketKey] = {
            count: 0,
            chaptersDist: {}
        };
      }
      lengthFreq[bucketKey].count++;
      lengthFreq[bucketKey].chaptersDist[caps] = (lengthFreq[bucketKey].chaptersDist[caps] || 0) + 1;
    }
  });
  
  const topChapterLengths = Object.entries(lengthFreq)
    .filter(([_, data]) => data.count > 1)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 5)
    .map(([range, data]) => ({ length: range, count: data.count, details: data.chaptersDist }));

  // --- Totals ---
  const totalReviews = reviews.length;
  const totalChapters = chapCounts.reduce((a, b) => a + b, 0);
  const maxDayCount = Math.max(...Object.values(dayMap).map(d => d.count), 1);
  const totalReviewDays = Object.keys(dayMap).length;
  const { currentStreak, bestStreak, bestDate } = computeStreak(dayMap);

  return {
    dayMap,
    ratingDist,
    ratingTitles,
    avgRating,
    statusMap,
    avgChapters,
    minChapters,
    maxChapters,
    medianChapters,
    totalChapters,
    topTags,
    topAuthors,
    topArtists,
    eraStats,
    reviewsByYear,
    topChapterLengths,
    totalReviews,
    maxDayCount,
    totalReviewDays,
    currentStreak,
    bestStreak,
    bestDate,
    ratingCount,
  };
}

function computeStreak(dayMap) {
  let currentStreak = 0;
  const cur = new Date();
  while (true) {
    const key = cur.toISOString().slice(0, 10);
    if (dayMap[key]) { currentStreak++; cur.setDate(cur.getDate() - 1); }
    else break;
  }
  let bestStreak = 0;
  let bestDate = null;
  const dates = Object.keys(dayMap).sort();
  if (dates.length > 0) {
    let tempStreak = 1;
    bestStreak = 1;
    bestDate = dates[0];
    for (let i = 1; i < dates.length; i++) {
      const prev = new Date(dates[i-1]);
      const curr = new Date(dates[i]);
      const diffDays = Math.round((curr - prev) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        tempStreak++;
      } else {
        tempStreak = 1;
      }
      if (tempStreak > bestStreak) {
        bestStreak = tempStreak;
        bestDate = dates[i];
      }
    }
  }
  return { currentStreak, bestStreak, bestDate };
}

// ============================================================
// HTML builder
// ============================================================
function buildStatsHTML(stats, user) {
  return `
    <div class="page-container stats-page">
      <!-- Header -->
      <div class="stats-header centered">
        <button class="btn btn-secondary btn-sm stats-back-abs" id="stats-back-btn">${t('btn_back')}</button>
        <div class="stats-header-content">
          <h1 class="stats-title-wrap"><span class="stats-emoji">📊</span><span class="stats-title"> ${t('stats_title')}</span></h1>
          <p class="stats-subtitle">${t('stats_subtitle')}</p>
        </div>
      </div>

      <!-- Summary cards -->
      <div class="stats-summary-grid">
        ${summaryCard('📚', stats.totalReviews, t('total_reviews'))}
        ${summaryCard('⭐', stats.avgRating, t('avg_rating'))}
        ${summaryCard('🔥', stats.currentStreak, t('streak_label'))}
        ${stats.bestStreak > 0 ? summaryCard('🏆', stats.bestStreak, t('best_streak') + (stats.bestDate ? `<br>(${stats.bestDate})` : '')) : ''}
        ${summaryCard('📅', stats.totalReviewDays, t('active_days'))}
      </div>

      <!-- Activity Heatmap -->
      <div class="stats-card">
        <div class="stats-card-heatmap-header">
          <div>
            <div class="stats-card-title">${t('activity')}</div>
            <div class="stats-card-subtitle">${t('activity_sub')}</div>
          </div>
          <div class="heatmap-year-nav">
            <div class="heatmap-year-info">
              <span class="heatmap-nav-year" id="heatmap-year-label"></span>
              <span class="heatmap-year-count" id="heatmap-year-count"></span>
            </div>
            <div class="heatmap-nav-btns">
              <button class="heatmap-nav-btn" id="heatmap-prev-btn" aria-label="Попередній рік">&#8592;</button>
              <button class="heatmap-nav-btn" id="heatmap-next-btn" aria-label="Наступний рік">&#8594;</button>
            </div>
          </div>
        </div>
        <div id="heatmap-container"></div>
      </div>

      <!-- Two columns: Rating + Status -->
      <div class="stats-two-col">
        <!-- Rating histogram -->
        <div class="stats-card">
          <div class="stats-card-title">${t('rating_dist')}</div>
          <div class="stats-card-subtitle">${stats.ratingCount} ${t('rating_dist_sub')}</div>
          ${buildRatingHistogram(stats.ratingDist, stats.ratingTitles)}
        </div>

        <!-- Status donut -->
        <div class="stats-card">
          <div class="stats-card-title">${t('read_status')}</div>
          <div class="stats-card-subtitle">${t('status_sub')}</div>
          ${buildStatusDonut(stats.statusMap)}
        </div>
      </div>

      <!-- Chapter stats -->
      <div class="stats-card">
        <div class="stats-card-title">${t('chapters_len')}</div>
        <div class="stats-card-subtitle">${t('chapters_len_sub')}</div>
        ${buildChapterStats(stats)}
      </div>

      <!-- Authors + Artists -->
      ${(stats.topAuthors.length > 0 || stats.topArtists.length > 0) ? `
      <div class="stats-two-col">
        ${stats.topAuthors.length > 0 ? `
        <div class="stats-card">
          <div class="stats-card-title">${t('top_authors')}</div>
          <div class="stats-card-subtitle">${t('authors_sub')}</div>
          ${buildBarChart(stats.topAuthors)}
        </div>` : ''}
        ${stats.topArtists.length > 0 ? `
        <div class="stats-card">
          <div class="stats-card-title">${t('top_artists')}</div>
          <div class="stats-card-subtitle">${t('authors_sub')}</div>
          ${buildBarChart(stats.topArtists)}
        </div>` : ''}
      </div>` : `
      <div class="stats-card">
        <div class="stats-card-title">${t('top_authors')} & ${t('top_artists')}</div>
        <div class="stats-card-subtitle">${t('authors_sub')}</div>
        <div style="color:var(--text-muted);font-size:0.9rem;padding:16px 0">
          💡 ${t('no_data')} // To view authors/artists, update metadata using scraper.
        </div>
      </div>`}

      <!-- Top tags -->
      ${stats.topTags.length > 0 ? `
      <div class="stats-card">
        <div class="stats-card-title">${t('fav_tags')}</div>
        <div class="stats-card-subtitle">${t('fav_tags_sub')}</div>
        ${buildTagCloud(stats.topTags)}
      </div>` : ''}

      <!-- Favorite Era -->
      ${stats.eraStats.length > 0 ? `
      <div class="stats-card">
        <div class="stats-card-title">${t('fav_era')}</div>
        <div class="stats-card-subtitle">${t('fav_era_sub')}</div>
        ${buildEraChart(stats.eraStats)}
      </div>` : ''}

      <!-- Reading pace -->
      <div class="stats-card">
        <div class="stats-card-title">${t('read_pace')}</div>
        <div class="stats-card-subtitle">${t('read_pace_sub')}</div>
        ${buildMonthlyChart(stats.dayMap)}
      </div>
    </div>
  `;
}

function summaryCard(icon, value, label) {
  return `
    <div class="stats-summary-card">
      <div class="stats-summary-icon">${icon}</div>
      <div class="stats-summary-value">${value}</div>
      <div class="stats-summary-label">${label}</div>
    </div>`;
}

// ============================================================
// Heatmap — single year view with arrow navigation
// ============================================================
let _heatmapYear = new Date().getFullYear(); // module-level state
const HEATMAP_START_YEAR = 2024;

function buildHeatmapForYear(year, dayMap, maxCount) {
  const UA_MONTHS = getMonths();
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  const isCurrentYear = year === today.getFullYear();

  // Generate weeks: start from first Sunday <= Jan 1, end at last Saturday >= Dec 31
  const jan1 = new Date(year, 0, 1);
  const start = new Date(jan1);
  start.setDate(start.getDate() - start.getDay()); // back to Sunday

  const yearEnd = new Date(year, 11, 31);
  const end = new Date(yearEnd);
  end.setDate(end.getDate() + (6 - end.getDay())); // forward to Saturday

  const weeks = [];
  const cur = new Date(start);
  while (cur <= end) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const dateStr = cur.toISOString().slice(0, 10);
      const inYear = cur.getFullYear() === year;
      const isFuture = cur > today;
      const dObj = dayMap[dateStr];
      week.push({ 
        date: dateStr, 
        count: dObj ? dObj.count : 0, 
        titles: dObj ? dObj.titles : [], 
        inYear, 
        isFuture 
      });
      cur.setDate(cur.getDate() + 1);
    }
    weeks.push(week);
  }

  // Month labels
  let lastMonth = -1;
  const monthLabels = weeks.map(week => {
    const firstActive = week.find(d => d.inYear && !d.isFuture);
    if (!firstActive) return '';
    const m = new Date(firstActive.date).getMonth();
    if (m !== lastMonth) { lastMonth = m; return UA_MONTHS[m]; }
    return '';
  });

  return `
    <div class="heatmap-year-inner">
      <div class="heatmap-row-labels">
        <span></span><span>Пн</span><span></span><span>Ср</span><span></span><span>Пт</span><span></span>
      </div>
      <div class="heatmap-year-grid">
        <div class="heatmap-month-row">
          ${monthLabels.map(l => `<span>${l}</span>`).join('')}
        </div>
        <div class="heatmap-weeks-row">
          ${weeks.map(week => `
            <div class="heatmap-week-col">
              ${week.map(day => {
                if (!day.inYear || day.isFuture) return `<div class="heatmap-cell heat-void"></div>`;
                const intensity = maxCount > 0 ? day.count / maxCount : 0;
                const level = day.count === 0 ? 0 : intensity < 0.25 ? 1 : intensity < 0.5 ? 2 : intensity < 0.75 ? 3 : 4;
                let label = day.date;
                if (day.count > 0) {
                  const titlesList = day.titles.map(t => '• ' + t).join('&#10;');
                  label = `${day.date}: ${day.count} рецензій&#10;${titlesList}`;
                }
                return `<div class="heatmap-cell heat-${level}" title="${label}">${day.count > 0 ? `<span class="heatmap-count">${day.count}</span>` : ''}</div>`;
              }).join('')}
            </div>`).join('')}
        </div>
      </div>
    </div>
    <div class="heatmap-legend">
      <span style="color:var(--text-muted);font-size:0.75rem">Менше</span>
      <div class="heatmap-cell heat-0" style="width:12px;height:12px;position:static"></div>
      <div class="heatmap-cell heat-1" style="width:12px;height:12px;position:static"></div>
      <div class="heatmap-cell heat-2" style="width:12px;height:12px;position:static"></div>
      <div class="heatmap-cell heat-3" style="width:12px;height:12px;position:static"></div>
      <div class="heatmap-cell heat-4" style="width:12px;height:12px;position:static"></div>
      <span style="color:var(--text-muted);font-size:0.75rem">Більше</span>
    </div>`;
}

// ============================================================
// Rating Histogram
// ============================================================
function buildRatingHistogram(dist, titles) {
  const max = Math.max(...dist.slice(1), 1);
  const bars = dist.slice(1).map((count, i) => {
    const rating = i + 1;
    const pct = Math.round((count / max) * 100);
    const colors = ['#ef4444','#f97316','#f97316','#eab308','#eab308','#84cc16','#84cc16','#22c55e','#22c55e','#10b981'];
    
    let tooltip = '';
    if (count > 0 && titles && titles[rating]) {
      tooltip = `title="★ ${rating}&#10;${titles[rating].map(t => '• ' + t.replace(/"/g, '&quot;')).join('&#10;')}"`;
    }

    return `
      <div class="rh-bar-wrap" ${tooltip}>
        <div class="rh-count">${count}</div>
        <div class="rh-bar-bg">
          <div class="rh-bar-fill" style="height:${pct}%;background:${colors[i]}" data-pct="${pct}"></div>
        </div>
        <div class="rh-label">${rating}</div>
      </div>`;
  }).join('');
  return `<div class="rating-histogram">${bars}</div>`;
}

// ============================================================
// Status Donut
// ============================================================
function buildStatusDonut(statusMap) {
  const total = Object.values(statusMap).reduce((a, b) => a + b, 0);
  if (total === 0) return `<div class="empty-state" style="padding:20px"><h3>Немає даних</h3></div>`;

  const items = [
    { key: 'done',    label: t('status_done'),    color: '#22c55e' },
    { key: 'reading', label: t('status_reading'), color: '#3b82f6' },
    { key: 'planned', label: t('status_planned'), color: '#a855f7' },
    { key: 'dropped', label: t('status_dropped'), color: '#ef4444' },
  ];

  const r = 60, cx = 80, cy = 80, stroke = 22;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  const segments = items.map(item => {
    const count = statusMap[item.key] || 0;
    const frac = count / total;
    const dash = frac * circ;
    const seg = { ...item, count, frac, dash, offset };
    offset += dash;
    return seg;
  });

  const svgCircles = segments.map(s =>
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${s.color}" stroke-width="${stroke}"
      stroke-dasharray="${s.dash} ${circ - s.dash}"
      stroke-dashoffset="${circ - s.offset + circ * 0.25}"
      style="transition:stroke-dasharray 0.6s ease"
    />`
  ).join('');

  const legend = items.map(item => {
    const count = statusMap[item.key] || 0;
    const pct = total ? Math.round(count / total * 100) : 0;
    return `
      <div class="donut-legend-item">
        <span class="donut-legend-dot" style="background:${item.color}"></span>
        <span class="donut-legend-label">${item.label}</span>
        <span class="donut-legend-count">${count}</span>
        <span class="donut-legend-pct">${pct}%</span>
      </div>`;
  }).join('');

  return `
    <div class="donut-wrap">
      <svg width="160" height="160" viewBox="0 0 160 160" class="donut-svg">
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="var(--border)" stroke-width="${stroke}"/>
        ${svgCircles}
        <text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="middle"
          style="fill:var(--text-primary);font-size:18px;font-weight:700">${total}</text>
        <text x="${cx}" y="${cy + 18}" text-anchor="middle" dominant-baseline="middle"
          style="fill:var(--text-muted);font-size:10px">всього</text>
      </svg>
      <div class="donut-legend">${legend}</div>
    </div>`;
}

// ============================================================
// Chapter Stats
// ============================================================
function buildChapterStats(stats) {
  if (!stats.avgChapters) return `<div class="empty-state" style="padding:20px"><h3>${t('no_data')}</h3></div>`;

  const items = [
    { icon: '📊', label: t('avg_lbl'), value: stats.avgChapters },
    { icon: '📍', label: t('median_lbl'), value: stats.medianChapters },
    { icon: '📉', label: t('min_lbl'), value: stats.minChapters },
    { icon: '📈', label: t('max_lbl'), value: stats.maxChapters },
    { icon: '📚', label: t('total_chap_lbl'), value: stats.totalChapters.toLocaleString('uk-UA') },
  ];

  let popularHtml = '';
  if (stats.topChapterLengths && stats.topChapterLengths.length > 0) {
    popularHtml = `
      <div class="popular-lengths">
        <div class="popular-lengths-title">${t('popular_lengths')}</div>
        <div class="popular-lengths-list">
          ${stats.topChapterLengths.map(item => {
            const dist = item.details || {};
            const distList = Object.entries(dist).sort((a,b)=>Number(a[0])-Number(b[0])).map(([chps, c]) => `• ${chps} ${t('chapters')}: ${c} ${t('mangas')}`).join('&#10;');
            const titleAttr = distList ? `title="${distList}"` : '';
            return `
            <div class="popular-length-item" ${titleAttr}>
              <span class="p-len-val">${item.length} ${t('chapters')}</span>
              <span class="p-len-count">${item.count} ${t('mangas')}</span>
            </div>`;
          }).join('')}
        </div>
      </div>`;
  }

  return `
    <div class="chapter-stats-block">
      <div class="chapter-stats-grid">
        ${items.map(i => `
          <div class="chapter-stat-card">
            <div class="chapter-stat-icon">${i.icon}</div>
            <div class="chapter-stat-value">${i.value}</div>
            <div class="chapter-stat-label">${i.label}</div>
          </div>`).join('')}
      </div>
      ${popularHtml}
    </div>`;
}

// ============================================================
// Bar Chart (authors/artists)
// ============================================================
function buildBarChart(entries) {
  if (!entries.length) return `<div style="color:var(--text-muted);padding:16px">Немає даних (додайте авторів у рецензіях)</div>`;
  const max = entries[0][1];
  return `
    <div class="bar-chart">
      ${entries.map(([name, count]) => `
        <div class="bar-row">
          <div class="bar-name" title="${escapeHtml(name)}">${escapeHtml(name)}</div>
          <div class="bar-track">
            <div class="bar-fill" style="width:${Math.round(count / max * 100)}%"></div>
          </div>
          <div class="bar-count">${count}</div>
        </div>`).join('')}
    </div>`;
}

// ============================================================
// Tag Cloud
// ============================================================
function buildTagCloud(tags) {
  const max = tags[0][1];
  return `
    <div class="tag-cloud">
      ${tags.map(([tag, count]) => {
        const size = 0.75 + (count / max) * 0.65;
        return `<span class="tag-cloud-item" style="font-size:${size.toFixed(2)}rem" title="${count} рецензій">${escapeHtml(tag)} <sup>${count}</sup></span>`;
      }).join('')}
    </div>`;
}

// ============================================================
// Monthly chart (last 12 months)
// ============================================================
function buildMonthlyChart(dayMap) {
  const UA_MONTHS = getMonths();
  const monthCounts = {};
  Object.entries(dayMap).forEach(([date, dObj]) => {
    const m = date.slice(0, 7); // YYYY-MM
    monthCounts[m] = (monthCounts[m] || 0) + dObj.count;
  });

  // Last 12 full months
  const months = [];
  const now = new Date();
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    months.push({ key, label: UA_MONTHS[d.getMonth()], count: monthCounts[key] || 0 });
  }

  const max = Math.max(...months.map(m => m.count), 1);

  return `
    <div class="monthly-chart">
      ${months.map(m => `
        <div class="monthly-col">
          <div class="monthly-count">${m.count || ''}</div>
          <div class="monthly-bar-wrap">
            <div class="monthly-bar" style="height:${Math.round(m.count / max * 100)}%"></div>
          </div>
          <div class="monthly-label">${m.label}</div>
        </div>`).join('')}
    </div>`;
}

// ============================================================
// Era Chart (Chronological Bar Chart)
// ============================================================
function buildEraChart(eraStats) {
  const max = Math.max(...eraStats.map(e => e[1]), 1);
  return `
    <div class="bar-chart era-chart">
      ${eraStats.map(([year, count]) => {
        const pct = Math.round((count / max) * 100);
        return `
          <div class="bar-row">
            <div class="bar-name" style="width: 50px">${year}</div>
            <div class="bar-track">
              <div class="bar-fill" style="width: ${pct}%; background: linear-gradient(90deg, var(--accent2), var(--accent))"></div>
            </div>
            <div class="bar-count">${count}</div>
          </div>`;
      }).join('')}
    </div>`;
}

// ============================================================
// Events
// ============================================================
function wireEvents(stats, userId) {
  document.getElementById('stats-back-btn')?.addEventListener('click', () => {
    navigate(`account`);
  });

  // ---- Heatmap year navigation ----
  const heatmapContainer = document.getElementById('heatmap-container');
  const yearLabel = document.getElementById('heatmap-year-label');
  const prevBtn = document.getElementById('heatmap-prev-btn');
  const nextBtn = document.getElementById('heatmap-next-btn');
  const currentYear = new Date().getFullYear();

  function renderHeatmapYear() {
    if (yearLabel) yearLabel.textContent = _heatmapYear;
    if (prevBtn) prevBtn.disabled = _heatmapYear <= HEATMAP_START_YEAR;
    if (nextBtn) nextBtn.disabled = _heatmapYear >= currentYear;
    
    // Update yearly count
    const yearCountEl = document.getElementById('heatmap-year-count');
    if (yearCountEl) {
      const count = stats.reviewsByYear[_heatmapYear] || 0;
      yearCountEl.textContent = `(${count} прочитано)`;
    }

    if (heatmapContainer) {
      heatmapContainer.innerHTML = buildHeatmapForYear(_heatmapYear, stats.dayMap, stats.maxDayCount);
    }
  }

  prevBtn?.addEventListener('click', () => {
    if (_heatmapYear > HEATMAP_START_YEAR) { _heatmapYear--; renderHeatmapYear(); }
  });
  nextBtn?.addEventListener('click', () => {
    if (_heatmapYear < currentYear) { _heatmapYear++; renderHeatmapYear(); }
  });

  renderHeatmapYear();

  renderHeatmapYear();
}
