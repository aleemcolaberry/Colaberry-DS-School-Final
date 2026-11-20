/* AI Systems Architect Accelerator — HOME: Nav, Hero (+ Open House reg card), Marquee */
const { Button: HomeBtn, Input: HomeInput, Avatar: HomeAvatar } = window.ColaberryDesignSystem_098454;

const REGISTER_URL = 'https://form.jotform.com/251193437881463';

/* High-intent lead card for the home hero. Name + email + US mobile —
   prefills the JotForm, which redirects to thank-you.html. */
function HomeRegCard() {
  const [form, setForm] = React.useState({ name: '', email: '', phone: '', optin: false });
  const [errors, setErrors] = React.useState({});
  const [busy, setBusy] = React.useState(false);

  const set = (k) => (e) => {
    let v = e.target.value;
    if (k === 'phone') {
      const d = v.replace(/\D/g, '').replace(/^1/, '').slice(0, 10);
      v = d.length > 6 ? '(' + d.slice(0, 3) + ') ' + d.slice(3, 6) + '-' + d.slice(6)
        : d.length > 3 ? '(' + d.slice(0, 3) + ') ' + d.slice(3)
        : d;
    }
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((er) => (er[k] ? { ...er, [k]: null } : er));
  };

  const submit = (e) => {
    e.preventDefault();
    const digits = form.phone.replace(/\D/g, '');
    const er = {};
    if (!form.name.trim()) er.name = 'Please add your name.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim())) er.email = form.email.trim() ? 'Enter a valid email address.' : 'Please add your email.';
    if (digits.length !== 10) er.phone = form.phone.trim() ? 'Enter a 10-digit US mobile number.' : 'Please add your mobile number.';
    if (Object.keys(er).length) { setErrors(er); const k = ['name', 'email', 'phone'].find((x) => er[x]); const el = document.getElementById('lc-' + k); if (el) el.focus(); return; }
    setBusy(true);
    const q = new URLSearchParams({ name: form.name.trim(), email: form.email.trim(), phone: '+1' + digits, optin: form.optin ? 'yes' : 'no' });
    window.location.href = REGISTER_URL + '?' + q.toString();
  };
  React.useEffect(() => { if (window.lucide && window.lucide.createIcons) window.lucide.createIcons(); }, []);


  const fld = (k, label, ic, input, prefix) => (
    <div className="lead-card__group">
      <label className="cb-sr" htmlFor={'lc-' + k}>{label}</label>
      <div className="lead-card__field" data-invalid={errors[k] ? 'true' : undefined}>
        <span className="lead-card__field-ic"><I n={ic} s={18} /></span>
        {prefix ? <span className="lead-card__prefix">{prefix}</span> : null}
        {input}
      </div>
      {errors[k] ? <p className="lead-card__err" id={'lc-' + k + '-err'} role="alert"><I n="alert-circle" s={14} />{errors[k]}</p> : null}
    </div>
  );
  const aria = (k) => ({ id: 'lc-' + k, 'aria-invalid': errors[k] ? 'true' : undefined, 'aria-describedby': errors[k] ? 'lc-' + k + '-err' : undefined });

  return (
    <div className="lead-card">
      <div className="lead-card__top">
        <span className="lead-card__live"><span className="lead-card__dot" />Start learning today</span>
        <span className="lead-card__badge"><I n="credit-card" s={13} />No card needed</span>
      </div>
      <div className="lead-card__body">
        <h2 className="lead-card__h">Start learning AI for free</h2>
        <p className="lead-card__sub">Free, hands-on lessons in building with Claude. No card, no pressure — start now, then choose your path.</p>
        <form className="lead-card__form" onSubmit={submit} noValidate>
          {fld('name', 'Full name', 'user', <input className="lead-card__input" {...aria('name')} type="text" autoComplete="name" name="name" placeholder="Full name" value={form.name} onChange={set('name')} />)}
          {fld('email', 'Email', 'mail', <input className="lead-card__input" {...aria('email')} type="email" inputMode="email" autoComplete="email" name="email" placeholder="Email address" value={form.email} onChange={set('email')} />)}
          {fld('phone', 'US mobile', 'smartphone', <input className="lead-card__input" {...aria('phone')} type="tel" inputMode="tel" autoComplete="tel-national" name="phone" placeholder="US mobile number" value={form.phone} onChange={set('phone')} />, '+1')}
          <label className="lead-card__optin">
            <input type="checkbox" checked={form.optin} onChange={(e) => setForm((f) => ({ ...f, optin: e.target.checked }))} />
            <span>Send me course updates and AI resources. Unsubscribe any time.</span>
          </label>
          <Magnetic>
            <HomeBtn type="submit" size="lg" fullWidth disabled={busy} trailingIcon={<I n="arrow-right" s={18} />}>{busy ? 'Getting you started…' : 'Start learning for free'}</HomeBtn>
          </Magnetic>
        </form>
        <p className="lead-card__fine"><I n="shield-check" s={14} /><span>Free to start · join <b>5,000+</b> alumni · no spam, ever</span></p>
      </div>
    </div>
  );
}

