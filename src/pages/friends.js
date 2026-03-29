// ============================================================
// pages/friends.js — Friends page (async Firestore)
// ============================================================

import { Users, Friends, Session, News } from '../store.js';
import { avatarHtml, escapeHtml, showToast, showLoader } from '../utils.js';
import { navigate } from '../router.js';

export async function renderFriends() {
  const currentUser = Session.currentUser();
  if (!currentUser) { navigate('home'); return; }

  const container = document.getElementById('page-root');
  showLoader(container);

  const [myFriends, pending, sent] = await Promise.all([
    Friends.ofUser(currentUser.id),
    Friends.pendingFor(currentUser.id),
    Friends.sentBy(currentUser.id),
  ]);

  const resolveFriendUser = async (f) => {
    const otherId = f.requesterId === currentUser.id ? f.receiverId : f.requesterId;
    const other = await Users.byId(otherId);
    return { ...f, otherUser: other, otherId };
  };

  const [enrichedFriends, enrichedPending, enrichedSent] = await Promise.all([
    Promise.all(myFriends.map(resolveFriendUser)),
    Promise.all(pending.map(async f => {
      const other = await Users.byId(f.requesterId);
      const declineCount = await Friends.getDeclineCount(f.requesterId, currentUser.id);
      return { ...f, otherUser: other, declineCount };
    })),
    Promise.all(sent.map(async f => {
      const other = await Users.byId(f.receiverId);
      return { ...f, otherUser: other };
    })),
  ]);

  container.innerHTML = `
    <div class="page-container" style="max-width:800px">
      <div class="section-title" style="margin-bottom:24px">👥 Мої друзі</div>

      <!-- Search -->
      <div class="card card-padding" style="margin-bottom:24px">
        <div class="section-title" style="font-size:1rem;margin-bottom:12px">🔍 Знайти нових друзів</div>
        <div style="display:flex;gap:10px">
          <input class="input" id="friend-search-input" placeholder="Введіть точний логін користувача...">
          <button class="btn btn-primary" id="friend-search-btn" style="white-space:nowrap">Знайти</button>
        </div>
        <div id="friend-search-result" style="margin-top:12px"></div>
      </div>

      <!-- Incoming requests -->
      ${enrichedPending.length ? `
        <div style="margin-bottom:24px">
          <div class="section-title" style="font-size:1rem;margin-bottom:12px">📩 Вхідні запити (${enrichedPending.length})</div>
          <div style="display:flex;flex-direction:column;gap:8px" id="pending-list">
            ${enrichedPending.map(f => `
              <div class="friend-item">
                <div style="display:flex; align-items:center; gap:12px; flex:1; min-width:0">
                  ${avatarHtml(f.otherUser, 'sm')}
                  <div class="friend-info" style="min-width:0">
                    <div class="friend-name" data-profile="${f.requesterId}" style="cursor:pointer; white-space:nowrap; overflow:hidden; text-overflow:ellipsis">${escapeHtml(f.otherUser?.username || 'Невідомий')}</div>
                  </div>
                </div>
                <div class="friend-actions" style="display:flex; gap:8px; align-items:center; flex-wrap:wrap">
                  <button class="btn btn-primary btn-sm" data-accept="${f.requesterId}">✅ Прийняти</button>
                  <button class="btn btn-danger btn-sm" data-decline="${f.requesterId}">❌</button>
                  ${f.declineCount >= 2 ? `<button class="btn btn-sm" data-block="${f.requesterId}" style="background:#5a1a1a;border:1px solid #e63946;color:#ff6b6b">🔒 Блок</button>` : ''}
                </div>
              </div>`).join('')}
          </div>
        </div>` : ''}

      <!-- Sent requests -->
      ${enrichedSent.length ? `
        <div style="margin-bottom:24px">
          <div class="section-title" style="font-size:1rem;margin-bottom:12px">📤 Надіслані запити (${enrichedSent.length})</div>
          <div style="display:flex;flex-direction:column;gap:8px">
            ${enrichedSent.map(f => `
              <div class="friend-item">
                <div style="display:flex; align-items:center; gap:12px; flex:1; min-width:0">
                  ${avatarHtml(f.otherUser, 'sm')}
                  <div class="friend-info" style="min-width:0">
                    <div class="friend-name" data-profile="${f.receiverId}" style="cursor:pointer; white-space:nowrap; overflow:hidden; text-overflow:ellipsis">${escapeHtml(f.otherUser?.username || 'Невідомий')}</div>
                  </div>
                </div>
                <div class="friend-actions" style="display:flex; gap:8px; align-items:center; flex-wrap:wrap">
                  <span class="friend-status friend-pending">Очікує</span>
                  <button class="btn btn-ghost btn-xs" data-cancel="${f.receiverId}">✕</button>
                </div>
              </div>`).join('')}
          </div>
        </div>` : ''}

      <!-- Friends list -->
      <div class="section-title" style="font-size:1rem;margin-bottom:12px">✅ Друзі (${enrichedFriends.length})</div>
      <div style="display:flex;flex-direction:column;gap:8px">
        ${enrichedFriends.length === 0
          ? `<div class="empty-state"><div class="empty-icon">🤝</div><h3>У вас ще немає друзів</h3><p>Знайдіть їх за логіном вище!</p></div>`
          : enrichedFriends.map(f => `
              <div class="friend-item">
                <div style="display:flex; align-items:center; gap:12px; flex:1; min-width:0">
                  ${avatarHtml(f.otherUser, 'md')}
                  <div class="friend-info" style="min-width:0">
                    <div class="friend-name" data-profile="${f.otherId}" style="cursor:pointer; white-space:nowrap; overflow:hidden; text-overflow:ellipsis">${escapeHtml(f.otherUser?.username || 'Невідомий')}</div>
                  </div>
                </div>
                <div class="friend-actions" style="display:flex; gap:6px; align-items:center; flex-wrap:wrap">
                  <span class="friend-status friend-accepted">Друг</span>
                  <button class="btn btn-secondary btn-xs" data-view-profile="${f.otherId}">Профіль</button>
                  <button class="btn btn-danger btn-xs" data-remove="${f.otherId}">Видалити</button>
                </div>
              </div>`).join('')}
      </div>
    </div>`;

  // Search
  const searchBtn = document.getElementById('friend-search-btn');
  const searchInput = document.getElementById('friend-search-input');
  const searchResult = document.getElementById('friend-search-result');

  const doSearch = async () => {
    const q = searchInput.value.trim();
    if (!q) return;
    searchBtn.disabled = true; searchBtn.textContent = '...';
    const found = await Users.byUsername(q);
    searchBtn.disabled = false; searchBtn.textContent = 'Знайти';

    if (!found || found.id === currentUser.id) {
      searchResult.innerHTML = `<div style="color:var(--text-muted);font-size:0.875rem">Користувача не знайдено</div>`;
      return;
    }
    const rel = await Friends.between(currentUser.id, found.id);
    const isBlockedByMe = Users.isBlocked(found.id);
    let btn = '';
    if (isBlockedByMe) {
      btn = `<button class="btn btn-sm" id="unblock-btn" data-uid="${found.id}" style="background:#5a1a1a;border:1px solid #e63946;color:#ff6b6b">🔓 Розблокувати</button>`;
    } else if (!rel) {
      btn = `<button class="btn btn-primary btn-sm" id="add-friend-btn" data-uid="${found.id}">➕ Надіслати запит</button>`;
    } else if (rel.status === 'pending') {
      btn = `<span class="friend-status friend-pending">Запит надіслано</span>`;
    } else {
      btn = `<span class="friend-status friend-accepted">Вже друзі ✅</span>`;
    }

    searchResult.innerHTML = `<div class="friend-item">
      <div style="display:flex; align-items:center; gap:12px; flex:1; min-width:0">
        ${avatarHtml(found, 'sm')}
        <div class="friend-info" style="min-width:0"><div class="friend-name" style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis">${escapeHtml(found.username)}</div></div>
      </div>
      <div class="friend-actions" style="display:flex; gap:8px; align-items:center; flex-wrap:wrap">
        ${btn}
      </div>
    </div>`;

    document.getElementById('add-friend-btn')?.addEventListener('click', async () => {
      const result = await Friends.send(currentUser.id, found.id);
      if (result === 'blocked') {
        showToast('Цей користувач вас заблокував', 'warning');
        return;
      }
      showToast(`Запит надіслано ${found.username}`, 'success');
      await renderFriends();
    });

    document.getElementById('unblock-btn')?.addEventListener('click', async () => {
      await Users.unblock(currentUser.id, found.id);
      showToast(`${found.username} розблоковано`, 'success');
      await renderFriends();
    });
  };

  searchBtn.addEventListener('click', doSearch);
  searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });

  // Accept
  container.querySelectorAll('[data-accept]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const friendId = btn.dataset.accept;
      await Friends.accept(friendId, currentUser.id);
      const friendUser = await Users.byId(friendId);
      await News.add('friend', currentUser.id, friendId, { username: currentUser.username, friendName: friendUser?.username || 'Unknown' }).catch(console.error);
      showToast('Запит прийнято ✅', 'success');
      await renderFriends();
    });
  });

  // Decline (with counter)
  container.querySelectorAll('[data-decline]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const requesterId = btn.dataset.decline;
      const count = await Friends.decline(requesterId, currentUser.id);
      if (count >= 2) {
        showToast('Запит відхилено. Ви можете заблокувати цього користувача.', 'warning');
      } else {
        showToast('Запит відхилено', 'info');
      }
      await renderFriends();
    });
  });

  // Block
  container.querySelectorAll('[data-block]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const targetId = btn.dataset.block;
      if (!window.confirm('Заблокувати цього користувача? Він не зможе надсилати вам запити, коментувати та ставити лайки.')) return;
      await Users.block(currentUser.id, targetId);
      showToast('Користувача заблоковано 🔒', 'warning');
      await renderFriends();
    });
  });

  container.querySelectorAll('[data-cancel]').forEach(btn => {
    btn.addEventListener('click', async () => {
      await Friends.remove(currentUser.id, btn.dataset.cancel);
      await renderFriends();
    });
  });
  container.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!window.confirm('Видалити зі списку друзів?')) return;
      await Friends.remove(currentUser.id, btn.dataset.remove);
      showToast('Видалено зі списку друзів', 'info');
      await renderFriends();
    });
  });

  // Profile links
  container.querySelectorAll('[data-profile], [data-view-profile]').forEach(el => {
    el.addEventListener('click', () => navigate(`profile/${el.dataset.profile || el.dataset.viewProfile}`));
  });
}
