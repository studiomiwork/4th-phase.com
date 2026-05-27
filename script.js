const introStorageKey = "fourth-phase-intro-seen";
const siteIntro = document.getElementById("site-intro");
const INTRO_HOLD_MS = 1200;
const INTRO_FADE_MS = 550;

const finishIntro = (playAxesAnimation = false) => {
  document.body.classList.remove("site-intro-active");
  document.body.classList.add("site-intro-done");
  if (playAxesAnimation) {
    document.body.classList.add("site-intro-animated");
  }
  siteIntro?.remove();
};

const initSiteIntro = () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!siteIntro || prefersReducedMotion) {
    siteIntro?.remove();
    document.body.classList.add("site-intro-done");
    return;
  }

  try {
    if (sessionStorage.getItem(introStorageKey)) {
      siteIntro.remove();
      document.body.classList.add("site-intro-done");
      return;
    }
  } catch {
    // Play intro when storage is unavailable.
  }

  document.body.classList.add("site-intro-active");

  window.setTimeout(() => {
    siteIntro.classList.add("is-exiting");

    window.setTimeout(() => {
      finishIntro(true);
      try {
        sessionStorage.setItem(introStorageKey, "1");
      } catch {
        // Intro still completes for the current visit.
      }
    }, INTRO_FADE_MS);
  }, INTRO_HOLD_MS);
};

initSiteIntro();

const heroHomeHashes = new Set(["", "#", "#home"]);
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const isHeroHomeHash = (hash) => heroHomeHashes.has(hash);

const year = document.querySelector("#year");
const foundingYear = 2025;
const languageSelect = document.querySelector(".language-switcher select");
const navShell = document.querySelector(".nav-shell");
const menuToggle = document.querySelector(".menu-toggle");
const navMenuLinks = document.querySelectorAll(".nav-links a");

const closeMobileNav = () => {
  navShell?.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
};

const scrollToPageTarget = (hash, behavior = "smooth") => {
  if (isHeroHomeHash(hash)) {
    window.scrollTo({ top: 0, behavior });
    return;
  }

  const target = document.querySelector(hash);
  if (!target) {
    return;
  }

  target.scrollIntoView({ behavior, block: "start" });
};

