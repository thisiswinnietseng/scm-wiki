(function() {
  // Detect if we're in pages/ subfolder
  var inSubfolder = window.location.pathname.indexOf('/pages/') !== -1;
  var faqHref = inSubfolder ? 'faq.html' : 'pages/faq.html';

  // Inject CSS
  var style = document.createElement('style');
  style.textContent = `
.ql-float-btn {
  position:fixed; left:0; top:50%; transform:translateY(-50%);
  z-index:300;
  display:flex; flex-direction:column; align-items:center;
  background:linear-gradient(135deg,#667eea,#764ba2);
  color:white; border-radius:0 14px 14px 0;
  padding:18px 13px; cursor:pointer;
  box-shadow:3px 0 16px rgba(102,126,234,0.35);
  transition:padding 0.2s, box-shadow 0.2s;
  user-select:none; border:none; font-family:inherit;
}
.ql-float-btn:hover { padding-right:17px; box-shadow:4px 0 20px rgba(102,126,234,0.45); }
.faq-float-btn {
  top:calc(50% + 110px);
  background:linear-gradient(135deg,#667eea,#764ba2);
  box-shadow:3px 0 16px rgba(102,126,234,0.35);
  text-decoration:none;
}
.faq-float-btn:hover { box-shadow:4px 0 20px rgba(102,126,234,0.45); }
.ql-float-btn .ql-btn-icon { font-size:22px; margin-bottom:8px; }
.ql-float-btn .ql-btn-text {
  font-size:11px; font-weight:800; letter-spacing:1.5px;
  writing-mode:vertical-rl; text-orientation:mixed;
}
.ql-sidebar {
  position:fixed; left:0; top:50%; transform:translateY(-50%) translateX(-100%);
  z-index:299;
  background:white; border-radius:0 16px 16px 0;
  box-shadow:4px 0 32px rgba(0,0,0,0.15);
  padding:0; width:240px;
  transition:transform 0.3s cubic-bezier(0.34,1.2,0.64,1), opacity 0.25s;
  opacity:0; pointer-events:none;
}
.ql-sidebar.open { transform:translateY(-50%) translateX(0); opacity:1; pointer-events:auto; }
.ql-sidebar-header {
  background:linear-gradient(135deg,#667eea,#764ba2);
  border-radius:0 12px 0 0;
  padding:14px 16px;
  display:flex; align-items:center; justify-content:space-between;
}
.ql-sidebar-title { font-size:13px; font-weight:800; color:white; letter-spacing:0.3px; }
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
  padding:10px 16px; text-decoration:none;
  color:inherit; transition:background 0.12s;
  border-left:3px solid transparent;
}
.ql-card:hover { background:#f5f7ff; border-left-color:#667eea; }
.ql-icon { width:34px; height:34px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:17px; flex-shrink:0; }
.ql-body { flex:1; min-width:0; }
.ql-name { font-size:12px; font-weight:700; color:var(--primary,#1a1a2e); }
.ql-url { font-size:10px; color:var(--gray,#888); margin-top:1px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.ql-arrow { font-size:12px; color:#c0c8e0; flex-shrink:0; }
  `;
  document.head.appendChild(style);

  // Inject HTML
  var html = `
<button class="ql-float-btn" onclick="toggleQlSidebar()" id="qlFloatBtn" aria-label="快速連結">
  <span class="ql-btn-icon">🔗</span>
  <span class="ql-btn-text">快速連結</span>
</button>
<a class="ql-float-btn faq-float-btn" href="${faqHref}" aria-label="常見問題 FAQ">
  <span class="ql-btn-icon">💬</span>
  <span class="ql-btn-text">FAQ</span>
</a>
<div class="ql-sidebar" id="qlSidebar">
  <div class="ql-sidebar-header">
    <span class="ql-sidebar-title">🔗 超連結專區</span>
    <button class="ql-sidebar-close" onclick="toggleQlSidebar()">✕</button>
  </div>
  <div class="ql-links">
    <a class="ql-card" href="https://docs.google.com/spreadsheets/d/1_Y-sEdNWoSkgOoI3o1caoPHs9ggiy0Wvu6TwI8Jpa_Y/edit?pli=1#gid=654199293" target="_blank">
      <div class="ql-icon" style="background:linear-gradient(135deg,#43e97b,#38f9d7)">📅</div>
      <div class="ql-body"><div class="ql-name">SCM 班表</div><div class="ql-url">Google Sheets</div></div>
      <span class="ql-arrow">↗</span>
    </a>
    <a class="ql-card" href="https://docs.google.com/spreadsheets/d/1WREYLFm7yiAAZlAoTgWX5O7N87yAR8V6fatMVLiVGPU/edit?pli=1&gid=625913861#gid=625913861" target="_blank">
      <div class="ql-icon" style="background:linear-gradient(135deg,#f093fb,#f5576c)">📅</div>
      <div class="ql-body"><div class="ql-name">CRM 班表</div><div class="ql-url">Google Sheets</div></div>
      <span class="ql-arrow">↗</span>
    </a>
    <a class="ql-card" href="https://be2.kkday.com/v2/auth/login" target="_blank">
      <div class="ql-icon" style="background:linear-gradient(135deg,#4facfe,#00f2fe)">🖥️</div>
      <div class="ql-body"><div class="ql-name">Be2 系統</div><div class="ql-url">be2.kkday.com</div></div>
      <span class="ql-arrow">↗</span>
    </a>
    <a class="ql-card" href="https://b2d.kkday.com/Login/?ReturnUrl=%2F" target="_blank">
      <div class="ql-icon" style="background:linear-gradient(135deg,#667eea,#764ba2)">🖥️</div>
      <div class="ql-body"><div class="ql-name">B2D 系統</div><div class="ql-url">b2d.kkday.com</div></div>
      <span class="ql-arrow">↗</span>
    </a>
    <a class="ql-card" href="https://odoo.eip.kkday.net/zh_TW/home" target="_blank">
      <div class="ql-icon" style="background:linear-gradient(135deg,#f7971e,#ffd200)">📋</div>
      <div class="ql-body"><div class="ql-name">BPM 系統</div><div class="ql-url">odoo.eip.kkday.net</div></div>
      <span class="ql-arrow">↗</span>
    </a>
    <a class="ql-card" href="https://psi.kkday.com/auth/login" target="_blank">
      <div class="ql-icon" style="background:linear-gradient(135deg,#1a1a2e,#2193b0)">📦</div>
      <div class="ql-body"><div class="ql-name">PSI 系統</div><div class="ql-url">psi.kkday.com</div></div>
      <span class="ql-arrow">↗</span>
    </a>
    <a class="ql-card" href="https://docs.google.com/spreadsheets/d/1EietW_y2Z_AeF49wj-Yu-hm4JUygAk_rj9AOt8xCF7I/edit?gid=1732273449#gid=1732273449" target="_blank">
      <div class="ql-icon" style="background:linear-gradient(135deg,#11998e,#38ef7d)">🗓️</div>
      <div class="ql-body"><div class="ql-name">新人教學時程</div><div class="ql-url">Google Sheets</div></div>
      <span class="ql-arrow">↗</span>
    </a>
    <a class="ql-card" href="https://docs.google.com/spreadsheets/d/1ZJHc3WgAWCsYGF8Ymf3NG0u-i0loDq8Qo1mpqTTJgYY/edit?pli=1&gid=1405475943#gid=1405475943" target="_blank">
      <div class="ql-icon" style="background:linear-gradient(135deg,#f7971e,#ffd200)">💰</div>
      <div class="ql-body"><div class="ql-name">應請款表</div><div class="ql-url">Google Sheets</div></div>
      <span class="ql-arrow">↗</span>
    </a>
  </div>
</div>`;

  document.body.insertAdjacentHTML('beforeend', html);

  window.toggleQlSidebar = function() {
    var sidebar = document.getElementById('qlSidebar');
    if (sidebar) sidebar.classList.toggle('open');
  };
})();
