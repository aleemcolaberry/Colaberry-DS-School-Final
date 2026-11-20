/* Colaberry — LIGHT animated intro bumper + outro end card (1080×1920).
   Full-color logo on a light ground; accents sampled from the logo
   (cherry red, leaf green, berry blue). Engine globals come from
   animations.jsx — load it first in the same x-import `from` list. */

const { Stage, Easing, clamp, useTime } = window;

const CBL = {
  bg: '#FAF9F6',
  ink: '#171717',
  red: '#E8232E',
  green: '#2F9E44',
  blue: '#33739B',
  gray500: '#6E6E6E',
  gray600: '#4A4A4A',
  display: "'Roboto', system-ui, -apple-system, 'Segoe UI', sans-serif",
  mono: "'Roboto Mono', ui-monospace, 'SF Mono', Menlo, monospace",
};

// Fetch an image once and swap in a data: URL so the serialized export svg
// still contains the logo.
function useDataURL(src) {
  const [url, setUrl] = React.useState(src);
  React.useEffect(() => {
    let cancelled = false;
    fetch(src)
      .then((r) => { if (!r.ok) throw 0; return r.blob(); })
      .then((b) => new Promise((res) => { const fr = new FileReader(); fr.onload = () => res(fr.result); fr.readAsDataURL(b); }))
      .then((u) => { if (!cancelled) setUrl(u); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [src]);
  return url;
}

const tw = (t, a, b, ease = Easing.easeOutCubic) => ease(clamp((t - a) / (b - a), 0, 1));
const pulse = (t, at) => Math.exp(-Math.pow((t - at) * 5, 2));

// tri-color brand rule, grows from center
function TriRule({ w, top, h = 10 }) {
  const seg = w / 3;
  return (
    <div style={{ position: 'absolute', left: 540 - w / 2, top, width: w, height: h,
      borderRadius: 99, overflow: 'hidden', display: 'flex' }}>
      <div style={{ width: seg, background: CBL.red }} />
      <div style={{ width: seg, background: CBL.green }} />
      <div style={{ width: seg, background: CBL.blue }} />
    </div>
  );
}

/* ── INTRO BUMPER — ~3s brand sting ────────────────────────────────────── */
function IntroLightContents() {
  const t = useTime();
  const logo = useDataURL('../../assets/logo/colaberry-horizontal.png');

  const logoIn = tw(t, 0.15, 0.55, Easing.easeOutBack);
  const logoFade = tw(t, 0.15, 0.45);
  const drift = 1 + 0.015 * clamp((t - 0.55) / 2.45, 0, 1);
  const ruleW = 150 * tw(t, 0.5, 0.85, Easing.easeOutQuart);
  const l1 = tw(t, 0.75, 1.15), l2 = tw(t, 0.95, 1.35), l3 = tw(t, 1.15, 1.55);
  const meta = tw(t, 1.0, 1.45);
  const fadeOut = tw(t, 2.72, 3.0, Easing.easeInQuad);

  const line = (p, text, y) => (
    <div style={{ position: 'absolute', left: 0, right: 0, top: y, textAlign: 'center',
      opacity: p, transform: `translateY(${(1 - p) * 34}px)`,
      fontFamily: CBL.display, fontWeight: 900, fontSize: 96, lineHeight: 1.1,
      letterSpacing: '-0.02em', color: CBL.ink }}>{text}</div>
  );

  return (
    <div style={{ position: 'absolute', inset: 0, background: CBL.bg, overflow: 'hidden' }}>
      {/* faint warm wash so the long white hold isn't sterile */}
      <div style={{ position: 'absolute', left: -200, top: 320, width: 1480, height: 900,
        background: 'radial-gradient(closest-side, rgba(232,35,46,0.05), rgba(232,35,46,0))' }} />

      <img src={logo} alt="" style={{ position: 'absolute', left: 210, top: 712, width: 660,
        opacity: logoFade, transform: `scale(${(0.82 + 0.18 * logoIn) * drift})`,
        transformOrigin: 'center' }} />

      <TriRule w={ruleW} top={928} />

      {line(l1, <span>Start Learning <span style={{ color: CBL.red }}>AI</span><br />for Free</span>, 1010)}

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 96, textAlign: 'center',
        opacity: meta, fontFamily: CBL.mono, fontSize: 26, letterSpacing: '0.12em',
        color: CBL.gray500 }}>www.myfreeaiclass.com</div>

      {/* fade to white for the cut into content */}
      <div style={{ position: 'absolute', inset: 0, background: '#fff', opacity: fadeOut,
        pointerEvents: 'none' }} />
    </div>
  );
}

/* ── OUTRO END CARD — 6s CTA hold ──────────────────────────────────────── */
function OutroLightContents() {
  const t = useTime();
  const logo = useDataURL('../../assets/logo/colaberry-horizontal.png');

  const logoIn = tw(t, 0.0, 0.4);
  const eyebrow = tw(t, 0.1, 0.45);
  const title = tw(t, 0.18, 0.6, Easing.easeOutQuart);
  const title2 = tw(t, 0.3, 0.72, Easing.easeOutQuart);
  const btn = tw(t, 0.6, 1.0, Easing.easeOutBack);
  const url = tw(t, 0.9, 1.3);
  const urlRule = tw(t, 1.0, 1.5, Easing.easeOutQuart);
  const tagline = tw(t, 1.1, 1.45);
  const btnPulse = 1 + 0.055 * (pulse(t, 1.8) + pulse(t, 4.0));
  const arrowX = 14 * (pulse(t, 1.8) + pulse(t, 4.0));
  const glow = 0.5 + 0.5 * Math.sin(t * 1.1);

  return (
    <div style={{ position: 'absolute', inset: 0, background: CBL.bg, overflow: 'hidden' }}>
      {/* ambient color washes — keep the long hold alive */}
      <div style={{ position: 'absolute', left: -320, top: -260, width: 1200, height: 1000,
        background: 'radial-gradient(closest-side, rgba(47,158,68,0.08), rgba(47,158,68,0))',
        opacity: 0.6 + 0.4 * glow, transform: `translateY(${(glow - 0.5) * 30}px)` }} />
      <div style={{ position: 'absolute', left: 200, top: 900, width: 1400, height: 1100,
        background: 'radial-gradient(closest-side, rgba(232,35,46,0.07), rgba(232,35,46,0))',
        opacity: 0.55 + 0.45 * glow, transform: `translateY(${(0.5 - glow) * 40}px)` }} />

      <img src={logo} alt="" style={{ position: 'absolute', left: 320, top: 300, width: 440,
        opacity: logoIn, transform: `translateY(${(1 - logoIn) * -20}px)` }} />

      <div style={{ position: 'absolute', left: 0, right: 0, top: 540, textAlign: 'center',
        opacity: eyebrow, transform: `translateY(${(1 - eyebrow) * 20}px)`,
        fontFamily: CBL.mono, fontSize: 32, letterSpacing: '0.2em', textTransform: 'uppercase',
        fontWeight: 700, color: CBL.green }}>Free · Live · Online</div>

      {/* headline — two lines */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 612, textAlign: 'center',
        opacity: title, transform: `translateY(${(1 - title) * 30}px)`,
        fontFamily: CBL.display, fontWeight: 900, fontSize: 106, lineHeight: 1.0,
        letterSpacing: '-0.025em', color: CBL.ink }}>Start Learning</div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 724, textAlign: 'center',
        opacity: title2, transform: `translateY(${(1 - title2) * 30}px)`,
        fontFamily: CBL.display, fontWeight: 900, fontSize: 106, lineHeight: 1.0,
        letterSpacing: '-0.025em', color: CBL.ink }}><span style={{ color: CBL.red }}>AI</span> for Free</div>

      {/* CTA button */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 900, textAlign: 'center',
        opacity: btn, transform: `translateY(${(1 - btn) * 44}px)` }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 26,
          background: CBL.red, color: '#fff',
          fontFamily: CBL.display, fontWeight: 900, fontSize: 62, padding: '38px 84px',
          borderRadius: 99, whiteSpace: 'nowrap',
          transform: `scale(${btnPulse})`, transformOrigin: 'center',
          boxShadow: '0 26px 70px rgba(232,35,46,0.35)' }}>Register Now
          <span style={{ display: 'inline-block', fontWeight: 900, fontSize: 62, lineHeight: 1,
            transform: `translateX(${arrowX}px)` }}>&rarr;</span>
        </span>
      </div>

      {/* URL */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 1140, textAlign: 'center',
        opacity: url, transform: `translateY(${(1 - url) * 20}px)` }}>
        <div style={{ fontFamily: CBL.display, fontWeight: 900, fontSize: 60, lineHeight: 1.1,
          letterSpacing: '-0.015em', color: CBL.ink }}>www.myfreeaiclass.com</div>
        <div style={{ width: 420 * urlRule, height: 6, borderRadius: 99, background: CBL.red,
          margin: '14px auto 0' }}></div>
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, top: 1330, textAlign: 'center', opacity: tagline }}>
        <TriRule w={150} top={-40} h={6} />
        <div style={{ fontFamily: CBL.display, fontWeight: 700, fontSize: 32, color: CBL.gray600,
          letterSpacing: '-0.01em' }}>Learn with Claude. Build through Colaberry.</div>
      </div>
    </div>
  );
}