const initAnchorNavigation = () => {
  const initialHash = window.location.hash;
  if (initialHash && document.querySelector(initialHash)) {
    window.requestAnimationFrame(() => {
      scrollToPageTarget(initialHash, "auto");
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    const hash = anchor.getAttribute("href");
    if (!hash || !document.querySelector(hash)) {
      return;
    }

    anchor.addEventListener("click", (event) => {
      event.preventDefault();
      closeMobileNav();
      scrollToPageTarget(hash, prefersReducedMotion ? "auto" : "smooth");
      history.pushState(null, "", hash);
    });
  });

  window.addEventListener("popstate", () => {
    scrollToPageTarget(window.location.hash || "#home", "auto");
  });
};

initAnchorNavigation();

const translatedElements = document.querySelectorAll("[data-i18n]");
const translatedPlaceholders = document.querySelectorAll("[data-i18n-placeholder]");
const translatedAltTexts = document.querySelectorAll("[data-i18n-alt]");
const translatedAriaLabels = document.querySelectorAll("[data-i18n-aria-label]");

const translations = {
  ja: {
    htmlLang: "ja",
    title: "Fourth Phase 合同会社 | 写真・映像制作・アウトドア関連事業",
    description: "Fourth Phase 合同会社は、写真・映像制作、アウトドア関連事業、保管・物流管理を行う日本の合同会社です。",
    navAria: "メインナビゲーション",
    languageAria: "言語選択",
    navAbout: "概要",
    navBusiness: "事業内容",
    navWorks: "実績",
    navBrands: "ブランド",
    navCompany: "会社情報",
    navContact: "お問い合わせ",
    languageLabel: "言語",
    menuAria: "メニューを開く",
    homeAria: "Fourth Phase ホーム",
    skipLink: "メインコンテンツへ",
    heroButton: "会社概要を見る",
    aboutEyebrow: "会社概要",
    aboutTitle: "自然と季節\n関わる事業",
    aboutLead: "日本を拠点に、写真・映像・アウトドア・保管管理を行う合同会社です。",
    aboutBody: "国内での制作とアウトドア、機材保管を中心に事業を運営しています。",
    businessEyebrow: "事業内容",
    businessTitle: "写真・映像\nアウトドア\n保管管理",
    businessBody: "制作・活動・保管を軸に、継続的な事業運営を行っています。",
    mashiroAria: "Mashiro Visualsを開く",
    visualAlt: "撮影制作の現場",
    visualEyebrow: "写真・映像",
    visualTitle: "撮影制作",
    visualBody: "ウェディング / 商業 / ポートレート",
    outdoorAlt: "アウトドア関連事業の活動風景",
    outdoorEyebrow: "アウトドア",
    outdoorTitle: "アウトドア",
    outdoorBody: "レッスン / ガイド / メディア",
    storageAlt: "機材と用品の保管管理",
    storageEyebrow: "保管",
    storageTitle: "保管管理",
    storageBody: "保管 / 配送 / メンテナンス",
    worksEyebrow: "実績",
    worksTitle: "制作記録",
    worksBody: "ウェディング、アウトドア、ブランド、山岳記録など国内制作を手がけています。",
    workSnowAlt: "雪山の記録撮影",
    workSnowLabel: "スノー",
    workSnowTitle: "冬季撮影",
    workStreetAlt: "京都と東京の街並み",
    workStreetLabel: "街並み",
    workStreetTitle: "京都&東京",
    workWeddingAlt: "ウェディング撮影の場面",
    workWeddingLabel: "ウェディング",
    workWeddingTitle: "ウェディング撮影",
    workOutdoorAlt: "野外ドキュメンタリー撮影",
    workOutdoorLabel: "記録",
    workOutdoorTitle: "野外記録",
    workBrandAlt: "ブランド商品の撮影",
    workBrandLabel: "商業撮影",
    workBrandTitle: "商品・ブランド撮影",
    brandsEyebrow: "ブランド",
    brandsTitle: "事業を支える\nブランド",
    zeroEyebrow: "スノークラブ",
    zeroLogoAlt: "零度以下スノークラブのロゴ",
    mashiroLogoAlt: "Mashiro Visualsのロゴ",
    zeroBody: "日本でのスノーアクティビティを対象に、レッスン、地域情報、継続的な冬季活動を支援するコミュニティブランドです。",
    mashiroEyebrow: "写真・映像ブランド",
    mashiroBody: "日本国内のウェディング、ポートレート、ライフスタイル撮影を中心とする写真・映像制作ブランドです。",
    tagSnow: "スノー",
    tagCommunity: "コミュニティ",
    tagCoaching: "コーチング",
    tagCinematic: "映像的",
    tagJapanVisuals: "日本撮影",
    tagWedding: "ウェディング",
    futureLine: "今後の展開予定：Zero Above、アパレル、メディア",
    companyEyebrow: "会社情報",
    companyLead: "自然・移動・映像表現に関わる事業を運営しています",
    factName: "会社名",
    factBusiness: "事業内容",
    factBusinessValue: "写真・映像 / アウトドア / 保管 / メディア",
    factAddress: "所在地",
    factAddressValue: "〒617-0843 京都府長岡京市友岡西山17番地",
    factRepresentative: "代表者",
    factRepresentativeValue: "服部 蘭（ハットリ ラン）",
    contactEyebrow: "お問い合わせ",
    contactTitle: "ご用件を\nお知らせください",
    contactBody: "ウェディング・アウトドア・商業撮影・協業のご相談を承ります。",
    formName: "お名前",
    formNamePlaceholder: "お名前",
    formEmail: "メールアドレス",
    formEmailPlaceholder: "you@example.com",
    formInquiry: "お問い合わせ種別",
    optionWedding: "ウェディング",
    optionOutdoor: "アウトドア",
    optionCommercial: "商業撮影",
    optionCollaboration: "協業",
    formMessage: "お問い合わせ内容",
    formMessagePlaceholder: "ご希望内容、時期、場所をご記入ください。",
    formSubmit: "お問い合わせを送信",
    footerText: "写真・映像制作・アウトドア関連事業・京都・日本",
    mailSubjectPrefix: "Fourth Phase お問い合わせ",
    mailGeneral: "一般",
    mailHeading: "Fourth Phase ウェブサイトお問い合わせ",
    mailName: "お名前",
    mailEmail: "メールアドレス",
    mailInquiry: "お問い合わせ種別",
    mailMessage: "お問い合わせ内容",
  },
  en: {
    htmlLang: "en",
    title: "Fourth Phase LLC | Photography, Video and Outdoor Operations",
    description: "Fourth Phase LLC is a Japan-based company operating photography and video production, outdoor-related services, and storage logistics.",
    navAria: "Primary navigation",
    languageAria: "Language selection",
    navAbout: "About",
    navBusiness: "Business",
    navWorks: "Works",
    navBrands: "Brands",
    navCompany: "Company",
    navContact: "Contact",
    languageLabel: "Language",
    menuAria: "Open menu",
    homeAria: "Fourth Phase home",
    skipLink: "Skip to main content",
    heroButton: "View company profile",
    aboutEyebrow: "About",
    aboutTitle: "Work shaped by\nnature and season",
    aboutLead: "Based in Japan, we operate across photography, video, outdoor programs, and storage management.",
    aboutBody: "Our work centers on domestic production, outdoor activity, and equipment stewardship.",
    businessEyebrow: "Business",
    businessTitle: "Photography\nOutdoor\nStorage",
    businessBody: "We run ongoing operations across production, field activity, and equipment care.",
    mashiroAria: "Open Mashiro Visuals",
    visualAlt: "Photography production scene",
    visualEyebrow: "Photography",
    visualTitle: "Production",
    visualBody: "Wedding / Commercial / Portrait",
    outdoorAlt: "Outdoor operations in Japan",
    outdoorEyebrow: "Outdoor",
    outdoorTitle: "Outdoor",
    outdoorBody: "Lessons / Guiding / Media",
    storageAlt: "Equipment storage and logistics",
    storageEyebrow: "Storage",
    storageTitle: "Storage",
    storageBody: "Storage / Delivery / Maintenance",
    worksEyebrow: "Works",
    worksTitle: "Selected Work",
    worksBody: "Wedding, outdoor, brand, and mountain documentary work across Japan.",
    workSnowAlt: "Snow mountain documentary photography",
    workSnowLabel: "Snow",
    workSnowTitle: "Winter Production",
    workStreetAlt: "Kyoto and Tokyo streetscapes",
    workStreetLabel: "Street",
    workStreetTitle: "Kyoto & Tokyo",
    workWeddingAlt: "Wedding photography scene",
    workWeddingLabel: "Wedding",
    workWeddingTitle: "Wedding Photography",
    workOutdoorAlt: "Outdoor documentary photography",
    workOutdoorLabel: "Documentary",
    workOutdoorTitle: "Field Records",
    workBrandAlt: "Brand product photography",
    workBrandLabel: "Commercial",
    workBrandTitle: "Product and Brand Photography",
    brandsEyebrow: "Brands",
    brandsTitle: "Brands behind\nthe work",
    zeroEyebrow: "Snow Club",
    zeroLogoAlt: "Reido Ika Snow Club logo",
    mashiroLogoAlt: "Mashiro Visuals logo",
    zeroBody: "A community brand supporting snow activities in Japan through lessons, local information, and ongoing winter activity.",
    mashiroEyebrow: "Photography and video brand",
    mashiroBody: "Wedding, portrait, and lifestyle photography across Japan.",
    tagSnow: "Snow",
    tagCommunity: "Community",
    tagCoaching: "Coaching",
    tagCinematic: "Cinematic",
    tagJapanVisuals: "Japan Visuals",
    tagWedding: "Wedding",
    futureLine: "Future extensions: Zero Above, apparel, media",
    companyEyebrow: "Company",
    companyLead: "We operate work connected to nature, movement, and visual expression",
    factName: "Company Name",
    factBusiness: "Business Description",
    factBusinessValue: "Photography / Outdoor / Storage / Media",
    factAddress: "Registered Address",
    factAddressValue: "17 Yugaoka Nishiyama, Nagaokakyo, Kyoto 617-0843, Japan",
    factRepresentative: "Representative",
    factRepresentativeValue: "Ran Hattori",
    contactEyebrow: "Contact",
    contactTitle: "Share your\ninquiry",
    contactBody: "For weddings, outdoor projects, commercial photography, and collaborations.",
    formName: "Name",
    formNamePlaceholder: "Your name",
    formEmail: "Email",
    formEmailPlaceholder: "you@example.com",
    formInquiry: "Inquiry Type",
    optionWedding: "Wedding",
    optionOutdoor: "Outdoor",
    optionCommercial: "Commercial",
    optionCollaboration: "Collaboration",
    formMessage: "Message",
    formMessagePlaceholder: "Please include your request, timing, and location.",
    formSubmit: "Send Inquiry",
    footerText: "Photography and video production / Outdoor operations / Kyoto, Japan",
    mailSubjectPrefix: "Fourth Phase Inquiry",
    mailGeneral: "General",
    mailHeading: "Fourth Phase Website Inquiry",
    mailName: "Name",
    mailEmail: "Email",
    mailInquiry: "Inquiry Type",
    mailMessage: "Message",
  },
  "zh-Hant": {
    htmlLang: "zh-Hant",
    title: "Fourth Phase 合同会社 | 攝影影像製作與戶外相關事業",
    description: "Fourth Phase 合同会社是一家以日本為據點，從事攝影影像製作、戶外相關事業、保管與物流管理的公司。",
    navAria: "主要導覽",
    languageAria: "語言選擇",
    navAbout: "概要",
    navBusiness: "事業內容",
    navWorks: "實績",
    navBrands: "品牌",
    navCompany: "公司資訊",
    navContact: "聯絡我們",
    languageLabel: "語言",
    menuAria: "開啟選單",
    homeAria: "Fourth Phase 首頁",
    skipLink: "跳至主要內容",
    heroButton: "查看公司概要",
    aboutEyebrow: "公司概要",
    aboutTitle: "與自然和季節\n相連的事業",
    aboutLead: "以日本為據點，從事攝影影像、戶外活動與保管管理。",
    aboutBody: "以國內製作、戶外活動與器材保管為核心持續營運。",
    businessEyebrow: "事業內容",
    businessTitle: "攝影影像\n戶外\n保管管理",
    businessBody: "以製作、活動與保管為軸心，持續營運事業。",
    mashiroAria: "開啟 Mashiro Visuals",
    visualAlt: "拍攝製作現場",
    visualEyebrow: "攝影影像",
    visualTitle: "拍攝製作",
    visualBody: "婚禮 / 商業 / 人像",
    outdoorAlt: "戶外相關事業活動場景",
    outdoorEyebrow: "戶外",
    outdoorTitle: "戶外",
    outdoorBody: "課程 / 嚮導 / 媒體",
    storageAlt: "器材與用品的保管管理",
    storageEyebrow: "保管",
    storageTitle: "保管管理",
    storageBody: "保管 / 配送 / 維護",
    worksEyebrow: "實績",
    worksTitle: "製作記錄",
    worksBody: "涵蓋婚禮、戶外、品牌與山岳紀錄等國內製作。",
    workSnowAlt: "雪山紀錄拍攝",
    workSnowLabel: "雪地",
    workSnowTitle: "冬季拍攝",
    workStreetAlt: "京都與東京街景",
    workStreetLabel: "街景",
    workStreetTitle: "京都&東京",
    workWeddingAlt: "婚禮拍攝場景",
    workWeddingLabel: "婚禮",
    workWeddingTitle: "婚禮拍攝",
    workOutdoorAlt: "戶外紀錄拍攝",
    workOutdoorLabel: "紀錄",
    workOutdoorTitle: "戶外紀錄",
    workBrandAlt: "品牌商品拍攝",
    workBrandLabel: "商業拍攝",
    workBrandTitle: "商品與品牌拍攝",
    brandsEyebrow: "品牌",
    brandsTitle: "支撐事業的\n品牌",
    zeroEyebrow: "雪地俱樂部",
    zeroLogoAlt: "零度以下雪地俱樂部標誌",
    mashiroLogoAlt: "Mashiro Visuals 標誌",
    zeroBody: "面向日本雪地活動，透過課程、在地資訊與持續性的冬季活動支援所建立的社群品牌。",
    mashiroEyebrow: "攝影影像品牌",
    mashiroBody: "以日本國內婚禮、人像與生活風格拍攝為中心的攝影影像製作品牌。",
    tagSnow: "雪地",
    tagCommunity: "社群",
    tagCoaching: "教學",
    tagCinematic: "電影感",
    tagJapanVisuals: "日本影像",
    tagWedding: "婚禮",
    futureLine: "未來展開預定：Zero Above、服飾、媒體",
    companyEyebrow: "公司資訊",
    companyLead: "我們經營與自然、移動及影像表現相關的事業",
    factName: "公司名稱",
    factBusiness: "事業內容",
    factBusinessValue: "攝影影像 / 戶外 / 保管 / 媒體",
    factAddress: "所在地",
    factAddressValue: "〒617-0843 京都府長岡京市友岡西山17番地",
    factRepresentative: "代表者",
    factRepresentativeValue: "服部 蘭（ハットリ ラン）",
    contactEyebrow: "聯絡我們",
    contactTitle: "請告知\n洽詢內容",
    contactBody: "歡迎洽詢婚禮、戶外、商業拍攝與合作相關需求。",
    formName: "姓名",
    formNamePlaceholder: "姓名",
    formEmail: "電子郵件",
    formEmailPlaceholder: "you@example.com",
    formInquiry: "洽詢類別",
    optionWedding: "婚禮",
    optionOutdoor: "戶外",
    optionCommercial: "商業拍攝",
    optionCollaboration: "合作",
    formMessage: "洽詢內容",
    formMessagePlaceholder: "請填寫需求內容、時期與地點。",
    formSubmit: "送出洽詢",
    footerText: "攝影影像製作・戶外相關事業・京都・日本",
    mailSubjectPrefix: "Fourth Phase 洽詢",
    mailGeneral: "一般",
    mailHeading: "Fourth Phase 網站洽詢",
    mailName: "姓名",
    mailEmail: "電子郵件",
    mailInquiry: "洽詢類別",
    mailMessage: "洽詢內容",
  },
  ko: {
    htmlLang: "ko",
    title: "Fourth Phase 합동회사 | 사진·영상 제작 및 아웃도어 관련 사업",
    description: "Fourth Phase 합동회사는 일본을 거점으로 사진·영상 제작, 아웃도어 관련 사업, 보관 및 물류 관리를 운영하는 회사입니다.",
    navAria: "기본 내비게이션",
    languageAria: "언어 선택",
    navAbout: "개요",
    navBusiness: "사업 내용",
    navWorks: "실적",
    navBrands: "브랜드",
    navCompany: "회사 정보",
    navContact: "문의",
    languageLabel: "언어",
    menuAria: "메뉴 열기",
    homeAria: "Fourth Phase 홈",
    skipLink: "본문으로 건너뛰기",
    heroButton: "회사 개요 보기",
    aboutEyebrow: "회사 개요",
    aboutTitle: "자연과 계절과\n연결된 사업",
    aboutLead: "일본을 거점으로 사진·영상·아웃도어·보관 관리를 운영합니다.",
    aboutBody: "국내 제작, 아웃도어, 장비 보관을 중심으로 사업을 이어갑니다.",
    businessEyebrow: "사업 내용",
    businessTitle: "사진·영상\n아웃도어\n보관 관리",
    businessBody: "제작·활동·보관을 축으로 지속적인 사업 운영을 합니다.",
    mashiroAria: "Mashiro Visuals 열기",
    visualAlt: "촬영 제작 현장",
    visualEyebrow: "사진·영상",
    visualTitle: "촬영 제작",
    visualBody: "웨딩 / 상업 / 포트레이트",
    outdoorAlt: "아웃도어 관련 사업 활동 장면",
    outdoorEyebrow: "아웃도어",
    outdoorTitle: "아웃도어",
    outdoorBody: "레슨 / 가이드 / 미디어",
    storageAlt: "장비와 용품의 보관 관리",
    storageEyebrow: "보관",
    storageTitle: "보관 관리",
    storageBody: "보관 / 배송 / 유지보수",
    worksEyebrow: "실적",
    worksTitle: "제작 기록",
    worksBody: "웨딩, 아웃도어, 브랜드, 산악 기록 등 국내 제작을 수행합니다.",
    workSnowAlt: "설산 기록 촬영",
    workSnowLabel: "스노우",
    workSnowTitle: "겨울 촬영",
    workStreetAlt: "교토와 도쿄 거리 풍경",
    workStreetLabel: "거리",
    workStreetTitle: "교토&도쿄",
    workWeddingAlt: "웨딩 촬영 장면",
    workWeddingLabel: "웨딩",
    workWeddingTitle: "웨딩 촬영",
    workOutdoorAlt: "야외 다큐멘터리 촬영",
    workOutdoorLabel: "기록",
    workOutdoorTitle: "야외 기록",
    workBrandAlt: "브랜드 상품 촬영",
    workBrandLabel: "상업 촬영",
    workBrandTitle: "상품 및 브랜드 촬영",
    brandsEyebrow: "브랜드",
    brandsTitle: "사업을 뒷받침하는\n브랜드",
    zeroEyebrow: "스노우 클럽",
    zeroLogoAlt: "영도 이하 스노우 클럽 로고",
    mashiroLogoAlt: "Mashiro Visuals 로고",
    zeroBody: "일본에서의 스노우 액티비티를 대상으로 레슨, 지역 정보, 지속적인 겨울 활동을 지원하는 커뮤니티 브랜드입니다.",
    mashiroEyebrow: "사진·영상 브랜드",
    mashiroBody: "일본 국내 웨딩, 포트레이트, 라이프스타일 촬영을 중심으로 하는 사진·영상 제작 브랜드입니다.",
    tagSnow: "스노우",
    tagCommunity: "커뮤니티",
    tagCoaching: "코칭",
    tagCinematic: "시네마틱",
    tagJapanVisuals: "일본 촬영",
    tagWedding: "웨딩",
    futureLine: "향후 전개 예정: Zero Above, 의류, 미디어",
    companyEyebrow: "회사 정보",
    companyLead: "자연·이동·영상 표현과 연결된 사업을 운영합니다",
    factName: "회사명",
    factBusiness: "사업 내용",
    factBusinessValue: "사진·영상 / 아웃도어 / 보관 / 미디어",
    factAddress: "소재지",
    factAddressValue: "〒617-0843 京都府長岡京市友岡西山17番地",
    factRepresentative: "대표자",
    factRepresentativeValue: "服部 蘭（ハットリ ラン）",
    contactEyebrow: "문의",
    contactTitle: "문의 내용을\n알려주세요",
    contactBody: "웨딩·아웃도어·상업 촬영·협업 관련 상담을 받고 있습니다.",
    formName: "성명",
    formNamePlaceholder: "성명",
    formEmail: "이메일 주소",
    formEmailPlaceholder: "you@example.com",
    formInquiry: "문의 유형",
    optionWedding: "웨딩",
    optionOutdoor: "아웃도어",
    optionCommercial: "상업 촬영",
    optionCollaboration: "협업",
    formMessage: "문의 내용",
    formMessagePlaceholder: "희망 내용, 시기, 장소를 작성해 주세요.",
    formSubmit: "문의 보내기",
    footerText: "사진·영상 제작・아웃도어 관련 사업・교토・일본",
    mailSubjectPrefix: "Fourth Phase 문의",
    mailGeneral: "일반",
    mailHeading: "Fourth Phase 웹사이트 문의",
    mailName: "성명",
    mailEmail: "이메일 주소",
    mailInquiry: "문의 유형",
    mailMessage: "문의 내용",
  },
};

const languageStorageKey = "fourth-phase-language";

const readStoredLanguage = () => {
  try {
    return localStorage.getItem(languageStorageKey);
  } catch {
    return null;
  }
};

const storeLanguage = (language) => {
  try {
    localStorage.setItem(languageStorageKey, language);
  } catch {
    // Language switching still works for the current session if storage is unavailable.
  }
};

let activeLanguage = readStoredLanguage() || "ja";

if (!translations[activeLanguage]) {
  activeLanguage = "ja";
}

if (year) {
  year.textContent = String(foundingYear);
}

const getCurrentCopy = () => translations[activeLanguage] || translations.ja;

const applyLanguage = (language) => {
  const copy = translations[language] || translations.ja;
  activeLanguage = translations[language] ? language : "ja";

  document.documentElement.lang = copy.htmlLang;
  document.title = copy.title;

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute("content", copy.description);
  }

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute("content", copy.title);
  }

  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) {
    ogDescription.setAttribute("content", copy.description);
  }

  const setDisplayTitle = (element, text) => {
    element.replaceChildren();
    text.split("\n").forEach((line) => {
      const lineElement = document.createElement("span");
      lineElement.className = "display-title__line";
      lineElement.textContent = line;
      element.appendChild(lineElement);
    });
  };

  translatedElements.forEach((element) => {
    const key = element.dataset.i18n;
    if (key && copy[key]) {
      if (element.classList.contains("display-title")) {
        setDisplayTitle(element, copy[key]);
      } else {
        element.textContent = copy[key];
      }
    }
  });

  translatedPlaceholders.forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    if (key && copy[key]) {
      element.setAttribute("placeholder", copy[key]);
    }
  });

  translatedAltTexts.forEach((element) => {
    const key = element.dataset.i18nAlt;
    if (key && copy[key]) {
      element.setAttribute("alt", copy[key]);
    }
  });

  translatedAriaLabels.forEach((element) => {
    const key = element.dataset.i18nAriaLabel;
    if (key && copy[key]) {
      element.setAttribute("aria-label", copy[key]);
    }
  });

  if (languageSelect) {
    languageSelect.value = activeLanguage;
  }

  storeLanguage(activeLanguage);
};

