// ============================================================
// pages/faq.js — FAQ and Rules page
// ============================================================

export function renderFaq() {
  const container = document.getElementById('page-root');
  container.innerHTML = `
    <div class="page-container" style="max-width:900px">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:28px">
        <button class="btn btn-ghost btn-sm" id="back-btn">← Назад</button>
        <h1 class="section-title" style="margin:0;font-size:2.2rem">📜 Регламент та Кодекс Спільноти ManhwaDB</h1>
      </div>
      
      <div class="card card-padding" style="line-height:1.8;font-size:1.05rem">
        <p style="margin-bottom:20px;color:var(--text-muted);font-style:italic;text-align:center">
          "Повага до творчості та свободи самовираження — наріжний камінь нашої інтелектуальної екосистеми."
        </p>

        <div style="margin-bottom:32px">
          <h2 style="color:var(--accent);margin-bottom:12px;font-size:1.4rem">I. Принципи Лібертаріанства та Цензурна Політика</h2>
          <p>
            На просторах ManhwaDB ми сповідуємо доктрину безумовної свободи слова. Концептуально, <strong>коментарі, рецензії, а також візуальні артефакти (обкладинки) не підлягають превентивній цензурі</strong>. Ми виходимо з презумпції зрілості нашої аудиторії та поваги до автентичного авторського бачення. Ніяких обмежень на 18+ контент чи пікантні ілюстрації — ваша творча експресія є пріоритетом.
          </p>
        </div>

        <div style="margin-bottom:32px">
          <h2 style="color:var(--accent);margin-bottom:12px;font-size:1.4rem">II. Методологія Складання Рецензій</h2>
          <p>
            Задля оптимізації загальнодоступного пошуку та покращення юзабіліті, ми наполегливо апелюємо до конвенції використання <strong>англійських назв</strong> творів під час дескрипції. Інтегрований алгоритм автоматичного доповнення AniList & H-Chan забезпечує релевантність даних та естетичну цілісність вашої бібліотеки. Вибір твору з випадаючого списку є імперативом для коректної індексації.
          </p>
        </div>

        <div style="margin-bottom:32px">
          <h2 style="color:var(--accent);margin-bottom:12px;font-size:1.4rem">III. Прерогатива Приватності та Цифрова Гігієна</h2>
          <p>
            Адміністрація застерігає користувачів від нерозсудливого розголошення персональних ідентифікаторів чи конфіденційних відомостей у публічних дискурсах. Храніть свою цифрову ідентичність з належною пильністю. Поки ми перебуваємо у стадії експансії, прив'язка до електронної пошти є факультативною, проте може стати обов'язковою у разі ескалації спам-активності.
          </p>
        </div>

        <div style="margin-bottom:32px">
          <h2 style="color:var(--accent);margin-bottom:12px;font-size:1.4rem">IV. Тематична Спрямованість</h2>
          <p>
            ManhwaDB спеціалізується виключно на графічній новелістиці: Манхва, Манга, Маньхуа. Будь-які спроби перетворення платформи на універсальний агрегатор оцінок (кінематограф, література, музика) вважатимуться деструктивними. Єдиним винятком є <strong>Хентай-аніме</strong>, яке інтегроване в наш культурний контекст.
          </p>
        </div>

        <div style="margin-bottom:32px">
          <h2 style="color:var(--accent);margin-bottom:12px;font-size:1.4rem">V. Координація та Зворотний Зв'язок</h2>
          <p>
            У разі виникнення дефіциту розуміння функціоналу, деструктивних аномалій або за наявності конструктивних ініціатив — ласкаво просимо звертатися до офіційної кореспонденції за адресою: <br>
            <strong style="color:var(--accent2)">Trahalich.Boomer@gmail.com</strong>
          </p>
        </div>

        <div style="text-align:center;margin-top:40px;padding-top:20px;border-top:1px solid var(--border)">
          <button class="btn btn-primary" onclick="history.back()">Усвідомлено та прийнято</button>
        </div>
      </div>
    </div>
  `;
  document.getElementById('back-btn').addEventListener('click', () => history.back());
}