/* ── OUTRO V2 — 2.5s micro end card for Reels/Shorts ───────────────────
   Rules: <3s, one CTA (the URL), high-contrast on-screen text for muted
   viewers, no "thanks for watching", no fade-out — the clip ends hard so
   a looped reel cuts straight back to the hook. ─────────────────────── */
function OutroLightV2Contents() {
  const t = useTime();
  const logo = useDataURL('../../assets/logo/colaberry-horizontal.png');

  const slab = tw(t, 0.0, 0.28, Easing.easeOutQuart);     // red block snaps in
  const l1 = tw(t, 0.12, 0.42, Easing.easeOutBack);
  const l2 = tw(t, 0.22, 0.52, Easing.easeOutBack);
  const url = tw(t, 0.42, 0.72, Easing.easeOutBack);
  const logoIn = tw(t, 0.5, 0.8);
  const arrow = 16 * (pulse(t, 1.2) + pulse(t, 2.0));
  const urlPulse = 1 + 0.03 * (pulse(t, 1.2) + pulse(t, 2.0));

  return (
    <div style={{ position: 'absolute', inset: 0, background: CBL.bg, overflow: 'hidden' }}>
      {/* full-bleed red slab — wipes up from the bottom, then holds */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 1920 * slab,
        background: CBL.red }} />

      {/* headline — white on red, two hard lines */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 520, textAlign: 'center',
        opacity: l1, transform: `translateY(${(1 - l1) * 60}px)`,
        fontFamily: CBL.display, fontWeight: 900, fontSize: 118, lineHeight: 1.0,
        letterSpacing: '-0.03em', color: '#fff' }}>Start learning</div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 644, textAlign: 'center',
        opacity: l2, transform: `translateY(${(1 - l2) * 60}px)`,
        fontFamily: CBL.display, fontWeight: 900, fontSize: 118, lineHeight: 1.0,
        letterSpacing: '-0.03em', color: '#fff' }}>AI for free</div>

      {/* the ONE call to action — the URL as a white card */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 860, textAlign: 'center',
        opacity: url, transform: `translateY(${(1 - url) * 50}px) scale(${urlPulse})`, transformOrigin: 'center' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 22,
          background: '#fff', color: CBL.ink,
          fontFamily: CBL.display, fontWeight: 900, fontSize: 60, padding: '34px 56px',
          borderRadius: 28, whiteSpace: 'nowrap', letterSpacing: '-0.015em',
          boxShadow: '0 30px 80px rgba(0,0,0,0.25)' }}>www.myfreeaiclass.com
          <span style={{ display: 'inline-block', color: CBL.red, lineHeight: 1,
            transform: `translateX(${arrow}px)` }}>&rarr;</span>
        </span>
      </div>

      {/* brand anchor — white logo chip, small, out of the way */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 1120, textAlign: 'center', opacity: logoIn }}>
        <span style={{ display: 'inline-block', background: '#fff', borderRadius: 18, padding: '18px 30px' }}>
          <img src={logo} alt="" style={{ display: 'block', width: 260 }} />
        </span>
      </div>
    </div>
  );
}

