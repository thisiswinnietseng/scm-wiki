// GO Wiki — AI 問答模組
// Worker URL: https://go-wiki-ai.winnie-tseng.workers.dev/

(function () {
  const WORKER_URL = 'https://go-wiki-ai.winnie-tseng.workers.dev/';

  const LABELS = {
    zh: { btn: 'AI 問答', title: '🤖 GO AI 助理', placeholder: '問我任何作業問題… 例：OCBT取消怎麼做？', send: '送出', thinking: 'AI 思考中…', welcome: '你好！我是 GO 知識庫 AI 助理 👋\n有任何 SCM / CS 作業問題都可以問我！', error: '⚠️ 抱歉，發生錯誤，請稍後再試。', clear: '清除對話' },
    en: { btn: 'AI Q&A', title: '🤖 GO AI Assistant', placeholder: 'Ask any operations question…', send: 'Send', thinking: 'AI is thinking…', welcome: 'Hi! I\'m the GO Wiki AI Assistant 👋\nFeel free to ask any SCM / CS operations questions!', error: '⚠️ Sorry, an error occurred. Please try again.', clear: 'Clear chat' },
    ja: { btn: 'AI 問答', title: '🤖 GO AI アシスタント', placeholder: '業務に関する質問を入力…', send: '送信', thinking: 'AI が考え中…', welcome: 'こんにちは！GO ナレッジベース AI アシスタントです 👋\nSCM / CS の業務に関する質問はなんでもどうぞ！', error: '⚠️ エラーが発生しました。もう一度お試しください。', clear: 'チャットを消去' },
    ko: { btn: 'AI 문답', title: '🤖 GO AI 어시스턴트', placeholder: '업무 관련 질문을 입력하세요…', send: '전송', thinking: 'AI가 생각 중…', welcome: '안녕하세요! GO 지식베이스 AI 어시스턴트입니다 👋\nSCM / CS 업무 관련 질문은 무엇이든 물어보세요!', error: '⚠️ 오류가 발생했습니다. 다시 시도해 주세요.', clear: '대화 지우기' },
  };

  // ── CSS ──────────────────────────────────────────────────
  const css = `
/* AI 浮動按鈕 */
.go-ai-fab {
  position:fixed; bottom:82px; right:24px; z-index:410;
  display:flex; align-items:center; gap:8px;
  background:linear-gradient(135deg,#f093fb,#f5576c);
  color:white; border:none; border-radius:28px;
  padding:12px 18px; cursor:pointer; font-family:inherit;
  font-size:13px; font-weight:700;
  box-shadow:0 4px 18px rgba(240,147,251,.45);
  transition:transform .2s, box-shadow .2s;
  white-space:nowrap;
}
.go-ai-fab:hover { transform:translateY(-2px); box-shadow:0 6px 24px rgba(240,147,251,.55); }
.go-ai-fab .fab-icon { font-size:18px; }

/* AI 面板 */
.go-ai-panel {
  position:fixed; bottom:80px; right:20px; z-index:420;
  width:380px; max-width:calc(100vw - 40px);
  background:white; border-radius:20px;
  box-shadow:0 12px 48px rgba(0,0,0,.18);
  display:flex; flex-direction:column;
  transform:translateY(20px) scale(0.95);
  opacity:0; pointer-events:none;
  transition:transform .3s cubic-bezier(0.34,1.2,0.64,1), opacity .25s;
  max-height:70vh;
}
.go-ai-panel.open {
  transform:translateY(0) scale(1);
  opacity:1; pointer-events:auto;
}
.go-ai-header {
  background:linear-gradient(135deg,#f093fb,#f5576c);
  border-radius:20px 20px 0 0;
  padding:14px 18px;
  display:flex; align-items:center; justify-content:space-between;
}
.go-ai-header-left { display:flex; align-items:center; gap:10px; }
.go-ai-header-icon { font-size:22px; }
.go-ai-header-title { font-size:14px; font-weight:800; color:white; }
.go-ai-header-actions { display:flex; align-items:center; gap:6px; }
.go-ai-clear-btn {
  background:rgba(255,255,255,.2); border:none; color:white;
  border-radius:8px; padding:4px 10px; font-size:11px; font-weight:700;
  cursor:pointer; transition:background .15s; font-family:inherit;
}
.go-ai-clear-btn:hover { background:rgba(255,255,255,.35); }
.go-ai-close-btn {
  background:rgba(255,255,255,.2); border:none; color:white;
  width:28px; height:28px; border-radius:50%; cursor:pointer;
  font-size:16px; display:flex; align-items:center; justify-content:center;
  transition:background .15s;
}
.go-ai-close-btn:hover { background:rgba(255,255,255,.35); }

/* 訊息區 */
.go-ai-messages {
  flex:1; overflow-y:auto; padding:16px;
  display:flex; flex-direction:column; gap:12px;
  min-height:200px;
}
.go-ai-msg { display:flex; gap:8px; align-items:flex-start; }
.go-ai-msg.user { flex-direction:row-reverse; }
.go-ai-msg-avatar {
  width:32px; height:32px; border-radius:50%; flex-shrink:0;
  display:flex; align-items:center; justify-content:center; font-size:16px;
}
.go-ai-msg.ai .go-ai-msg-avatar { background:linear-gradient(135deg,#f093fb,#f5576c); }
.go-ai-msg.user .go-ai-msg-avatar { background:linear-gradient(135deg,#667eea,#764ba2); }
.go-ai-msg-bubble {
  max-width:80%; padding:10px 14px; border-radius:14px;
  font-size:13px; line-height:1.7;
}
.go-ai-msg.ai .go-ai-msg-bubble { background:#f7f8fc; color:#1a1a2e; border-radius:4px 14px 14px 14px; }
.go-ai-msg.user .go-ai-msg-bubble { background:linear-gradient(135deg,#667eea,#764ba2); color:white; border-radius:14px 4px 14px 14px; }

/* 打字動畫 */
.go-ai-typing { display:flex; gap:4px; align-items:center; padding:4px 0; }
.go-ai-typing span { width:7px; height:7px; border-radius:50%; background:#ccc; animation:aiDot 1.2s infinite; }
.go-ai-typing span:nth-child(2) { animation-delay:.2s; }
.go-ai-typing span:nth-child(3) { animation-delay:.4s; }
@keyframes aiDot { 0%,80%,100%{transform:scale(0.7);opacity:.5} 40%{transform:scale(1);opacity:1} }

/* 來源標示 */
.go-ai-sources { font-size:10px; color:#a0aec0; margin-top:6px; }
.go-ai-sources a { color:#667eea; text-decoration:none; }
.go-ai-sources a:hover { text-decoration:underline; }

/* 輸入區 */
.go-ai-input-wrap {
  padding:12px 16px; border-top:1px solid #f0f0f0;
  display:flex; gap:8px; align-items:flex-end;
}
.go-ai-input {
  flex:1; border:1.5px solid #e2e8f0; border-radius:12px;
  padding:9px 13px; font-size:13px; font-family:inherit;
  resize:none; outline:none; max-height:100px; min-height:40px;
  transition:border-color .15s; line-height:1.5;
}
.go-ai-input:focus { border-color:#f093fb; }
.go-ai-send-btn {
  background:linear-gradient(135deg,#f093fb,#f5576c);
  border:none; border-radius:10px; color:white;
  width:38px; height:38px; cursor:pointer; flex-shrink:0;
  font-size:16px; display:flex; align-items:center; justify-content:center;
  transition:transform .15s, opacity .15s;
}
.go-ai-send-btn:hover { transform:scale(1.05); }
.go-ai-send-btn:disabled { opacity:.5; cursor:not-allowed; transform:none; }
`;

  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ── Markdown → HTML ─────────────────────────────────────
  function markdownToHtml(text) {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')   // **bold**
      .replace(/\*(.+?)\*/g, '<em>$1</em>')               // *italic*
      .replace(/^###\s(.+)/gm, '<b>$1</b>')               // ### heading
      .replace(/^##\s(.+)/gm, '<b>$1</b>')                // ## heading
      .replace(/^#\s(.+)/gm, '<b>$1</b>')                 // # heading
      .replace(/^\d+\.\s/gm, match => `<br>${match}`)     // 1. list items
      .replace(/^[-•]\s/gm, '<br>• ')                     // bullet points
      .replace(/\n\n/g, '<br><br>')                        // double newline
      .replace(/\n/g, '<br>');                             // single newline
  }

  // ── Search helper：找相關知識庫內容 ─────────────────────
  function findContext(question) {
    const idx = window.GO_SEARCH_INDEX || [];
    if (!idx.length) return '';
    const kws = question.toLowerCase().split(/\s+/).filter(k => k.length > 1);
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
    const top = scored.slice(0, 3);
    if (!top.length) return '';
    return top.map(({ item }) =>
      `【${item.title}】（${item.category}）\n${item.content}`
    ).join('\n\n');
  }

  function getSourceLinks(question) {
    const idx = window.GO_SEARCH_INDEX || [];
    if (!idx.length) return [];
    const kws = question.toLowerCase().split(/\s+/).filter(k => k.length > 1);
    const scored = [];
    for (const item of idx) {
      let score = 0;
      for (const k of kws) {
        if (item.title.toLowerCase().includes(k)) score += 10;
        if (item.tags.join(' ').toLowerCase().includes(k)) score += 5;
        if (item.content.toLowerCase().includes(k)) score += 2;
      }
      if (score > 0) scored.push({ item, score });
    }
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 2).map(({ item }) => ({
      title: item.title,
      url: item.url.startsWith('pages/') ? item.url : item.url
    }));
  }

  // ── State ────────────────────────────────────────────────
  let isOpen = false;
  let isLoading = false;

  function getLang() {
    return localStorage.getItem('scm-lang') || 'zh';
  }

  function getLabel(key) {
    return (LABELS[getLang()] || LABELS.zh)[key];
  }

  // ── Build UI ─────────────────────────────────────────────
  function buildUI() {
    if (document.getElementById('goAiPanel')) return;

    // FAB button
    const fab = document.createElement('button');
    fab.id = 'goAiFab';
    fab.className = 'go-ai-fab';
    fab.innerHTML = `<span class="fab-icon">🤖</span><span id="goAiFabText">${getLabel('btn')}</span>`;
    fab.addEventListener('click', togglePanel);

    // Panel
    const panel = document.createElement('div');
    panel.id = 'goAiPanel';
    panel.className = 'go-ai-panel';
    panel.innerHTML = `
      <div class="go-ai-header">
        <div class="go-ai-header-left">
          <span class="go-ai-header-icon">🤖</span>
          <span class="go-ai-header-title" id="goAiTitle">${getLabel('title')}</span>
        </div>
        <div class="go-ai-header-actions">
          <button class="go-ai-clear-btn" id="goAiClearBtn">${getLabel('clear')}</button>
          <button class="go-ai-close-btn" id="goAiCloseBtn">✕</button>
        </div>
      </div>
      <div class="go-ai-messages" id="goAiMessages"></div>
      <div class="go-ai-input-wrap">
        <textarea class="go-ai-input" id="goAiInput"
          placeholder="${getLabel('placeholder')}" rows="1"></textarea>
        <button class="go-ai-send-btn" id="goAiSendBtn">➤</button>
      </div>
    `;

    document.body.appendChild(fab);
    document.body.appendChild(panel);

    // Welcome message
    appendMsg('ai', getLabel('welcome'));

    // Events
    document.getElementById('goAiCloseBtn').addEventListener('click', togglePanel);
    document.getElementById('goAiClearBtn').addEventListener('click', clearChat);
    document.getElementById('goAiSendBtn').addEventListener('click', sendMessage);
    const input = document.getElementById('goAiInput');
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    });
    input.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 100) + 'px';
    });

    // Close on outside click
    document.addEventListener('click', e => {
      const p = document.getElementById('goAiPanel');
      const f = document.getElementById('goAiFab');
      if (isOpen && !p.contains(e.target) && !f.contains(e.target)) {
        closePanel();
      }
    });
  }

  function togglePanel() {
    isOpen ? closePanel() : openPanel();
  }
  function openPanel() {
    isOpen = true;
    document.getElementById('goAiPanel').classList.add('open');
    document.getElementById('goAiFab').style.opacity = '0';
    document.getElementById('goAiFab').style.pointerEvents = 'none';
    setTimeout(() => document.getElementById('goAiInput')?.focus(), 300);
  }
  function closePanel() {
    isOpen = false;
    document.getElementById('goAiPanel').classList.remove('open');
    document.getElementById('goAiFab').style.opacity = '1';
    document.getElementById('goAiFab').style.pointerEvents = 'auto';
  }

  function appendMsg(role, text, sources) {
    const msgs = document.getElementById('goAiMessages');
    const div = document.createElement('div');
    div.className = `go-ai-msg ${role}`;
    const avatar = role === 'ai' ? '🤖' : '👤';
    let sourcesHtml = '';
    if (sources && sources.length) {
      const isInner = window.location.pathname.includes('/pages/');
      const prefix = isInner ? '' : 'pages/';
      sourcesHtml = `<div class="go-ai-sources">📖 參考：${sources.map(s =>
        `<a href="${prefix}${s.url}" target="_blank">${s.title}</a>`
      ).join('、')}</div>`;
    }
    div.innerHTML = `
      <div class="go-ai-msg-avatar">${avatar}</div>
      <div>
        <div class="go-ai-msg-bubble" ${role === 'ai' ? '' : ''}>${text}</div>
        ${sourcesHtml}
      </div>`;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function showTyping() {
    const msgs = document.getElementById('goAiMessages');
    const div = document.createElement('div');
    div.className = 'go-ai-msg ai';
    div.id = 'goAiTyping';
    div.innerHTML = `
      <div class="go-ai-msg-avatar">🤖</div>
      <div class="go-ai-msg-bubble">
        <div class="go-ai-typing"><span></span><span></span><span></span></div>
      </div>`;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function removeTyping() {
    document.getElementById('goAiTyping')?.remove();
  }

  function clearChat() {
    document.getElementById('goAiMessages').innerHTML = '';
    appendMsg('ai', getLabel('welcome'));
  }

  async function sendMessage() {
    if (isLoading) return;
    const input = document.getElementById('goAiInput');
    const question = input.value.trim();
    if (!question) return;

    input.value = '';
    input.style.height = 'auto';
    appendMsg('user', question);

    isLoading = true;
    document.getElementById('goAiSendBtn').disabled = true;
    showTyping();

    const context = findContext(question);
    const sources = getSourceLinks(question);
    const lang = getLang();

    try {
      const res = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, lang, context })
      });
      const data = await res.json();
      removeTyping();
      if (data.ok) {
        appendMsg('ai', markdownToHtml(data.answer), sources);
      } else {
        appendMsg('ai', getLabel('error'));
      }
    } catch {
      removeTyping();
      appendMsg('ai', getLabel('error'));
    } finally {
      isLoading = false;
      document.getElementById('goAiSendBtn').disabled = false;
    }
  }

  // ── Language switch hook ─────────────────────────────────
  document.addEventListener('langchange', () => {
    const fabText = document.getElementById('goAiFabText');
    const title = document.getElementById('goAiTitle');
    const input = document.getElementById('goAiInput');
    const clearBtn = document.getElementById('goAiClearBtn');
    if (fabText) fabText.textContent = getLabel('btn');
    if (title) title.textContent = getLabel('title');
    if (input) input.placeholder = getLabel('placeholder');
    if (clearBtn) clearBtn.textContent = getLabel('clear');
  });

  // ── Init ─────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildUI);
  } else {
    buildUI();
  }
})();
