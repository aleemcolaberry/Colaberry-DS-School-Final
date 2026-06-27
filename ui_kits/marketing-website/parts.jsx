/* Colaberry — shared parts: Logo, Header, Footer, helpers.
   Data Consultancy & Talent Solutions Provider. Exposes to window. */
const { Button: CBButton, Badge: CBBadge } = window.ColaberryDesignSystem_098454;

/* React-safe Lucide icon. React owns the <span>; Lucide mutates only the
   inner <i>→<svg>, so re-renders never touch the swapped node. */
function I({ n, s, c, className = '', style }) {
  const st = { fontSize: s ? s + 'px' : undefined, color: c, ...style };
  return <span className={'cb-i ' + className} style={st} dangerouslySetInnerHTML={{ __html: `<i data-lucide="${n}"></i>` }} />;
}
function Icon({ name, size, style, ...rest }) { return <I n={name} s={size} style={style} {...rest} />; }

function Logo({ height = 30, variant = 'default' }) {
  const src = variant === 'white'
    ? '../../assets/logo/colaberry-horizontal-white.png?v=3'
    : '../../assets/logo/colaberry-horizontal.png?v=3';
  return <img src={src} alt="Colaberry" style={{ height, display: 'block' }} />;
}

const WHATWEDO = [
  { label: 'Consulting & Staffing', icon: 'users', view: 'program' },
  { label: 'Data Fabric Services', icon: 'share-2', view: 'program' },
  { label: 'Managed Data Services', icon: 'database', view: 'program' },
  { label: 'Enterprise Training', icon: 'graduation-cap', view: 'program' },
];
const RESOURCES = [
  { label: 'Case Studies', icon: 'folder-open', view: 'home' },
  { label: 'White Papers', icon: 'file-text', view: 'home' },
  { label: 'Events', icon: 'calendar', view: 'home' },
];

function Header({ go }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const el = document.querySelector('.cbsite-scroll');
    const onScroll = () => setScrolled((el ? el.scrollTop : window.scrollY) > 8);
    const target = el || window;
    target.addEventListener('scroll', onScroll);
    return () => target.removeEventListener('scroll', onScroll);
  }, []);
  const toggleMode = () => {
    const html = document.documentElement;
    html.setAttribute('data-theme', html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  };
  return (
    <header className="cbsite-header" data-scrolled={scrolled}>
      <div className="cbsite-header__inner">
        <a className="cbsite-logo" onClick={() => go('home')}><Logo /></a>
        <nav className="cbsite-nav">
          <div className="cbsite-nav__item">
            <a className="cbsite-nav__link" onClick={() => go('program')}>What We Do <I n="chevron-down" s={14} /></a>
            <div className="cbsite-menu">
              {WHATWEDO.map((m, i) => <a key={i} onClick={() => go(m.view)}><I n={m.icon} s={16} />{m.label}</a>)}
            </div>
          </div>
          <div className="cbsite-nav__item"><a className="cbsite-nav__link" onClick={() => go('home')}>Industries</a></div>
          <div className="cbsite-nav__item">
            <a className="cbsite-nav__link" onClick={() => go('home')}>Resources <I n="chevron-down" s={14} /></a>
            <div className="cbsite-menu">
              {RESOURCES.map((m, i) => <a key={i} onClick={() => go(m.view)}><I n={m.icon} s={16} />{m.label}</a>)}
            </div>
          </div>
          <div className="cbsite-nav__item"><a className="cbsite-nav__link" onClick={() => go('home')}>About</a></div>
        </nav>
        <div className="cbsite-header__actions">
          <button className="cbsite-modetoggle" onClick={toggleMode} aria-label="Toggle color mode"><I n="sun-moon" s={18} /></button>
          <a className="cbsite-phone" href="tel:+19729921024"><I n="phone" s={15} />(972) 992-1024</a>
          <CBButton size="sm" onClick={() => go('enroll')}>Contact Us</CBButton>
        </div>
      </div>
    </header>
  );
}

function Footer({ go }) {
  const cols = [
    { h: 'What We Do', items: ['Consulting & Staffing', 'Data Fabric Services', 'Managed Data Services', 'Enterprise Training', 'Career Training'] },
    { h: 'Resources', items: ['Case Studies', 'White Papers', 'Projects', 'Events', 'Careers'] },
    { h: 'Company', items: ['About Us', 'Awards & Recognition', 'Blog', 'Contact Us'] },
  ];
  const social = ['linkedin', 'instagram', 'youtube', 'twitter', 'facebook'];
  return (
    <footer className="cbsite-footer">
      <div className="cbsite-footer__inner">
        <div className="cbsite-footer__brand">
          <Logo variant="white" height={30} />
          <p>Colaberry empowers individuals and organizations to reach their full potential by unlocking the power of data — turning data from an obstacle into an asset in today's technology-powered world.</p>
          <div className="cbsite-footer__badges">
            <span className="cbsite-footer__badge"><I n="award" s={15} />Inc. 5000</span>
            <span className="cbsite-footer__badge"><I n="shield-check" s={15} />Microsoft Partner</span>
          </div>
          <div className="cbsite-footer__social">
            {social.map((s, i) => <a key={i} aria-label={s}><Icon name={s} size={16} /></a>)}
          </div>
        </div>
        <div className="cbsite-footer__cols">
          {cols.map((c, i) => (
            <div key={i} className="cbsite-footer__col">
              <h4>{c.h}</h4>
              {c.items.map((it, j) => <a key={j} onClick={() => go('home')}>{it}</a>)}
            </div>
          ))}
        </div>
      </div>
      <div className="cbsite-footer__bar">
        <span>© 2026 Colaberry, Inc. · All rights reserved. · Plano, TX</span>
        <span className="cbsite-footer__legal"><a onClick={() => go('home')}>Privacy</a><a onClick={() => go('home')}>Terms</a></span>
      </div>
    </footer>
  );
}

Object.assign(window, { Icon, I, Logo, Header, Footer });
