// ============================================================
// utils.js — Shared utility helpers (updated for Firebase)
// ============================================================

export function timeAgo(isoString) {
  if (!isoString) return '';
  const now = Date.now();
  const then = new Date(isoString).getTime();
  const diff = Math.floor((now - then) / 1000);
  if (diff < 60) return 'щойно';
  if (diff < 3600) return `${Math.floor(diff / 60)} хв тому`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} год тому`;
  if (diff < 86400 * 30) return `${Math.floor(diff / 86400)} д тому`;
  return new Date(isoString).toLocaleDateString('uk-UA', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function formatDate(isoString) {
  if (!isoString) return '';
  return new Date(isoString).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function escapeHtml(str) {
  return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Compress image to base64 for Firestore storage
// maxWidth in px, quality 0-1
export function compressImage(file, maxWidth = 700, quality = 0.65) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let w = img.width, h = img.height;
        if (w > maxWidth) { h = Math.round(h * maxWidth / w); w = maxWidth; }
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function compressAvatar(file) {
  return compressImage(file, 200, 0.7);
}

export function starsHtml(rating, isDropped = false) {
  if (isDropped) {
    return `<div class="crosses-display">${Array(10).fill('<span class="cross-mark">✕</span>').join('')}</div>`;
  }
  const path = 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';

  let r = Number(rating);
  if (!Number.isFinite(r)) r = 0;
  r = Math.max(0, Math.min(10, Math.round(r * 2) / 2));

  let html = '<div class="stars-display">';
  for (let i = 1; i <= 10; i++) {
    const isFull = r >= i;
    const isHalf = !isFull && r >= (i - 0.5);
    
    if (isFull) {
      html += `<span class="star full"><svg viewBox="0 0 24 24"><path d="${path}"/></svg></span>`;
    } else if (isHalf) {
      html += `
        <span class="star half">
          <svg viewBox="0 0 24 24"><path d="${path}"/></svg>
          <span class="star-half-fill"><svg viewBox="0 0 24 24"><path d="${path}"/></svg></span>
        </span>`;
    } else {
      html += `<span class="star"><svg viewBox="0 0 24 24"><path d="${path}"/></svg></span>`;
    }
  }
  html += '</div>';
  return html;
}

// Replaces +/- symbols with emojis for polished display
export function formatTag(tag) {
  if (!tag) return '';
  let t = tag.trim();
  if (t === 'fapped') return 'fapped 🍆💦';
  if (t.endsWith('+')) {
    const posEmojis = ['😍', '❤️', '🌟', '✨', '💎', '🔥'];
    const idx = Math.abs(t.length) % posEmojis.length;
    return t.slice(0, -1).trim() + ' ' + posEmojis[idx];
  }
  if (t.endsWith('-')) {
    const negEmojis = ['🗑️', '💩', '🤮', '📉', '👎', '🧊'];
    const idx = Math.abs(t.length) % negEmojis.length;
    return t.slice(0, -1).trim() + ' ' + negEmojis[idx];
  }
  return t;
}

export async function searchHChan(query) {
  try {
    const res = await fetch('https://x9.h-chan.me/engine/ajax/search.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ query: query.trim() }),
    });
    const html = await res.text();
    // Parse result items from HTML snippet
    const items = [];
    const regex = /href="([^"]*\/manga\/(\d+)-([^"]+)\.html)".*?<span class="searchdesc">([^<]+)<\/span>/gi;
    let m;
    while ((m = regex.exec(html)) !== null) {
      items.push({
        id: m[2],
        url: m[1].startsWith('http') ? m[1] : 'https://x9.h-chan.me' + m[1],
        title: m[3].replace(/-/g, ' '),
        desc: m[4],
        source: 'h-chan'
      });
    }
    return items;
  } catch (e) {
    console.warn('H-Chan search failed:', e);
    return [];
  }
}

// Best-effort rating widget for x9.h-chan.me (may be blocked by CORS).
// Returns: { score: number, votes: number } or null.
export async function fetchX9QualityByTitle(title) {
  const q = (title || '').trim();
  if (!q) return null;

  const cache = (typeof window !== 'undefined')
    ? (window.__x9QualityCache ||= new Map())
    : null;
  if (cache?.has(q)) return cache.get(q);

  try {
    const searchRes = await fetch('https://x9.h-chan.me/engine/ajax/search.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ query: q }),
    });
    const searchHtml = await searchRes.text();

    // Try to find first manga link from suggestions.
    const hrefMatch = searchHtml.match(/href=["']([^"']*\/manga\/\d+-[^"']+\.html[^"']*)["']/i);
    let mangaUrl = hrefMatch?.[1] || null;
    if (!mangaUrl) {
      const rel = searchHtml.match(/(\/manga\/\d+-[^"' >]+\.html)/i)?.[1];
      if (rel) mangaUrl = 'https://x9.h-chan.me' + rel;
    }
    if (!mangaUrl) return null;

    if (mangaUrl.startsWith('//')) mangaUrl = 'https:' + mangaUrl;
    if (!mangaUrl.startsWith('http')) mangaUrl = 'https://x9.h-chan.me' + (mangaUrl.startsWith('/') ? mangaUrl : '/' + mangaUrl);

    const mangaRes = await fetch(mangaUrl);
    const mangaHtml = await mangaRes.text();

    const plus = parseInt((mangaHtml.match(/Плюсиков:[^0-9]*([0-9]+)/i) || [])[1], 10);
    const likes = parseInt((mangaHtml.match(/Лайков:[^0-9]*([0-9]+)/i) || [])[1], 10);

    const score = Number.isFinite(likes) ? likes : plus;
    const votes = Number.isFinite(plus) ? plus : likes;

    if (!Number.isFinite(score) || !Number.isFinite(votes)) return null;
    const result = { score: Math.max(1, score), votes: Math.max(1, votes) };

    cache?.set(q, result);
    return result;
  } catch {
    return null;
  }
}

export function avatarHtml(user, size = 'md') {
  if (user && user.avatarBase64) {
    return `<img class="avatar avatar-${size}" src="${user.avatarBase64}" alt="${escapeHtml(user.username)}">`;
  }
  const initials = user ? (user.username || '?').charAt(0).toUpperCase() : '?';
  return `<div class="avatar avatar-${size}">${initials}</div>`;
}

export function showToast(msg, type = 'info', opts = {}) {
  let container = document.querySelector('.toast-container');
  if (!container) { container = document.createElement('div'); container.className = 'toast-container'; document.body.appendChild(container); }
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '🚫' };
  toast.innerHTML = `<span>${icons[type] || ''}</span><span style="flex:1">${escapeHtml(msg)}</span>${opts.persistent ? '<button class="toast-close">✕</button>' : ''}`;
  container.appendChild(toast);
  if (opts.persistent) {
    toast.querySelector('.toast-close').addEventListener('click', () => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.3s'; setTimeout(() => toast.remove(), 300); });
  } else {
    setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.3s'; setTimeout(() => toast.remove(), 300); }, 3500);
  }
}

export function showLoader(container) {
  container.innerHTML = `<div style="display:flex;justify-content:center;padding:80px"><div class="loader-spinner"></div></div>`;
}
