// GO Wiki — Shared i18n utilities
// Include this in every page with: <script src="../i18n.js"></script>

window.SCMi18n = (function () {
  const STORAGE_KEY = 'scm-lang';
  const DEFAULT_LANG = 'zh';

  const NAV_TRANSLATIONS = {
    zh: {
      'nav-title': 'SCM <em>知識庫</em>',
      'nav-subtitle': 'OP 日常作業手冊 · 新人必讀 · 一站式查詢',
      'footer': 'SCM 知識庫 · 內部使用'
    },
    en: {
      'nav-title': 'SCM <em>Wiki</em>',
      'nav-subtitle': 'OP Daily Operations Manual · New Staff Guide · One-Stop Reference',
      'footer': 'SCM Wiki · Internal use only'
    },
    ja: {
      'nav-title': 'SCM <em>ナレッジベース</em>',
      'nav-subtitle': 'OP 日常業務マニュアル · 新人必読 · ワンストップ参照',
      'footer': 'SCM ナレッジベース · 内部使用のみ'
    },
    ko: {
      'nav-title': 'SCM <em>지식베이스</em>',
      'nav-subtitle': 'OP 일상 업무 매뉴얼 · 신입 필독 · 원스톱 조회',
      'footer': 'SCM 지식베이스 · 내부 전용'
    }
  };

  const LANG_META = {
    zh: 'zh-TW',
    en: 'en',
    ja: 'ja',
    ko: 'ko'
  };

  let current = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;

  function applyTranslations(pageTranslations) {
    const t = Object.assign({}, NAV_TRANSLATIONS[current], pageTranslations?.[current] || {});

    // textContent
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) el.textContent = t[key];
    });

    // innerHTML (with HTML tags)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (t[key] !== undefined) el.innerHTML = t[key];
    });

    // title attribute
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (t[key] !== undefined) el.title = t[key];
    });

    // placeholder attribute
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (t[key] !== undefined) el.placeholder = t[key];
    });

    document.documentElement.lang = LANG_META[current] || current;
  }

  function updateButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === current);
    });
  }

  function switchLang(lang) {
    current = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    applyTranslations(window.PAGE_TRANSLATIONS);
    updateButtons();
    // notify search module to re-render if open
    if (typeof window.onLangSwitch === 'function') window.onLangSwitch(lang);
  }

  function init(pageTranslations) {
    window.PAGE_TRANSLATIONS = pageTranslations || null;
    applyTranslations(pageTranslations);
    updateButtons();
  }

  return { init, switch: switchLang, current: () => current };
})();
