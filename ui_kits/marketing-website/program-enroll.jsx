/* Colaberry — Service detail + Contact views */
const { Button: PButton, Card: PCard, Badge: PBadge, Input: PInput, Checkbox: PCheckbox } = window.ColaberryDesignSystem_098454;

function ProgramView({ go }) {
  const [open, setOpen] = React.useState(0);
  const modules = [
    { h: 'Discovery & data strategy', d: 'We assess your data maturity, goals, and gaps — then build a roadmap that ties data investment to business outcomes.', wk: 'Engage' },
    { h: 'Specialized talent & teams', d: 'Get vetted data scientists, analysts, and engineers — contingent staffing or fully managed teams, ramped to your needs.', wk: 'Staff' },
    { h: 'Delivery & managed services', d: 'Reliable pipelines, governance, and monitoring so your data work ships on time and stays healthy in production.', wk: 'Deliver' },
    { h: 'Training & enablement', d: 'TWC-approved training and ongoing upskilling that raises data literacy and builds a durable, data-driven culture.', wk: 'Enable' },
  ];
  const faqs = [
    { q: 'How does staff augmentation work?', a: 'We match specialized Data Science, analytics, and engineering talent to your roles — contingent or contract-to-hire — with expert recruitment and a fast, quality-first process.' },
    { q: 'What are Data Fabric Services?', a: 'A customized digital transformation journey: data architecture, integration, and governance that positions you as a data-driven leader in your industry.' },
    { q: 'Do you offer managed data services?', a: 'Yes. We run reliable pipelines, data quality, and monitoring as a managed service so your teams can focus on outcomes, not maintenance.' },
    { q: 'Is your training accredited?', a: 'Our training & development programs are Texas Workforce Commission approved and designed to bridge the skills gap for existing and emerging roles at scale.' },
  ];
  const tools = ['Consulting', 'Staffing', 'Data Fabric', 'Managed Services', 'Training', 'Governance'];
  return (
    <main>
      <div className="cbsite-prog-hero">
        <div className="cbsite-prog-hero__inner">
          <div className="cbsite-bc"><a onClick={() => go('home')}>What We Do</a> <I n="chevron-right" s={14} /> <span>Consulting &amp; Staff Augmentation</span></div>
          <div className="cbsite-prog-hero__grid">
            <div>
              <PBadge tone="blue" dot>Consulting &amp; Staffing</PBadge>
              <h1>Specialized data talent, ready when you are</h1>
              <p>Get the Data Science, analytics, and engineering talent your business needs to succeed and thrive — through expert recruitment and consulting solutions tailored to your goals.</p>
              <div className="cbsite-meta">
                <span><I n="users" s={16} /> Contingent &amp; managed teams</span>
                <span><I n="shield-check" s={16} /> Microsoft Partner</span>
                <span><I n="award" s={16} /> Inc. 5000</span>
                <span><I n="map-pin" s={16} /> Plano, TX</span>
              </div>
              <div className="cbsite-prog-hero__cta">
                <PButton size="lg" onClick={() => go('enroll')}>Contact Us</PButton>
                <PButton size="lg" variant="ghost" onClick={() => go('home')} leadingIcon={<I n="folder-open" />}>View case studies</PButton>
              </div>
            </div>
            <PCard elevation="md" padded className="cbsite-pricecard">
              <span className="cbsite-pricecard__label">Engagement models</span>
              <div className="cbsite-pricecard__price">4<small>core services</small></div>
              <ul>
                <li><I n="check" /><span>Consulting &amp; staff augmentation</span></li>
                <li><I n="check" /><span>Data Fabric Services</span></li>
                <li><I n="check" /><span>Managed Data Services</span></li>
                <li><I n="check" /><span>Training &amp; development</span></li>
              </ul>
              <PButton fullWidth onClick={() => go('enroll')}>Talk to our team</PButton>
              <span className="cbsite-pricecard__note">Flexible to your size &amp; stage</span>
            </PCard>
          </div>
        </div>
      </div>

      <section className="cbsite-section">
        <div className="cbsite-section__head cbsite-section__head--row">
          <div>
            <PBadge tone="cyan">How we engage</PBadge>
            <h2>From strategy to delivery</h2>
          </div>
        </div>
        <div className="cbsite-modules">
          {modules.map((m, i) => (
            <div key={i} className={'cbsite-module' + (open === i ? ' is-open' : '')} onClick={() => setOpen(open === i ? -1 : i)}>
              <div className="cbsite-module__top">
                <span className="cbsite-module__wk">{m.wk}</span>
                <h3>{m.h}</h3>
                <I n={open === i ? 'minus' : 'plus'} />
              </div>
              {open === i && <p>{m.d}</p>}
            </div>
          ))}
        </div>
        <div className="cbsite-tools">
          <span>Services &amp; capabilities</span>
          <div>{tools.map((t, i) => <PBadge key={i} outline>{t}</PBadge>)}</div>
        </div>
      </section>

      <section className="cbsite-section cbsite-section--subtle">
        <div className="cbsite-section__head cbsite-section__head--row">
          <div>
            <PBadge tone="blue">FAQ</PBadge>
            <h2>Questions, answered</h2>
          </div>
        </div>
        <div className="cbsite-faq">
          {faqs.map((f, i) => (
            <details key={i} className="cbsite-faqitem">
              <summary>{f.q}<I n="plus" /></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="cbsite-cta">
        <div className="cbsite-cta__inner">
          <h2>Let's build your data advantage</h2>
          <p>Tell us about your goals and our team will map the right mix of consulting, staffing, managed services, and training.</p>
          <div className="cbsite-cta__btns"><PButton size="lg" tone="green" onClick={() => go('enroll')}>Contact Us</PButton></div>
        </div>
      </section>
    </main>
  );
}

function EnrollView({ go }) {
  const [interest, setInterest] = React.useState('consulting');
  const [done, setDone] = React.useState(false);
  const opts = {
    consulting: { name: 'Consulting & Staffing', desc: 'Specialized data talent', tone: 'blue' },
    fabric: { name: 'Data Fabric Services', desc: 'Digital transformation', tone: 'cyan' },
    managed: { name: 'Managed Data Services', desc: 'Reliable data operations', tone: 'blue' },
    training: { name: 'Training & Development', desc: 'Upskill your team', tone: 'cyan' },
  };
  const sel = opts[interest];
  if (done) {
    return (
      <main className="cbsite-enroll">
        <div className="cbsite-success">
          <div className="cbsite-success__icon"><I n="check" /></div>
          <h1>Thanks — we'll be in touch!</h1>
          <p>Thanks for your interest in <strong>{sel.name}</strong>. A member of our team will reach out within one business day. Prefer to talk now? Call (972) 992-1024.</p>
          <div className="cbsite-success__btns">
            <PButton onClick={() => { setDone(false); go('home'); }}>Back to home</PButton>
            <PButton variant="outline" onClick={() => go('program')}>Explore services</PButton>
          </div>
        </div>
      </main>
    );
  }
  return (
    <main className="cbsite-enroll">
      <div className="cbsite-enroll__grid">
        <form className="cbsite-form" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
          <h1>Contact us</h1>
          <p className="cbsite-form__sub">Tell us about your goals and we'll map the right solution. Takes about 2 minutes.</p>

          <div className="cbsite-form__choice">
            <span className="cbsite-form__legend">What can we help with?</span>
            <div className="cbsite-choice">
              {Object.entries(opts).map(([k, v]) => (
                <button type="button" key={k} className={'cbsite-choice__opt' + (interest === k ? ' is-sel' : '')} onClick={() => setInterest(k)}>
                  <span className="cbsite-choice__check"><I n="check" /></span>
                  <strong>{v.name}</strong>
                  <span>{v.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="cbsite-form__row">
            <PInput label="First name" placeholder="Ada" required />
            <PInput label="Last name" placeholder="Lovelace" required />
          </div>
          <PInput label="Work email" type="email" placeholder="ada@company.com" required />
          <div className="cbsite-form__row">
            <PInput label="Company" placeholder="Acme Inc." required />
            <PInput label="Phone" placeholder="(972) 992-1024" />
          </div>
          <PInput label="How can we help?" multiline rows={3} placeholder="Tell us about your data goals, team, and timeline…" />
          <div className="cbsite-form__checks">
            <PCheckbox label="Send me Colaberry insights — data strategy, talent & training" defaultChecked />
            <PCheckbox label="I agree to be contacted by Colaberry about my request" required />
          </div>
          <PButton type="submit" size="lg" fullWidth>Send message</PButton>
        </form>

        <aside className="cbsite-summary">
          <PCard elevation="md" padded>
            <PBadge tone={sel.tone} dot>Your interest</PBadge>
            <h3>{sel.name}</h3>
            <ul>
              <li><I n="users" /><span>Specialized data talent &amp; teams</span></li>
              <li><I n="share-2" /><span>Digital transformation &amp; data fabric</span></li>
              <li><I n="database" /><span>Managed, reliable data operations</span></li>
              <li><I n="graduation-cap" /><span>TWC-approved training &amp; upskilling</span></li>
            </ul>
          </PCard>
          <div className="cbsite-summary__trust">
            <I n="phone" />
            <p>Prefer to talk? Call <b>(972) 992-1024</b> or email hello@colaberry.com — we'd love to talk.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}

Object.assign(window, { ProgramView, EnrollView });