if (languageSelect) {
  languageSelect.addEventListener("change", () => {
    applyLanguage(languageSelect.value);
  });
}

if (menuToggle && navShell) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navShell.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileNav();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileNav();
    }
  });
}

const revealElements = document.querySelectorAll(".reveal");

if (prefersReducedMotion) {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
} else if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    },
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}

const inquiryForm = document.querySelector(".inquiry-form");

if (inquiryForm) {
  inquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!inquiryForm.reportValidity()) {
      return;
    }

    const formData = new FormData(inquiryForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const inquirySelect = inquiryForm.querySelector('[name="inquiry"]');
    const inquiry = inquirySelect?.selectedOptions[0]?.textContent.trim() || "";
    const message = String(formData.get("message") || "").trim();
    const copy = getCurrentCopy();

    const subject = `${copy.mailSubjectPrefix} - ${inquiry || copy.mailGeneral}`;
    const body = [
      copy.mailHeading,
      "",
      `${copy.mailName}: ${name}`,
      `${copy.mailEmail}: ${email}`,
      `${copy.mailInquiry}: ${inquiry}`,
      "",
      `${copy.mailMessage}:`,
      message,
    ].join("\n");

    window.location.href = `mailto:info@4th-phase.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  });
}

applyLanguage(activeLanguage);