function HomeNav() {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className="aw-nav" data-scrolled={scrolled}>
      <div className="aw-nav__inner">
        <a className="cbx-logo" href="#top" style={{ display: 'inline-flex', alignItems: 'center', gap: 14, textDecoration: 'none' }}>
          <Logo />
          <span style={{ width: 1, height: 26, background: 'var(--border-default)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, lineHeight: 1.2, letterSpacing: '.02em', color: 'var(--text-muted)' }}>AI Systems Architect<br/>Accelerator</span>
        </a>
        <nav className="aw-nav__links" aria-label="Primary">
          <a href="#paths">Accelerator</a>
          <a href="our-story.html">Our Story</a>
          <a href="student-projects.html">Student Projects</a>
          <a href="events.html">Events</a>
          <a href="blog.html">Blog</a>
          <a href="faq.html">FAQ</a>
          <a href="contact.html">Contact</a>
        </nav>
        <div className="aw-nav__meta">
          <a className="bg-navpartner" href="#partner"><span className="bg-navpartner__g"><AnthropicGlyph s={14} color="var(--anthropic)" /></span>Anthropic Partner</a>
          <HomeBtn size="sm" as="a" href={REGISTER_URL} trailingIcon={<I n="arrow-right" s={15} />}>Join the free Open House</HomeBtn>
        </div>
      </div>
    </header>
  );
}

function HomeHero() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!window.gsap || !ref.current) return;
    // Quiet entrance (CLAUDE.md §6.2): one short fade + 10px rise, no headline mask, no cascade;
    // skipped entirely under reduced motion — the markup already shows the final state.
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let ctx = null;
    const els = () => ref.current ? ref.current.querySelectorAll('.aw-hero__copy, .aw-hero__card') : [];
    const cancel = awWhenVisible(() => {
      if (!ref.current) return;
      ctx = gsap.context(() => {
        gsap.from(els(), { opacity: 0, y: 10, duration: .5, stagger: .08, ease: 'power2.out', clearProps: 'transform,opacity' });
      }, ref);
    });
    // §7.3.1 safety: whatever happens to the ticker, nothing stays hidden past 2.6 s
    const safety = setTimeout(() => { if (window.gsap) gsap.set(els(), { clearProps: 'transform,opacity' }); }, 2600);
    return () => { cancel(); clearTimeout(safety); if (ctx) ctx.revert(); };
  }, []);

  const pills = [
    { t: 'Working professionals', c: 'var(--blue-500)', href: '#paths' },
    { t: 'Beginners & career switchers', c: 'var(--green-600)', href: '#paths' },
    { t: 'Builders & founders', c: 'var(--red-500)', href: '#paths' },
  ];

  return (
    <section className="aw-hero aw-grain" ref={ref} id="top">
      <AwCanvas />
      <div className="aw-hero__grid">
        <div className="aw-hero__copy">
          <h1 className="home-hero__h1" aria-label="From AI curious to AI Systems Architect">
            <span className="home-hero__line"><span>From AI curious</span></span>
            <span className="home-hero__line"><span>to <span className="is-red">AI architect</span></span></span>
          </h1>
          <p className="home-hero__sub">Go from <em>using</em> AI to <strong>architecting real systems with Claude</strong>, through guided projects, a 12-week build path, and an Anthropic-trained team. One membership, three ways in.</p>
          <div className="home-pills">
            {pills.map((p, i) => (
              <a className="home-pill" key={i} href={p.href} style={{ '--_c': p.c }}><span className="home-pill__dot" />{p.t}</a>
            ))}
          </div>
          <p className="home-hero__price">
            <span className="home-hero__price-ic"><I n="ticket" s={14} /></span>
            <span>Membership is <b>$149/month</b> · cancel anytime</span>
          </p>
          <div className="home-hero__trust">
            <div className="cb-avatar-group">
              <HomeAvatar name="Mika Rivera" size="sm" style={{ background: 'var(--blue-600)', color: '#fff' }} />
              <HomeAvatar name="Owen Brooks" size="sm" style={{ background: 'var(--green-800)', color: '#fff' }} />
              <HomeAvatar name="Ada Lovelace" size="sm" style={{ background: 'var(--red-600)', color: '#fff' }} />
              <HomeAvatar name="Sam Okafor" size="sm" style={{ background: 'var(--blue-700)', color: '#fff' }} />
            </div>
            <span className="home-hero__trust-label"><b>5,000+</b> careers changed since 2012 · Texas Workforce Commission approved</span>
          </div>
        </div>
        <div className="aw-hero__card">
          <HomeRegCard />
        </div>
      </div>
    </section>
  );
}

function HomeMarquee() {
  const items = [
    <span key="a">Learn with <em className="is-blue">Claude</em></span>,
    <span key="b">Build <em className="is-green">real systems</em></span>,
    <span key="c">Deploy in the <em className="is-red">real world</em></span>,
    <span key="d">Membership · $149/month</span>,
  ];
  const list = (hidden) => (
    <div className="aw-mq__list" aria-hidden={hidden || undefined}>
      {items.map((it, i) => (
        <span className="aw-mq__item" key={i}>{it}<span className="aw-mq__dot" /></span>
      ))}
    </div>
  );
  return (
    <div className="aw-mq">
      <div className="aw-mq__inner">{list(false)}{list(true)}</div>
    </div>
  );
}

Object.assign(window, { HomeNav, HomeHero, HomeMarquee, HomeRegCard, REGISTER_URL });
