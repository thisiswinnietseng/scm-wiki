// GO Wiki — Inner page search module (自動注入)
// Requires: search-index.js loaded before this file

(function () {
  // ── CSS ──────────────────────────────────────────────────
  const css = `
/* ── Floating Quick Links ── */
.ql-float-btn {
  position:fixed; left:0; top:50%; transform:translateY(-50%);
  z-index:300;
  display:flex; flex-direction:column; align-items:center;
  background:linear-gradient(135deg,#667eea,#764ba2);
  color:white; border-radius:0 14px 14px 0;
  padding:18px 13px; cursor:pointer;
  box-shadow:3px 0 16px rgba(102,126,234,0.35);
  transition:padding 0.2s, box-shadow 0.2s, opacity 0.2s;
  user-select:none; border:none; font-family:inherit;
}
.ql-float-btn:hover { padding-right:17px; box-shadow:4px 0 20px rgba(102,126,234,0.45); }
.ql-float-btn .ql-btn-icon { font-size:22px; margin-bottom:8px; }
.ql-float-btn .ql-btn-text { font-size:11px; font-weight:800; letter-spacing:1.5px; writing-mode:vertical-rl; text-orientation:mixed; }
.ql-sidebar {
  position:fixed; left:0; top:50%; z-index:299;
  background:white; border-radius:0 16px 16px 0;
  box-shadow:4px 0 32px rgba(0,0,0,0.15);
  width:240px;
  transform:translateY(-50%) translateX(-100%);
  opacity:0; pointer-events:none;
  transition:transform 0.3s cubic-bezier(0.34,1.2,0.64,1), opacity 0.25s;
}
.ql-sidebar.open { transform:translateY(-50%) translateX(0); opacity:1; pointer-events:auto; }
.ql-sidebar-header {
  background:linear-gradient(135deg,#667eea,#764ba2);
  border-radius:0 12px 0 0;
  padding:14px 16px;
  display:flex; align-items:center; justify-content:space-between;
}
.ql-sidebar-title { font-size:13px; font-weight:800; color:white; }
.ql-sidebar-close {
  background:rgba(255,255,255,0.2); border:none; color:white;
  width:24px; height:24px; border-radius:50%; cursor:pointer;
  font-size:14px; display:flex; align-items:center; justify-content:center;
  transition:background 0.15s;
}
.ql-sidebar-close:hover { background:rgba(255,255,255,0.35); }
.ql-links { display:flex; flex-direction:column; padding:8px 0; }
.ql-card {
  display:flex; align-items:center; gap:10px;
  padding:10px 16px; text-decoration:none; color:inherit;
  transition:background 0.12s; border-left:3px solid transparent;
}
.ql-card:hover { background:#f5f7ff; border-left-color:#667eea; }
.ql-icon { width:34px; height:34px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:17px; flex-shrink:0; }
.ql-body { flex:1; min-width:0; }
.ql-name { font-size:12px; font-weight:700; color:#1a1a2e; }
.ql-url { font-size:10px; color:#718096; margin-top:1px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.ql-arrow { font-size:12px; color:#c0c8e0; flex-shrink:0; }

/* ── Breadcrumb links ── */
.breadcrumb a.bc-home {
  color:inherit; text-decoration:none; opacity:.65;
  transition:opacity .15s;
}
.breadcrumb a.bc-home:hover { opacity:1; text-decoration:underline; text-underline-offset:3px; }
.breadcrumb .bc-current { font-weight:600; color:#1a1a2e; }

/* ── Back to top ── */
.go-top-btn {
  position:fixed; bottom:28px; right:24px; z-index:400;
  width:44px; height:44px; border-radius:50%;
  background:linear-gradient(135deg,#667eea,#764ba2);
  color:white; border:none; cursor:pointer;
  font-size:18px; display:flex; align-items:center; justify-content:center;
  box-shadow:0 4px 16px rgba(102,126,234,.4);
  opacity:0; transform:translateY(12px);
  transition:opacity .25s, transform .25s;
  pointer-events:none;
}
.go-top-btn.visible { opacity:1; transform:translateY(0); pointer-events:auto; }
.go-top-btn:hover { transform:translateY(-2px); box-shadow:0 6px 20px rgba(102,126,234,.5); }

.gos-wrap { position:relative; margin-bottom:18px; }
.gos-box {
  width:100%; box-sizing:border-box;
  padding:11px 44px 11px 42px;
  border-radius:12px; border:2px solid #e2e8f0;
  font-size:14px; font-family:inherit; outline:none;
  background:white; color:#1a1a2e;
  box-shadow:0 2px 8px rgba(0,0,0,0.05);
  transition:border-color .15s, box-shadow .15s;
}
.gos-box:focus {
  border-color:#667eea;
  box-shadow:0 0 0 4px rgba(102,126,234,.12),0 2px 8px rgba(0,0,0,.05);
}
.gos-icon { position:absolute; left:13px; top:50%; transform:translateY(-50%); font-size:16px; pointer-events:none; }
.gos-clear {
  position:absolute; right:12px; top:50%; transform:translateY(-50%);
  background:none; border:none; cursor:pointer; font-size:16px;
  color:#a0aec0; padding:4px; display:none; border-radius:50%; transition:background .15s;
}
.gos-clear:hover { background:#f0f0f0; }
.gos-results {
  position:absolute; top:calc(100% + 5px); left:0; right:0;
  background:white; border-radius:12px; border:1px solid #e2e8f0;
  box-shadow:0 8px 28px rgba(0,0,0,.12); z-index:500;
  max-height:420px; overflow-y:auto; display:none;
}
.gos-results.open { display:block; }
.gos-header { padding:8px 14px 5px; font-size:10px; font-weight:700; letter-spacing:.8px; color:#718096; text-transform:uppercase; border-bottom:1px solid #f0f0f0; }
.gos-item { display:flex; align-items:center; gap:10px; padding:10px 14px; cursor:pointer; border-bottom:1px solid #f9f9f9; text-decoration:none; color:inherit; transition:background .1s; }
.gos-item:last-child { border-bottom:none; }
.gos-item:hover { background:#fafbff; }
.gos-item-icon { width:32px; height:32px; border-radius:8px; background:#f0f4ff; display:flex; align-items:center; justify-content:center; font-size:16px; flex-shrink:0; }
.gos-item-body { flex:1; min-width:0; }
.gos-item-title { font-size:13px; font-weight:700; color:#1a1a2e; margin-bottom:1px; }
.gos-item-title mark { background:#fff3b0; color:#1a1a2e; border-radius:2px; padding:0 2px; }
.gos-item-cat { font-size:10px; color:#718096; }
.gos-item-snip { font-size:11px; color:#718096; margin-top:2px; line-height:1.5; }
.gos-item-snip mark { background:#fff3b0; border-radius:2px; padding:0 1px; }
.gos-empty { padding:28px 14px; text-align:center; font-size:13px; color:#a0aec0; }
`;
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ── Placeholder translations ────────────────────────────
  const PLACEHOLDER = {
    zh: '搜尋知識庫… 例如：OCBT取消、對帳、信用卡',
    en: 'Search wiki… e.g. OCBT cancel, reconciliation',
    ja: 'ナレッジベースを検索… 例：OCBT キャンセル',
    ko: '지식베이스 검索… 예: OCBT 취소'
  };
  const COUNT_TPL = {
    zh: '找到 {n} 筆結果', en: '{n} result(s) found',
    ja: '{n} 件見つかりました', ko: '{n}개 결과 발견'
  };
  const EMPTY_TPL = {
    zh: '😅 找不到「{q}」相關內容，試試其他關鍵字',
    en: '😅 No results for "{q}", try other keywords',
    ja: '😅 「{q}」の結果が見つかりません',
    ko: '😅 「{q}」결과가 없습니다'
  };

  function getLang() {
    return localStorage.getItem('scm-lang') || 'zh';
  }

  // ── Inject HTML ─────────────────────────────────────────
  function inject() {
    const wrapper = document.querySelector('.page-wrapper');
    if (!wrapper || document.getElementById('gosWrap')) return;

    const lang = getLang();
    const ph = PLACEHOLDER[lang] || PLACEHOLDER.zh;

    const wrap = document.createElement('div');
    wrap.className = 'gos-wrap';
    wrap.id = 'gosWrap';
    wrap.innerHTML = `
      <span class="gos-icon">🔍</span>
      <input class="gos-box" id="gosInput" type="text"
        placeholder="${ph}" autocomplete="off" />
      <button class="gos-clear" id="gosClear">✕</button>
      <div class="gos-results" id="gosResults"></div>
    `;
    wrapper.insertBefore(wrap, wrapper.firstChild);
    initListeners();
  }

  // ── Search logic ────────────────────────────────────────
  function hl(text, kws) {
    if (!kws.length) return text;
    const re = new RegExp(`(${kws.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
    return text.replace(re, '<mark>$1</mark>');
  }

  function doSearch(q) {
    const input = document.getElementById('gosInput');
    const results = document.getElementById('gosResults');
    if (!q.trim()) { results.classList.remove('open'); return; }

    const kws = q.trim().toLowerCase().split(/\s+/);
    const idx = window.GO_SEARCH_INDEX || [];
    const scored = [];

    for (const item of idx) {
      let score = 0;
      const tl = item.title.toLowerCase();
      const ta = item.tags.join(' ').toLowerCase();
      const co = item.content.toLowerCase();
      for (const k of kws) {
        if (tl.includes(k)) score += 10;
        if (ta.includes(k)) score += 5;
        if (co.includes(k)) score += 2;
      }
      if (score > 0) scored.push({ item, score });
    }
    scored.sort((a, b) => b.score - a.score);
    renderResults(scored.slice(0, 8), kws, q.trim());
  }

  function renderResults(scored, kws, rawQ) {
    const results = document.getElementById('gosResults');
    results.innerHTML = '';
    const lang = getLang();

    if (!scored.length) {
      const tpl = EMPTY_TPL[lang] || EMPTY_TPL.zh;
      results.innerHTML = `<div class="gos-empty">${tpl.replace('{q}', rawQ)}</div>`;
      results.classList.add('open');
      return;
    }

    const hdr = document.createElement('div');
    hdr.className = 'gos-header';
    const ct = COUNT_TPL[lang] || COUNT_TPL.zh;
    hdr.textContent = ct.replace('{n}', scored.length);
    results.appendChild(hdr);

    for (const { item } of scored) {
      // Fix URL: inner pages are already in pages/ dir
      const href = item.url.replace(/^pages\//, '');
      const coLow = item.content.toLowerCase();
      const kw = kws.find(k => coLow.includes(k)) || kws[0];
      const idx2 = kw ? Math.max(0, coLow.indexOf(kw) - 15) : 0;
      const snip = item.content.slice(idx2, idx2 + 55) + '…';

      const a = document.createElement('a');
      a.className = 'gos-item';
      a.href = href;
      a.innerHTML = `
        <div class="gos-item-icon">${item.icon}</div>
        <div class="gos-item-body">
          <div class="gos-item-title">${hl(item.title, kws)}</div>
          <div class="gos-item-cat">${item.category}</div>
          <div class="gos-item-snip">${hl(snip, kws)}</div>
        </div>
      `;
      results.appendChild(a);
    }
    results.classList.add('open');
  }

  function initListeners() {
    const input = document.getElementById('gosInput');
    const results = document.getElementById('gosResults');
    const clear = document.getElementById('gosClear');
    if (!input) return;

    input.addEventListener('input', () => {
      clear.style.display = input.value ? 'block' : 'none';
      doSearch(input.value);
    });
    input.addEventListener('keydown', e => {
      if (e.key === 'Escape') { input.value = ''; clear.style.display = 'none'; results.classList.remove('open'); }
    });
    clear.addEventListener('click', () => {
      input.value = ''; clear.style.display = 'none'; results.classList.remove('open'); input.focus();
    });
    document.addEventListener('click', e => {
      if (!document.getElementById('gosWrap').contains(e.target)) results.classList.remove('open');
    });
    // ⌘K
    document.addEventListener('keydown', e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); input.focus(); input.select(); }
    });
  }

  // ── Floating Quick Links ────────────────────────────────
  const QL_ITEMS = [
    { key:'ql-scm', url:'https://docs.google.com/spreadsheets/d/1_Y-sEdNWoSkgOoI3o1caoPHs9ggiy0Wvu6TwI8Jpa_Y/edit?pli=1#gid=654199293', icon:'📅', bg:'linear-gradient(135deg,#43e97b,#38f9d7)', sub:'Google Sheets' },
    { key:'ql-crm', url:'https://docs.google.com/spreadsheets/d/1WREYLFm7yiAAZlAoTgWX5O7N87yAR8V6fatMVLiVGPU/edit?pli=1&gid=625913861#gid=625913861', icon:'📅', bg:'linear-gradient(135deg,#f093fb,#f5576c)', sub:'Google Sheets' },
    { key:'ql-be2', url:'https://be2.kkday.com/v2/auth/login', icon:'🖥️', bg:'linear-gradient(135deg,#4facfe,#00f2fe)', sub:'be2.kkday.com' },
    { key:'ql-b2d', url:'https://b2d.kkday.com/Login/?ReturnUrl=%2F', icon:'🖥️', bg:'linear-gradient(135deg,#667eea,#764ba2)', sub:'b2d.kkday.com' },
    { key:'ql-bpm', url:'https://odoo.eip.kkday.net/zh_TW/home', icon:'📋', bg:'linear-gradient(135deg,#f7971e,#ffd200)', sub:'odoo.eip.kkday.net' },
    { key:'ql-psi', url:'https://psi.kkday.com/auth/login', icon:'📦', bg:'linear-gradient(135deg,#1a1a2e,#2193b0)', sub:'psi.kkday.com' },
  ];

  const QL_NAMES = {
    zh: { 'ql-scm':'SCM 班表','ql-crm':'CRM 班表','ql-be2':'Be2 系統','ql-b2d':'B2D 系統','ql-bpm':'BPM 系統','ql-psi':'PSI 系統','ql-label':'🔗 超連結專區','ql-btn':'快速連結' },
    en: { 'ql-scm':'SCM Schedule','ql-crm':'CRM Schedule','ql-be2':'Be2 System','ql-b2d':'B2D System','ql-bpm':'BPM System','ql-psi':'PSI System','ql-label':'🔗 Quick Links','ql-btn':'Links' },
    ja: { 'ql-scm':'SCM シフト表','ql-crm':'CRM シフト表','ql-be2':'Be2 システム','ql-b2d':'B2D システム','ql-bpm':'BPM システム','ql-psi':'PSI システム','ql-label':'🔗 クイックリンク','ql-btn':'リンク' },
    ko: { 'ql-scm':'SCM 스케줄','ql-crm':'CRM 스케줄','ql-be2':'Be2 시스템','ql-b2d':'B2D 시스템','ql-bpm':'BPM 시스템','ql-psi':'PSI 시스템','ql-label':'🔗 빠른 링크','ql-btn':'링크' },
  };

  function injectQuickLinks() {
    if (document.getElementById('qlFloatBtn')) return;
    const lang = getLang();
    const t = QL_NAMES[lang] || QL_NAMES.zh;

    // Build links HTML
    const linksHtml = QL_ITEMS.map(item => `
      <a class="ql-card" href="${item.url}" target="_blank">
        <div class="ql-icon" style="background:${item.bg}">${item.icon}</div>
        <div class="ql-body">
          <div class="ql-name" data-ql-key="${item.key}">${t[item.key]}</div>
          <div class="ql-url">${item.sub}</div>
        </div>
        <span class="ql-arrow">↗</span>
      </a>`).join('');

    const sidebar = document.createElement('div');
    sidebar.id = 'qlSidebar';
    sidebar.className = 'ql-sidebar';
    sidebar.innerHTML = `
      <div class="ql-sidebar-header">
        <span class="ql-sidebar-title" id="qlLabel">${t['ql-label']}</span>
        <button class="ql-sidebar-close" id="qlClose">✕</button>
      </div>
      <div class="ql-links">${linksHtml}</div>`;

    const btn = document.createElement('button');
    btn.id = 'qlFloatBtn';
    btn.className = 'ql-float-btn';
    btn.setAttribute('aria-label', '快速連結');
    btn.innerHTML = `<span class="ql-btn-icon">🔗</span><span class="ql-btn-text" id="qlBtnText">${t['ql-btn']}</span>`;

    document.body.appendChild(btn);
    document.body.appendChild(sidebar);

    // Toggle
    btn.addEventListener('click', toggleQL);
    document.getElementById('qlClose').addEventListener('click', toggleQL);
    document.addEventListener('click', e => {
      if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && !btn.contains(e.target)) {
        closeQL();
      }
    });
  }

  function toggleQL() {
    const sidebar = document.getElementById('qlSidebar');
    const btn = document.getElementById('qlFloatBtn');
    if (!sidebar) return;
    const isOpen = sidebar.classList.toggle('open');
    btn.style.opacity = isOpen ? '0' : '1';
    btn.style.pointerEvents = isOpen ? 'none' : 'auto';
  }

  function closeQL() {
    const sidebar = document.getElementById('qlSidebar');
    const btn = document.getElementById('qlFloatBtn');
    if (!sidebar) return;
    sidebar.classList.remove('open');
    btn.style.opacity = '1';
    btn.style.pointerEvents = 'auto';
  }

  function updateQLLang() {
    const lang = getLang();
    const t = QL_NAMES[lang] || QL_NAMES.zh;
    const label = document.getElementById('qlLabel');
    const btnText = document.getElementById('qlBtnText');
    if (label) label.textContent = t['ql-label'];
    if (btnText) btnText.textContent = t['ql-btn'];
    document.querySelectorAll('[data-ql-key]').forEach(el => {
      const key = el.getAttribute('data-ql-key');
      if (t[key]) el.textContent = t[key];
    });
  }

  // ── Breadcrumb links ────────────────────────────────────
  function makeBreadcrumbLinks() {
    const bc = document.querySelector('.breadcrumb');
    if (!bc) return;
    const text = bc.textContent.trim();
    const parts = text.split('/').map(p => p.trim()).filter(Boolean);
    if (parts.length === 0) return;

    let html = `<a href="../index.html" class="bc-home">${parts[0]}</a>`;
    for (let i = 1; i < parts.length; i++) {
      const isLast = i === parts.length - 1;
      html += ` / ${isLast
        ? `<span class="bc-current">${parts[i]}</span>`
        : `<span>${parts[i]}</span>`}`;
    }
    bc.innerHTML = html;
  }

  // ── Back to top ─────────────────────────────────────────
  function injectBackToTop() {
    if (document.getElementById('goTopBtn')) return;
    const btn = document.createElement('button');
    btn.id = 'goTopBtn';
    btn.className = 'go-top-btn';
    btn.innerHTML = '↑';
    btn.title = '回到頂部';
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 350);
    }, { passive: true });
  }

  // ── Language switch hook ─────────────────────────────────
  document.addEventListener('langchange', () => {
    const input = document.getElementById('gosInput');
    if (input) {
      input.placeholder = PLACEHOLDER[getLang()] || PLACEHOLDER.zh;
      if (input.value.trim()) doSearch(input.value);
    }
    makeBreadcrumbLinks();
    updateQLLang();
  });

  // ── Init ─────────────────────────────────────────────────
  function init() {
    inject();
    injectBackToTop();
    injectQuickLinks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
