/* Colaberry — Home view (Data Consultancy & Talent Solutions Provider) */
const { Button: HButton, Card: HCard, Badge: HBadge } = window.ColaberryDesignSystem_098454;

function HomeView({ go }) {
  const services = [
    { icon: 'users', cyan: false, title: 'Consulting & Staff Augmentation', desc: 'Get specialized Data Science, analytics, and engineering talent for your business to succeed and thrive with our expert recruitment solutions.' },
    { icon: 'share-2', cyan: true, title: 'Data Fabric Services', desc: 'Partner with us for a customized digital transformation journey that positions you as a data-driven leader in your industry.' },
    { icon: 'graduation-cap', cyan: false, title: 'Training & Development', desc: 'Texas Workforce Commission approved training and upskilling solutions to bridge the skills gap for existing and emerging roles at scale.' },
  ];

  const expertise = [
    { icon: 'flask-conical', label: 'Data Science' },
    { icon: 'bar-chart-3', label: 'Data Analytics' },
    { icon: 'database', label: 'Data Engineering' },
    { icon: 'git-merge', label: 'Machine Learning' },
    { icon: 'code-2', label: 'Software Engineering' },
    { icon: 'line-chart', label: 'Business Intelligence' },
  ];

  const help = [
    { icon: 'server', title: 'Build a Data-Enabled Infrastructure', points: ['Data architecture roadmap', 'Data Lake vs. Data Warehouse', 'Flexible, reliable data pipelines', 'Automate data collection'] },
    { icon: 'layers', title: 'Adopt & Implement Data Solutions', points: ['Increase org-wide data literacy', 'Build a data-driven culture', 'Custom integration & compliance'] },
    { icon: 'git-fork', title: 'Develop Robust Talent Pipelines', points: ['Build high-performing data teams', 'Ongoing reskilling & upskilling', 'Sustained delivery capability'] },
  ];

  const industries = [
    ['Energy & Utilities', 'zap'], ['Agriculture', 'sprout'], ['Healthcare', 'heart-pulse'],
    ['Financial Services', 'landmark'], ['Biotech', 'microscope'], ['Hospitality', 'hotel'],
    ['Insurance', 'shield'], ['Technology', 'cpu'], ['Pharmaceuticals', 'pill'],
    ['Retail', 'shopping-bag'], ['Government', 'building-2'], ['Education', 'book-open'],
  ];

  const cases = {
    'All': [
      ['Zendesk Ticketing System', 'Analyzing support-ticket data end to end — from creation to resolution — to improve response time and service quality.', 'Operations'],
      ['Colaberry Event Dashboard', 'Evaluating the events platform and attendee data across public, student, and alumni programs to sharpen engagement.', 'Analytics'],
      ['DISC Dashboard & Tools', 'Behavioral analytics on DISC assessment data — Dominance, Influence, Steadiness, Compliance — for team insight.', 'Data Science'],
    ],
    'Operations': [
      ['Zendesk Ticketing System', 'Analyzing support-ticket data end to end — from creation to resolution — to improve response time and service quality.', 'Operations'],
      ['Managed Data Services', 'Standing up reliable pipelines and monitoring so client data teams ship with confidence.', 'Operations'],
    ],
    'Analytics': [
      ['Colaberry Event Dashboard', 'Evaluating the events platform and attendee data across public, student, and alumni programs to sharpen engagement.', 'Analytics'],
      ['Retail Demand Signals', 'Forecasting and reporting that turns transaction data into merchandising decisions.', 'Analytics'],
    ],
    'Data Science': [
      ['DISC Dashboard & Tools', 'Behavioral analytics on DISC assessment data — Dominance, Influence, Steadiness, Compliance — for team insight.', 'Data Science'],
      ['Healthcare Risk Models', 'Predictive modeling on clinical data to flag risk earlier and route care efficiently.', 'Data Science'],
    ],
  };
  const caseTabs = Object.keys(cases);
  const [caseTab, setCaseTab] = React.useState('All');

  return (
    <main>
      {/* HERO */}
      <section className="cbsite-hero">
        <div className="cbsite-hero__copy">
          <span className="cbsite-eyebrow">Data Consultancy & Talent Solutions</span>
          <h1>We are Colaberry. <span className="cbsite-rotate">Shaping the future of work.</span></h1>
          <p>Colaberry transforms data from an obstacle into an asset — so individuals and organizations reach their full potential and thrive in today's technology-powered world.</p>
          <div className="cbsite-hero__cta">
            <HButton size="lg" onClick={() => go('enroll')}>Contact Us</HButton>
            <HButton size="lg" variant="outline" onClick={() => go('program')} trailingIcon={<I n="arrow-right" />}>What we do</HButton>
          </div>
          <div className="cbsite-catlinks">
            <div className="cbsite-catlinks__label">Trusted across industries · recognized for excellence:</div>
            <div className="cbsite-chips">
              <span className="cbsite-chip"><I n="award" s={15} />Inc. 5000</span>
              <span className="cbsite-chip"><I n="shield-check" s={15} />Microsoft Partner</span>
              <span className="cbsite-chip"><I n="graduation-cap" s={15} />TWC Approved</span>
            </div>
          </div>
        </div>
        <div className="cbsite-hero__media">
          <div className="cbsite-statpanel">
            <div className="cbsite-statpanel__big">
              <div className="cbsite-statpanel__n">5,000+</div>
              <div className="cbsite-statpanel__lbl">Data careers launched &amp; teams empowered</div>
            </div>
            <div className="cbsite-statpanel__grid">
              <div className="cbsite-statpanel__cell"><I n="briefcase" /><strong>Staffing</strong><span>Specialized data talent</span></div>
              <div className="cbsite-statpanel__cell"><I n="share-2" /><strong>Fabric</strong><span>Digital transformation</span></div>
              <div className="cbsite-statpanel__cell"><I n="database" /><strong>Managed</strong><span>Reliable data services</span></div>
              <div className="cbsite-statpanel__cell"><I n="graduation-cap" /><strong>Training</strong><span>TWC-approved upskilling</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="cbsite-section">
        <div className="cbsite-section__head">
          <HBadge tone="blue">What we do</HBadge>
          <h2>Data solutions &amp; talent for tomorrow's workplace</h2>
          <p>We support organizations and individuals with consulting, staffing, managed data services, and training &amp; development — end-to-end solutions that turn organizations into agile, data-powered industry leaders.</p>
        </div>
        <div className="cbsite-cards">
          {services.map((s, i) => (
            <a key={i} className="cbsite-card" onClick={() => go('program')}>
              <div className={'cbsite-card__ic' + (s.cyan ? ' cbsite-card__ic--cyan' : '')}><I n={s.icon} /></div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="cbsite-card__more">Learn more <I n="arrow-right" s={15} /></span>
            </a>
          ))}
        </div>
      </section>

      {/* AREAS OF EXPERTISE */}
      <section className="cbsite-section cbsite-section--subtle">
        <div className="cbsite-section__head">
          <HBadge tone="cyan">Areas of expertise</HBadge>
          <h2>Deep capability across the data stack</h2>
          <p>From strategy to delivery, our specialists cover the disciplines that move data-driven organizations forward.</p>
        </div>
        <div className="cbsite-integrations">
          {expertise.map((e, i) => (
            <div key={i} className="cbsite-int"><I n={e.icon} /><span>{e.label}</span></div>
          ))}
        </div>
      </section>

      {/* WE CAN HELP YOU */}
      <section className="cbsite-section">
        <div className="cbsite-section__head">
          <HBadge tone="blue">We can help you</HBadge>
          <h2>From infrastructure to people</h2>
          <p>Three ways we partner with organizations to build lasting data capability.</p>
        </div>
        <div className="cbsite-cards">
          {help.map((h, i) => (
            <div key={i} className="cbsite-card cbsite-card--static">
              <div className="cbsite-card__ic"><I n={h.icon} /></div>
              <h3>{h.title}</h3>
              <ul className="cbsite-checklist">
                {h.points.map((p, j) => <li key={j}><I n="check" s={15} />{p}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="cbsite-section cbsite-section--subtle">
        <div className="cbsite-section__head">
          <HBadge tone="blue">Industries we serve</HBadge>
          <h2>Domain expertise where it counts</h2>
          <p>We bring data solutions to the sectors building the future.</p>
        </div>
        <div className="cbsite-industries">
          {industries.map((it, i) => (
            <div key={i} className="cbsite-industry"><I n={it[1]} />{it[0]}</div>
          ))}
        </div>
      </section>

      {/* CLIENT SUCCESS */}
      <section className="cbsite-section">
        <div className="cbsite-section__head">
          <HBadge tone="cyan">Client success</HBadge>
          <h2>Real outcomes from real data work</h2>
          <p>A selection of projects delivered with our consulting and analytics teams.</p>
        </div>
        <div className="cbsite-tabs">
          {caseTabs.map(t => (
            <button key={t} className={'cbsite-tab' + (caseTab === t ? ' is-active' : '')} onClick={() => setCaseTab(t)}>{t}</button>
          ))}
        </div>
        <div className="cbsite-cards">
          {cases[caseTab].map((c, i) => (
            <a key={i} className="cbsite-card" onClick={() => go('program')}>
              <span className="cbsite-card__count">{c[2]}</span>
              <h3>{c[0]}</h3>
              <p>{c[1]}</p>
              <span className="cbsite-card__more">View case study <I n="arrow-right" s={15} /></span>
            </a>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cbsite-cta">
        <div className="cbsite-cta__inner">
          <h2>We'd love to talk</h2>
          <p>Whether you need consulting, staffing, managed data services, or training, Colaberry is here to help you reach the highest levels of your organizational and individual potential.</p>
          <div className="cbsite-cta__btns">
            <HButton size="lg" tone="green" onClick={() => go('enroll')}>Contact Us</HButton>
            <HButton size="lg" variant="outline" onClick={() => go('program')}>Explore services</HButton>
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { HomeView });
