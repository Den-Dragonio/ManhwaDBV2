// ============================================================
// pages/newReview.js — Create / Edit review (async Firestore)
// ============================================================

import { Reviews, Session, News } from '../store.js';
import { starsHtml, compressImage, showToast, escapeHtml, showLoader, searchHChan } from '../utils.js';
import { navigate } from '../router.js';

export async function renderNewReview(editId = null, preSelectedTitleId = null) {
  const user = Session.currentUser();
  if (!user) { navigate('home'); return; }

  const container = document.getElementById('page-root');
  const today = new Date().toISOString().split('T')[0];
  let existing = null;

  if (editId) {
    showLoader(container);
    existing = await Reviews.byId(editId);
  }

  let currentCover = existing?.coverBase64 || '';
  let currentRating = existing?.rating ?? 5;
  let currentChapters = existing?.chapters || '';
  let currentStatus = existing?.status || 'done';
  let selectedTitleId = existing?.titleId || preSelectedTitleId || null;

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
          <div style="position:relative">
            <input class="input" type="text" id="review-title" placeholder="Введіть назву (пошук в базі)..." value="${escapeHtml(existing?.title || '')}" autocomplete="off">
            <div id="autocomplete-results" style="display:none;position:absolute;top:100%;left:0;right:0;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-sm);box-shadow:var(--shadow-float);z-index:100;max-height:300px;overflow-y:auto;margin-top:4px">
            </div>
          </div>
        </div>

        <!-- Chapters -->
        <div class="form-group" style="margin-bottom:16px">
          <label class="form-label">Кількість глав <span style="color:var(--accent)">*</span></label>
          <input class="input" type="number" id="review-chapters" placeholder="0" min="0" value="${currentChapters}">
        </div>

        <!-- Date -->
        <div class="form-group" style="margin-bottom:16px">
          <label class="form-label">Дата прочитання (необов'язково)</label>
          <input class="input" type="date" id="review-date" min="2000-01-01" max="${today}" value="${existing?.date || ''}">
        </div>

        <!-- Tags -->
        <div class="form-group" style="margin-bottom:16px">
          <label class="form-label">Теги (через кому)</label>
          <input class="input" type="text" id="review-tags" placeholder="екшн, романтика, фентезі..." value="${existing?.tags?.join(', ') || ''}">
          <div class="preset-tags-wrap" id="preset-tags-wrap" style="margin-top:10px">
            <!-- 1. Special -->
            <button type="button" class="preset-tag preset-tag-fapped" data-tag="fapped">fapped 🍆💦</button>

            <!-- 2. Types -->
            <button type="button" class="preset-tag" data-tag="Манхва">Манхва</button>
            <button type="button" class="preset-tag" data-tag="Манга">Манга</button>

            <!-- 3. Genres -->
            <button type="button" class="preset-tag preset-tag-fire" style="background:rgba(255,105,180,0.1);color:#ff69b4;border-color:rgba(255,105,180,0.3)" data-tag="Романтика">Романтика 😍</button>
            <button type="button" class="preset-tag preset-tag-fire" style="background:rgba(100,149,237,0.1);color:#6495ed;border-color:rgba(100,149,237,0.3)" data-tag="Драма">Драма 🎭</button>
            <button type="button" class="preset-tag preset-tag-fire" style="background:rgba(255,165,0,0.1);color:#ffa500;border-color:rgba(255,165,0,0.3)" data-tag="Комедія">Комедія 😂</button>
            <button type="button" class="preset-tag preset-tag-fire" style="background:rgba(128,128,128,0.1);color:#808080;border-color:rgba(128,128,128,0.3)" data-tag="Кримінальний">Кримінальний 🔫</button>
            
            <button type="button" class="preset-tag" data-tag="Тройничок">Тройничок 👨‍👩‍👧</button>
            <button type="button" class="preset-tag" data-tag="Гарем">Гарем 👯‍♀️</button>
            <button type="button" class="preset-tag" data-tag="Таймскип">Таймскип ⏳</button>
            <button type="button" class="preset-tag" data-tag="Принуждение">Принуждение 😈</button>
            
            <button type="button" class="preset-tag" data-tag="рентген">Рентген 🩻</button>
            <button type="button" class="preset-tag" data-tag="ахегао">Ахегао 🤤</button>
            <button type="button" class="preset-tag" data-tag="🔥🔞сцены">🔥🔞 Сцени</button>
            <button type="button" class="preset-tag" data-tag="nrt">NTR 💔</button>
            <button type="button" class="preset-tag" data-tag="animated">Animated 🎬</button>
            <button type="button" class="preset-tag" data-tag="футфетиш">Футфетиш 👣</button>
            <button type="button" class="preset-tag" data-tag="бдсм">БДСМ ⛓️</button>

            <!-- 4. Community Stats -->
            <button type="button" class="preset-tag preset-tag-fire" data-tag="Сюжет +">Сюжет 😍</button>
            <button type="button" class="preset-tag preset-tag-fire" data-tag="Графіка +">Графіка ❤️</button>
            <button type="button" class="preset-tag preset-tag-fire" data-tag="Герої +">Герої 😍</button>
            <button type="button" class="preset-tag preset-tag-vomit" data-tag="Сюжет -">Сюжет 💩</button>
            <button type="button" class="preset-tag preset-tag-vomit" data-tag="Графіка -">Графіка 🤮</button>
            <button type="button" class="preset-tag preset-tag-vomit" data-tag="Герої -">Герої 👎</button>
          </div>
        </div>

        <!-- Status -->
        <div class="form-group" style="margin-bottom:16px">
          <label class="form-label">Статус <span style="color:var(--accent)">*</span></label>
          <select class="select" id="review-status">
            <option value="done" ${currentStatus === 'done' ? 'selected' : ''}>✅ Прочитано</option>
            <option value="reading" ${currentStatus === 'reading' ? 'selected' : ''}>📖 Читаю</option>
            <option value="planned" ${currentStatus === 'planned' ? 'selected' : ''}>⏳ В планах (Прочитати потім)</option>
            <option value="dropped" ${currentStatus === 'dropped' ? 'selected' : ''}>❌ Кинув</option>
          </select>
        </div>

        <!-- Rating -->
        <div class="form-group" style="margin-bottom:24px;text-align:center">
          <label class="form-label" style="display:block;margin-bottom:12px">Оцінка <span style="color:var(--accent)">*</span></label>
          <div style="display:flex;justify-content:center">
            <div id="interactive-stars-wrap" class="rating-stars-wrapper" style="cursor:pointer;user-select:none">
               <!-- Rendered dynamically -->
            </div>
          </div>
          <div id="rating-label" style="font-size:1.6rem;font-weight:900;color:var(--accent2);margin-top:12px;font-family:var(--font-display)">
            ${currentStatus === 'dropped' ? 'Кинута' : currentStatus === 'planned' ? '-' : currentRating + '/10'}
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

  // Date normalization (24 -> 2024)
  const dateInput = document.getElementById('review-date');
  dateInput.addEventListener('blur', () => {
    const val = dateInput.value;
    if (!val) return;
    const parts = val.split('-');
    let year = parseInt(parts[0], 10);
    if (year > 0 && year < 100) {
      year += 2000;
      dateInput.value = `${year}-${parts[1]}-${parts[2]}`;
    }
  });


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

  // Fetch user reviews once for client-side deduplication
  let userReviews = [];
  try { userReviews = await Reviews.byUser(user.id); } catch (e) { console.warn("Could not fetch user reviews", e); }

  // Search Integration (Firestore + AniList + MangaDex + H-Chan)
  const titleInput = document.getElementById('review-title');
  const resultsBox = document.getElementById('autocomplete-results');
  let searchTimeout = null;

  titleInput.addEventListener('input', () => {
    const q = titleInput.value.trim();
    if (q.length < 2) { resultsBox.style.display = 'none'; return; }

    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(async () => {
      try {
        resultsBox.style.display = 'block';
        resultsBox.innerHTML = '<div style="padding:12px;text-align:center;color:var(--text-muted)">Шукаємо в базі та мережі...</div>';

        // Helper for normalization
        const normalize = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '').trim();

        // Parallel fetching for speed
        const [firestoreRes, aniRes, hchanRes] = await Promise.all([
          // 1. Search in our broad metadata collection
          (async () => {
            try {
              const { query, collection, orderBy, startAt, endAt, limit, getDocs } = await import('firebase/firestore');
              const { db } = await import('../firebase.js');
              const qry = query(
                collection(db, 'manga_metadata'),
                orderBy('title'),
                startAt(q),
                endAt(q + '\uf8ff'),
                limit(15)
              );
              const snap = await getDocs(qry);
              return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            } catch (e) { return []; }
          })(),
          // 2. AniList
          fetch('https://graphql.anilist.co', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              query: `query ($search: String) { Page(page: 1, perPage: 8) { media(search: $search, type: MANGA) { id title { romaji english } coverImage { extraLarge } chapters } } }`,
              variables: { search: q }
            })
          }).then(r => r.json()).catch(() => ({ data: { Page: { media: [] } } })),
          // 3. H-Chan
          searchHChan(q).catch(() => [])
        ]);

        const seenNames = new Set();
        const finalHtmlItems = [];

        // 0. Process User's Existing Reviews (Highest Priority)
        userReviews.forEach(ur => {
           if (ur.title.toLowerCase().includes(q.toLowerCase())) {
             const norm = normalize(ur.title);
             if (seenNames.has(norm)) return;
             seenNames.add(norm);
             const cover = ur.coverBase64 || '';
             
             finalHtmlItems.push(`
               <div class="ac-item" style="display:flex;align-items:center;gap:12px;padding:8px;cursor:pointer;border-bottom:1px solid var(--border);background:var(--bg-card);border-left:4px solid var(--accent)" 
                    data-title="${escapeHtml(ur.title)}" data-cover="${cover}" data-chapters="${ur.chapters || 0}" data-tid="${ur.titleId}" data-editid="${ur.id}">
                 ${cover ? `<img src="${cover}" style="width:32px;height:45px;object-fit:cover;border-radius:4px">` : `<div style="width:32px;height:45px;background:var(--bg-hover);border-radius:4px"></div>`}
                 <div style="flex:1">
                   <div style="font-weight:600;font-size:0.9rem;color:var(--accent)">${escapeHtml(ur.title)}</div>
                   <div style="font-size:0.75rem;font-weight:600;color:var(--accent)">✏️ Ви вже писали (Натисніть щоб редагувати)</div>
                 </div>
               </div>`);
           }
        });

        // 1. Process Database Results (Highest Priority)
        (firestoreRes || []).forEach(m => {
          const title = m.title || m.anilist?.title || m.toongod?.title || 'Unknown';
          const norm = normalize(title);
          if (seenNames.has(norm)) return;
          seenNames.add(norm);

          const cover = m.anilist?.coverImage?.large || m.toongod?.cover || '';
          const chapters = m.anilist?.chapters || m.toongod?.chapters || m.chapters || 0;
          finalHtmlItems.push(`
            <div class="ac-item db-match" style="display:flex;align-items:center;gap:12px;padding:8px;cursor:pointer;border-bottom:1px solid var(--border);background:rgba(var(--accent-rgb), 0.05)" 
                 data-title="${escapeHtml(title)}" data-cover="${cover}" data-chapters="${chapters}" data-tid="${m.id}">
              ${cover ? `<img src="${cover}" style="width:32px;height:45px;object-fit:cover;border-radius:4px">` : `<div style="width:32px;height:45px;background:var(--bg-hover);border-radius:4px"></div>`}
              <div style="flex:1">
                <div style="font-weight:600;font-size:0.9rem">${escapeHtml(title)}</div>
                <div style="font-size:0.7rem;color:var(--accent2)">У базі ManhwaDB ${chapters ? `• ${chapters} глав` : ''}</div>
              </div>
            </div>`);
        });

        // 2. Process AniList Results
        const aniMedia = aniRes.data?.Page?.media || [];
        aniMedia.forEach(m => {
          const t = m.title.english || m.title.romaji;
          const norm = normalize(t);
          if (seenNames.has(norm)) return;
          seenNames.add(norm);

          const cover = m.coverImage?.extraLarge || '';
          const tid = `ani_${m.id}`;
          finalHtmlItems.push(`
            <div class="ac-item" style="display:flex;align-items:center;gap:12px;padding:8px;cursor:pointer;border-bottom:1px solid var(--border);transition:0.1s" 
                 data-title="${escapeHtml(t)}" data-cover="${cover}" data-chapters="${m.chapters || 0}" data-tid="${tid}">
              ${cover ? `<img src="${cover}" style="width:32px;height:45px;object-fit:cover;border-radius:4px">` : `<div style="width:32px;height:45px;background:var(--bg-hover);border-radius:4px"></div>`}
              <div style="flex:1">
                <div style="font-weight:500;font-size:0.9rem">${escapeHtml(t)}</div>
                <div style="font-size:0.7rem;color:var(--accent2)">AniList ${m.chapters ? `• ${m.chapters} глав` : ''}</div>
              </div>
            </div>`);
        });

        // 3. Fallback to MangaDex (WITH NSFW enabled)
        if (aniRes.errors || finalHtmlItems.length < 5) {
           try {
             const ratings = ['safe', 'suggestive', 'erotica', 'pornographic'].map(r => `contentRating[]=${r}`).join('&');
             const mdexRes = await fetch(`https://api.mangadex.org/manga?title=${encodeURIComponent(q)}&limit=10&includes[]=cover_art&${ratings}`).then(r => r.json());
             (mdexRes.data || []).forEach(m => {
               const titles = m.attributes.title;
               const t = titles.en || Object.values(titles)[0];
               const norm = normalize(t);
               if (seenNames.has(norm)) return;
               seenNames.add(norm);

               const coverRel = m.relationships.find(r => r.type === 'cover_art');
               const coverId = coverRel?.attributes?.fileName;
               const coverUrl = coverId ? `https://uploads.mangadex.org/covers/${m.id}/${coverId}.256.jpg` : '';
               const tid = m.attributes.links?.al ? `ani_${m.attributes.links.al}` : `mdex_${m.id}`;
               const isAdult = m.attributes.contentRating === 'pornographic' || m.attributes.contentRating === 'erotica';
               const chapters = m.attributes.lastChapter || 0;
               
               finalHtmlItems.push(`
                 <div class="ac-item" style="display:flex;align-items:center;gap:12px;padding:8px;cursor:pointer;border-bottom:1px solid var(--border);transition:0.1s" 
                      data-title="${escapeHtml(t)}" data-cover="${coverUrl}" data-chapters="${chapters}" data-tid="${tid}">
                   ${coverUrl ? `<img src="${coverUrl}" style="width:32px;height:45px;object-fit:cover;border-radius:4px">` : `<div style="width:32px;height:45px;background:var(--bg-hover);border-radius:4px"></div>`}
                   <div style="flex:1">
                     <div style="font-weight:500;font-size:0.9rem">${escapeHtml(t)} ${isAdult ? '🔞' : ''}</div>
                     <div style="font-size:0.7rem;color:var(--accent3)">MangaDex ${isAdult ? '(18+)' : ''} ${chapters ? `• ${chapters} глав` : ''}</div>
                   </div>
                 </div>`);
             });
           } catch (e) { /* ignore */ }
        }

        // 4. H-Chan
        (hchanRes || []).forEach(m => {
          const norm = normalize(m.title);
          if (seenNames.has(norm)) return;
          seenNames.add(norm);

          const tid = `hchan_${btoa(m.url).substring(0, 16)}`;
          finalHtmlItems.push(`
            <div class="ac-item" style="display:flex;align-items:center;gap:12px;padding:8px;cursor:pointer;border-bottom:1px solid var(--border);transition:0.1s" 
                 data-title="${escapeHtml(m.title)}" data-url="${m.url}" data-tid="${tid}">
              <div style="width:32px;height:45px;background:var(--accent-soft);border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:20px">🔞</div>
              <div style="flex:1">
                <div style="font-weight:500;font-size:0.9rem">${escapeHtml(m.title)}</div>
                <div style="font-size:0.7rem;color:#ff69b4">H-Chan 18+</div>
              </div>
            </div>`);
        });

        let warning = '';
        if (aniRes.errors && (aniRes.errors[0]?.status === 403 || aniRes.errors[0]?.message?.includes('disabled'))) {
           warning = '<div style="padding:6px 12px; font-size:0.7rem; background:rgba(255,0,0,0.05); color:#e63946; border-bottom:1px solid var(--border)">⚠️ AniList API лежить. Шукаємо в MangaDex та базі.</div>';
        }

        if (finalHtmlItems.length === 0) {
          resultsBox.innerHTML = '<div style="padding:12px;text-align:center;color:var(--text-muted)">Нічого не знайдено</div>';
        } else {
          resultsBox.innerHTML = warning + finalHtmlItems.join('');
        }

        resultsBox.querySelectorAll('.ac-item').forEach(item => {
          item.addEventListener('mouseenter', () => item.style.background = 'var(--bg-hover)');
          item.addEventListener('mouseleave', () => {
             if (item.classList.contains('db-match')) item.style.background = 'rgba(var(--accent-rgb), 0.05)';
             else if (item.dataset.editid) item.style.background = 'var(--bg-card)';
             else item.style.background = '';
          });
          item.addEventListener('click', () => {
            if (item.dataset.url && !item.dataset.tid) {
              window.open(item.dataset.url, '_blank');
              return;
            }
            if (item.dataset.editid && !existing) {
              navigate(`review-edit/${item.dataset.editid}`);
              showToast('Редирект на редагування вашої рецензії...', 'info');
              return;
            }
            titleInput.value = item.dataset.title;
            selectedTitleId = item.dataset.tid;
            document.getElementById('review-chapters').value = item.dataset.chapters;
            if (item.dataset.cover) {
              currentCover = item.dataset.cover;
              refreshCoverUI();
            }
            showToast('Дані завантажено!', 'info');
            resultsBox.style.display = 'none';
          });
        });
      } catch (e) {
        console.error(e);
        resultsBox.innerHTML = '<div style="padding:12px;text-align:center;color:var(--accent)">Помилка пошуку</div>';
      }
    }, 150); // 150ms fast debounce
  });

  document.addEventListener('click', e => {
    if (!titleInput.contains(e.target) && !resultsBox.contains(e.target)) {
      resultsBox.style.display = 'none';
    }
  });

  // Handle pre-selected title (Optimization: Corrected order of execution)
  if (preSelectedTitleId && !existing) {
    (async () => {
      try {
        const { Reviews } = await import('../store.js');
        const reviews = await Reviews.byTitle(preSelectedTitleId);
        if (reviews.length > 0) {
          const t = reviews[0];
          titleInput.value = t.title;
          titleInput.readOnly = true;
          titleInput.style.background = 'var(--bg-hover)';

          selectedTitleId = preSelectedTitleId;
          document.getElementById('review-chapters').value = t.chapters || 0;
          if (t.coverBase64) {
            currentCover = t.coverBase64;
            refreshCoverUI();
          }

          // Add a "Change" button next to the title if they want to switch
          const changeBtn = document.createElement('button');
          changeBtn.className = 'btn btn-ghost btn-xs';
          changeBtn.textContent = '🔄 Змінити тайтл';
          changeBtn.style.marginTop = '4px';
          changeBtn.style.display = 'block';
          changeBtn.onclick = () => {
            titleInput.readOnly = false;
            titleInput.value = '';
            titleInput.style.background = '';
            selectedTitleId = null;
            changeBtn.remove();
          };
          titleInput.parentNode.appendChild(changeBtn);
        }
      } catch (e) {
        console.error("Error pre-filling title:", e);
      }
    })();
  }

  // Rating/status wiring
  const statusSel = document.getElementById('review-status');
  const starsWrap = document.getElementById('interactive-stars-wrap');
  const ratingLabel = document.getElementById('rating-label');

  function renderInteractiveStars(hoverVal = null) {
    const isDropped = currentStatus === 'dropped';
    const isPlanned = currentStatus === 'planned';
    if (isDropped || isPlanned) {
      starsWrap.innerHTML = '<span style="color:var(--text-muted);font-size:1rem;padding:8px">' + (isPlanned ? 'Ще не оцінено' : 'Оцінка недоступна') + '</span>';
      starsWrap.style.pointerEvents = 'none';
      return;
    }
    starsWrap.style.pointerEvents = 'auto';
    starsWrap.innerHTML = '';

    const displayVal = hoverVal !== null ? hoverVal : currentRating;
    const path = 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';

    for (let i = 1; i <= 10; i++) {
      const star = document.createElement('span');
      star.className = 'star star-lg';

      const isFull = displayVal >= i;
      const isHalf = !isFull && displayVal >= (i - 0.5);

      if (isFull) star.classList.add('full');
      else if (isHalf) star.classList.add('half');

      star.innerHTML = `
        <svg viewBox="0 0 24 24"><path d="${path}"/></svg>
        ${isHalf ? `<span class="star-half-fill"><svg viewBox="0 0 24 24"><path d="${path}"/></svg></span>` : ''}
      `;

      star.addEventListener('pointermove', (e) => {
        const rect = star.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const val = (x < rect.width / 2) ? i - 0.5 : i;
        renderInteractiveStars(val);
      });

      star.addEventListener('pointerdown', (e) => {
        // Use pointerdown for instant primary click/tap response
        const rect = star.getBoundingClientRect();
        const x = e.clientX - rect.left;
        currentRating = (x < rect.width / 2) ? i - 0.5 : i;
        if (currentRating < 1) currentRating = 1;
        renderInteractiveStars();
        ratingLabel.textContent = currentRating + '/10';
      });

      starsWrap.appendChild(star);
    }
  }

  starsWrap.addEventListener('mouseleave', () => {
    if (currentStatus !== 'dropped' && currentStatus !== 'planned') {
      renderInteractiveStars();
    }
  });

  statusSel.addEventListener('change', () => {
    currentStatus = statusSel.value;
    const isDropped = currentStatus === 'dropped';
    const isPlanned = currentStatus === 'planned';
    if (isPlanned) {
      ratingLabel.textContent = '-';
    } else {
      ratingLabel.textContent = isDropped ? 'Кинута' : currentRating + '/10';
    }
    renderInteractiveStars();
  });

  renderInteractiveStars();

  // Preset tags (bubbles) under the tags input
  const reviewTagsInput = document.getElementById('review-tags');
  const presetTagsWrap = document.getElementById('preset-tags-wrap');
  if (reviewTagsInput && presetTagsWrap) {
    function parseTags(raw) {
      return (raw || '')
        .split(',')
        .map(t => t.trim())
        .filter(Boolean);
    }

    function syncPresetActive() {
      const active = new Set(parseTags(reviewTagsInput.value).map(t => t.toLowerCase()));
      presetTagsWrap.querySelectorAll('.preset-tag[data-tag]').forEach(btn => {
        const tagVal = (btn.dataset.tag || '').trim();
        const isActive = active.has(tagVal.toLowerCase());
        btn.classList.toggle('active', isActive);
      });
    }

    function addPresetTag(tagVal) {
      const tag = (tagVal || '').trim();
      if (!tag) return;
      const tags = parseTags(reviewTagsInput.value);
      const exists = tags.some(t => t.toLowerCase() === tag.toLowerCase());
      if (exists) return;
      tags.push(tag);
      reviewTagsInput.value = tags.join(', ');
      syncPresetActive();
    }

    presetTagsWrap.querySelectorAll('.preset-tag[data-tag]').forEach(btn => {
      btn.addEventListener('click', () => addPresetTag(btn.dataset.tag));
    });

    syncPresetActive();
    reviewTagsInput.addEventListener('input', syncPresetActive);
  }

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
    if (!chaptersStr || isNaN(chapters) || chapters <= 0) { errEl.textContent = "Кількість глав обов'язкова (більше 0)"; errEl.style.display = 'block'; return; }
    if (date) {
      const selectedDate = new Date(date);
      const now = new Date();
      const year = selectedDate.getFullYear();
      if (selectedDate > now) {
        errEl.textContent = "Дата прочитання не може бути в майбутньому";
        errEl.style.display = 'block';
        return;
      }
      if (year > 2100 || year < 2000) {
        errEl.textContent = "Будь ласка, вкажіть коректний рік (2000-2100)";
        errEl.style.display = 'block';
        return;
      }
    }

    saveBtn.disabled = true; saveBtn.textContent = 'Збереження...';

    // Final TitleId determination
    const titleId = selectedTitleId || `manual_${title.toLowerCase().replace(/\s+/g, '_')}`;

    if (!existing) {
      const exists = await Reviews.exists(user.id, titleId);
      if (exists) {
        errEl.textContent = "Ви вже залишили рецензію на цей тайтл!";
        errEl.style.display = 'block';
        saveBtn.disabled = false; saveBtn.textContent = saveBtn.dataset.label;
        return;
      }
    }

    const data = { title, titleId, coverBase64: currentCover, text, rating, chapters, status, tags, date };

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
