/* Colaberry DS — shared progressive form handler (CLAUDE.md §5).
   Any <form data-cb-form> gets, with no page code:
     · validation on submit: required, type=email, type=tel, minlength — inline
       message under the field (role=alert, aria-invalid, aria-describedby),
       first bad field focused, native bubbles suppressed (set novalidate)
     · errors clear as the visitor types
     · busy submit button (aria-busy, label swap, repeat clicks blocked)
     · success: fields hidden, [data-cb-success] shown (role=status) + focused
     · failure: [data-cb-fail] shown (role=alert), button becomes "Try again"
   Transport: window.cbSubmitLead(data, form) → Promise, if the page defines
   one; otherwise a demo resolve after 700ms. Markup contract:
     <form data-cb-form novalidate>
       <div class="field|ct-field|cb-field"><label for=x>…</label><input id=x required></div>
       <button type=submit>Send</button>
       <p data-cb-success role="status" hidden>Thanks…</p>
       <p data-cb-fail role="alert" hidden>Couldn't send… <a href="mailto:…">email us</a></p>
     </form>
   Field styles: .cb-field--error on the wrapper (components.css covers
   .cb-input/.cb-select/.cb-ta; site-pages.css covers .ct-*). */
(function () {
  var MSG = {
    required: 'This field is required.',
    email: 'Enter a valid email like you@domain.com.',
    tel: 'Enter a valid phone number.',
    minlength: function (n) { return 'Use at least ' + n + ' characters.'; },
    checkbox: 'Please tick this box to continue.'
  };
  var okEmail = function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); };
  var okTel = function (v) { return /^[\d\s().+-]{7,20}$/.test(v); };

  function wrapOf(el) { return el.closest('.field, .ct-field, .cb-field, .im-field') || el.parentNode; }
  function labelOf(el) {
    var l = el.id && document.querySelector('label[for="' + el.id + '"]');
    return l ? l.textContent.replace(/\s*\*\s*$/, '').trim() : '';
  }
  function setError(el, msg) {
    var w = wrapOf(el), err = w.querySelector('.cb-field__msg--err');
    if (msg) {
      if (!err) {
        err = document.createElement('p');
        err.className = 'cb-field__msg cb-field__msg--err';
        err.setAttribute('role', 'alert');
        err.id = (el.id || 'f' + Math.random().toString(36).slice(2)) + '-err';
        w.appendChild(err);
      }
      err.textContent = msg;
      w.classList.add('cb-field--error');
      el.setAttribute('aria-invalid', 'true');
      el.setAttribute('aria-describedby', err.id);
    } else {
      if (err) err.remove();
      w.classList.remove('cb-field--error');
      el.removeAttribute('aria-invalid');
      el.removeAttribute('aria-describedby');
    }
  }
  function validate(el) {
    var v = (el.value || '').trim(), t = (el.getAttribute('type') || el.tagName).toLowerCase();
    if (t === 'checkbox') return el.required && !el.checked ? MSG.checkbox : '';
    if (el.required && !v) { var l = labelOf(el); return l ? l + ' is required.' : MSG.required; }
    if (!v) return '';
    if (t === 'email' && !okEmail(v)) return MSG.email;
    if (t === 'tel' && !okTel(v)) return MSG.tel;
    var ml = +el.getAttribute('minlength'); if (ml && v.length < ml) return MSG.minlength(ml);
    return '';
  }
  function injectCSS() {
    if (document.getElementById('cb-forms-css')) return;
    var s = document.createElement('style'); s.id = 'cb-forms-css';
    s.textContent = '.cb-form-spin{display:inline-block;width:14px;height:14px;flex:none;border-radius:50%;border:2px solid color-mix(in srgb,currentColor 25%,transparent);border-top-color:currentColor;animation:cb-form-rot .8s linear infinite;vertical-align:-2px;margin-right:6px}@keyframes cb-form-rot{to{transform:rotate(360deg)}}@media (prefers-reduced-motion:reduce){.cb-form-spin{animation-duration:1.6s}}.cb-field__msg--err{margin:0;overflow-wrap:anywhere}[data-cb-form] [aria-busy="true"]{pointer-events:none;cursor:progress}';
    document.head.appendChild(s);
  }
  function setBusy(btn, busy, label) {
    if (!btn) return;
    if (busy) {
      if (!btn.dataset.idleHtml) btn.dataset.idleHtml = btn.innerHTML;
      btn.setAttribute('aria-busy', 'true'); btn.setAttribute('aria-disabled', 'true'); btn.classList.add('is-busy');
      btn.innerHTML = '<span class="cb-form-spin" aria-hidden="true"></span><span>' + (label || 'Sending…') + '</span>';
    } else {
      btn.removeAttribute('aria-busy'); btn.removeAttribute('aria-disabled'); btn.classList.remove('is-busy');
      if (btn.dataset.idleHtml) { btn.innerHTML = btn.dataset.idleHtml; delete btn.dataset.idleHtml; }
    }
  }
  function send(data, form) {
    if (typeof window.cbSubmitLead === 'function') return Promise.resolve(window.cbSubmitLead(data, form));
    return new Promise(function (res) { setTimeout(res, 700); });
  }

  function wire(form) {
    if (form.__cbWired) return; form.__cbWired = true;
    form.setAttribute('novalidate', '');
    var fields = function () { return Array.prototype.slice.call(form.querySelectorAll('input:not([type=hidden]):not([type=submit]), select, textarea')); };
    fields().forEach(function (el) {
      el.addEventListener('input', function () { if (el.getAttribute('aria-invalid')) setError(el, validate(el)); });
      el.addEventListener('blur', function () { if (el.value || el.required) setError(el, validate(el)); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var bad = [];
      fields().forEach(function (el) { var m = validate(el); setError(el, m); if (m) bad.push(el); });
      var fail = form.querySelector('[data-cb-fail]'), ok = form.querySelector('[data-cb-success]');
      if (fail) fail.hidden = true;
      if (bad.length) { bad[0].focus(); return; }
      var btn = form.querySelector('[type="submit"]');
      setBusy(btn, true, btn && btn.getAttribute('data-busy-label'));
      var data = {}; fields().forEach(function (el) { if (el.name || el.id) data[el.name || el.id] = el.type === 'checkbox' ? el.checked : el.value; });
      send(data, form).then(function () {
        setBusy(btn, false);
        form.querySelectorAll('.field-row, .ct-row, .field, .ct-field, .cb-field, .cb-stack > *, [type="submit"]').forEach(function (n) {
          if (n.hasAttribute('data-cb-success') || n.hasAttribute('data-cb-fail') || n.querySelector('[data-cb-success]')) return;
          n.hidden = true;
        });
        if (btn) btn.hidden = true;
        form.setAttribute('data-cb-state', 'sent');
        if (ok) { ok.hidden = false; ok.setAttribute('tabindex', '-1'); ok.focus(); }
        form.reset();
      }).catch(function (err) {
        try { console.error('[cb-form] submit failed:', err); } catch (_) {}
        setBusy(btn, false);
        if (btn) { btn.innerHTML = btn.innerHTML.replace(/^(\s*)([^<]+)/, '$1Try again'); }
        form.setAttribute('data-cb-state', 'failed');
        if (fail) { fail.hidden = false; }
        if (btn) btn.focus();
      });
    });
  }

  function init() { injectCSS(); document.querySelectorAll('form[data-cb-form]').forEach(wire); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  window.cbForms = { wire: wire, setError: setError, setBusy: setBusy, validate: validate };
})();
