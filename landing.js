/* Colaberry DS landing v3 — no animation libraries. CSS owns motion; this file
   owns state: nav, menu, ramps, copy, type weights, motion replay, gallery, reveal. */
(function () {
  'use strict';
  var RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FINE = window.matchMedia('(pointer: fine)').matches;

  /* ---- Toast ---- */
  var toastEl = document.getElementById('ltoast'), toastT;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg; toastEl.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove('show'); }, 1600);
  }

  /* ---- Nav: scrolled state + hide on scroll-down ---- */
  var nav = document.querySelector('.lnav'), lastY = 0;
  function onScroll() {
    var y = window.scrollY;
    if (nav) {
      nav.classList.toggle('is-scrolled', y > 10);
      if (y > lastY + 6 && y > 420 && !document.documentElement.classList.contains('menu-open')) nav.classList.add('is-hid');
      else if (y < lastY - 6 || y <= 420) nav.classList.remove('is-hid');
    }
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---- Menu overlay (Escape closes, focus returns to the burger) ---- */
  var burger = document.getElementById('burger'), menu = document.getElementById('menu');
  function setMenu(open) {
    if (!menu || !burger || open === menu.classList.contains('is-open')) return;
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    burger.classList.toggle('is-x', open);
    burger.setAttribute('aria-expanded', String(open));
    document.documentElement.classList.toggle('menu-open', open);
    if (open) { var f = menu.querySelector('a'); if (f) f.focus(); } else burger.focus();
  }
  if (burger) burger.addEventListener('click', function () { setMenu(!menu.classList.contains('is-open')); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu && menu.classList.contains('is-open')) setMenu(false); });
  document.addEventListener('click', function (e) { if (e.target.closest('a[href^="#"]')) setMenu(false); });

  /* ---- Color ramps ---- */
  var RAMPS = [
    { name: 'Cherry Red', base: '#FB2832', hex: ['#FFF0F1','#FFDBDD','#FFB8BC','#FE8A90','#FD5760','#FB2832','#E5121D','#C20E1E','#9B0E18','#7A1016'] },
    { name: 'Leaf Green', base: '#77BB4A', hex: ['#F1F9EA','#DEF0CC','#C2E3A1','#A2D375','#8AC759','#77BB4A','#5BA63C','#468A2E','#356A24','#2A521E'] },
    { name: 'Berry Blue', base: '#367895', hex: ['#EAF2F6','#CFE0E9','#A6C5D5','#6F9DB6','#4A86A2','#367895','#2E6A86','#265A72','#20485C','#1A3947'] }
  ];
  var rampsRoot = document.getElementById('ramps');
  if (rampsRoot) {
    RAMPS.forEach(function (r) {
      var block = document.createElement('div'); block.className = 'lr-block';
      block.innerHTML = '<div class="lr-name"><b>' + r.name + '</b><code>' + r.base + '</code></div>';
      var ramp = document.createElement('div'); ramp.className = 'lr-ramp';
      r.hex.forEach(function (h) {
        var b = document.createElement('button'); b.type = 'button'; b.className = 'lr-sw'; b.style.background = h;
        b.setAttribute('aria-label', 'Copy ' + h); b.dataset.hex = h; ramp.appendChild(b);
      });
      block.appendChild(ramp); rampsRoot.appendChild(block);
    });
    rampsRoot.addEventListener('click', function (e) {
      var sw = e.target.closest('.lr-sw'); if (!sw) return;
      copy(sw.dataset.hex, 'Copied ' + sw.dataset.hex);
    });
  }

  /* ---- Copy snippets (with a visible failure path) ---- */
  var SNIPS = {
    prompt: 'Using the Colaberry design system, create a [social post / flyer / slide / one-pager] at [size] for [topic]. Headline: [your headline]. Add a [call-to-action] and the logo. Warm and on-brand, no emoji — give me 3 options.',
    install: '<link rel="stylesheet" href="colaberry/styles.css">\n<scr' + 'ipt src="colaberry/_ds_bundle.js"></scr' + 'ipt>\n/* tokens: var(--brand-accent) · components: window.ColaberryDesignSystem_098454 */'
  };
  function copy(text, ok) {
    if (!navigator.clipboard) { toast('Copy isn\u2019t available here \u2014 select the text and press Ctrl/Cmd+C.'); return; }
    navigator.clipboard.writeText(text).then(function () { toast(ok || 'Copied to clipboard'); }, function () { toast('Couldn\u2019t copy \u2014 select the text and press Ctrl/Cmd+C.'); });
  }
  document.querySelectorAll('[data-snip]').forEach(function (el) {
    el.addEventListener('click', function () { copy(SNIPS[el.dataset.snip] || '', 'Copied to clipboard'); });
    el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); } });
  });

  /* ---- Type weight preview ---- */
  document.querySelectorAll('.tw-btn[data-w]').forEach(function (b) {
    b.addEventListener('click', function () {
      var aa = document.getElementById('twAa'); if (aa) aa.style.fontWeight = b.dataset.w;
      document.querySelectorAll('.tw-btn[data-w]').forEach(function (x) { var on = x === b; x.classList.toggle('is-on', on); x.setAttribute('aria-pressed', String(on)); });
    });
  });

  /* ---- Motion replay: re-trigger the CSS keyframes ---- */
  var mstage = document.getElementById('mstage'), mplay = document.getElementById('mplay');
  function playMotion() {
    if (!mstage || RM) return;
    mstage.classList.remove('play'); void mstage.offsetWidth; mstage.classList.add('play');
  }
  if (mplay) mplay.addEventListener('click', playMotion);

  /* ---- Gallery: arrows, progress, mouse drag ---- */
  var gal = document.getElementById('gal');
  if (gal) {
    var bar = document.getElementById('galBar');
    function upd() { var m = gal.scrollWidth - gal.clientWidth; if (bar) bar.style.transform = 'scaleX(' + (m > 0 ? gal.scrollLeft / m : 0) + ')'; }
    gal.addEventListener('scroll', upd, { passive: true }); window.addEventListener('resize', upd); upd();
    document.querySelectorAll('[data-gal]').forEach(function (b) {
      b.addEventListener('click', function () { gal.scrollBy({ left: (b.dataset.gal === 'next' ? 1 : -1) * Math.round(gal.clientWidth * 0.72), behavior: RM ? 'auto' : 'smooth' }); });
    });
    gal.addEventListener('keydown', function (e) {
      if (e.target !== gal) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); gal.scrollBy({ left: (e.key === 'ArrowRight' ? 1 : -1) * 320, behavior: RM ? 'auto' : 'smooth' }); }
    });
    if (FINE) {
      var down = false, sx = 0, sl = 0, moved = false;
      gal.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse' || e.target.closest('button, input, a')) return; down = true; moved = false; sx = e.clientX; sl = gal.scrollLeft; gal.classList.add('is-drag'); gal.setPointerCapture(e.pointerId); });
      gal.addEventListener('pointermove', function (e) { if (!down) return; var dx = e.clientX - sx; if (Math.abs(dx) > 5) moved = true; gal.scrollLeft = sl - dx; });
      ['pointerup', 'pointercancel'].forEach(function (ev) { gal.addEventListener(ev, function () { down = false; gal.classList.remove('is-drag'); }); });
      gal.addEventListener('click', function (e) { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
    }
  }

  /* ---- Reveal on scroll (IntersectionObserver; CSS does the motion) ---- */
  /* Hero entrance runs once, then the animation rules are dropped so clones/screenshots never catch frame 0. */
  setTimeout(function () { document.documentElement.classList.add('hero-done'); }, RM ? 0 : 1100);
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !RM) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in', 'is-in'); io.unobserve(en.target); if (en.target.id === 'mstage' || en.target.querySelector('#mstage')) playMotion(); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
    /* Safety net (CLAUDE.md §7.3): nothing stays hidden if the observer never fires. */
    setTimeout(function () { revealEls.forEach(function (el) { el.classList.add('in', 'is-in'); }); }, 2600);
  } else {
    revealEls.forEach(function (el) { el.classList.add('in', 'is-in'); });
  }

  var y = document.getElementById('yr');
  if (y) y.textContent = String(new Date().getFullYear());
})();
