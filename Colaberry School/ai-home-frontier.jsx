/* Frontier / Forward Deployed Engineer (FDE) — role section (accelerator home). v3.
   Built on the "How it works" spine directly above: three equal cards — number + kicker →
   h3 (one coloured word) → one paragraph → dashed rule → a blueprint FIG. with caption.
   01 the role (FIG. 01 design → ship → run) · 02 the outcome (FIG. 02 the demand / supply gap) ·
   03 how to start (two free doors, ONE CTA — "Start for free" = the same free start as the nav CTA and the hero
   lead card: scrolls to the hero form when the page has one (siteStartClick), else /start-free).
   Markup carries the FINAL state; GSAP draws each figure in once on scroll and is skipped
   under reduced motion / without GSAP. Ali's feedback of 21 Oct 2026 applied. Copy carries no em/en dashes. */
const { Button: FdeBtn } = window.ColaberryDesignSystem_098454;
const FDE_START_URL = 'https://training.colaberry.com/start-free';
function fdeStartClick(e) { if (typeof siteStartClick === 'function') siteStartClick(e); }
const fdeDraw = { pathLength: '1', style: { strokeDasharray: 1 } };

/* FIG. 01 — the role: DESIGN (the system) → SHIP (build · test · deploy) → RUN (live in production) */
function FdeFigRole() {
  const line = 'var(--neutral-300)', ink = 'var(--neutral-500)', c = 'var(--blue-500)';
  return (
    <AwIlloFrame label="FIG. 01: DESIGN → SHIP → RUN">
      <text x="14" y="44" className="aw-illo__t">DESIGN</text>
      <g className="fde-f1__sys">
        <rect x="14" y="58" width="90" height="72" rx="10" stroke={c} strokeWidth="2.5" />
        <rect x="26" y="70" width="40" height="10" rx="5" stroke={ink} strokeWidth="2" className="fde-f1__pill" />
        <rect x="26" y="89" width="58" height="10" rx="5" stroke={ink} strokeWidth="2" className="fde-f1__pill" />
        <rect x="26" y="108" width="48" height="10" rx="5" stroke={c} strokeWidth="2.5" className="fde-f1__pill" />
        <circle cx="92" cy="70" r="3" fill={c} />
      </g>
      <path d="M104 94 H 136" stroke={c} strokeWidth="2" strokeDasharray="3 6" strokeLinecap="round" className="aw-illo__dash fde-f1__flow" />
      <text x="136" y="44" className="aw-illo__t">SHIP</text>
      <g className="fde-f1__ship">
        <rect x="136" y="72" width="62" height="44" rx="10" stroke={ink} strokeWidth="2" />
        <path d="M154 94 l8 8 16 -18" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="fde-f1__check" {...fdeDraw} />
      </g>
      <path d="M198 94 H 230" stroke={c} strokeWidth="2" strokeDasharray="3 6" strokeLinecap="round" className="aw-illo__dash fde-f1__flow" />
      <text x="230" y="44" className="aw-illo__t">RUN</text>
      <g className="fde-f1__run">
        <circle cx="258" cy="94" r="28" stroke={ink} strokeWidth="2" />
        <circle cx="258" cy="94" r="16" stroke={line} strokeWidth="2" strokeDasharray="2 5" className="aw-illo__dash" />
        <circle cx="258" cy="94" r="5" fill={c} className="fde-f1__live" />
      </g>
      <text x="14" y="164" className="aw-illo__t">TRAFFIC IN PRODUCTION</text>
      <path d="M14 206 C 70 204 110 196 150 186 S 240 160 286 150" stroke={c} strokeWidth="2.5" strokeLinecap="round" className="fde-f1__traffic" {...fdeDraw} />
      <line x1="14" y1="216" x2="286" y2="216" stroke={line} strokeWidth="2" />
      <circle cx="286" cy="150" r="4" fill={c} className="fde-f1__live" />
    </AwIlloFrame>
  );
}

