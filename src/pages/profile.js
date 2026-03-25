// ============================================================
// pages/profile.js — Other user's public profile (async Firestore)
// ============================================================

import { Session, Friends, News } from '../store.js';
import { renderAccountPage } from './account.js';
import { navigate } from '../router.js';
import { showToast } from '../utils.js';

export async function renderProfile({ id }) {
  const currentUser = Session.currentUser();
  if (currentUser && currentUser.id === id) { navigate('account'); return; }

  await renderAccountPage(id, false);

  // Inject Add Friend button
  if (currentUser) {
    const profileInfo = document.querySelector('.profile-info');
    if (profileInfo) {
      const rel = await Friends.between(currentUser.id, id);
      let btnHtml = '';
      if (!rel) btnHtml = `<button class="btn btn-primary btn-sm" id="add-friend-profile-btn">➕ Додати в друзі</button>`;
      else if (rel.status === 'pending') {
        if (rel.requesterId === currentUser.id)
          btnHtml = `<button class="btn btn-secondary btn-sm" disabled>⏳ Запит надіслано</button>`;
        else
          btnHtml = `<button class="btn btn-primary btn-sm" id="accept-friend-profile-btn">✅ Прийняти запит</button>`;
      } else {
        btnHtml = `<button class="btn btn-secondary btn-sm" disabled>✅ Друзі</button>`;
      }

      const area = document.getElementById('friend-btn-area');
      if (area) {
        area.style.marginTop = '12px';
        area.innerHTML = btnHtml;
      }

      document.getElementById('add-friend-profile-btn')?.addEventListener('click', async () => {
        await Friends.send(currentUser.id, id);
        await News.add('friend', currentUser.id, id, { username: currentUser.username });
        showToast('Запит надіслано!', 'success');
        await renderProfile({ id });
      });

      document.getElementById('accept-friend-profile-btn')?.addEventListener('click', async () => {
        await Friends.accept(id, currentUser.id);
        showToast('Тепер ви друзі ✅', 'success');
        await renderProfile({ id });
      });
    }
  }
}
