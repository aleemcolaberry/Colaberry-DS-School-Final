/* working-professionals.html — page App (was the inline <script type="text/babel"> block; JSX already expanded to React.createElement). Compiled by _build.mjs → dist/working-professionals.app.js */
const {
  WpHero,
  WpMarquee,
  WpStats,
  WpGap,
  WpWho,
  WpPillars,
  WpExplore,
  WpTransformation,
  WpDifferent,
  WpPricing,
  WpFinal,
  AwFooter,
  WP_DATE
} = window;
function App() {
  React.useEffect(() => {
    const draw = () => {
      if (window.lucide && window.lucide.createIcons) window.lucide.createIcons();
    };
    draw();
    const t = setInterval(draw, 400);
    const stop = setTimeout(() => clearInterval(t), 3000);
    let ctx = null,
      cancelVis = () => {};
    if (window.gsap && window.ScrollTrigger) {
      cancelVis = awWhenVisible(() => {
        ctx = gsap.context(() => {
          document.querySelectorAll('[data-rv-group]').forEach(group => {
            const els = group.querySelectorAll('[data-rv]');
            if (!els.length) return;
            // Cards cascade in one by one — bigger rise + clear per-item beat.
            gsap.from(els, {
              y: 44,
              opacity: 0,
              duration: .9,
              ease: 'power3.out',
              stagger: {
                each: .22
              },
              clearProps: 'transform,opacity',
              // hand style control back to CSS so :hover transforms keep working
              scrollTrigger: {
                trigger: group,
                start: 'top 88%',
                once: true
              }
            });
          });
          ScrollTrigger.refresh();
        });
      });
    }
    return () => {
      clearInterval(t);
      clearTimeout(stop);
      cancelVis();
      if (ctx) ctx.revert();
    };
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("a", {
    className: "aw-skip",
    href: "#main"
  }, "Skip to content"), /*#__PURE__*/React.createElement(SiteNav, {
    campaign: true
  }), /*#__PURE__*/React.createElement("main", {
    id: "main"
  }, /*#__PURE__*/React.createElement(WpHero, null), /*#__PURE__*/React.createElement(WpMarquee, null), /*#__PURE__*/React.createElement(WpGap, null), /*#__PURE__*/React.createElement(WpStats, null), /*#__PURE__*/React.createElement(WpWho, null), /*#__PURE__*/React.createElement(WpPillars, null), /*#__PURE__*/React.createElement(WpExplore, null), /*#__PURE__*/React.createElement(WpTransformation, null), /*#__PURE__*/React.createElement(WpDifferent, null), /*#__PURE__*/React.createElement(WpFinal, null)), /*#__PURE__*/React.createElement(AwFooter, {
    campaign: true,
    tagline: "Learn with Claude. Build through Colaberry. Deploy in the real world. Helping working professionals turn AI into a practical work skill since 2012.",
    dateLabel: 'Free Open House \u00b7 live online'
  }));
}
  // Mount only when every part has registered, from whichever copy runs first, and never twice:
  // the design-system compiler inlines this file into _ds_bundle.js too, which loads before the parts.
  var __cbParts = ["SiteNav","WpHero","WpMarquee","WpGap","WpStats","WpWho","WpPillars","WpExplore","WpTransformation","WpDifferent","WpFinal","AwFooter"];
  if (typeof __ds_ns === 'undefined' && document.getElementById('root') && document.getElementById('root').getAttribute('data-page') === 'working-professionals' && !window.__cbPageMounted && __cbParts.every(function (n) { return typeof window[n] === 'function'; })) {
    window.__cbPageMounted = 'working-professionals';
    ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
  }