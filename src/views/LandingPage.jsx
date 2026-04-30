import React from 'react';
import Icon from '../components/Icon.jsx';
import { TRADES } from '../data/tradeConfig.js';
import './LandingPage.css';

export default function LandingPage({ onEnterApp }) {
  return (
    <div className="lp">
      <header className="lp-nav">
        <div className="lp-container lp-nav-inner">
          <Logo />
          <nav className="lp-nav-links">
            <a href="#features">Features</a>
            <a href="#trades">Trades</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="lp-row">
            <button className="sp-btn sp-btn-ghost" onClick={onEnterApp}>Sign In</button>
            <button className="sp-btn sp-btn-primary" onClick={onEnterApp}>Start Free Trial</button>
          </div>
        </div>
      </header>

      <div className="sp-hazard-stripe" />

      {/* HERO */}
      <section className="lp-hero">
        <div className="lp-container lp-hero-grid">
          <div className="lp-hero-copy">
            <div className="lp-eyebrow">
              <span className="lp-eyebrow-dot" />
              FIELD SERVICE PLATFORM &middot; BUILT FOR THE TRADES
            </div>
            <h1 className="lp-hero-title">
              Run your service business <span className="lp-accent">like a fleet</span>, not a filing cabinet.
            </h1>
            <p className="lp-hero-sub">
              ServicePro is the dispatch, customer, and invoicing system for HVAC, plumbing,
              lawn, pool, and pest crews. Schedule the day, route the trucks, send the invoice
              — from the truck or the office.
            </p>
            <div className="lp-cta-row">
              <button className="sp-btn sp-btn-primary sp-btn-lg" onClick={onEnterApp}>
                Start 14-Day Free Trial
                <Icon name="arrowRight" size={18} />
              </button>
              <button className="sp-btn sp-btn-outline sp-btn-lg">Book a Demo</button>
            </div>
            <ul className="lp-hero-bullets">
              <li><Icon name="check" size={16} /> No credit card required</li>
              <li><Icon name="check" size={16} /> Setup in under an hour</li>
              <li><Icon name="check" size={16} /> Cancel any time</li>
            </ul>
          </div>

          <div className="lp-hero-visual">
            <DispatchMockup />
          </div>
        </div>
      </section>

      {/* TRADES */}
      <section className="lp-section lp-section-dark" id="trades">
        <div className="lp-container">
          <div className="lp-section-head lp-section-head-dark">
            <div className="lp-eyebrow lp-eyebrow-light">ONE PLATFORM &middot; EVERY TRADE</div>
            <h2 className="lp-section-title">Configured for the work you actually do.</h2>
            <p className="lp-section-sub">
              ServicePro ships with trade-specific defaults so you're not building from scratch.
              Service codes, recurrence patterns, equipment categories — all preset.
            </p>
          </div>
          <div className="lp-trade-grid">
            {Object.values(TRADES).map((t) => (
              <TradeCard key={t.id} trade={t} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="lp-section" id="features">
        <div className="lp-container">
          <div className="lp-section-head">
            <div className="lp-eyebrow">EVERYTHING IN ONE TOOLBELT</div>
            <h2 className="lp-section-title">Built for the way crews actually move.</h2>
          </div>
          <div className="lp-feature-grid">
            <FeatureCard icon="jobs" title="Dispatch &amp; Routing"
              body="Drag-and-drop daily schedule. Auto-route trucks. Crews see their day on mobile." />
            <FeatureCard icon="customers" title="Customer Records"
              body="Every property, every visit, every note. Search anything in two taps." />
            <FeatureCard icon="invoices" title="Invoicing &amp; Payments"
              body="Bill from the truck. Card, ACH, check. Sync to QuickBooks." />
            <FeatureCard icon="servicePlans" title="Service Plans"
              body="Recurring contracts that run themselves — Comfort Club, Quarterly, Spring/Fall." />
            <FeatureCard icon="equipment" title="Equipment Tracking"
              body="Make, model, serial, warranty. Service history one tap away." />
            <FeatureCard icon="reports" title="Reports That Matter"
              body="Revenue per crew, close rate, plan retention. The numbers owners actually use." />
          </div>
        </div>
      </section>

      {/* WHY DIFFERENT */}
      <section className="lp-section lp-section-band">
        <div className="lp-container">
          <div className="lp-band-grid">
            <div>
              <div className="lp-eyebrow">WHY SERVICEPRO</div>
              <h2 className="lp-section-title">Built by people who've ridden in the truck.</h2>
              <p className="lp-band-body">
                Most field-service software was designed for the office. ServicePro starts with
                the crew — big tap targets, offline-capable mobile, no five-step menus to log
                a service note. Office tools follow the truck, not the other way around.
              </p>
              <ul className="lp-band-list">
                <li><Icon name="zap" size={20} /> Mobile-first for techs in the field</li>
                <li><Icon name="shield" size={20} /> Plain-English pricing, no per-feature add-ons</li>
                <li><Icon name="truck" size={20} /> Routing built around real driving, not a calendar grid</li>
              </ul>
            </div>
            <div className="lp-stat-grid">
              <BigStat value="38%" label="Revenue lift in year one (avg.)" />
              <BigStat value="6 hrs" label="Office time saved per week per dispatcher" />
              <BigStat value="92%" label="Maintenance plan retention" />
              <BigStat value="< 1 hr" label="From signup to first invoice" />
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="lp-section" id="pricing">
        <div className="lp-container">
          <div className="lp-section-head">
            <div className="lp-eyebrow">PLAIN PRICING</div>
            <h2 className="lp-section-title">Per truck, not per click.</h2>
            <p className="lp-section-sub">
              All plans include unlimited customers, unlimited jobs, mobile, and payments.
            </p>
          </div>
          <div className="lp-pricing-grid">
            <PriceCard
              name="Solo"
              price="49"
              tagline="One-truck operators getting it together."
              features={['1 user', 'Unlimited customers & jobs', 'Mobile app', 'Invoicing & payments', 'Email support']}
            />
            <PriceCard
              name="Crew"
              price="129"
              tagline="The shop standard."
              highlighted
              features={['Up to 5 users', 'Everything in Solo', 'Service Plans / Contracts', 'Equipment tracking', 'QuickBooks sync', 'Priority support']}
            />
            <PriceCard
              name="Fleet"
              price="299"
              tagline="Multi-crew & commercial."
              features={['Up to 15 users', 'Everything in Crew', 'Multi-location', 'API access', 'Dedicated success manager', 'Custom reporting']}
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="lp-section lp-final-cta">
        <div className="lp-container lp-final-cta-inner">
          <h2 className="lp-final-cta-title">Stop running your business from a clipboard.</h2>
          <p className="lp-final-cta-sub">
            14 days free. No credit card. We'll get your first crew onboarded in an hour.
          </p>
          <div className="lp-cta-row lp-cta-row-center">
            <button className="sp-btn sp-btn-primary sp-btn-lg" onClick={onEnterApp}>
              Start Free Trial
              <Icon name="arrowRight" size={18} />
            </button>
            <button className="sp-btn sp-btn-outline sp-btn-lg" style={{ borderColor: '#fff', color: '#fff' }}>
              Talk to Sales
            </button>
          </div>
        </div>
      </section>

      <footer className="lp-footer" id="contact">
        <div className="lp-container lp-footer-inner">
          <div>
            <Logo small />
            <p className="lp-footer-blurb">Field service software for the trades. Built in Texas.</p>
          </div>
          <div className="lp-footer-cols">
            <div>
              <div className="lp-footer-h">Product</div>
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <a href="#trades">Trades</a>
            </div>
            <div>
              <div className="lp-footer-h">Company</div>
              <a href="#">About</a>
              <a href="#">Careers</a>
              <a href="#">Blog</a>
            </div>
            <div>
              <div className="lp-footer-h">Support</div>
              <a href="#">Help Center</a>
              <a href="#">Contact</a>
              <a href="#">Status</a>
            </div>
          </div>
        </div>
        <div className="lp-footer-bottom">
          <div className="lp-container lp-row-between">
            <span>&copy; 2026 ServicePro, Inc.</span>
            <span>
              <a href="#">Privacy</a> &nbsp;&middot;&nbsp; <a href="#">Terms</a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ---------------- helper components ---------------- */

function Logo({ small }) {
  return (
    <div className={`lp-logo ${small ? 'lp-logo-sm' : ''}`}>
      <div className="lp-logo-mark">
        <Icon name="wrench" size={small ? 18 : 22} stroke={2.5} />
      </div>
      <span className="lp-logo-text">SERVICE<span className="lp-accent">PRO</span></span>
    </div>
  );
}

function TradeCard({ trade }) {
  return (
    <div className="lp-trade-card">
      <div className="lp-trade-icon" style={{ background: trade.accent }}>
        <Icon name={trade.icon} size={24} stroke={2.25} />
      </div>
      <div className="lp-trade-name">{trade.label}</div>
      <div className="lp-trade-tag">{trade.tagline}</div>
      <div className="lp-trade-meta">
        <span>{trade.services.length} preset services</span>
        <span>&middot;</span>
        <span>{trade.seasonalPeak}</span>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, body }) {
  return (
    <div className="lp-feature">
      <div className="lp-feature-icon"><Icon name={icon} size={22} /></div>
      <div className="lp-feature-title" dangerouslySetInnerHTML={{ __html: title }} />
      <div className="lp-feature-body">{body}</div>
    </div>
  );
}

function BigStat({ value, label }) {
  return (
    <div className="lp-stat">
      <div className="lp-stat-value">{value}</div>
      <div className="lp-stat-label">{label}</div>
    </div>
  );
}

function PriceCard({ name, price, tagline, features, highlighted }) {
  return (
    <div className={`lp-price ${highlighted ? 'lp-price-hi' : ''}`}>
      {highlighted && <div className="lp-price-tag">MOST POPULAR</div>}
      <div className="lp-price-name">{name}</div>
      <div className="lp-price-tagline">{tagline}</div>
      <div className="lp-price-num">
        <span className="lp-price-dollar">$</span>
        <span className="lp-price-amt">{price}</span>
        <span className="lp-price-per">/ truck / mo</span>
      </div>
      <ul className="lp-price-list">
        {features.map((f) => (
          <li key={f}><Icon name="check" size={16} /> {f}</li>
        ))}
      </ul>
      <button className={`sp-btn ${highlighted ? 'sp-btn-primary' : 'sp-btn-dark'} sp-btn-block`}>
        Start Trial
      </button>
    </div>
  );
}

/* ---------------- hero mockup ---------------- */

function DispatchMockup() {
  return (
    <div className="lp-mockup">
      <div className="lp-mockup-bar">
        <span className="lp-mockup-dot" /><span className="lp-mockup-dot" /><span className="lp-mockup-dot" />
        <span className="lp-mockup-bar-text">servicepro.app &mdash; Today's Dispatch</span>
      </div>
      <div className="lp-mockup-body">
        <div className="lp-mockup-row lp-mockup-row-head">
          <span>TODAY · THU APR 30</span>
          <span className="lp-mockup-pill">3 CREWS · 12 STOPS</span>
        </div>
        <MockJob time="08:00" customer="M. Chen" service="AC Tune-Up" tech="CM" status="Scheduled" />
        <MockJob time="09:30" customer="Rio Grande Coffee" service="Emergency · Walk-in down" tech="TW" status="In Progress" urgent />
        <MockJob time="11:00" customer="Sterling PM · Suite 240" service="Diagnostic" tech="CM" status="Scheduled" />
        <MockJob time="13:00" customer="Davidson Trust" service="Furnace Tune-Up" tech="DH" status="Scheduled" />
        <MockJob time="15:00" customer="H. Brookfield" service="AC Tune-Up" tech="TW" status="Scheduled" />
      </div>
    </div>
  );
}

function MockJob({ time, customer, service, tech, status, urgent }) {
  return (
    <div className={`lp-mockjob ${urgent ? 'lp-mockjob-urgent' : ''}`}>
      <div className="lp-mockjob-time">{time}</div>
      <div className="lp-mockjob-main">
        <div className="lp-mockjob-cust">{customer}</div>
        <div className="lp-mockjob-svc">{service}</div>
      </div>
      <div className="lp-mockjob-tech">{tech}</div>
      <div className={`lp-mockjob-status ${urgent ? 'is-urgent' : ''}`}>{status}</div>
    </div>
  );
}
