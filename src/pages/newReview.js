// ============================================================
// pages/newReview.js — Create / Edit review (async Firestore)
// ============================================================

import { Reviews, Session, News } from '../store.js';
import { starsHtml, compressImage, showToast, escapeHtml, showLoader } from '../utils.js';
import { navigate } from '../router.js';

export async function renderNewReview(editId = null) {
  const user = Session.currentUser();
  if (!user) { navigate('home'); return; }

  const container = document.getElementById('page-root');
  let existing = null;

  if (editId) {
    showLoader(container);
    existing = await Reviews.byId(editId);
  }

  let currentCover = existing?.coverBase64 || '';
  let currentRating = existing?.rating ?? 5;
  let currentChapters = existing?.chapters || '';
  let currentStatus = existing?.status || 'done';

  container.innerHTML = `
    <div class="page-container" style="max-width:720px">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:28px">
        <button class="btn btn-ghost btn-sm" id="back-btn">← Назад</button>
        <h1 class="section-title" style="margin:0">${existing ? '✏️ Редагувати рецензію' : '✍️ Нова рецензія'}</h1>
      </div>
      <div class="card card-padding">
        <!-- Cover -->
        <div class="form-group" style="margin-bottom:20px">
          <label class="form-label">Обкладинка манхви (необов'язково)</label>
          <div class="cover-upload-area" id="cover-upload-area">
            ${currentCover ? `<img src="${currentCover}" id="cover-preview-img">` : ''}
            <div class="upload-overlay">
              <span style="font-size:28px">🖼️</span>
              <span>${currentCover ? 'Змінити обкладинку' : 'Натисніть або перетягніть'}</span>
            </div>
            ${!currentCover ? `<span style="font-size:32px">🖼️</span><span>Натисніть або перетягніть файл</span>` : ''}
          </div>
          <input type="file" id="cover-file" accept="image/*" style="display:none">
          <div id="cover-actions" style="margin-top:8px;display:${currentCover ? 'flex' : 'none'};gap:8px">
            <button class="btn btn-danger btn-sm" id="remove-cover-btn">🗑 Видалити обкладинку</button>
          </div>
        </div>

        <!-- Title -->
        <div class="form-group" style="margin-bottom:16px">
          <label class="form-label">Назва манхви <span style="color:var(--accent)">*</span></label>
          <input class="input" type="text" id="review-title" placeholder="Назва..." value="${escapeHtml(existing?.title || '')}">
        </div>

        <!-- Chapters -->
        <div class="form-group" style="margin-bottom:16px">
          <label class="form-label">Кількість глав <span style="color:var(--accent)">*</span></label>
          <input class="input" type="number" id="review-chapters" placeholder="0" min="0" value="${currentChapters}">
        </div>

        <!-- Date -->
        <div class="form-group" style="margin-bottom:16px">
          <label class="form-label">Дата прочитання (необов'язково)</label>
          <input class="input" type="date" id="review-date" value="${existing?.date || ''}">
        </div>

        <!-- Tags -->
        <div class="form-group" style="margin-bottom:16px">
          <label class="form-label">Теги (через кому)</label>
          <input class="input" type="text" id="review-tags" placeholder="екшн, романтика, фентезі..." value="${existing?.tags?.join(', ') || ''}">
        </div>

        <!-- Status -->
        <div class="form-group" style="margin-bottom:16px">
          <label class="form-label">Статус <span style="color:var(--accent)">*</span></label>
          <select class="select" id="review-status">
            <option value="done" ${currentStatus === 'done' ? 'selected' : ''}>✅ Завершено</option>
            <option value="reading" ${currentStatus === 'reading' ? 'selected' : ''}>📖 Читаю</option>
            <option value="planned" ${currentStatus === 'planned' ? 'selected' : ''}>⏳ В планах (Прочитати потім)</option>
            <option value="dropped" ${currentStatus === 'dropped' ? 'selected' : ''}>❌ Кинув</option>
          </select>
        </div>

        <!-- Rating -->
        <div class="form-group" style="margin-bottom:16px">
          <label class="form-label">Оцінка <span style="color:var(--accent)">*</span></label>
          <div class="star-slider-wrap">
            <div class="star-slider-preview">
              <div id="stars-preview">${currentStatus === 'planned' ? '<span style="color:var(--text-muted);font-size:0.9rem">Ще не оцінено</span>' : starsHtml(currentRating, currentStatus === 'dropped')}</div>
              <span class="star-slider-label" id="rating-label">${currentStatus === 'dropped' ? 'Кинута' : currentStatus === 'planned' ? '-' : currentRating + '/10'}</span>
            </div>
            <input type="range" class="star-slider" id="rating-slider" min="0" max="10" step="0.5" value="${currentRating}" ${currentStatus === 'dropped' || currentStatus === 'planned' ? 'disabled' : ''}>
          </div>
        </div>

        <!-- Text -->
        <div class="form-group" style="margin-bottom:24px">
          <label class="form-label">Текст рецензії (необов'язково)</label>
          <textarea class="textarea" id="review-text" placeholder="Ваші враження про манхву..." style="min-height:160px">${escapeHtml(existing?.text || '')}</textarea>
        </div>

        <div id="review-form-error" class="form-error" style="display:none;margin-bottom:12px"></div>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <button class="btn btn-primary" id="save-review-btn" style="flex:1;min-width:180px" data-label="${existing ? 'Зберегти зміни' : 'Опублікувати рецензію'}">
            ${existing ? '💾 Зберегти зміни' : '📝 Опублікувати рецензію'}
          </button>
          <button class="btn btn-secondary" id="cancel-review-btn">Скасувати</button>
        </div>
      </div>
    </div>`;

  document.getElementById('back-btn').addEventListener('click', () => history.back());
  document.getElementById('cancel-review-btn').addEventListener('click', () => history.back());

  // Cover upload
  const coverArea = document.getElementById('cover-upload-area');
  const coverFile = document.getElementById('cover-file');
  const coverActions = document.getElementById('cover-actions');

  function refreshCoverUI() {
    const img = coverArea.querySelector('#cover-preview-img');
    const placeholders = coverArea.querySelectorAll('span:not(.upload-overlay span)');
    if (currentCover) {
      if (!img) {
        const newImg = document.createElement('img'); newImg.id = 'cover-preview-img'; newImg.src = currentCover;
        const overlay = coverArea.querySelector('.upload-overlay');
        coverArea.insertBefore(newImg, overlay);
      } else img.src = currentCover;
      placeholders.forEach(s => s.remove());
      coverActions.style.display = 'flex';
    } else {
      if (img) img.remove();
      coverActions.style.display = 'none';
      if (!coverArea.querySelector('span:not(.upload-overlay span)')) {
        const s1 = document.createElement('span'); s1.style.fontSize = '32px'; s1.textContent = '🖼️';
        const s2 = document.createElement('span'); s2.textContent = 'Натисніть або перетягніть файл';
        coverArea.appendChild(s1); coverArea.appendChild(s2);
      }
    }
  }

  coverArea.addEventListener('click', () => coverFile.click());
  coverFile.addEventListener('change', async () => {
    const file = coverFile.files[0]; if (!file) return;
    currentCover = await compressImage(file, 700, 0.65);
    refreshCoverUI();
  });

  document.getElementById('remove-cover-btn').addEventListener('click', (e) => {
    e.stopPropagation(); currentCover = ''; refreshCoverUI();
  });

  coverArea.addEventListener('dragover', e => { e.preventDefault(); coverArea.style.borderColor = 'var(--accent)'; });
  coverArea.addEventListener('dragleave', () => { coverArea.style.borderColor = ''; });
  coverArea.addEventListener('drop', async (e) => {
    e.preventDefault(); coverArea.style.borderColor = '';
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith('image/')) { currentCover = await compressImage(file, 700, 0.65); refreshCoverUI(); }
  });

  // Rating/status wiring
  const statusSel = document.getElementById('review-status');
  const slider = document.getElementById('rating-slider');
  const starsPreview = document.getElementById('stars-preview');
  const ratingLabel = document.getElementById('rating-label');

  statusSel.addEventListener('change', () => {
    currentStatus = statusSel.value;
    const isDropped = currentStatus === 'dropped';
    const isPlanned = currentStatus === 'planned';
    slider.disabled = isDropped || isPlanned;
    if (isPlanned) {
      starsPreview.innerHTML = '<span style="color:var(--text-muted);font-size:0.9rem">Ще не оцінено</span>';
      ratingLabel.textContent = '-';
    } else {
      starsPreview.innerHTML = starsHtml(isDropped ? 0 : currentRating, isDropped);
      ratingLabel.textContent = isDropped ? 'Кинута' : currentRating + '/10';
    }
  });

  slider.addEventListener('input', () => {
    currentRating = parseFloat(slider.value);
    starsPreview.innerHTML = starsHtml(currentRating, false);
    ratingLabel.textContent = currentRating + '/10';
  });

  const saveBtn = document.getElementById('save-review-btn');
  saveBtn.addEventListener('click', async () => {
    const title = document.getElementById('review-title').value.trim();
    const chaptersStr = document.getElementById('review-chapters').value;
    const chapters = parseInt(chaptersStr, 10);
    const date = document.getElementById('review-date').value;
    const tagsRaw = document.getElementById('review-tags').value;
    const text = document.getElementById('review-text').value.trim();
    const status = statusSel.value;
    const rating = (status === 'dropped' || status === 'planned') ? 0 : currentRating;
    const tags = tagsRaw.split(',').map(t => t.trim()).filter(Boolean);
    const errEl = document.getElementById('review-form-error');

    if (!title) { errEl.textContent = "Назва обов'язкова"; errEl.style.display = 'block'; return; }
    if (!chaptersStr || isNaN(chapters) || chapters < 0) { errEl.textContent = "Кількість глав обов'язкова (0 або більше)"; errEl.style.display = 'block'; return; }

    saveBtn.disabled = true; saveBtn.textContent = 'Збереження...';
    const data = { title, coverBase64: currentCover, text, rating, chapters, status, tags, date };

    try {
      let review;
      if (existing) {
        review = await Reviews.update(editId, data);
        showToast('Рецензію оновлено ✅', 'success');
      } else {
        review = await Reviews.create(user.id, data);
        await News.add('review', user.id, review.id, { username: user.username, extra: title });
        showToast('Рецензію опубліковано! 📝', 'success');
      }
      navigate(`review/${review.id}`);
    } catch (e) {
      errEl.textContent = 'Помилка: ' + e.message; errEl.style.display = 'block';
      saveBtn.disabled = false; saveBtn.textContent = saveBtn.dataset.label;
    }
  });
}
