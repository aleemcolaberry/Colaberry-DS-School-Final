/* ============================================================
   Colaberry — shared theme layer (ONE copy for every themed page).
   Load synchronously in <head>, right after the stylesheet link:
     <script src="theme.js"></script>        (root pages)
     <script src="../theme.js"></script>     (one level down)

   What it guarantees
   - No flash of the wrong theme: the attribute is set before first paint.
   - One persisted choice (localStorage "cb-theme") shared by landing,
     docs, playbook and the learner app. Legacy "cb-landing-theme" is read.
   - No stored choice → follows prefers-color-scheme and keeps following it
     until the visitor picks. <html data-theme-default="light"> pins a page.
   - color-scheme follows the theme, so native controls, scrollbars and
     form widgets never render as light islands in dark mode.
   - Wires, with correct ARIA state:
       [data-theme-toggle]            flip button (aria-pressed + ri-sun/moon icon)
       [data-set-theme="light|dark"]  segmented buttons (.active + aria-pressed)
       [data-theme-switch]            role="switch" (aria-checked)
       input[data-theme-radio]        radios (checked)
       img[data-logo-swap]            -black/-white (or plain/-white) logo art
       meta[name="theme-color"]       browser chrome colour
   - Dispatches "cb-theme" on document after every change
     (event.detail.theme) so charts/canvases can re-tint.
   API: window.cbTheme = { get, set, toggle, sync }; window.cbApplyTheme(t).
   ============================================================ */
(function () {
  var root = document.documentElement, KEY = 'cb-theme', LEGACY = 'cb-landing-theme';
  var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  function read(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function write(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function valid(v) { return v === 'dark' || v === 'light' ? v : null; }
  function stored() { return valid(read(KEY)) || valid(read(LEGACY)); }
  function preferred() { return valid(root.getAttribute('data-theme-default')) || (mq && mq.matches ? 'dark' : 'light'); }
  function get() { return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'; }
  function qsa(s) { return Array.prototype.slice.call(document.querySelectorAll(s)); }

  function swapLogo(img, dark) {
    var light = img.getAttribute('data-logo-light');
    if (!light) { light = img.getAttribute('src'); img.setAttribute('data-logo-light', light); }
    var m = light.match(/^(.*?)(-black|-white)?(\.\w+)(\?.*)?$/);
    if (!m) return;
    var next = dark ? m[1] + '-white' + m[3] + (m[4] || '') : light;
    if (img.getAttribute('src') !== next) img.setAttribute('src', next);
  }

  function sync() {
    var t = get(), dark = t === 'dark';
    root.style.colorScheme = t;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', dark ? '#0F0F0F' : '#FFFFFF');
    if (!document.body) return;
    qsa('[data-theme-toggle]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(dark));
      var ic = b.querySelector('i');
      if (ic && /(^|\s)ri-(sun|moon)-line/.test(ic.className)) ic.className = dark ? 'ri-sun-line' : 'ri-moon-line';
    });
    qsa('[data-set-theme]').forEach(function (b) {
      var on = b.getAttribute('data-set-theme') === t;
      b.classList.toggle('active', on); b.setAttribute('aria-pressed', String(on));
    });
    qsa('[data-theme-switch]').forEach(function (s) { s.setAttribute('aria-checked', String(dark)); });
    qsa('input[data-theme-radio]').forEach(function (rd) { rd.checked = rd.value === t; });
    qsa('img[data-logo-swap]').forEach(function (img) { swapLogo(img, dark); });
    try { document.dispatchEvent(new CustomEvent('cb-theme', { detail: { theme: t } })); } catch (e) {}
  }

  function set(t, persist) {
    t = valid(t) || 'light';
    root.setAttribute('data-theme', t);
    if (persist !== false) { write(KEY, t); write(LEGACY, t); }
    sync();
  }
  function toggle() { set(get() === 'dark' ? 'light' : 'dark'); }

  /* 1. Pre-paint: attribute only (body not parsed yet). */
  var initial = stored() || preferred();
  root.setAttribute('data-theme', initial);
  root.style.colorScheme = initial;

  /* 2. After parse: wire controls + logo art. */
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', sync); else sync();

  /* 3. Follow the OS until the visitor makes a choice. */
  if (mq && !stored()) {
    var onChange = function (e) { if (!stored()) set(e.matches ? 'dark' : 'light', false); };
    if (mq.addEventListener) mq.addEventListener('change', onChange); else if (mq.addListener) mq.addListener(onChange);
  }

  /* 4. One delegated click handler covers every control, including ones
        rendered later (dashboard views, React trees). */
  document.addEventListener('click', function (e) {
    var el = e.target && e.target.closest ? e.target.closest('[data-theme-toggle],[data-set-theme],[data-theme-switch]') : null;
    if (!el) return;
    if (el.hasAttribute('data-set-theme')) set(el.getAttribute('data-set-theme')); else toggle();
  });
  document.addEventListener('change', function (e) {
    var el = e.target;
    if (el && el.matches && el.matches('input[data-theme-radio]') && el.checked) set(el.value);
  });

  window.cbTheme = { get: get, set: set, toggle: toggle, sync: sync };
  window.cbApplyTheme = set;
})();
