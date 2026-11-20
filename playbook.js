/* Colaberry DS — playbook page: theme, nav, menu, copy, expand, scroll-spy. No dependencies. */
(function () {
  'use strict';
  var toastEl = document.getElementById('ltoast'), toastT;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg; toastEl.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove('show'); }, 1600);
  }

  /* Theme: owned by /theme.js (shared, persisted, OS-aware) */

  /* Nav */
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

  /* Menu overlay */
  var burger = document.getElementById('burger'), menu = document.getElementById('menu');
  function setMenu(open) {
    if (!menu || !burger) return;
    menu.classList.toggle('is-open', open);
    burger.classList.toggle('is-x', open);
    burger.setAttribute('aria-expanded', String(open));
    document.documentElement.classList.toggle('menu-open', open);
    if (!open && document.activeElement && menu.contains(document.activeElement)) burger.focus();
  }
  if (burger) burger.addEventListener('click', function () { setMenu(!menu.classList.contains('is-open')); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  document.addEventListener('click', function (e) { if (e.target.closest('a[href^="#"]')) setMenu(false); });

  /* Copy a prompt */
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var box = btn.closest('.prompt'), pre = box && box.querySelector('pre');
      if (!pre) return;
      var text = pre.textContent.replace(/\s+$/, '');
      var done = function () {
        toast('Prompt copied — paste it into Claude Code');
        var lbl = btn.querySelector('span'); if (!lbl) return;
        var old = lbl.textContent; lbl.textContent = 'Copied';
        setTimeout(function () { lbl.textContent = old; }, 1400);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, done);
      else {
        var r = document.createRange(); r.selectNodeContents(pre);
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
        try { document.execCommand('copy'); } catch (e) {}
        s.removeAllRanges(); done();
      }
    });
  });

  /* Expand long prompts */
  document.querySelectorAll('.prompt--tall').forEach(function (box) {
    var pre = box.querySelector('pre'), more = box.querySelector('.prompt__more button');
    if (!pre || !more) return;
    if (pre.scrollHeight <= 400) { box.classList.add('is-open'); more.parentNode.style.display = 'none'; return; }
    more.addEventListener('click', function () {
      var open = box.classList.toggle('is-open');
      more.setAttribute('aria-expanded', String(open));
      if (!open) { var top = box.getBoundingClientRect().top + window.scrollY - 90; if (window.scrollY > top) window.scrollTo({ top: top, behavior: 'auto' }); }
    });
  });

  /* Scroll-spy for the top nav */
  var links = Array.prototype.slice.call(document.querySelectorAll('.lnav__links a[href^="#"]'));
  var secs = links.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  if ('IntersectionObserver' in window && secs.length) {
    var cur = null;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) cur = en.target.id; });
      links.forEach(function (a) { a.classList.toggle('is-cur', a.getAttribute('href') === '#' + cur); });
    }, { rootMargin: '-40% 0px -55% 0px' });
    secs.forEach(function (s) { io.observe(s); });
  }

  var y = document.getElementById('yr'); if (y) y.textContent = String(new Date().getFullYear());
})();
