/* ------------------------------------------------------------------
   RA2 — motor do site (idioma, menu, rotas, slideshow, áudio)
   Sem dependências. Funciona abrindo o index.html direto.
------------------------------------------------------------------- */
(function () {
  "use strict";

  var C = window.RA2;
  var view  = document.getElementById("view");
  var stage = document.getElementById("stage");
  var nav   = document.getElementById("nav");
  var body  = document.body;

  /* seções que viram submenu no menu principal */
  var SECTIONS = {
    runway: {
      label: { pt: "DESFILES", en: "RUNWAY" },
      items: C.collections
    },
    lookbook: {
      label: { pt: "LOOKBOOK", en: "LOOKBOOK" },
      items: C.lookbooks
    },
    archives: {
      label: { pt: "ARQUIVO", en: "ARCHIVES" },
      items: C.campaigns
    }
  };

  /* legendas da interface */
  var UI = {
    heroListen: { pt: "OUVIR",              en: "LISTEN" },
    heroMute:   { pt: "SILENCIAR",          en: "MUTE" },
    navStudio:  { pt: "O STUDIO",           en: "THE STUDIO" },
    navContact: { pt: "CONTATO",            en: "CONTACT" },
    audioOff:  { pt: "SOM DESLIGADO",       en: "AUDIO OFF" },
    audioOn:   { pt: "SOM LIGADO",          en: "AUDIO ON" },
    audioNone: { pt: "SOM INDISPONÍVEL",    en: "AUDIO UNAVAILABLE" },
    fsOn:      { pt: "TELA CHEIA",          en: "FULLSCREEN" },
    fsOff:     { pt: "SAIR DA TELA CHEIA",  en: "EXIT FULLSCREEN" },
    contact:   { pt: "CONTATO",             en: "CONTACT" },
    book:      { pt: "AGENDE AQUI",         en: "BOOK A VISIT" }
  };

  /* ---------------- idioma ---------------- */

  var lang = "pt";
  try {
    var saved = localStorage.getItem("ra2-lang");
    if (saved === "pt" || saved === "en") lang = saved;
  } catch (e) { /* navegação privada: segue no padrão */ }

  /* devolve a string no idioma atual; aceita texto simples também */
  function t(v) {
    if (v == null) return "";
    if (typeof v === "string") return v;
    return v[lang] || v.pt || v.en || "";
  }

  function setLang(next) {
    if (next === lang) return;
    lang = next;
    try { localStorage.setItem("ra2-lang", next); } catch (e) {}
    document.documentElement.lang = next === "en" ? "en" : "pt-BR";
    syncLangBtns();
    syncAudioLabel();
    syncFsLabel();
    buildNav();
    render();
  }

  /* ---------------- helpers ---------------- */

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function find(section, slug) {
    var list = (SECTIONS[section] || {}).items || [];
    return list.filter(function (x) { return x.slug === slug; })[0];
  }

  /* ---------------- menu ---------------- */

  function groupHTML(key) {
    var s = SECTIONS[key];
    var items = s.items.map(function (it) {
      var yr = t(it.year);
      return (
        "<li>" +
          '<a href="#/' + key + "/" + esc(it.slug) + '" data-item="' + esc(it.slug) + '">' +
            esc(t(it.title)) +
            (yr ? ' <span class="yr">(' + esc(yr) + ")</span>" : "") +
          "</a>" +
        "</li>"
      );
    }).join("");

    return (
      '<li class="group" data-group="' + key + '">' +
        '<button type="button" class="group-t" aria-expanded="false">' + esc(t(s.label)) + "</button>" +
        '<div class="sub-wrap"><ul class="sub">' + items + "</ul></div>" +
      "</li>"
    );
  }

  function buildNav() {
    /* preserva quais submenus estavam abertos ao trocar de idioma */
    var open = {};
    nav.querySelectorAll(".group.is-open").forEach(function (li) {
      open[li.dataset.group] = true;
    });

    nav.innerHTML =
      '<a class="brand" href="#/">RA2</a>' +
      '<ul class="menu">' +
        groupHTML("runway") +
        groupHTML("lookbook") +
        groupHTML("archives") +
        '<li><a href="#/studio" data-route="studio">' + esc(t(UI.navStudio)) + "</a></li>" +
        '<li><a href="#/contato" data-route="contato">' + esc(t(UI.navContact)) + "</a></li>" +
      "</ul>";

    nav.querySelectorAll(".group").forEach(function (li) {
      if (open[li.dataset.group]) {
        li.classList.add("is-open");
        li.querySelector(".group-t").setAttribute("aria-expanded", "true");
      }
    });

    nav.querySelectorAll(".group-t").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var li = btn.closest(".group");
        var isOpen = li.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
    });
  }

  /* Ao passar o mouse em qualquer item do menu, a tela inteira dá uma leve
     iluminada — para a interação ser percebida mesmo de canto de olho.
     Delegado no <nav>, então vale para o menu remontado a cada idioma. */
  function isNavItem(el) {
    return el && el.closest && el.closest(".chrome--nav") &&
           (el.closest("a") || el.closest(".group-t"));
  }

  nav.addEventListener("mouseover", function (e) {
    if (isNavItem(e.target)) body.classList.add("is-nav-hover");
  });
  nav.addEventListener("mouseout", function (e) {
    if (!isNavItem(e.relatedTarget)) body.classList.remove("is-nav-hover");
  });
  nav.addEventListener("mouseleave", function () {
    body.classList.remove("is-nav-hover");
  });

  /* marca a rota atual e abre o submenu correspondente */
  function syncNav(section, slug) {
    nav.querySelectorAll("[data-route]").forEach(function (a) {
      if (a.dataset.route === section) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });

    nav.querySelectorAll(".group").forEach(function (li) {
      var mine = li.dataset.group === section;
      if (mine) {
        li.classList.add("is-open");
        li.querySelector(".group-t").setAttribute("aria-expanded", "true");
      }
      li.querySelectorAll("[data-item]").forEach(function (a) {
        if (mine && a.dataset.item === slug) a.setAttribute("aria-current", "page");
        else a.removeAttribute("aria-current");
      });
    });
  }

  /* ---------------- slideshow de fundo ---------------- */

  var slideTimer = null;
  var HOLD = 6500;   // quanto tempo cada foto fica parada

  function setStage(list) {
    clearInterval(slideTimer);
    stage.innerHTML = "";

    if (!list || !list.length) {
      body.dataset.stage = "off";
      return;
    }
    body.dataset.stage = "on";

    var slides = list.map(function (item, i) {
      var src = typeof item === "string" ? item : item.src;
      var pos = (typeof item === "string" ? "" : item.pos) || "center";

      var d = document.createElement("div");
      d.className = "slide" + (i === 0 ? " is-active" : "");
      d.style.backgroundPosition = pos;
      d._src = src;
      stage.appendChild(d);
      return d;
    });

    /* Carrega em fila, não tudo de uma vez: a primeira foto entra
       imediatamente e as outras vão chegando atrás, para a home abrir
       rápido mesmo com oito imagens. */
    function load(i) {
      if (i >= slides.length) return;
      var d = slides[i];
      var probe = new Image();
      probe.onload = function () {
        d.style.backgroundImage = "url('" + d._src + "')";
        load(i + 1);
      };
      // se a foto não existir, cai no gradiente RA2 e segue a fila
      probe.onerror = function () {
        d.classList.add("is-missing");
        load(i + 1);
      };
      probe.src = d._src;
    }
    load(0);

    if (slides.length < 2) return;

    var cur = 0;
    slideTimer = setInterval(function () {
      slides[cur].classList.remove("is-active");
      cur = (cur + 1) % slides.length;
      slides[cur].classList.add("is-active");
    }, HOLD);
  }

  /* ---------------- grade editorial ---------------- */

  function pieceHTML(p) {
    var style =
      "grid-column:" + p.col + " / span " + p.span + ";" +
      (p.top ? "margin-top:" + p.top + "vh;" : "");

    if (p.note) {
      var paras = t(p.note);
      if (typeof paras === "string") paras = [paras];
      return (
        '<div class="note" style="' + style + '">' +
        paras.map(function (x) { return "<p>" + esc(x) + "</p>"; }).join("") +
        "</div>"
      );
    }

    var ratio = p.ratio || "3/4";
    return (
      '<figure style="' + style + '">' +
        '<span class="frame">' +
          '<img src="' + esc(p.img) + '" alt="' + esc(p.caption || "RA2") + '"' +
          ' loading="lazy" style="aspect-ratio:' + ratio + ';object-fit:cover"' +
          ' data-ratio="' + ratio + '" data-label="' + esc(p.img) + '">' +
        "</span>" +
        (p.caption ? "<figcaption>" + esc(p.caption) + "</figcaption>" : "") +
      "</figure>"
    );
  }

  function scatterHTML(pieces) {
    return '<div class="scatter">' + pieces.map(pieceHTML).join("") + "</div>";
  }

  /* troca <img> quebrada por um bloco com o caminho esperado */
  function wireImages(root) {
    var imgs = root.querySelectorAll(".scatter img");

    var io = "IntersectionObserver" in window
      ? new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (!e.isIntersecting) return;
            var f = e.target.closest("figure");
            if (f) f.classList.add("is-in");
            io.unobserve(e.target);
          });
        }, { rootMargin: "0px 0px -8% 0px" })
      : null;

    imgs.forEach(function (img) {
      var fig = img.closest("figure");
      function reveal() { fig.classList.add("is-in"); }

      img.addEventListener("error", function () {
        var ph = document.createElement("div");
        ph.className = "ph";
        ph.style.aspectRatio = img.dataset.ratio;
        ph.setAttribute("data-label", img.dataset.label);
        img.replaceWith(ph);
        reveal();   // sem foto ainda, mas o bloco precisa aparecer
      });

      if (img.complete && img.naturalWidth) reveal();
      else img.addEventListener("load", reveal);

      if (io) io.observe(img); else reveal();
    });
  }

  /* ---------------- vídeo de abertura (hero) ---------------- */

  /* Vídeo em tela cheia no topo de uma página. Toca sozinho, em loop e
     sem som (navegadores só permitem autoplay mudo); o botão OUVIR liga
     o áudio do filme e desliga a trilha ambiente do site. */
  function heroHTML(h) {
    if (!h) return "";
    return (
      '<div class="hero">' +
        '<video class="hero-video" muted loop playsinline preload="auto"' +
        ' poster="' + esc(h.poster) + '"' +
        ' data-src="' + esc(h.video) + '"' +
        ' data-src-mobile="' + esc(h.videoMobile || h.video) + '"></video>' +
        '<button type="button" class="util hero-sound">' + esc(t(UI.heroListen)) + "</button>" +
      "</div>"
    );
  }

  function wireHero(root) {
    var hero = root.querySelector(".hero");
    if (!hero) return;
    var video = hero.querySelector("video");
    var btn = hero.querySelector(".hero-sound");

    /* celular recebe a versão mais leve */
    var small = window.matchMedia("(max-width: 800px)").matches;
    video.src = small ? video.dataset.srcMobile : video.dataset.src;

    /* Só mostra os controles do player se o navegador bloquear o autoplay
       de verdade (ex.: iPhone em modo de pouca energia). Aba em segundo
       plano também recusa o play; nesse caso tenta de novo ao voltar. */
    function tryPlay() {
      video.play().catch(function (e) {
        if (e && e.name === "NotAllowedError") video.controls = true;
      });
    }

    var calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (calm) {
      video.controls = true;
    } else {
      tryPlay();
      document.addEventListener("visibilitychange", function onVis() {
        if (!document.body.contains(video)) {
          document.removeEventListener("visibilitychange", onVis);
          return;
        }
        if (document.visibilityState === "visible" && video.paused && !video.controls) tryPlay();
      });
    }

    btn.addEventListener("click", function () {
      video.muted = !video.muted;
      if (!video.muted) {
        if (video.paused) video.play().catch(function () {});
        if (!audio.paused) fadeTo(0, function () { audio.pause(); syncAudioLabel(); });
      }
      btn.textContent = t(video.muted ? UI.heroListen : UI.heroMute);
    });
  }

  /* ---------------- views ---------------- */

  function entryPage(entry) {
    body.dataset.theme = entry.theme || "dark";
    body.dataset.nav = "top";
    setStage(null);

    var lede = t(entry.lede);
    var year = t(entry.year);

    return (
      heroHTML(entry.hero) +
      '<section class="page' + (entry.hero ? " page--after-hero" : "") + '">' +
        '<div class="page-head">' +
          '<h1 class="page-title">' + esc(t(entry.title)) + "</h1>" +
          (lede ? '<p class="page-lede">' + esc(lede) + "</p>" : "") +
          (year ? '<span class="page-year">' + esc(year) + "</span>" : "") +
        "</div>" +
        scatterHTML(entry.pieces) +
      "</section>"
    );
  }

  function sectionIndex(key) {
    var s = SECTIONS[key];
    body.dataset.theme = "dark";
    body.dataset.nav = "top";
    setStage(null);

    var items = s.items.map(function (c, i) {
      return (
        "<li>" +
          '<a href="#/' + key + "/" + esc(c.slug) + '">' +
            '<span class="idx">' + String(i + 1).padStart(2, "0") + ".</span>" +
            "<span>" + esc(t(c.title)) + "</span>" +
            '<span class="yr">' + esc(t(c.year)) + "</span>" +
          "</a>" +
        "</li>"
      );
    }).join("");

    return (
      '<section class="page">' +
        '<div class="page-head"><h1 class="page-title">' + esc(t(s.label)) + "</h1></div>" +
        '<ul class="index-list">' + items + "</ul>" +
      "</section>"
    );
  }

  var views = {

    home: function () {
      body.dataset.theme = "dark";
      body.dataset.nav = "bottom";
      setStage(C.home);
      return '<section class="home"></section>';
    },

    studio: function () {
      var s = C.studio;
      body.dataset.theme = s.theme || "light";
      body.dataset.nav = "top";
      setStage(null);

      return (
        '<section class="page">' +
          '<div class="page-head">' +
            '<h1 class="page-title">' + esc(t(UI.navStudio)) + "</h1>" +
            '<p class="page-lede">' + esc(t(s.lede)) + "</p>" +
          "</div>" +
          scatterHTML(s.pieces) +
        "</section>"
      );
    },

    contato: function () {
      var i = C.info;
      body.dataset.theme = "dark";
      body.dataset.nav = "top";
      setStage(C.contact);

      var msg = t(i.whatsappMsg);
      var wa = "https://wa.me/" + i.whatsapp + (msg ? "?text=" + encodeURIComponent(msg) : "");

      return (
        '<section class="contact">' +
          "<h1>" + esc(t(UI.contact)) + "</h1>" +
          '<div class="block">' +
            '<div><span class="k">OFFICE/</span> ' + esc(i.office) + "</div>" +
            '<div><span class="k">STUDIO/</span> ' + esc(i.studio) + "</div>" +
          "</div>" +
          '<div class="block">' +
            '<div><span class="k">INSTAGRAM</span> <a href="' + esc(i.instagramUrl) + '" target="_blank" rel="noopener">' + esc(i.instagram) + "</a></div>" +
            '<div><a href="mailto:' + esc(i.email) + '">' + esc(i.email) + "</a></div>" +
          "</div>" +
          '<div class="block"><div>' + esc(t(i.address)) + "</div></div>" +
          '<div class="block">' +
            '<a class="cta" href="' + esc(wa) + '" target="_blank" rel="noopener">' + esc(t(UI.book)) + " →</a>" +
          "</div>" +
        "</section>"
      );
    }
  };

  /* ---------------- router ---------------- */

  function render() {
    var seg = (location.hash || "#/").replace(/^#\/?/, "").split("/").filter(Boolean);
    var html, section = "", slug = "";

    if (!seg.length) {
      html = views.home();
    } else if (SECTIONS[seg[0]]) {
      section = seg[0];
      slug = seg[1] || "";
      var entry = slug ? find(section, slug) : null;
      html = entry ? entryPage(entry) : sectionIndex(section);
      if (!entry) slug = "";
    } else if (views[seg[0]]) {
      section = seg[0];
      html = views[section]();
    } else {
      html = views.home();
    }

    view.classList.remove("is-ready");

    setTimeout(function () {
      view.innerHTML = html;
      wireImages(view);
      wireHero(view);
      window.scrollTo(0, 0);
      syncNav(section, slug);
      requestAnimationFrame(function () { view.classList.add("is-ready"); });
    }, 260);
  }

  window.addEventListener("hashchange", render);

  /* ---------------- chrome: idioma ---------------- */

  var langBtns = document.querySelectorAll("[data-lang]");

  function syncLangBtns() {
    langBtns.forEach(function (b) {
      if (b.dataset.lang === lang) b.setAttribute("aria-current", "true");
      else b.removeAttribute("aria-current");
    });
  }

  langBtns.forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.dataset.lang); });
  });

  /* ---------------- chrome: áudio ---------------- */

  var audio = document.getElementById("ambient");
  var audioBtn = document.getElementById("audioBtn");
  var audioBroken = false;

  function syncAudioLabel() {
    if (audioBroken) { audioBtn.textContent = t(UI.audioNone); return; }
    audioBtn.textContent = audio.paused ? t(UI.audioOff) : t(UI.audioOn);
    audioBtn.setAttribute("aria-pressed", audio.paused ? "false" : "true");
  }

  /* Fade suave ao ligar/desligar, em vez de cortar seco.
     Guiado pelo relógio, não por requestAnimationFrame: em aba de segundo
     plano o rAF congela e o volume ficaria preso no meio do caminho. */
  var fadeTimer = null;

  function fadeTo(target, done) {
    clearInterval(fadeTimer);
    var from = audio.volume;
    var t0 = Date.now();
    fadeTimer = setInterval(function () {
      var k = Math.min(1, (Date.now() - t0) / 700);
      audio.volume = Math.min(1, Math.max(0, from + (target - from) * k));
      if (k >= 1) {
        clearInterval(fadeTimer);
        if (done) done();
      }
    }, 25);
  }

  audio.addEventListener("error", function () {
    audioBroken = true;
    syncAudioLabel();
  });

  audioBtn.addEventListener("click", function () {
    if (audioBroken) return;

    if (audio.paused) {
      /* a trilha do site e o som do filme não tocam juntos */
      document.querySelectorAll(".hero-video").forEach(function (v) {
        if (!v.muted) {
          v.muted = true;
          var b = v.parentNode.querySelector(".hero-sound");
          if (b) b.textContent = t(UI.heroListen);
        }
      });
      audio.volume = 0;
      audio.play().then(function () {
        fadeTo(0.45);
        syncAudioLabel();
      }).catch(function () {
        audioBroken = true;
        syncAudioLabel();
      });
    } else {
      fadeTo(0, function () { audio.pause(); syncAudioLabel(); });
      syncAudioLabel();
    }
  });

  /* ---------------- chrome: fullscreen ---------------- */

  var fsBtn = document.getElementById("fsBtn");

  function syncFsLabel() {
    fsBtn.textContent = document.fullscreenElement ? t(UI.fsOff) : t(UI.fsOn);
  }

  fsBtn.addEventListener("click", function () {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen().catch(function () {});
  });

  document.addEventListener("fullscreenchange", syncFsLabel);

  /* ---------------- start ---------------- */

  document.documentElement.lang = lang === "en" ? "en" : "pt-BR";
  syncLangBtns();
  syncAudioLabel();
  syncFsLabel();
  buildNav();
  render();
})();
