/* Colaberry Learn — global error safety net, shared inline validation,
   and the confirm dialog (top-most UI layer). Loaded on every page BEFORE
   page scripts so their failures are caught and surfaced, never silent. */
(function () {
  /* ---- 1. Global net: uncaught errors -> friendly, non-blocking message ---- */
  var last = 0;
  function friendly() {
    var now = Date.now();
    if (now - last < 4000) return; /* don't spam on error loops */
    last = now;
    var msg = 'Something went wrong. Your data is safe \u2014 try again, or reload the page.';
    if (window.cbToast) { window.cbToast(msg, { tone: 'error', title: 'Unexpected error' }); return; }
    var b = document.createElement('div');
    b.setAttribute('role', 'alert');
    b.style.cssText = 'position:fixed;left:50%;bottom:20px;transform:translateX(-50%);z-index:400;max-width:calc(100vw - 32px);background:var(--surface-card,#fff);color:var(--text-body,#333);border:1px solid var(--border-default,#ddd);border-radius:12px;box-shadow:0 8px 30px rgba(0,0,0,.18);padding:12px 18px;font:14px/1.4 var(--font-body,sans-serif)';
    b.textContent = msg;
    (document.body || document.documentElement).appendChild(b);
    setTimeout(function () { b.remove(); }, 6000);
  }
  window.addEventListener('error', friendly);
  window.addEventListener('unhandledrejection', friendly);

  /* ---- 1b. Connectivity: persistent banner while offline, cleared on reconnect.
     Lives in flow at the top of <body> (not a toast — toasts time out). ---- */
  var offBar = null;
  function setOffline(off) {
    if (off && !offBar) {
      offBar = document.createElement('div');
      offBar.setAttribute('role', 'status');
      offBar.className = 'cb-alert cb-alert--warning cb-alert--banner cb-offline';
      offBar.style.cssText = 'position:sticky;top:0;z-index:390;justify-content:center;text-align:center';
      offBar.innerHTML = '<span class="cb-alert__ic cb-i" aria-hidden="true"><i class="ri-wifi-off-line"></i></span><span class="cb-alert__body" style="flex:0 1 auto">You\u2019re offline. We\u2019ll keep showing what\u2019s already loaded; changes will send when you reconnect.</span>';
      (document.body || document.documentElement).prepend(offBar);
    } else if (!off && offBar) {
      offBar.remove(); offBar = null;
      if (window.cbToast) window.cbToast('Back online.', { tone: 'success' });
    }
  }
  window.addEventListener('offline', function () { setOffline(true); });
  window.addEventListener('online', function () { setOffline(false); });
  if (navigator.onLine === false) { if (document.body) setOffline(true); else document.addEventListener('DOMContentLoaded', function () { setOffline(true); }); }

  /* ---- 2. Inline field validation (pairs with a toast summary) ---- */
  window.cbEmailOk = function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); };
  window.cbPhoneOk = function (v) { return /^[\d\s().+-]{7,20}$/.test(v); };
  window.cbSetFieldError = function (input, msg) {
    if (!input) return;
    var field = input.closest('.field') || input.closest('.cb-field') || input.parentNode;
    var err = field.querySelector('.cb-field__msg--err');
    if (msg) {
      if (!err) {
        err = document.createElement('span');
        err.className = 'cb-field__msg cb-field__msg--icon cb-field__msg--err';
        err.setAttribute('role', 'alert');
        err.id = (input.id || 'f' + Math.random().toString(36).slice(2)) + '-err';
        field.appendChild(err);
      }
      err.innerHTML = '<span class="cb-i" aria-hidden="true"><i class="ri-error-warning-line"></i></span> ' + msg;
      field.classList.add('cb-field--error');
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', err.id);
    } else {
      if (err) err.remove();
      field.classList.remove('cb-field--error');
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedby');
    }
  };
  /* Submit-button busy state — mirrors <Button loading>. cbSetBusy(btn, true, 'Sending…') */
  window.cbSetBusy = function (btn, busy, label) {
    if (!btn) return;
    if (busy) {
      if (!btn.dataset.idleHtml) btn.dataset.idleHtml = btn.innerHTML;
      btn.setAttribute('aria-busy', 'true'); btn.setAttribute('aria-disabled', 'true'); btn.classList.add('is-busy');
      btn.innerHTML = '<span class="cb-spinner cb-spinner--sm" aria-hidden="true"></span><span>' + (label || 'Working…') + '</span>';
    } else {
      btn.removeAttribute('aria-busy'); btn.removeAttribute('aria-disabled'); btn.classList.remove('is-busy');
      if (btn.dataset.idleHtml) { btn.innerHTML = btn.dataset.idleHtml; delete btn.dataset.idleHtml; }
    }
  };

  /* ---- 3. Confirm dialog. Top-most layer: its capture-phase Escape wins
     over popover/drawer handlers; outside click = cancel; focus is trapped
     and returned to the invoking element. ---- */
  window.cbConfirm = function (opts, onConfirm) {
    var prev = document.activeElement;
    var wrap = document.createElement('div');
    wrap.className = 'cbdlg';
    wrap.innerHTML =
      '<div class="cbdlg__scrim"></div>' +
      '<div class="cbdlg__card" role="alertdialog" aria-modal="true" aria-labelledby="cbdlgT" aria-describedby="cbdlgM">' +
      '<h3 id="cbdlgT">' + opts.title + '</h3>' +
      '<p id="cbdlgM" class="muted">' + opts.message + '</p>' +
      '<div class="cbdlg__row">' +
      '<button type="button" class="cb-btn cb-btn--outline cb-btn--sm" data-x="cancel">' + (opts.cancelLabel || 'Cancel') + '</button>' +
      '<button type="button" class="cb-btn cb-btn--confirm cb-btn--sm" data-x="ok"' + (opts.danger ? ' style="--_bg:var(--status-danger);--_bg-hover:var(--status-danger);--_bg-press:var(--status-danger)"' : '') + '>' + (opts.confirmLabel || 'Confirm') + '</button>' +
      '</div></div>';
    function close(ok) {
      document.removeEventListener('keydown', onKey, true);
      wrap.remove();
      if (prev && prev.focus) prev.focus();
      if (ok && onConfirm) onConfirm();
    }
    function onKey(e) {
      if (e.key === 'Escape') { e.stopImmediatePropagation(); e.preventDefault(); close(false); return; }
      if (e.key === 'Tab') {
        var f = wrap.querySelectorAll('button'), first = f[0], lastB = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastB.focus(); }
        else if (!e.shiftKey && document.activeElement === lastB) { e.preventDefault(); first.focus(); }
      }
    }
    document.addEventListener('keydown', onKey, true);
    wrap.querySelector('.cbdlg__scrim').addEventListener('click', function () { close(false); });
    wrap.querySelector('[data-x="cancel"]').addEventListener('click', function () { close(false); });
    wrap.querySelector('[data-x="ok"]').addEventListener('click', function () { close(true); });
    document.body.appendChild(wrap);
    wrap.querySelector('[data-x="cancel"]').focus();
  };
})();
