/* Colaberry Learn — dashboard charts + theme.
   Vanilla JS. Charts are drawn with the design system's --chart-N
   tokens so they stay on-brand and theme-aware. Reduced-motion safe. */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };

  /* ---------- THEME ---------- */
  var root = document.documentElement;
  function applyTheme(t) {
    root.setAttribute('data-theme', t);
    try { localStorage.setItem('cb-theme', t); } catch (e) {}
    var icon = $('#themeIcon');
    if (icon) icon.className = t === 'dark' ? 'ri-sun-line' : 'ri-moon-line';
    var src = '../assets/logo/colaberry-horizontal-' + (t === 'dark' ? 'white' : 'black') + '.png';
    var logo = $('#sideLogo'); if (logo) logo.src = src;
    var dlogo = $('#drawerLogo'); if (dlogo) dlogo.src = src;
  }
  applyTheme(root.getAttribute('data-theme') || 'light');
  var tb = $('#themeBtn');
  if (tb) tb.addEventListener('click', function () {
    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  /* ---------- MOBILE DRAWER ---------- */
  var drawer = $('#drawer'), scrim = $('#scrim');
  function setDrawer(open) {
    if (!drawer) return;
    drawer.classList.toggle('is-open', open);
    scrim.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  var burger = $('#burger'); if (burger) burger.addEventListener('click', function () { setDrawer(true); });
  var dClose = $('#drawerClose'); if (dClose) dClose.addEventListener('click', function () { setDrawer(false); });
  if (scrim) scrim.addEventListener('click', function () { setDrawer(false); });
  if (drawer) drawer.addEventListener('click', function (e) { if (e.target.closest('a')) setDrawer(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setDrawer(false); });

  /* ---------- LINE CHART ---------- */
  var W = 640, H = 240, PAD_L = 10, PAD_R = 10, TOP = 20, BOT = 24;
  var data = {
    progress: [8, 14, 21, 27, 34, 42, 50, 57, 61, 64, 66, 68],
    hours:    [6, 9, 7, 11, 10, 13, 9, 14, 12, 15, 13, 16],
    grades:   [72, 75, 78, 76, 82, 84, 83, 88, 86, 90, 89, 91],
    cohort: {
      progress: [7, 13, 19, 25, 31, 38, 45, 51, 56, 58, 60, 62],
      hours:    [7, 8, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13],
      grades:   [70, 72, 74, 75, 77, 79, 80, 82, 83, 84, 85, 86]
    }
  };

  function maxOf(series) {
    var m = 0;
    series.forEach(function (a) { a.forEach(function (v) { if (v > m) m = v; }); });
    return m <= 100 ? 100 : Math.ceil(m / 10) * 10;
  }
  function pts(arr, max) {
    var n = arr.length, span = W - PAD_L - PAD_R, innerH = H - TOP - BOT;
    return arr.map(function (v, i) {
      var x = PAD_L + (span * i) / (n - 1);
      var y = TOP + innerH * (1 - v / max);
      return [x, y];
    });
  }
  function lineD(p) { return p.map(function (q, i) { return (i ? 'L' : 'M') + q[0].toFixed(1) + ',' + q[1].toFixed(1); }).join(' '); }
  function areaD(p) { return lineD(p) + ' L' + p[p.length - 1][0].toFixed(1) + ',' + (H - BOT) + ' L' + p[0][0].toFixed(1) + ',' + (H - BOT) + ' Z'; }

  var gridG = $('#grid'), areaPath = $('#areaPath'), linePath = $('#linePath');
  var cohortPath = null;
  if (linePath) {
    cohortPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    cohortPath.setAttribute('fill', 'none');
    cohortPath.setAttribute('stroke', 'var(--border-strong)');
    cohortPath.setAttribute('stroke-width', '2');
    cohortPath.setAttribute('stroke-dasharray', '5 6');
    cohortPath.setAttribute('stroke-linecap', 'round');
    linePath.parentNode.insertBefore(cohortPath, linePath);
  }

  function drawGrid(max) {
    if (!gridG) return;
    gridG.innerHTML = '';
    for (var i = 0; i <= 4; i++) {
      var y = TOP + (H - TOP - BOT) * (i / 4);
      var ln = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      ln.setAttribute('x1', PAD_L); ln.setAttribute('x2', W - PAD_R);
      ln.setAttribute('y1', y); ln.setAttribute('y2', y);
      gridG.appendChild(ln);
    }
  }

  function render(series, animate) {
    if (!linePath) return;
    var max = maxOf([data[series], data.cohort[series]]);
    drawGrid(max);
    var p = pts(data[series], max), c = pts(data.cohort[series], max);
    areaPath.setAttribute('d', areaD(p));
    linePath.setAttribute('d', lineD(p));
    cohortPath.setAttribute('d', lineD(c));
    if (animate && !reduce) {
      var len = linePath.getTotalLength();
      linePath.style.transition = 'none';
      linePath.style.strokeDasharray = len; linePath.style.strokeDashoffset = len;
      areaPath.style.opacity = 0;
      // force reflow
      void linePath.getBoundingClientRect();
      linePath.style.transition = 'stroke-dashoffset .9s var(--ease-out)';
      linePath.style.strokeDashoffset = 0;
      areaPath.style.transition = 'opacity .9s ease'; areaPath.style.opacity = 1;
    }
  }

  if (linePath) {
    render('progress', true);
    var seg = $('#seg');
    if (seg) seg.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      [].forEach.call(seg.children, function (c) { c.classList.remove('is-active'); });
      b.classList.add('is-active');
      render(b.getAttribute('data-series'), true);
    });
  }

  /* ---------- DONUT ---------- */
  var arc = $('#donutArc');
  if (arc) {
    var dash = parseFloat(arc.getAttribute('stroke-dasharray'));
    var pct = parseFloat(arc.getAttribute('data-pct'));
    var target = dash * (1 - pct / 100);
    if (reduce) { arc.style.strokeDashoffset = target; }
    else {
      arc.style.transition = 'stroke-dashoffset 1.1s var(--ease-out)';
      setTimeout(function () { arc.style.strokeDashoffset = target; }, 200);
    }
  }

  /* ---------- SKILL TRACKS + BARS ---------- */
  function fill() {
    document.querySelectorAll('.track > i[data-w]').forEach(function (el) {
      el.style.width = el.getAttribute('data-w') + '%';
    });
    document.querySelectorAll('#bars [data-h]').forEach(function (el) {
      el.style.height = el.getAttribute('data-h') + '%';
    });
  }
  if (reduce) fill(); else setTimeout(fill, 250);
})();
