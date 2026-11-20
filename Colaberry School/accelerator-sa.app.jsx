/* accelerator-standalone-src.html — page App for the standalone bundle (resource paths via __R, guarded mount).
   Compiled by _build.mjs → dist/accelerator-sa.app.js. The live page uses accelerator.app.jsx. */
// Strip any site chrome carried over from in-app (preview) navigation —
  // no-op on a normal hard page load; prevents a duplicate nav/footer.
  document.querySelectorAll('#siteNav, #siteMenu, .snav-menu, .site-mmenu, body > #site-nav, body > #site-footer').forEach((e) => e.remove());
  document.querySelectorAll('body > .aw-footer').forEach((e) => e.remove());

  // Parts are read from window INSIDE App (render time), and the mount waits until every
  // part has registered: in the bundled standalone the inline App can be run before the
  // babel parts have finished (useTweaks/TweaksPanel undefined → React #130), so a too-early
  // run must never crash — it just retries.
  const ACCEL_PARTS = ['SiteNav', 'HomeHero', 'HomeMarquee', 'HomePaths', 'HomeStats', 'HomeHow', 'HomeFrontier', 'HomePhoto', 'BgPartner', 'HomeCertificate', 'HomeLogos', 'HomeTestimonials', 'HomeFinal', 'AwFooter', 'useTweaks', 'TweaksPanel', 'TweakSection', 'TweakRadio', 'TweakColor'];

  // Accent presets — each maps a swatch hex to the Anthropic-token trio it
  // drives in the partnership section, plus the shared glow accent.
  const ACCENTS = {
    '#D97757': { name: null, ink: '#B0552F', tint: '#FBF4F0' }, // Clay (default — no override)
    '#FB2832': { name: 'cherry', ink: '#C20E1E', tint: '#FEEFEF' },
    '#367895': { name: 'berry', ink: '#265A72', tint: '#EAF2F5' },
    '#5BA63C': { name: 'leaf', ink: '#356A24', tint: '#EEF6E9' },
  };
  const ACCENT_SWATCHES = Object.keys(ACCENTS);

  // Plain defaults (no EDITMODE markers): the standalone is a shareable export, not a host-edited page.
  const TWEAK_DEFAULTS = {
    "layout": "editorial",
    "mood": "contrast",
    "accent": "#D97757"
  };

  function App() {
    const { SiteNav, HomeHero, HomeMarquee, HomePaths, HomeStats, HomeHow, HomeFrontier, HomePhoto, BgPartner, HomeCertificate, HomeLogos, HomeTestimonials, HomeFinal, AwFooter } = window;
    const { useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor } = window;
    const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
    const bento = t.layout === 'bento';
    const ink = t.mood === 'ink';
    const accent = ACCENTS[t.accent] || ACCENTS['#D97757'];
    // Non-default accent → override Anthropic trio + shared glow var.
    const accentVars = accent.name ? {
      '--anthropic': t.accent, '--anthropic-ink': accent.ink,
      '--anthropic-tint': accent.tint, '--feat-accent': t.accent,
    } : null;
    const accentName = accent.name;

    React.useEffect(() => {
      const draw = () => { if (window.lucide && window.lucide.createIcons) window.lucide.createIcons(); };
      draw();
      const t = setInterval(draw, 400);
      const stop = setTimeout(() => clearInterval(t), 3000);

      let ctx = null, cancelVis = () => {};
      if (window.gsap && window.ScrollTrigger) {
        cancelVis = awWhenVisible(() => {
          ctx = gsap.context(() => {
            document.querySelectorAll('[data-rv-group]').forEach((group) => {
              const els = group.querySelectorAll('[data-rv]');
              if (!els.length) return;
              // Cards cascade in one by one — bigger rise + clear per-item beat.
              gsap.from(els, {
                y: 44, opacity: 0, duration: .9, ease: 'power3.out',
                stagger: { each: .22 },
                clearProps: 'transform,opacity', // hand style control back to CSS so :hover transforms keep working
                scrollTrigger: { trigger: group, start: 'top 88%', once: true },
              });
            });
            ScrollTrigger.refresh();
          });
        });
      }
      return () => { clearInterval(t); clearTimeout(stop); cancelVis(); if (ctx) ctx.revert(); };
    }, []);

    // Keep ScrollTrigger positions correct after a layout tweak reflows the page.
    React.useEffect(() => {
      if (window.ScrollTrigger) { const id = setTimeout(() => ScrollTrigger.refresh(), 260); return () => clearTimeout(id); }
    }, [bento, ink, t.accent]);

    return (
      <React.Fragment>
        <a className="aw-skip" href="#main">Skip to content</a>
        <SiteNav active="accelerator" />
        <main id="main">
          <HomeHero />
          <HomeMarquee />
          <HomePaths />
          <HomeStats />
          <HomeHow />
          <HomeFrontier />
          <HomePhoto />
          <BgPartner bento={bento} accentVars={accentVars} accentName={accentName} />
          <HomeCertificate bento={bento} mood={ink ? 'ink' : null} accentVars={accentVars} accentName={accentName} />
          <HomeLogos />
          <HomeTestimonials />
          <HomeFinal />
        </main>
        <AwFooter />
        <TweaksPanel title="Tweaks">
          <TweakSection label="Credential sections" />
          <TweakRadio label="Layout" value={t.layout}
            options={[{ value: 'editorial', label: 'Editorial' }, { value: 'bento', label: 'Bento' }]}
            onChange={(v) => setTweak('layout', v)} />
          <TweakRadio label="Mood" value={t.mood}
            options={[{ value: 'contrast', label: 'Contrast' }, { value: 'ink', label: 'Unified ink' }]}
            onChange={(v) => setTweak('mood', v)} />
          <TweakSection label="Accent" />
          <TweakColor label="Partnership accent" value={t.accent}
            options={ACCENT_SWATCHES}
            onChange={(v) => setTweak('accent', v)} />
        </TweaksPanel>
      </React.Fragment>
    );
  }
  // Mount once, from the page's own deferred script only: by then every part has registered (same
  // load order as the live page). No polling — a copy of this file evaluated elsewhere (the
  // design-system compiler inlines it into _ds_bundle.js) must stay inert, not win the race later.
  (function mountAccelerator() {
    const el = document.getElementById('root');
    if (typeof __ds_ns !== 'undefined' || !el || el.getAttribute('data-page') !== 'accelerator' || window.__cbPageMounted) return; // never from the DS bundle
    const missing = ACCEL_PARTS.filter((n) => typeof window[n] !== 'function');
    if (missing.length) { console.warn('[accelerator] not mounting from this copy — parts not loaded yet: ' + missing.join(', ')); return; }
    window.__cbPageMounted = 'accelerator-standalone';
    ReactDOM.createRoot(el).render(<App/>);
  })();
