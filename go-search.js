// GO Wiki — Inner page search module (自動注入)
// Requires: search-index.js loaded before this file

(function () {
  // ── CSS ──────────────────────────────────────────────────
  const css = `
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
  // Called by i18n.js after each translation pass
  document.addEventListener('langchange', () => {
    const input = document.getElementById('gosInput');
    if (input) {
      input.placeholder = PLACEHOLDER[getLang()] || PLACEHOLDER.zh;
      if (input.value.trim()) doSearch(input.value);
    }
    makeBreadcrumbLinks(); // re-apply after lang change replaces text
  });

  // ── Init ─────────────────────────────────────────────────
  function init() {
    inject();
    injectBackToTop();
    // Breadcrumb links applied after langchange event fires from SCMi18n.init()
    // (which fires after this script runs via DOMContentLoaded)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