/* FIG. 02 — the outcome: companies deploying AI climb fast, people who can do it end to end climb slowly */
function FdeFigGap() {
  const line = 'var(--neutral-300)', ink = 'var(--neutral-500)', c = 'var(--red-500)';
  return (
    <AwIlloFrame label="FIG. 02: DEMAND VS. PEOPLE WHO CAN DO IT">
      <text x="14" y="30" className="aw-illo__t" style={{ fill: 'var(--text-brand)' }}>COMPANIES DEPLOYING AI</text>
      <g stroke={line} strokeWidth="2" strokeDasharray="3 6">
        <line x1="14" y1="70" x2="286" y2="70" /><line x1="14" y1="110" x2="286" y2="110" /><line x1="14" y1="150" x2="286" y2="150" />
      </g>
      <line x1="14" y1="190" x2="286" y2="190" stroke={ink} strokeWidth="2" />
      <path d="M24 180 C 110 172 200 110 280 44 L 280 150 C 200 162 110 172 24 180 Z" fill={c} fillOpacity=".1" className="fde-f2__area" />
      <path d="M24 180 C 110 172 200 162 280 150" stroke={ink} strokeWidth="2.5" strokeLinecap="round" className="fde-f2__supply" {...fdeDraw} />
      <path d="M24 180 C 110 172 200 110 280 44" stroke={c} strokeWidth="3" strokeLinecap="round" className="fde-f2__demand" {...fdeDraw} />
      <circle cx="24" cy="180" r="3.5" fill={ink} className="fde-f2__dot" />
      <circle cx="280" cy="150" r="4" fill={ink} className="fde-f2__dot" />
      <circle cx="280" cy="44" r="5" fill={c} className="fde-f2__dot" />
      <g className="fde-f2__tag">
        <rect x="190" y="92" width="72" height="22" rx="11" fill="var(--surface-card)" stroke={c} strokeWidth="2" />
        <text x="203" y="107" className="aw-illo__t" style={{ fill: 'var(--text-brand)' }}>THE GAP</text>
      </g>
      <text x="14" y="214" className="aw-illo__t">PEOPLE WHO CAN DO IT END TO END</text>
    </AwIlloFrame>
  );
}

/* FIG. 03 — how to start: two free doors, one CTA */
function FdeDoors() {
  return (
    <div className="fde-doors">
      <div className="fde-door" style={{ '--_bg': 'var(--status-info-bg)', '--_fg': 'var(--status-info-fg)' }}>
        <div className="fde-door__row">
          <span className="fde-door__ic"><I n="monitor" s={20} /></span>
          <div className="fde-door__txt"><h4 className="fde-door__h">Come to a free Open House</h4><span className="fde-door__meta">90 minutes, live online, meet the team</span></div>
        </div>
      </div>
      <div className="fde-door" style={{ '--_bg': 'var(--status-success-bg)', '--_fg': 'var(--status-success-fg)' }}>
        <div className="fde-door__row">
          <span className="fde-door__ic"><I n="rocket" s={20} /></span>
          <div className="fde-door__txt"><h4 className="fde-door__h">Join the AI Accelerator for free</h4><span className="fde-door__meta">Start today, hands-on with Claude, no card needed</span></div>
        </div>
      </div>
      <FdeBtn size="lg" fullWidth as="a" href={FDE_START_URL} onClick={fdeStartClick} trailingIcon={<I n="arrow-right" s={18} />}>Start for free</FdeBtn>
      <span className="aw-illo__cap fde-doors__cap">FIG. 03: EITHER WAY, YOU TRAIN AS AN FDE FROM DAY ONE</span>
    </div>
  );
}

