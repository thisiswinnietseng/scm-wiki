// GO 知識庫 搜尋索引
// 每筆記錄：title, category, tags, content, url, icon, badge
window.GO_SEARCH_INDEX = [
  // ── SCM + CS 共同 ──────────────────────────────────────────
  {
    title: '前台商品架構長相',
    category: 'SCM + CS 共同',
    icon: '🏪',
    url: 'pages/frontend.html',
    badge: '新人必讀',
    tags: ['前台', '商品架構', '票券', '交通', '飯店', '頁面', '旅客'],
    content: '一般票券 點對點交通 飯店 頁面結構 商品分類 前台介面 展示方式 商品設定'
  },
  {
    title: '商品設計邏輯',
    category: 'SCM + CS 共同',
    icon: '🧠',
    url: 'pages/product-design.html',
    badge: '新人必讀',
    tags: ['商品設計', '設定', '作業流程', '客人認知', '影響', '商品邏輯'],
    content: '商品設定 如何影響 客人認知 作業流程 售前 售後 設計邏輯 商品規則 設定方式'
  },
  {
    title: '訂單成立後初步處理',
    category: 'SCM + CS 共同',
    icon: '📬',
    url: 'pages/order-init.html',
    badge: '訂單',
    tags: ['訂單', '初步處理', 'SYSTEM', 'CS點單', '風控', '可疑訂單', '訂單成立'],
    content: 'SYSTEM 點單 CS 點單 風控 可疑訂單 訂單成立 初步確認 訂單進來 處理步驟'
  },
  {
    title: '訂單進單後處理流程',
    category: 'SCM + CS 共同',
    icon: '🔄',
    url: 'pages/order-flow.html',
    badge: '訂單',
    tags: ['訂單流程', '資料齊全', '資料不齊', '供應商', '接單', '四大情境', '訂單進單'],
    content: '四大情境 資料齊全 資料不齊 供應商可接單 供應商不可接單 訂單進單 處理流程 情境判斷'
  },
  {
    title: 'PSI 票倉介紹',
    category: 'SCM + CS 共同',
    icon: '📦',
    url: 'pages/inventory.html',
    badge: '庫存',
    tags: ['PSI', '票倉', '庫存', '入庫', '出庫', '庫存管理', '票券庫存'],
    content: 'PSI 系統 票倉 入庫 出庫 庫存管理 庫存補充 票券庫存 庫存異常 退票'
  },
  {
    title: '憑證類型說明',
    category: 'SCM + CS 共同',
    icon: '🎫',
    url: 'pages/voucher.html',
    badge: '出票',
    tags: ['憑證', 'voucher', 'KKday Voucher', 'Supplier版型', '官方', '非官方', '電子憑證'],
    content: 'KKday Voucher Supplier 官方版型 非官方版型 電子憑證 QR Code 條碼 憑證格式 出票 發票'
  },

  // ── SCM 訂單管理：自動出票 ────────────────────────────────
  {
    title: 'API 自動出票',
    category: 'SCM 訂單管理',
    icon: '🔌',
    url: 'pages/api.html',
    badge: '自動',
    tags: ['API', '自動出票', '串接', '供應商平台', '即時', '失敗', 'API失敗'],
    content: 'API 串接 供應商平台 即時出票 自動出票 失敗處理 錯誤訊息 重串 BD AM Slack 通知'
  },
  {
    title: 'OCBT',
    category: 'SCM 訂單管理',
    icon: '📦',
    url: 'pages/ocbt.html',
    badge: '自動',
    tags: ['OCBT', '多供應商', '組合', '即訂即出', '設定限制', '失敗處理', 'OCBT取消'],
    content: 'OCBT 多供應商 組合 即訂即出 設定限制 失敗處理 OCBT取消 OCBT失敗 庫存'
  },
  {
    title: 'PSI 自動出票',
    category: 'SCM 訂單管理',
    icon: '🗄️',
    url: 'pages/psi.html',
    badge: '自動',
    tags: ['PSI', '票倉庫存', '出票', '出貨失敗', 'PSI失敗', '退貨', '庫存出票'],
    content: 'PSI 票倉庫存 出票 出貨失敗 失敗處理 退貨 庫存 PSI出票 PSI失敗 補票'
  },
  {
    title: '一般即訂即出',
    category: 'SCM 訂單管理',
    icon: '⚡',
    url: 'pages/general-instant.html',
    badge: '自動',
    tags: ['即訂即出', '一般', 'KKday憑證', '自動產出', '系統自動'],
    content: '一般即訂即出 系統自動 KKday 憑證 發送旅客 自動處理 系統產出'
  },
  {
    title: '假即訂即出',
    category: 'SCM 訂單管理',
    icon: '🎭',
    url: 'pages/fake-instant.html',
    badge: '',
    tags: ['假即訂即出', '人工訂購', '系統憑證', 'OP', '仍需人工'],
    content: '假即訂即出 系統出憑證 仍需 OP 人工訂購 假的即訂即出 人工處理'
  },

  // ── SCM 訂單管理：人工訂購 ──────────────────────────────
  {
    title: '平台訂購',
    category: 'SCM 訂單管理',
    icon: '🖥️',
    url: 'pages/platform.html',
    badge: '人工',
    tags: ['平台訂購', '供應商平台', '人工', '7步驟', 'B2B', '登入', 'RoboForm'],
    content: '平台訂購 供應商平台 7步驟 登入 選擇商品 填寫旅客資料 確認訂單 付款 追蹤 RoboForm B2B'
  },
  {
    title: 'Mail 訂購',
    category: 'SCM 訂單管理',
    icon: '📧',
    url: 'pages/mail-order.html',
    badge: '人工',
    tags: ['Mail訂購', '電子郵件', 'Email', '4步驟', '人工訂購', '郵件訂購'],
    content: 'Mail 訂購 電子郵件 Email 4步驟 複製旅客資料 確認供應商郵箱 追蹤 人工'
  },
  {
    title: '通訊軟體訂購',
    category: 'SCM 訂單管理',
    icon: '💬',
    url: 'pages/messaging.html',
    badge: '人工',
    tags: ['KakaoTalk', 'WhatsApp', '通訊軟體', '訂購格式', '範本', 'LINE'],
    content: 'KakaoTalk WhatsApp LINE 通訊軟體 訂購格式 範本 訊息 供應商'
  },
  {
    title: 'Google Sheet 訂購',
    category: 'SCM 訂單管理',
    icon: '📊',
    url: 'pages/google-sheet.html',
    badge: '人工',
    tags: ['Google Sheet', '填單', '供應商', '追蹤確認', 'Google試算表'],
    content: 'Google Sheet 填單流程 告知供應商 追蹤確認 試算表 表單訂購'
  },
  {
    title: '組合商品訂購',
    category: 'SCM 訂單管理',
    icon: '🧩',
    url: 'pages/combo.html',
    badge: '人工',
    tags: ['組合商品', '子訂單', '三種組合', 'Combo', '套餐', '組合訂購'],
    content: '組合商品 三種組合類型 子訂單 建立方式 套餐 Combo 訂購 組合'
  },

  // ── SCM 訂單管理：實體出貨 ─────────────────────────────
  {
    title: '實體 SIM 卡 POS 出貨',
    category: 'SCM 訂單管理',
    icon: '📱',
    url: 'pages/sim-pos.html',
    badge: '實體',
    tags: ['SIM卡', 'POS', '實體出貨', '撈單', '標籤', '揀貨', '實體SIM'],
    content: 'SIM卡 POS 出貨 每日撈單 印標籤 揀貨 POS操作 實體 SIM 卡'
  },
  {
    title: '郵寄流程',
    category: 'SCM 訂單管理',
    icon: '✉️',
    url: 'pages/mail-delivery.html',
    badge: '實體',
    tags: ['郵寄', 'JRPASS', '高鐵票', '郵寄流程', '實體票券'],
    content: 'JRPASS 高鐵票 郵寄 作業步驟 實體票券 郵寄流程 寄送'
  },

  // ── SCM 訂單管理：異常處理 ─────────────────────────────
  {
    title: '特例取消流程',
    category: 'SCM 訂單管理',
    icon: '❌',
    url: 'pages/cancel.html',
    badge: '異常',
    tags: ['取消', '取消流程', '客人端', '供應商端', 'KKday發起', '特例取消', '退款'],
    content: '取消 特例取消 客人端 供應商端 KKday 發起取消 取消申請 退款 取消原因'
  },
  {
    title: '部分取消 / 部分退款',
    category: 'SCM 訂單管理',
    icon: '💸',
    url: 'pages/partial-refund.html',
    badge: '異常',
    tags: ['部分取消', '部分退款', 'Be2', '保留訂單', '退款操作', '部分退'],
    content: '部分取消 部分退款 保留訂單 退部分款項 Be2 操作 部分退 金額計算'
  },
  {
    title: '訂單更改',
    category: 'SCM 訂單管理',
    icon: '✏️',
    url: 'pages/order-change.html',
    badge: '異常',
    tags: ['訂單更改', '改日期', '改旅客資料', '四象限', '更改', '改期'],
    content: '訂單更改 改日期 改旅客資料 四象限對照表 更改流程 改期 旅客資料修改'
  },
  {
    title: '商品異動 & 挽單流程',
    category: 'SCM 訂單管理',
    icon: '🔀',
    url: 'pages/amendment.html',
    badge: '異常',
    tags: ['商品異動', '挽單', '額滿', '售罄', '關閉前台', '挽回訂單'],
    content: '商品異動 挽單 額滿 售罄 關閉前台 日期操作 挽回 訂單保留'
  },
  {
    title: '訂單恢復',
    category: 'SCM 訂單管理',
    icon: '🔁',
    url: 'pages/restore.html',
    badge: '異常',
    tags: ['訂單恢復', '恢復', '三方審核', '適用條件', '訂單回復'],
    content: '訂單恢復 適用條件 三方審核 流程 訂單回復 恢復申請'
  },
  {
    title: '盜刷處理 SOP',
    category: 'SCM 訂單管理',
    icon: '🛡️',
    url: 'pages/fraud-sop.html',
    badge: '異常',
    tags: ['盜刷', '風控', '詐騙', 'SOP', '可疑訂單', '已使用', '未使用', '盜刷處理'],
    content: '盜刷處理 SOP 風控通知 已使用 未使用 分支 詐騙 可疑訂單 盜刷 風控'
  },

  // ── SCM 帳務管理 ─────────────────────────────────────────
  {
    title: '請款方式',
    category: 'SCM 帳務管理',
    icon: '💳',
    url: 'pages/payment-methods.html',
    badge: '請款',
    tags: ['請款', '銀行匯款', '預存款', '信用卡', '付款方式', '請款方式'],
    content: '請款方式 銀行匯款 預存款 信用卡 三種請款 付款 月結 Invoice'
  },
  {
    title: '銀行匯款對帳流程',
    category: 'SCM 帳務管理',
    icon: '📋',
    url: 'pages/reconciliation.html',
    badge: '對帳',
    tags: ['對帳', '銀行匯款', '全自動', '自動', '人工對帳', 'BPM', '請款流程'],
    content: '銀行匯款 對帳 全自動 自動 人工 BPM 請款流程 對帳時程 報表 Invoice'
  },
  {
    title: '預存款管理',
    category: 'SCM 帳務管理',
    icon: '🏧',
    url: 'pages/supplier-payment.html',
    badge: '預存款',
    tags: ['預存款', '補款', '入款', '充值', '節日預估', '預存款管理'],
    content: '預存款 補款申請 入款啟用 正負向操作 節日預估 充值 餘額 預存款管理'
  },
  {
    title: '信用卡對帳',
    category: 'SCM 帳務管理',
    icon: '💳',
    url: 'pages/credit-card.html',
    badge: '信用卡',
    tags: ['信用卡', '對帳', '月帳單', 'BPM送審', '信用卡請款'],
    content: '信用卡 對帳 每月帳單 核對 請款流程 BPM 送審 信用卡對帳'
  },
  {
    title: '佣金申請',
    category: 'SCM 帳務管理',
    icon: '📄',
    url: 'pages/commission.html',
    badge: '佣金',
    tags: ['佣金', 'REM', 'INV', '入款通知', '憑證開立', '佣金申請'],
    content: '佣金申請 REM 專案 入款通知單 INV 無入款憑證 開立 佣金'
  },

  // ── SCM 訊息管理 ─────────────────────────────────────────
  {
    title: '訊息管理總覽',
    category: 'SCM 訊息管理',
    icon: '💬',
    url: 'pages/messaging-hub.html',
    badge: '訊息',
    tags: ['訊息管理', 'Be2', '工單', 'Slack', '供應商群組', '溝通工具'],
    content: 'Be2 工單系統 Slack 供應商群組 四種溝通工具 訊息處理 供應商訊息 通知 上線狀態'
  }
];
