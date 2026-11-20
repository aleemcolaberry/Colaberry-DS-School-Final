/* Interest popup. Opens: after IM_DELAY once per session, on any [data-interest-open] / a[href="#interest"] click,
   or immediately with ?interest=1. Dev hook: replace submitLead() with the real /api/leads POST. */
(function () {
  var IM_DELAY = 15000, KEY = 'cb-interest-seen';
  var COHORT = { name: 'Cohort 1', start: 'Mon, Jul 13, 2026' };
  function submitLead(data) { return new Promise(function (r) { setTimeout(r, 600); }); }

  var ic = function (n) { return '<span class="cb-i" aria-hidden="true"><i class="ri-' + n + '"></i></span>'; };
  var err = function (id, t) { return '<p class="im-err" id="' + id + '">' + ic('error-warning-line') + t + '</p>'; };
  var html =
    '<dialog class="im" id="interestModal" aria-labelledby="imTitle" aria-describedby="imSub">'
    + '<button type="button" class="im__x" data-im-close aria-label="Close">' + ic('close-line') + '</button>'
    + '<div class="im__head"><span class="im__glow"></span>'
    + '<p class="im__eyebrow"><i></i>AI Systems Architect Accelerator</p>'
    + '<h2 class="im__h" id="imTitle">Interested in learning more?</h2>'
    + '<p class="im__sub" id="imSub">Leave your details and our admissions team will reach out about the next cohort.</p>'
    + '<div class="im__chips"><span class="im__chip">' + ic('calendar-line') + COHORT.name + ' · starts ' + COHORT.start + '</span>'
    + '<span class="im__chip">' + ic('time-line') + 'Reply within 1 business day</span></div></div>'
    + '<form class="im-form im__body" novalidate>'
    + '<div class="im__row">'
    + '<div class="im-field"><label for="imFirst">First name<abbr title="required">*</abbr></label><input class="im-input" id="imFirst" name="first" autocomplete="given-name" required aria-describedby="imFirstErr">' + err('imFirstErr', 'Enter your first name') + '</div>'
    + '<div class="im-field"><label for="imLast">Last name<abbr title="required">*</abbr></label><input class="im-input" id="imLast" name="last" autocomplete="family-name" required aria-describedby="imLastErr">' + err('imLastErr', 'Enter your last name') + '</div>'
    + '</div>'
    + '<div class="im-field"><label for="imEmail">Email<abbr title="required">*</abbr></label><input class="im-input" id="imEmail" name="email" type="email" autocomplete="email" inputmode="email" placeholder="you@company.com" required aria-describedby="imEmailErr">' + err('imEmailErr', 'Enter a valid email address') + '</div>'
    + '<div class="im-field"><label for="imPhone">Phone<abbr title="required">*</abbr></label><div class="im-phone"><span class="im-phone__cc" aria-hidden="true">+1</span><input class="im-input" id="imPhone" name="phone" type="tel" autocomplete="tel-national" inputmode="tel" placeholder="(555) 123-4567" required aria-describedby="imPhoneErr"></div>' + err('imPhoneErr', 'Enter a 10-digit phone number') + '</div>'
    + '<label class="im-check"><input type="checkbox" name="optin">Email me about Colaberry courses, events and AI resources. Unsubscribe any time.</label>'
    + '<button class="im-submit" type="submit">Get in touch' + ic('arrow-right-line') + '</button>'
    + '<p class="im-fail" role="alert" hidden>' + ic('error-warning-line') + '<span>We couldn\u2019t send that. Check your connection and try again \u2014 or email <a href="mailto:admissions@colaberry.com">admissions@colaberry.com</a>.</span></p>'
    + '<p class="im-fine">' + ic('shield-check-line') + '<span>By submitting, you agree to our <a href="https://colaberry.com/privacy-policy" target="_blank" rel="noopener">Privacy Policy</a> and consent to be contacted about our programs.</span></p>'
    + '</form>'
    + '<div class="im-done" role="status"><div class="im-done__seal">' + ic('check-line') + '</div>'
    + '<h2>Thanks, <span data-im-name></span>. We\u2019ll be in touch.</h2>'
    + '<p>Someone from admissions will reach out within one business day about ' + COHORT.name + '. Check your inbox for a confirmation.</p>'
    + '<button type="button" class="im-done__btn" data-im-close>Back to the page</button></div>'
    + '</dialog>';

  function init() {
    if (document.getElementById('interestModal')) return;
    document.body.insertAdjacentHTML('beforeend', html);
    var d = document.getElementById('interestModal'), f = d.querySelector('form'), lastFocus = null;
    var open = function () { if (d.open) return; lastFocus = document.activeElement; d.showModal(); try { sessionStorage.setItem(KEY, '1'); } catch (e) {} };
    var close = function () { d.close(); };
    d.addEventListener('close', function () { if (lastFocus && lastFocus.focus) lastFocus.focus(); });
    d.addEventListener('click', function (e) { if (e.target === d || e.target.closest('[data-im-close]')) close(); });
    document.addEventListener('click', function (e) {
      var t = e.target.closest && e.target.closest('[data-interest-open], a[href="#interest"]');
      if (t) { e.preventDefault(); open(); }
    });
    var rules = {
      first: function (v) { return v.trim().length > 0; }, last: function (v) { return v.trim().length > 0; },
      email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); },
      phone: function (v) { return v.replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '').length === 10; }
    };
    var check = function (el) {
      var ok = rules[el.name](el.value), fld = el.closest('.im-field');
      fld.dataset.invalid = ok ? 'false' : 'true'; el.setAttribute('aria-invalid', ok ? 'false' : 'true'); return ok;
    };
    Object.keys(rules).forEach(function (n) {
      var el = f.elements[n];
      el.addEventListener('blur', function () { if (el.value) check(el); });
      el.addEventListener('input', function () { if (el.closest('.im-field').dataset.invalid === 'true') check(el); });
    });
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var bad = Object.keys(rules).map(function (n) { return check(f.elements[n]) ? null : f.elements[n]; }).filter(Boolean);
      if (bad.length) { bad[0].focus(); return; }
      var btn = f.querySelector('.im-submit'), fail = f.querySelector('.im-fail'), idle = btn.innerHTML;
      fail.hidden = true;
      btn.disabled = true; btn.setAttribute('aria-busy', 'true'); btn.innerHTML = '<span class="im-spin" aria-hidden="true"></span>Sending\u2026';
      var data = Object.fromEntries(new FormData(f));
      submitLead(data).then(function () {
        d.querySelector('[data-im-name]').textContent = data.first.trim();
        d.dataset.done = 'true'; d.querySelector('.im-done__btn').focus();
      }).catch(function () {
        btn.disabled = false; btn.removeAttribute('aria-busy'); btn.innerHTML = idle.replace('Get in touch', 'Try again');
        fail.hidden = false; btn.focus();
      });
    });
    var seen = false; try { seen = sessionStorage.getItem(KEY) === '1'; } catch (e) {}
    if (/[?&]interest=1/.test(location.search)) open();
    else if (!seen) setTimeout(function () { if (!document.querySelector('dialog[open]')) open(); }, IM_DELAY);
    window.openInterestModal = open;
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