function HomeFrontier() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!window.gsap || !window.ScrollTrigger || reduce) return; // the markup already shows the final state
    const ctx = gsap.context(() => {
      const once = (trigger, start) => ({ scrollTrigger: { trigger, start: start || 'top 80%', once: true } });
      // FIG. 01 — the system assembles, the flow connects, the build passes, production goes live, traffic climbs
      const f1 = root.querySelector('.fde-f1__sys');
      if (f1) {
        gsap.timeline({ ...once(f1.closest('.aw-illo')), defaults: { ease: 'power3.out', transformOrigin: '50% 50%' } })
          .from('.fde-f1__sys', { opacity: 0, scale: .9, duration: .5 })
          .from('.fde-f1__pill', { opacity: 0, x: -8, duration: .35, stagger: .1 }, '-=.25')
          .from('.fde-f1__flow', { opacity: 0, duration: .4, stagger: .35 }, '-=.1')
          .from('.fde-f1__ship', { opacity: 0, scale: .9, duration: .45 }, '-=.6')
          .from('.fde-f1__check', { strokeDashoffset: 1, duration: .45, ease: 'power2.inOut' }, '-=.2')
          .from('.fde-f1__run', { opacity: 0, scale: .9, duration: .45 }, '-=.35')
          .from('.fde-f1__traffic', { strokeDashoffset: 1, duration: 1.1, ease: 'power2.inOut' }, '-=.2')
          .fromTo('.fde-f1__live', { scale: 1 }, { scale: 1.7, duration: .55, repeat: 3, yoyo: true, ease: 'sine.inOut', clearProps: 'transform' }, '-=.8');
      }
      // FIG. 02 — supply draws first, demand pulls away, the gap fills, the label lands
      const f2 = root.querySelector('.fde-f2__demand');
      if (f2) {
        gsap.timeline({ ...once(f2.closest('.aw-illo')), defaults: { ease: 'power2.inOut' } })
          .from('.fde-f2__supply', { strokeDashoffset: 1, duration: 1.1 })
          .from('.fde-f2__demand', { strokeDashoffset: 1, duration: 1.2 }, '-=.9')
          .from('.fde-f2__dot', { scale: 0, transformOrigin: '50% 50%', duration: .35, stagger: .1, ease: 'back.out(2)' }, '-=.3')
          .from('.fde-f2__area', { opacity: 0, duration: .6 }, '-=.3')
          .from('.fde-f2__tag', { opacity: 0, y: 6, duration: .4, ease: 'power3.out' }, '-=.3');
      }
      // FIG. 03 — the two doors rise in, then the CTA and caption
      const f3 = root.querySelector('.fde-doors');
      if (f3) {
        gsap.timeline({ ...once(f3, 'top 85%'), defaults: { ease: 'power3.out' } })
          .from('.fde-door', { opacity: 0, y: 18, duration: .5, stagger: .14, clearProps: 'transform,opacity' })
          .from('.fde-doors__cap', { opacity: 0, duration: .4, clearProps: 'opacity' }, '-=.2');
      }
    }, root);
    return () => ctx.revert();
  }, []);

  const steps = [
    { c: 'var(--blue-500)', n: '1', kick: 'The role', h: <React.Fragment>Design it. Ship it. <em>Keep it running</em></React.Fragment>,
      p: 'An FDE designs the AI system, ships it, and keeps it running in production, for real businesses, not demos.', fig: <FdeFigRole /> },
    { c: 'var(--red-500)', n: '2', kick: 'The outcome', h: <React.Fragment>Join, and you become <em>highly in demand</em></React.Fragment>,
      p: 'Far more companies are deploying AI than there are people who can do it end to end. Train for this role and you are one of the few they are all competing to hire.', fig: <FdeFigGap /> },
    { c: 'var(--green-600)', n: '3', kick: 'How to start', h: <React.Fragment>Two ways in. <em>Both free</em></React.Fragment>,
      p: 'Pick the door that fits you: see the program first, or start learning today.', fig: <FdeDoors /> },
  ];
  return (
    <section className="fde" id="frontier" data-screen-label="Frontier / Forward Deployed Engineer (FDE)" data-rv-group ref={ref}>
      <div className="fde__inner">
        <div className="fde__head" data-rv>
          <span className="aw-kicker aw-kicker--red fde__kicker"><span className="aw-kicker__n">03</span>Frontier / Forward Deployed Engineer (FDE)</span>
          <h2 className="aw-h2">Become an FDE.<br className="fde-br" /><span className="is-red">Become highly in demand</span></h2>
          <p className="fde__lead">FDEs put the newest AI models and agents to work inside real companies. <strong>Join Colaberry</strong> and you train for that role from day one, free to start.</p>
        </div>
        <div className="fde-steps">
          {steps.map((s, i) => (
            <div className="fde-step" data-rv key={i} style={{ '--_c': s.c, '--_ct': textTone(s.c) }}>
              <div className="fde-step__head"><span className="fde-step__num">{s.n}</span><span className="fde-step__kick">{s.kick}</span></div>
              <h3>{s.h}</h3>
              <p>{s.p}</p>
              <div className="fde-step__media">{s.fig}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { HomeFrontier });
