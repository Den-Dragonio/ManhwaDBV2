// ============================================================
// pages/faq.js — FAQ and Rules page
// ============================================================

export function renderFaq() {
  const container = document.getElementById('page-root');
  container.innerHTML = `
    <div class="page-container" style="max-width:700px">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:28px">
        <button class="btn btn-ghost btn-sm" id="back-btn">← Назад</button>
        <h1 class="section-title" style="margin:0">ℹ️ Правила та FAQ</h1>
      </div>
      <div class="card card-padding" style="line-height:1.6;font-size:0.95rem">
        <h3 style="margin-top:0;margin-bottom:16px">Правила платформи ManhwaDB</h3>
        <p>Вітаємо на нашій спільноті для огляду манхв! Щоб підтримувати приємну атмосферу, будь ласка, дотримуйтесь наступних правил:</p>
        <ol style="margin-left:20px;margin-bottom:32px;padding-left:12px">
          <li style="margin-bottom:12px"><strong>Повага до інших:</strong> Заборонені будь-які образи, погрози або мова ворожнечі у рецензіях чи коментарях.</li>
          <li style="margin-bottom:12px"><strong>Без спойлерів:</strong> Якщо ви обговорюєте важливий сюжетний поворот у рецензії, попереджайте про це інших, щоб не зіпсувати враження від прочитання.</li>
          <li style="margin-bottom:12px"><strong>Релевантний контент:</strong> Рецензії повинні стосуватися безпосередньо манхви. Спам або відрита реклама ресурсів суворо заборонені.</li>
          <li style="margin-bottom:12px"><strong>Медиа-контент:</strong> Відповідальність за завантажений контент несе користувач. Суворо заборонено завантажувати медіа-матеріали шокуючого характеру або надмірно відверті (18+) як обкладинки для рецензій.</li>
        </ol>

        <h3 style="margin-bottom:12px">Обмеження</h3>
        <ul style="margin-left:20px;color:var(--text-muted);padding-left:12px">
          <li style="margin-bottom:8px">Функціонал "Оцінка" (від 1 до 10) блокується для манхв зі статусом <em>"В планах"</em> або <em>"Кинуто"</em>.</li>
          <li style="margin-bottom:8px">Обкладинки для рецензій, які ви завантажуєте власноруч, автоматично стискаються бразуером у фоновому режимі (WebP) для економії місця. Проте файли розміром більше 10MB можуть спричинити зависання.</li>
          <li style="margin-bottom:8px">Кожен користувач може додавати манхви у "Топ-4", які відображатимуться на його головній сторінці профілю для всіх друзів.</li>
        </ul>
      </div>
    </div>
  `;
  document.getElementById('back-btn').addEventListener('click', () => history.back());
}
