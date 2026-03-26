// ============================================================
// pages/review.js — Full review detail page (async Firestore)
// ============================================================

import { Reviews, Users, Comments, Session } from '../store.js';
import { starsHtml, avatarHtml, timeAgo, formatDate, escapeHtml, showToast, showLoader, fetchX9QualityByTitle, formatTag } from '../utils.js';
import { navigate } from '../router.js';

export async function renderReview({ id }) {
  const container = document.getElementById('page-root');
  showLoader(container);

  const [review, currentUser] = await Promise.all([
    Reviews.byId(id),
    Promise.resolve(Session.currentUser()),
  ]);

  if (!review) {
    container.innerHTML = `<div class="page-container"><div class="empty-state"><div class="empty-icon">😕</div><h3>Рецензія не знайдена</h3></div></div>`;
    return;
  }

  const author = await Users.byId(review.userId);
  const isOwner = currentUser && currentUser.id === review.userId;
  const isDropped = review.status === 'dropped';
  const isPlanned = review.status === 'planned';
  const statusLabels = { done: '✅ Завершено', reading: '📖 Читаю', planned: '⏳ В планах', dropped: '❌ Кинув' };
  const statusClass = { done: 'status-done', reading: 'status-reading', planned: 'status-planned', dropped: 'status-dropped' };

  const likes = review.likes || [];
  const dislikes = review.dislikes || [];
  const userLiked = currentUser && likes.includes(currentUser.id);
  const userDisliked = currentUser && dislikes.includes(currentUser.id);

  container.innerHTML = `
    <div class="page-container" style="max-width:860px">
      <button class="btn btn-ghost btn-sm" id="back-btn" style="margin-bottom:20px">← Назад</button>

      <div class="review-full-layout">
        <div class="review-full-cover">
          ${review.coverBase64
            ? `<img src="${review.coverBase64}" alt="${escapeHtml(review.title)}">`
            : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:var(--text-muted);font-size:48px;background:var(--bg-surface)">📖</div>`}
        </div>
        <div class="review-full-body">
          <div class="review-full-title">${escapeHtml(review.title)}</div>
          <div class="review-full-author">
            ${avatarHtml(author, 'sm')}
            <a href="#" data-profile="${review.userId}" style="color:var(--accent3);font-weight:600;text-decoration:none;font-size:0.9rem">${escapeHtml(author?.username || review.username || 'Невідомий')}</a>
          </div>
          <div class="review-full-meta">
            <span class="status-badge ${statusClass[review.status] || ''}">${statusLabels[review.status] || ''}</span>
            <span style="color:var(--text-muted);font-size:0.85rem">📚 ${review.chapters || 0} глав</span>
            ${review.date ? `<span style="color:var(--text-muted);font-size:0.85rem">📅 ${formatDate(review.date)}</span>` : ''}
            <span style="color:var(--text-muted);font-size:0.85rem">🕐 ${timeAgo(review.createdAt)}</span>
          </div>
          <div class="review-rating-block" style="margin-bottom:12px">
            <div class="review-rating-left">
              <div class="review-rating-left-top">
                ${isPlanned ? '<span style="color:var(--text-muted);font-size:0.9rem">Ще не оцінено</span>' : starsHtml(review.rating, isDropped)}
                ${!isPlanned ? `<span class="x9-quality-tag" id="x9-quality-tag" style="display:none">🏷 Знак качества x9</span>` : ''}
              </div>
              ${!isPlanned ? `<div class="review-user-rating-text" style="margin-top:6px;color:var(--text-muted);font-size:0.85rem">${isDropped ? 'Кинуто' : `${review.rating}/10`}</div>` : ''}
            </div>
            ${!isPlanned ? `<div class="x9-rating-widget" id="x9-rating-widget" style="display:none">
              <div class="x9-quality-score" id="x9-rating-score">-</div>
              <div class="x9-quality-votes" id="x9-rating-votes">-</div>
            </div>` : ''}
          </div>
          ${review.tags?.length ? `<div class="review-tags">${review.tags.map(t => `<span class="tag">${escapeHtml(formatTag(t))}</span>`).join('')}</div>` : ''}
          ${review.updatedAt ? `<span class="edited-badge">Редаговано ${timeAgo(review.updatedAt)}</span>` : ''}

          <!-- Reactions -->
          <div class="review-action-bar" style="margin-top:16px">
            <button class="reaction-btn ${userLiked ? 'liked' : ''}" id="rv-like-btn" data-id="${id}">👍 ${likes.length}</button>
            <button class="reaction-btn ${userDisliked ? 'disliked' : ''}" id="rv-dislike-btn" data-id="${id}">👎 ${dislikes.length}</button>
          </div>

          ${isOwner ? `
            <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
              <button class="btn btn-secondary btn-sm" id="edit-review-btn">✏️ Редагувати</button>
              <button class="btn btn-danger btn-sm" id="delete-review-btn">🗑️ Видалити</button>
            </div>` : ''}
        </div>
      </div>

      ${review.text ? `<div class="card card-padding" style="margin-bottom:24px"><div class="review-full-text">${escapeHtml(review.text)}</div></div>` : ''}

      <!-- Comments -->
      <div class="comments-section">
        <div class="section-title">💬 Коментарі</div>
        <div id="comments-list"><div style="display:flex;justify-content:center;padding:24px"><div class="loader-spinner"></div></div></div>
        ${currentUser ? `
          <div style="display:flex;gap:12px;margin-top:20px;align-items:flex-start">
            ${avatarHtml(currentUser, 'sm')}
            <div style="flex:1">
              <textarea class="textarea" id="new-comment-text" placeholder="Залиште коментар..." style="min-height:80px"></textarea>
              <button class="btn btn-primary btn-sm" id="post-comment-btn" style="margin-top:8px">Надіслати</button>
            </div>
          </div>` : `<p style="color:var(--text-muted);font-size:0.875rem;margin-top:16px"><a href="#" id="login-to-comment" style="color:var(--accent)">Увійдіть</a>, щоб залишити коментар</p>`}
      </div>
    </div>`;

  // Wire events
  document.getElementById('back-btn').addEventListener('click', () => history.back());

  // x9 quality widget (best-effort, hides itself if not available)
  if (!isPlanned) {
    void (async () => {
      try {
        const data = await fetchX9QualityByTitle(review.title);
        if (!data) return;
        const tagEl = document.getElementById('x9-quality-tag');
        const widgetEl = document.getElementById('x9-rating-widget');
        if (!tagEl || !widgetEl) return;
        tagEl.style.display = 'inline-flex';
        widgetEl.style.display = 'block';
        document.getElementById('x9-rating-score').textContent = String(data.score);
        document.getElementById('x9-rating-votes').textContent = `${data.votes} голосов`;
      } catch {
        // No-op
      }
    })();
  }

  container.querySelectorAll('[data-profile]').forEach(a => {
    a.addEventListener('click', e => { e.preventDefault(); navigate(`profile/${a.dataset.profile}`); });
  });

  // Reactions
  if (currentUser) {
    const likeBtn = document.getElementById('rv-like-btn');
    const dislikeBtn = document.getElementById('rv-dislike-btn');

    if (likeBtn && dislikeBtn) {
      likeBtn.addEventListener('click', async () => {
        const wasLiked = likeBtn.classList.contains('liked');
        const wasDisliked = dislikeBtn.classList.contains('disliked');

        // Optimistic UI
        if (wasLiked) {
          likeBtn.classList.remove('liked');
          likeBtn.textContent = `👍 ${Math.max(0, likes.length - 1)}`;
        } else {
          likeBtn.classList.add('liked');
          likeBtn.textContent = `👍 ${likes.length + 1}`;
          if (wasDisliked) {
            dislikeBtn.classList.remove('disliked');
            dislikeBtn.textContent = `👎 ${Math.max(0, dislikes.length - 1)}`;
          }
        }

        try {
          await Reviews.toggleLike(id, currentUser.id);
          renderReview({ id });
        } catch (e) {
          console.error("Like error:", e);
          showToast('Помилка синхронізації', 'error');
          renderReview({ id }); // Rollback
        }
      });

      dislikeBtn.addEventListener('click', async () => {
        const wasLiked = likeBtn.classList.contains('liked');
        const wasDisliked = dislikeBtn.classList.contains('disliked');

        // Optimistic UI
        if (wasDisliked) {
          dislikeBtn.classList.remove('disliked');
          dislikeBtn.textContent = `👎 ${Math.max(0, dislikes.length - 1)}`;
        } else {
          dislikeBtn.classList.add('disliked');
          dislikeBtn.textContent = `👎 ${dislikes.length + 1}`;
          if (wasLiked) {
            likeBtn.classList.remove('liked');
            likeBtn.textContent = `👍 ${Math.max(0, likes.length - 1)}`;
          }
        }

        try {
          await Reviews.toggleDislike(id, currentUser.id);
          renderReview({ id });
        } catch (e) {
          console.error("Dislike error:", e);
          showToast('Помилка синхронізації', 'error');
          renderReview({ id }); // Rollback
        }
      });
    }
  }

  // Owner controls
  if (isOwner) {
    document.getElementById('edit-review-btn').addEventListener('click', () => navigate(`edit-review/${id}`));
    document.getElementById('delete-review-btn').addEventListener('click', async () => {
      if (!window.confirm('Видалити цю рецензію? Це неможливо скасувати.')) return;
      await Reviews.delete(id);
      showToast('Рецензію видалено', 'info');
      navigate('account');
    });
  }

  // Login-to-comment
  document.getElementById('login-to-comment')?.addEventListener('click', e => {
    e.preventDefault();
    import('../components/authModal.js').then(m => m.showAuthModal('login'));
  });

  // Post comment
  document.getElementById('post-comment-btn')?.addEventListener('click', async () => {
    const text = document.getElementById('new-comment-text').value.trim();
    if (!text) return;
    const btn = document.getElementById('post-comment-btn');
    btn.disabled = true; btn.textContent = '...';
    await Comments.create(id, currentUser.id, text);
    document.getElementById('new-comment-text').value = '';
    btn.disabled = false; btn.textContent = 'Надіслати';
    await loadComments(id, currentUser);
    showToast('Коментар додано', 'success');
  });

  // Load comments
  await loadComments(id, currentUser);
}

async function loadComments(reviewId, currentUser) {
  const el = document.getElementById('comments-list');
  if (!el) return;
  const allComments = await Comments.byReview(reviewId);
  const topLevel = allComments.filter(c => !c.parentId);
  const replies = allComments.filter(c => c.parentId);

  if (topLevel.length === 0) {
    el.innerHTML = `<div class="empty-state" style="padding:24px"><div class="empty-icon">💬</div><h3>Коментарів поки немає</h3></div>`;
    return;
  }

  el.innerHTML = topLevel.map(c => renderComment(c, replies, currentUser)).join('');

  // Wire comment events
  el.querySelectorAll('.reaction-btn[data-comment-like]').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!currentUser) return;
      const commentId = btn.dataset.commentLike;
      const dislikeBtn = el.querySelector(`.reaction-btn[data-comment-dislike="${commentId}"]`);
      
      const wasLiked = btn.classList.contains('liked');
      const wasDisliked = dislikeBtn?.classList.contains('disliked');
      const countSpan = btn; // btn text has the count

      // Extract current count
      let currentCount = parseInt(countSpan.textContent.split(' ')[1]) || 0;

      if (wasLiked) {
        btn.classList.remove('liked');
        countSpan.textContent = `👍 ${Math.max(0, currentCount - 1)}`;
      } else {
        btn.classList.add('liked');
        countSpan.textContent = `👍 ${currentCount + 1}`;
        if (wasDisliked && dislikeBtn) {
          dislikeBtn.classList.remove('disliked');
          let dCount = parseInt(dislikeBtn.textContent.split(' ')[1]) || 0;
          dislikeBtn.textContent = `👎 ${Math.max(0, dCount - 1)}`;
        }
      }

      try {
        await Comments.toggleLike(commentId, currentUser.id);
        await loadComments(reviewId, currentUser);
      } catch (e) {
        console.error("Comment like error:", e);
        await loadComments(reviewId, currentUser);
      }
    });
  });

  el.querySelectorAll('.reaction-btn[data-comment-dislike]').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!currentUser) return;
      const commentId = btn.dataset.commentDislike;
      const likeBtn = el.querySelector(`.reaction-btn[data-comment-like="${commentId}"]`);
      
      const wasLiked = likeBtn?.classList.contains('liked');
      const wasDisliked = btn.classList.contains('disliked');
      
      let currentCount = parseInt(btn.textContent.split(' ')[1]) || 0;

      if (wasDisliked) {
        btn.classList.remove('disliked');
        btn.textContent = `👎 ${Math.max(0, currentCount - 1)}`;
      } else {
        btn.classList.add('disliked');
        btn.textContent = `👎 ${currentCount + 1}`;
        if (wasLiked && likeBtn) {
          likeBtn.classList.remove('liked');
          let lCount = parseInt(likeBtn.textContent.split(' ')[1]) || 0;
          likeBtn.textContent = `👍 ${Math.max(0, lCount - 1)}`;
        }
      }

      try {
        await Comments.toggleDislike(commentId, currentUser.id);
        await loadComments(reviewId, currentUser);
      } catch (e) {
        console.error("Comment dislike error:", e);
        await loadComments(reviewId, currentUser);
      }
    });
  });
  el.querySelectorAll('[data-reply-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      const parentId = btn.dataset.replyBtn;
      const existingForm = document.getElementById(`reply-form-${parentId}`);
      if (existingForm) { existingForm.remove(); return; }
      const form = document.createElement('div');
      form.id = `reply-form-${parentId}`;
      form.className = 'comment-item reply';
      form.style.borderBottom = 'none';
      form.innerHTML = `<div style="flex:1;display:flex;gap:8px;align-items:flex-start">
        <div style="flex:1">
          <textarea class="textarea" placeholder="Ваша відповідь..." style="min-height:60px;font-size:0.85rem"></textarea>
          <div style="display:flex;gap:8px;margin-top:6px">
            <button class="btn btn-primary btn-xs reply-submit-btn">Відповісти</button>
            <button class="btn btn-ghost btn-xs reply-cancel-btn">Скасувати</button>
          </div>
        </div>
      </div>`;
      btn.closest('.comment-item').after(form);
      form.querySelector('.reply-cancel-btn').addEventListener('click', () => form.remove());
      form.querySelector('.reply-submit-btn').addEventListener('click', async () => {
        const text = form.querySelector('textarea').value.trim();
        if (!text || !currentUser) return;
        form.querySelector('.reply-submit-btn').disabled = true;
        await Comments.create(reviewId, currentUser.id, text, parentId);
        await loadComments(reviewId, currentUser);
      });
    });
  });
  el.querySelectorAll('[data-delete-comment]').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!window.confirm('Видалити коментар?')) return;
      await Comments.delete(btn.dataset.deleteComment);
      await loadComments(reviewId, currentUser);
    });
  });
}

function renderComment(comment, replies, currentUser) {
  const commentReplies = replies.filter(r => r.parentId === comment.id);
  const isOwner = currentUser && currentUser.id === comment.userId;
  const likes = comment.likes || [];
  const dislikes = comment.dislikes || [];

  const authorInfo = { username: comment.username, avatarBase64: comment.avatarBase64 };

  return `<div class="comment-item">
    ${avatarHtml(authorInfo, 'sm')}
    <div class="comment-body">
      <div class="comment-header">
        <span class="comment-author" data-profile="${comment.userId}" style="cursor:pointer">${escapeHtml(comment.username || 'Незнайомець')}</span>
        <span class="comment-ts">${timeAgo(comment.createdAt)}</span>
      </div>
      <div class="comment-text">${escapeHtml(comment.text)}</div>
      <div class="comment-actions">
        <button class="reaction-btn ${currentUser && likes.includes(currentUser.id) ? 'liked' : ''}" data-comment-like="${comment.id}">👍 ${likes.length}</button>
        <button class="reaction-btn ${currentUser && dislikes.includes(currentUser.id) ? 'disliked' : ''}" data-comment-dislike="${comment.id}">👎 ${dislikes.length}</button>
        ${currentUser ? `<button class="btn btn-ghost btn-xs" data-reply-btn="${comment.id}">💬 Відповісти</button>` : ''}
        ${isOwner ? `<button class="btn btn-danger btn-xs" data-delete-comment="${comment.id}">🗑</button>` : ''}
      </div>
    </div>
  </div>
  ${commentReplies.map(r => {
    const rLikes = r.likes || []; const rDislikes = r.dislikes || [];
    const rAuthor = { username: r.username, avatarBase64: r.avatarBase64 };
    return `<div class="comment-item reply">
      ${avatarHtml(rAuthor, 'sm')}
      <div class="comment-body">
        <div class="comment-header">
          <span class="comment-author">${escapeHtml(r.username || 'Незнайомець')}</span>
          <span class="comment-ts">${timeAgo(r.createdAt)}</span>
        </div>
        <div class="comment-text">${escapeHtml(r.text)}</div>
        <div class="comment-actions">
          <button class="reaction-btn ${currentUser && rLikes.includes(currentUser.id) ? 'liked' : ''}" data-comment-like="${r.id}">👍 ${rLikes.length}</button>
          <button class="reaction-btn ${currentUser && rDislikes.includes(currentUser.id) ? 'disliked' : ''}" data-comment-dislike="${r.id}">👎 ${rDislikes.length}</button>
          ${currentUser?.id === r.userId ? `<button class="btn btn-danger btn-xs" data-delete-comment="${r.id}">🗑</button>` : ''}
        </div>
      </div>
    </div>`;
  }).join('')}`;
}
