(function () {
  "use strict";

  var TEXTS = window.SITE_TEXTS || { pages: {} };
  var CONFIG = window.SITE_CONFIG || {};
  var PAGES = TEXTS.pages;

  var PAGE_NAMES = {
    home: "P0 홈",
    choice: "P1 선택",
    skip: "P2 넘어가기",
    reason: "P3 만든 이유",
    apology: "P4 사과문",
    forgive: "P5 용서",
    more: "P6 더해봐",
    nope: "P7 글렀어",
    later: "P8 안 볼래",
  };

  var LONG_PAGES = { home: true, apology: true, reason: true, more: true };

  if (TEXTS.title) document.title = TEXTS.title;

  // ---------- 로그 ----------

  function makeId() {
    return Math.random().toString(36).slice(2, 6);
  }

  // 같은 탭에서 이어진 방문은 같은 번호
  var visitId = makeId();
  try {
    var saved = sessionStorage.getItem("visitId");
    if (saved) visitId = saved;
    else sessionStorage.setItem("visitId", visitId);
  } catch (e) { /* 저장 불가 환경이면 새 번호 사용 */ }

  function deviceType() {
    var ua = navigator.userAgent || "";
    if (/iPad|Tablet/i.test(ua)) return "태블릿";
    if (/Mobi|Android|iPhone/i.test(ua)) return "휴대폰";
    return "PC";
  }

  function sendLog(kind, pageKey, buttonLabel) {
    if (!CONFIG.LOG_URL) return;
    var payload = JSON.stringify({
      kind: kind,
      page: PAGE_NAMES[pageKey] || pageKey,
      button: buttonLabel || "",
      visit: visitId,
      device: deviceType(),
      clientTime: new Date().toISOString(),
    });
    try {
      fetch(CONFIG.LOG_URL, {
        method: "POST",
        mode: "no-cors",
        keepalive: true,
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: payload,
      }).catch(function () {});
    } catch (e) { /* 로그 실패는 무시 */ }
  }

  // ---------- 화면 ----------

  var app = document.getElementById("app");

  function currentKey() {
    var key = decodeURIComponent((location.hash || "").replace(/^#\/?/, ""));
    return PAGES[key] ? key : "home";
  }

  function render(key) {
    var page = PAGES[key];
    app.innerHTML = "";

    var wrap = document.createElement("section");
    wrap.className = "page";

    if (page.icon) {
      var icon = document.createElement("div");
      icon.className = "icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = page.icon;
      wrap.appendChild(icon);
    }

    if (page.text) {
      var p = document.createElement("p");
      p.className = "text" + (LONG_PAGES[key] ? " long" : "");
      p.textContent = page.text;
      wrap.appendChild(p);
    }

    var images = (page.images || []).filter(Boolean);
    if (images.length) {
      var gallery = document.createElement("div");
      gallery.className = "gallery";
      var track = document.createElement("div");
      track.className = "gallery-track";
      var dots = document.createElement("div");
      dots.className = "gallery-dots";

      images.forEach(function (src, i) {
        var img = document.createElement("img");
        img.src = src;
        img.alt = "사진 " + (i + 1);
        img.loading = i === 0 ? "eager" : "lazy";
        img.decoding = "async";
        img.addEventListener("error", function () {
          img.remove();
          var dot = dots.children[i];
          if (dot) dot.style.display = "none";
        });
        track.appendChild(img);

        var d = document.createElement("span");
        if (i === 0) d.className = "on";
        dots.appendChild(d);
      });

      track.addEventListener("scroll", function () {
        var idx = Math.round(track.scrollLeft / track.clientWidth);
        Array.prototype.forEach.call(dots.children, function (d, j) {
          d.className = j === idx ? "on" : "";
        });
      }, { passive: true });

      gallery.appendChild(track);
      if (images.length > 1) gallery.appendChild(dots);
      wrap.appendChild(gallery);
    }

    var buttons = page.buttons || [];
    if (buttons.length) {
      var box = document.createElement("div");
      box.className = "buttons";
      buttons.forEach(function (b) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn " + (b.tone || "soft");
        btn.textContent = b.label;
        btn.addEventListener("click", function () {
          sendLog("버튼 클릭", key, b.label);
          go(b.to);
        });
        box.appendChild(btn);
      });
      wrap.appendChild(box);
    }

    app.appendChild(wrap);
    window.scrollTo(0, 0);
  }

  function go(key) {
    if (!PAGES[key]) key = "home";
    var hash = key === "home" ? "" : "#" + key;
    if (location.hash === hash || (!location.hash && !hash)) {
      show();
    } else if (hash) {
      location.hash = hash;
    } else {
      history.pushState(null, "", location.pathname + location.search);
      show();
    }
  }

  var lastKey = null;

  function show() {
    var key = currentKey();
    // 뒤로가기 시 브라우저가 이벤트를 두 번 보내는 경우 한 번만 처리
    if (key === lastKey) return;
    lastKey = key;
    render(key);
    sendLog("페이지 열람", key, "");
  }

  window.addEventListener("hashchange", show);
  window.addEventListener("popstate", show);
  show();
})();
