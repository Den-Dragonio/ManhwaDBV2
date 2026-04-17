import { Session } from './store.js';

const translations = {
  en: {
    // Stats
    stats_title: "Detailed Statistics",
    stats_subtitle: "Your personal reading recap",
    btn_back: "← Back",
    total_reviews: "Total Reviews",
    avg_rating: "Avg. Rating",
    streak_label: "Streak",
    active_days: "Active Days",
    avg_chapters: "Avg. Chapters",
    activity: "📅 Activity",
    activity_sub: "Number of reviews per day — hover for details",
    rating_dist: "⭐ Rating Distribution",
    rating_dist_sub: "rated reviews",
    read_status: "📂 Reading Status",
    status_sub: "Distribution by status",
    chapters_len: "📏 Chapter Lengths",
    chapters_len_sub: "Statistics by chapter count",
    avg_lbl: "Average",
    median_lbl: "Median",
    min_lbl: "Minimum",
    max_lbl: "Maximum",
    total_chap_lbl: "Total Chapters",
    top_authors: "✍️ Top Authors",
    top_artists: "🎨 Top Artists",
    authors_sub: "Based on metadata",
    fav_tags: "🏷️ Favorite Tags",
    fav_tags_sub: "Most used tags in reviews",
    fav_era: "⏳ Favorite Era",
    fav_era_sub: "Distribution by release year",
    read_pace: "📈 Reading Pace",
    read_pace_sub: "Reviews per month (last year)",
    no_data: "No Data",
    status_done: "Done",
    status_reading: "Reading",
    status_planned: "Planned",
    status_dropped: "Dropped",
    total_word: "total",
    best_streak: "Best Streak",
    popular_lengths: "🏆 Most Frequent Lengths:",
    chapters: "chapters",
    mangas: "titles",
    
    // Account settings
    lang_setting: "Interface Language",
    lang_en: "English",
    lang_uk: "Ukrainian",
    lang_ru: "Russian"
  },
  uk: {
    // Stats
    stats_title: "Детальна статистика",
    stats_subtitle: "Ваш персональний recap читання",
    btn_back: "← Назад",
    total_reviews: "Всього рецензій",
    avg_rating: "Середня оцінка",
    streak_label: "Днів поспіль",
    active_days: "Активних днів",
    avg_chapters: "Глав в середньому",
    activity: "📅 Активність",
    activity_sub: "Кількість рецензій по днях — наведіть для деталей",
    rating_dist: "⭐ Розподіл оцінок",
    rating_dist_sub: "оцінених рецензій",
    read_status: "📂 Статус читання",
    status_sub: "Розподіл за статусами",
    chapters_len: "📏 Довжина манхв",
    chapters_len_sub: "Статистика по кількості розділів",
    avg_lbl: "Середнє",
    median_lbl: "Медіана",
    min_lbl: "Мінімум",
    max_lbl: "Максимум",
    total_chap_lbl: "Всього глав",
    top_authors: "✍️ Топ авторів",
    top_artists: "🎨 Топ художників",
    authors_sub: "З даних скрапера",
    fav_tags: "🏷️ Улюблені теги",
    fav_tags_sub: "Найчастіше вживані теги",
    fav_era: "⏳ Улюблена Ера",
    fav_era_sub: "Розподіл прочитаного за роком випуску",
    read_pace: "📈 Темп читання",
    read_pace_sub: "Рецензії по місяцях (за останній рік)",
    no_data: "Немає даних",
    status_done: "Прочитано",
    status_reading: "Читаю",
    status_planned: "В планах",
    status_dropped: "Кинуто",
    total_word: "всього",
    best_streak: "Кращий стрік",
    popular_lengths: "🏆 Найчастіша довжина:",
    chapters: "глав",
    mangas: "манхв",

    // Account settings
    lang_setting: "Мова інтерфейсу",
    lang_en: "Англійська",
    lang_uk: "Українська",
    lang_ru: "Російська"
  },
  ru: {
    // Stats
    stats_title: "Детальная статистика",
    stats_subtitle: "Ваш персональный recap чтения",
    btn_back: "← Назад",
    total_reviews: "Всего рецензий",
    avg_rating: "Средняя оценка",
    streak_label: "Дней подряд",
    active_days: "Активных дней",
    avg_chapters: "Глав в среднем",
    activity: "📅 Активность",
    activity_sub: "Количество рецензий по дням — наведите для деталей",
    rating_dist: "⭐ Распределение оценок",
    rating_dist_sub: "оцененных рецензий",
    read_status: "📂 Статус чтения",
    status_sub: "Распределение по статусам",
    chapters_len: "📏 Длина манхв",
    chapters_len_sub: "Статистика по количеству глав",
    avg_lbl: "Среднее",
    median_lbl: "Медиана",
    min_lbl: "Минимум",
    max_lbl: "Максимум",
    total_chap_lbl: "Всего глав",
    top_authors: "✍️ Топ авторов",
    top_artists: "🎨 Топ художников",
    authors_sub: "Из данных скрапера",
    fav_tags: "🏷️ Любимые теги",
    fav_tags_sub: "Часто используемые теги",
    fav_era: "⏳ Любимая Эра",
    fav_era_sub: "Распределение прочитанного по году выпуска",
    read_pace: "📈 Темп чтения",
    read_pace_sub: "Рецензии по месяцам (за последний год)",
    no_data: "Нет данных",
    status_done: "Прочитано",
    status_reading: "Читаю",
    status_planned: "В планах",
    status_dropped: "Брошено",
    total_word: "всего",
    best_streak: "Лучший стрик",
    popular_lengths: "🏆 Частая длина:",
    chapters: "глав",
    mangas: "манхв",

    // Account settings
    lang_setting: "Язык интерфейса",
    lang_en: "Английский",
    lang_uk: "Украинский",
    lang_ru: "Русский"
  }
};

// Calculate default language based on session & localStorage
export function getCurrentLang() {
  const saved = localStorage.getItem('appLang');
  if (saved && translations[saved]) return saved;

  // Unregistered user gets English default
  if (!Session.currentUser()) {
    return 'en';
  }
  return 'uk'; // Default for existing registered users
}

export function setLang(lang) {
  if (translations[lang]) {
    localStorage.setItem('appLang', lang);
    window.location.reload();
  }
}

export function t(key) {
  const lang = getCurrentLang();
  return translations[lang][key] || translations['uk'][key] || key;
}

export function getMonths() {
  const lang = getCurrentLang();
  if (lang === 'en') return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  if (lang === 'ru') return ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'];
  return ['Січ','Лют','Бер','Кві','Тра','Чер','Лип','Сер','Вер','Жов','Лис','Гру'];
}
