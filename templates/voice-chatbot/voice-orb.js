/*
 * <cb-voice-orb> — Colaberry animated voice icon (web component, no dependencies).
 *   state="idle|listening|thinking|speaking|muted"   default idle
 *   size="96"            px (scales everything)
 *   color="#FB2832"      any CSS color (cherry by default; bars stay white)
 *   label="…"            aria-label override
 *   interactive          adds pointer cursor, button role, keyboard activation
 * Motion collapses under prefers-reduced-motion; states stay legible statically.
 */
(() => {
  if (customElements.get('cb-voice-orb')) return;
  const LABELS = { idle: 'Voice assistant ready', listening: 'Listening', thinking: 'Thinking', speaking: 'Speaking', muted: 'Microphone muted' };
  const tpl = document.createElement('template');
  tpl.innerHTML = `<style>
:host{--c:var(--orb-color,#FB2832);--c-dk:color-mix(in srgb,var(--c) 76%,#000);--c-lt:color-mix(in srgb,var(--c) 72%,#fff);display:inline-grid;place-items:center;width:1em;height:1em;font-size:96px;vertical-align:middle;line-height:0;box-sizing:border-box;flex:none;outline:none}
:host([interactive]){cursor:pointer}
:host([hidden]){display:none}
:host(:focus-visible) .core{outline:3px solid #367895;outline-offset:3px}
.orb{position:relative;width:1em;height:1em;display:grid;place-items:center}
.ring{position:absolute;inset:0;border-radius:50%;border:.02em solid var(--c);opacity:0;transform:scale(.74);pointer-events:none}
.halo{position:absolute;inset:.03em;border-radius:50%;background:radial-gradient(circle,color-mix(in srgb,var(--c) 30%,transparent) 0%,color-mix(in srgb,var(--c) 10%,transparent) 50%,transparent 72%);opacity:0;transition:opacity .36s cubic-bezier(.22,1,.36,1);pointer-events:none}
.arc{position:absolute;inset:.07em;border-radius:50%;background:conic-gradient(from 0deg,transparent 0 62%,var(--c) 100%);-webkit-mask:radial-gradient(farthest-side,transparent calc(100% - .03em - 1px),#000 calc(100% - .03em));mask:radial-gradient(farthest-side,transparent calc(100% - .03em - 1px),#000 calc(100% - .03em));opacity:0;transition:opacity .36s;pointer-events:none}
.core{position:relative;width:.72em;height:.72em;border-radius:50%;background:radial-gradient(circle at 32% 28%,var(--c-lt) 0%,var(--c) 46%,var(--c-dk) 100%);box-shadow:0 .08em .22em color-mix(in srgb,var(--c) 36%,transparent),inset 0 -.03em .07em rgba(0,0,0,.14);display:grid;place-items:center;transition:transform .36s cubic-bezier(.22,1,.36,1),box-shadow .36s,filter .36s}
:host([interactive]) .core:hover{transform:scale(1.04)}
:host([interactive]) .core:active{transform:scale(.97)}
.bars{display:flex;gap:.045em;align-items:center;height:.4em}
.bars i{display:block;width:.065em;height:.14em;border-radius:1em;background:#fff;transition:height .36s cubic-bezier(.22,1,.36,1),opacity .36s,transform .36s}
.bars i:nth-child(2),.bars i:nth-child(3){height:.26em}
.slash{position:absolute;inset:0;margin:auto;width:.46em;height:.035em;border-radius:1em;background:#fff;transform:rotate(-45deg);opacity:0;transition:opacity .36s;box-shadow:0 0 0 .018em var(--c)}
:host(:not([state])) .core,:host([state="idle"]) .core{animation:breathe 3.6s ease-in-out infinite}
:host([state="listening"]) .halo{opacity:1}
:host([state="listening"]) .ring{animation:ripple 2.1s cubic-bezier(.22,1,.36,1) infinite}
:host([state="listening"]) .r2{animation-delay:.7s}
:host([state="listening"]) .r3{animation-delay:1.4s}
:host([state="listening"]) .bars i{animation:listen 1.15s ease-in-out infinite}
:host([state="listening"]) .bars i:nth-child(2){animation-delay:.14s;animation-duration:1.3s}
:host([state="listening"]) .bars i:nth-child(3){animation-delay:.28s;animation-duration:1.05s}
:host([state="listening"]) .bars i:nth-child(4){animation-delay:.42s;animation-duration:1.25s}
:host([state="thinking"]) .arc{opacity:1;animation:spin 1.1s linear infinite}
:host([state="thinking"]) .bars i{height:.065em;animation:think 1.2s ease-in-out infinite}
:host([state="thinking"]) .bars i:nth-child(2){animation-delay:.12s}
:host([state="thinking"]) .bars i:nth-child(3){animation-delay:.24s}
:host([state="thinking"]) .bars i:nth-child(4){animation-delay:.36s}
:host([state="speaking"]) .halo{opacity:1;animation:halo 1.5s ease-in-out infinite}
:host([state="speaking"]) .bars i{animation:speak .8s ease-in-out infinite}
:host([state="speaking"]) .bars i:nth-child(2){animation-delay:.1s;animation-duration:.95s}
:host([state="speaking"]) .bars i:nth-child(3){animation-delay:.2s;animation-duration:.7s}
:host([state="speaking"]) .bars i:nth-child(4){animation-delay:.3s;animation-duration:1.05s}
:host([state="muted"]){--c:#6E6E6E}
:host([state="muted"]) .bars i{height:.065em;opacity:.7}
:host([state="muted"]) .slash{opacity:1}
@keyframes breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}
@keyframes ripple{0%{transform:scale(.74);opacity:.6}100%{transform:scale(1);opacity:0}}
@keyframes listen{0%,100%{height:.14em}50%{height:.3em}}
@keyframes speak{0%,100%{height:.1em}50%{height:.4em}}
@keyframes think{0%,80%,100%{transform:translateY(0);opacity:.5}40%{transform:translateY(-.06em);opacity:1}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes halo{0%,100%{transform:scale(.96);opacity:.75}50%{transform:scale(1.06);opacity:1}}
@media (prefers-reduced-motion:reduce){*{animation:none!important}:host([state="listening"]) .r1{opacity:.45;transform:scale(.86)}:host([state="listening"]) .r3{opacity:.2;transform:scale(1)}:host([state="speaking"]) .bars i:nth-child(odd){height:.2em}:host([state="speaking"]) .bars i:nth-child(even){height:.36em}}
</style><div class="orb" part="orb"><span class="halo"></span><span class="ring r1"></span><span class="ring r2"></span><span class="ring r3"></span><span class="arc"></span><span class="core" part="core"><span class="bars"><i></i><i></i><i></i><i></i></span><span class="slash"></span></span></div>`;

  class CbVoiceOrb extends HTMLElement {
    static get observedAttributes() { return ['size', 'color', 'state', 'label', 'interactive']; }
    constructor() {
      super();
      this.attachShadow({ mode: 'open' }).appendChild(tpl.content.cloneNode(true));
      this.addEventListener('keydown', (e) => {
        if (!this.hasAttribute('interactive')) return;
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.click(); }
      });
    }
    connectedCallback() { this._sync(); }
    attributeChangedCallback() { this._sync(); }
    _sync() {
      const s = parseFloat(this.getAttribute('size'));
      if (s > 0) this.style.fontSize = s + 'px';
      const c = this.getAttribute('color');
      if (c) this.style.setProperty('--orb-color', c); else this.style.removeProperty('--orb-color');
      const st = this.getAttribute('state') || 'idle';
      this.setAttribute('aria-label', this.getAttribute('label') || LABELS[st] || LABELS.idle);
      const inter = this.hasAttribute('interactive') && this.getAttribute('interactive') !== 'false';
      if (!inter && this.hasAttribute('interactive')) this.removeAttribute('interactive');
      this.setAttribute('role', inter ? 'button' : 'img');
      if (inter) { if (!this.hasAttribute('tabindex')) this.tabIndex = 0; } else if (this.getAttribute('tabindex') === '0') this.removeAttribute('tabindex');
    }
    get state() { return this.getAttribute('state') || 'idle'; }
    set state(v) { this.setAttribute('state', v); }
  }
  customElements.define('cb-voice-orb', CbVoiceOrb);
})();
