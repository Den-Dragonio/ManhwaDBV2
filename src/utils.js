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
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 10 - full - (half ? 1 : 0);
  let html = '<div class="stars-display">';
  for (let i = 0; i < full; i++) html += '<span class="star full"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></span>';
  if (half) html += '<span class="star half"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></span>';
  for (let i = 0; i < empty; i++) html += '<span class="star"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></span>';
  html += `</div>`;
  return html;
}

export function avatarHtml(user, size = 'md') {
  if (user && user.avatarBase64) {
    return `<img class="avatar avatar-${size}" src="${user.avatarBase64}" alt="${escapeHtml(user.username)}">`;
  }
  const initials = user ? (user.username || '?').charAt(0).toUpperCase() : '?';
  return `<div class="avatar avatar-${size}">${initials}</div>`;
}

export function showToast(msg, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) { container = document.createElement('div'); container.className = 'toast-container'; document.body.appendChild(container); }
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  toast.innerHTML = `<span>${icons[type] || ''}</span><span>${escapeHtml(msg)}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.3s'; setTimeout(() => toast.remove(), 300); }, 3500);
}

export function showLoader(container) {
  container.innerHTML = `<div style="display:flex;justify-content:center;padding:80px"><div class="loader-spinner"></div></div>`;
}