/* ── OUTRO V3 — 2.5s kinetic end card ───────────────────────────────────
   Three brand-color bands (red / green / blue, sampled from the logo) slam
   in from alternating sides carrying one word each; the URL then types
   itself into an address bar with a live caret. One CTA, hard end. ──── */
const V3_URL = 'www.myfreeaiclass.com';
function OutroLightV3Contents() {
  const t = useTime();
  const logo = useDataURL('../../assets/logo/colaberry-horizontal.png');

  const b1 = tw(t, 0.0, 0.32, Easing.easeOutQuart);
  const b2 = tw(t, 0.1, 0.42, Easing.easeOutQuart);
  const b3 = tw(t, 0.2, 0.52, Easing.easeOutQuart);
  const w1 = tw(t, 0.16, 0.46, Easing.easeOutBack);
  const w2 = tw(t, 0.26, 0.56, Easing.easeOutBack);
  const w3 = tw(t, 0.36, 0.66, Easing.easeOutBack);
  const bar = tw(t, 0.5, 0.8, Easing.easeOutBack);
  const typeP = clamp((t - 0.72) / 0.75, 0, 1);
  const typed = V3_URL.slice(0, Math.round(typeP * V3_URL.length));
  const caretOn = typeP < 1 ? 1 : (Math.floor(t * 3) % 2 === 0 ? 1 : 0);
  const go = tw(t, 1.5, 1.75, Easing.easeOutBack);
  const goX = 14 * (pulse(t, 1.85) + pulse(t, 2.3));
  const logoIn = tw(t, 0.9, 1.2);
  const breathe = 1 + 0.01 * Math.sin(t * 2.2);

  const band = (p, wp, top, color, word, fromLeft) => (
    <div style={{ position: 'absolute', left: 0, width: 1080, top, height: 250,
      background: color, display: 'flex', alignItems: 'center',
      justifyContent: fromLeft ? 'flex-start' : 'flex-end', padding: '0 160px 0 76px',
      transform: `translateX(${(1 - p) * (fromLeft ? -1080 : 1080)}px)` }}>
      <span style={{ fontFamily: CBL.display, fontWeight: 900, fontSize: 144, lineHeight: 1,
        letterSpacing: '-0.04em', color: '#fff', whiteSpace: 'nowrap', opacity: wp,
        display: 'inline-block',
        transform: `translateX(${(1 - wp) * (fromLeft ? -90 : 90)}px)` }}>{word}</span>
    </div>
  );

  return (
    <div style={{ position: 'absolute', inset: 0, background: CBL.bg, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${breathe})`, transformOrigin: 'center' }}>
        {band(b1, w1, 360, CBL.red, 'START', true)}
        {band(b2, w2, 610, CBL.green, 'LEARNING AI', false)}
        {band(b3, w3, 860, CBL.blue, 'FOR FREE', true)}
      </div>

      {/* address bar — the ONE call to action */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 1200, textAlign: 'center',
        opacity: bar, transform: `translateY(${(1 - bar) * 50}px)` }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 16,
          background: '#fff', border: `4px solid ${CBL.ink}`, borderRadius: 99,
          padding: '24px 36px 24px 48px', boxShadow: '0 24px 60px rgba(23,23,23,0.16)' }}>
          <span style={{ fontFamily: CBL.mono, fontWeight: 700, fontSize: 48, lineHeight: 1,
            letterSpacing: '-0.01em', color: CBL.ink, whiteSpace: 'pre', textAlign: 'left',
            display: 'inline-block', minWidth: 620 }}>{typed}<span style={{ display: 'inline-block',
              width: 6, height: 48, background: CBL.red, marginLeft: 4, verticalAlign: 'bottom',
              opacity: caretOn }} /></span>
          <span style={{ display: 'inline-grid', placeItems: 'center', width: 76, height: 76,
            borderRadius: 99, background: CBL.red, color: '#fff', flex: 'none',
            fontFamily: CBL.display, fontWeight: 900, fontSize: 46, lineHeight: 1,
            opacity: go, transform: `scale(${0.6 + 0.4 * go}) translateX(${goX}px)` }}>&rarr;</span>
        </div>
      </div>

      <img src={logo} alt="" style={{ position: 'absolute', left: 420, top: 250, width: 240,
        opacity: logoIn }} />
    </div>
  );
}

/* ── Root — one Stage per clip, switched by prop ───────────────────────── */
function IntroOutroLightAnimation({ clip = 'intro' }) {
  if (clip === 'outro-v3') {
    return (
      <Stage key="outro-v3" width={1080} height={1920} duration={2.5} background={CBL.bg}
        persistKey="cb-outro-light-v3-anim">
        <OutroLightV3Contents />
      </Stage>
    );
  }
  if (clip === 'outro-v2') {
    return (
      <Stage key="outro-v2" width={1080} height={1920} duration={2.5} background={CBL.red}
        persistKey="cb-outro-light-v2-anim">
        <OutroLightV2Contents />
      </Stage>
    );
  }
  if (clip === 'outro') {
    return (
      <Stage key="outro" width={1080} height={1920} duration={6} background={CBL.bg}
        persistKey="cb-outro-light-anim">
        <OutroLightContents />
      </Stage>
    );
  }
  return (
    <Stage key="intro" width={1080} height={1920} duration={3} background={CBL.bg}
      persistKey="cb-intro-light-anim">
      <IntroLightContents />
    </Stage>
  );
}

window.IntroOutroLightAnimation = IntroOutroLightAnimation;
