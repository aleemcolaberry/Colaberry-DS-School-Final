/* accelerator.html — page App (was the inline <script type="text/babel"> block). Compiled by _build.mjs → dist/accelerator.app.js */
// Strip any site chrome carried over from in-app (preview) navigation —
  // no-op on a normal hard page load; prevents a duplicate nav/footer.
  document.querySelectorAll('#siteNav, #siteMenu, .snav-menu, .site-mmenu, body > #site-nav, body > #site-footer').forEach((e) => e.remove());
  document.querySelectorAll('body > .aw-footer').forEach((e) => e.remove());

  const { SiteNav, HomeHero, HomeMarquee } = window;
  const { HomeStats, HomePaths, HomeHow, HomePhoto, HomeCertificate, HomeLogos, HomeTestimonials, HomePricing, HomeFinal, HomeFrontier } = window;
  const { BgPartner, AwFooter } = window;
  const { useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor } = window;

  // Accent presets — each maps a swatch hex to the Anthropic-token trio it
  // drives in the partnership section, plus the shared glow accent.
  const ACCENTS = {
    '#D97757': { name: null, ink: '#B0552F', tint: '#FBF4F0' }, // Clay (default — no override)
    '#FB2832': { name: 'cherry', ink: '#C20E1E', tint: '#FEEFEF' },
    '#367895': { name: 'berry', ink: '#265A72', tint: '#EAF2F5' },
    '#5BA63C': { name: 'leaf', ink: '#356A24', tint: '#EEF6E9' },
  };
  const ACCENT_SWATCHES = Object.keys(ACCENTS);

  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "layout": "editorial",
    "mood": "contrast",
    "accent": "#D97757"
  }/*EDITMODE-END*/;

  function App() {
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
  // Mount only when every part has registered, from whichever copy runs first, and never twice:
  // the design-system compiler inlines this file into _ds_bundle.js too, which loads before the parts.
  const ACCEL_PARTS = ["SiteNav","HomeHero","HomeMarquee","HomePaths","HomeStats","HomeHow","HomeFrontier","HomePhoto","BgPartner","HomeCertificate","HomeLogos","HomeTestimonials","HomeFinal","AwFooter","useTweaks","TweaksPanel","TweakSection","TweakRadio","TweakColor"];
  if (typeof __ds_ns === 'undefined' && document.getElementById('root') && document.getElementById('root').getAttribute('data-page') === 'accelerator' && !window.__cbPageMounted && ACCEL_PARTS.every((n) => typeof window[n] === 'function')) {
    window.__cbPageMounted = 'accelerator';
    ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
  }
