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
        <h3 style="margin-top:0;margin-bottom:16px">Правила ManhwaDB</h3>

        <p style="color:var(--text-muted);margin-bottom:16px">
          ManhwaDB — платформа для рецензий и обсуждений манхвы/манги. Сайт создан при поддержке ИИ.
        </p>

        <h4 style="font-size:1rem;margin-bottom:8px">1) Цензура</h4>
        <ul style="margin-left:20px;color:var(--text-muted);padding-left:12px;margin-bottom:18px">
          <li style="margin-bottom:8px"><strong>Комментарии и рецензии, а также обложки</strong> цензуре не подлежат.</li>
        </ul>

        <h4 style="font-size:1rem;margin-bottom:8px">2) Как писать рецензию</h4>
        <ul style="margin-left:20px;color:var(--text-muted);padding-left:12px;margin-bottom:18px">
          <li style="margin-bottom:8px">
            В идеале всегда пишите <strong>название манхвы на английском</strong> при создании рецензии и выбирайте его из выпадающего списка.
            Это поможет всем пользователям сайта ориентироваться и использовать поиск.
          </li>
          <li style="margin-bottom:8px">
            Пожалуйста, не разглашайте личные данные или другие важные вещи в открытых платформах.
          </li>
        </ul>

        <h4 style="font-size:1rem;margin-bottom:8px">3) Контакты и реклама</h4>
        <ul style="margin-left:20px;color:var(--text-muted);padding-left:12px;margin-bottom:18px">
          <li style="margin-bottom:8px">
            Если у вас возникнут проблемы, вопросы или предложения — пишите на почту:
            <strong>Trahalich.Boomer@gmail.com</strong>
          </li>
          <li style="margin-bottom:8px">
            Сайт открыт к рекламным предложениям, но при этом создан не в коммерческих целях.
          </li>
        </ul>

        <h4 style="font-size:1rem;margin-bottom:8px">4) Уведомления</h4>
        <ul style="margin-left:20px;color:var(--text-muted);padding-left:12px;margin-bottom:18px">
          <li style="margin-bottom:8px">
            В скором времени будет осуществлена рассылка push-уведомлений по поводу новостей и активности друзей.
            Все нюансы или полное отключение появится в настройках.
          </li>
        </ul>

        <h4 style="font-size:1rem;margin-bottom:8px">5) Что можно добавлять</h4>
        <ul style="margin-left:20px;color:var(--text-muted);padding-left:12px;margin-bottom:18px">
          <li style="margin-bottom:8px">
            Никто не запрещает помимо манхв добавлять сюда и манги (обычные).
          </li>
          <li style="margin-bottom:8px">
            Никто также не запрещает ограничиваться 18+ контентом: самые обычные манги и манхвы тут тоже приветствуются.
          </li>
          <li style="margin-bottom:8px">
            Важно: не стоит делать из сайта оценки всего чего угодно.
            Это касается фильмов, книг, музыки и всего прочего, аниме в том числе.
            <strong>Хентай-аниме разрешен</strong> — единственное исключение.
          </li>
        </ul>

        <h4 style="font-size:1rem;margin-bottom:8px">6) Ответственность</h4>
        <ul style="margin-left:20px;color:var(--text-muted);padding-left:12px;margin-bottom:18px">
          <li style="margin-bottom:8px">
            Не соблюдение этих незамысловатых правил будет караться удалением аккаунта и всего связанного с ним контента.
          </li>
        </ul>

        <h4 style="font-size:1rem;margin-bottom:8px">7) Почта и развитие сайта</h4>
        <ul style="margin-left:20px;color:var(--text-muted);padding-left:12px;margin-bottom:0">
          <li style="margin-bottom:8px">
            Пока сайт малоизвестен и не популярен (скорее всего так и останется), привязка к почте будет не обязательна.
            Но если начнутся массовые спам-атаки, у меня не останется другого выхода, кроме как заставить всех привязать почту.
          </li>
          <li style="margin-bottom:8px">
            Также планируется добавление английского и других языков.
          </li>
          <li style="margin-bottom:8px">
            Следите за обновлениями в новостной ленте: новые варианты тем оформления и новый нормальный домен (если обживемся спонсором).
          </li>
        </ul>
      </div>
    </div>
  `;
  document.getElementById('back-btn').addEventListener('click', () => history.back());
}
