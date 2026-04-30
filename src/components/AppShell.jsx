import React, { useState } from 'react';
import Icon from './Icon.jsx';
import { ACTIVE_TRADE } from '../data/tradeConfig.js';
import './AppShell.css';

const NAV = [
  { id: 'dashboard',    label: 'Dashboard',     icon: 'dashboard' },
  { id: 'jobs',         label: 'Jobs',          icon: 'jobs' },
  { id: 'customers',    label: 'Customers',     icon: 'customers' },
  { id: 'invoices',     label: 'Invoices',      icon: 'invoices' },
  { id: 'servicePlans', label: 'Service Plans', icon: 'servicePlans' },
  { id: 'equipment',    label: 'Equipment',     icon: 'equipment' },
  { id: 'reports',      label: 'Reports',       icon: 'reports' },
  { id: 'settings',     label: 'Settings',      icon: 'settings' },
];

export default function AppShell({ activeView, onNavigate, onExit, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="shell">
      {/* SIDEBAR */}
      <aside className={`shell-side ${mobileOpen ? 'is-open' : ''}`}>
        <div className="shell-brand">
          <div className="shell-brand-mark">
            <Icon name="wrench" size={20} stroke={2.5} />
          </div>
          <div className="shell-brand-text">
            <div className="shell-brand-name">SERVICE<span className="lp-accent">PRO</span></div>
            <div className="shell-brand-trade">{ACTIVE_TRADE.label}</div>
          </div>
        </div>

        <nav className="shell-nav">
          {NAV.map((item) => (
            <button
              key={item.id}
              className={`shell-nav-item ${activeView === item.id ? 'is-active' : ''}`}
              onClick={() => { onNavigate(item.id); setMobileOpen(false); }}
            >
              <Icon name={item.icon} size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="shell-side-foot">
          <div className="shell-trial-card">
            <div className="shell-trial-tag">TRIAL · 12 DAYS LEFT</div>
            <div className="shell-trial-title">Upgrade to Crew</div>
            <button className="sp-btn sp-btn-primary sp-btn-sm sp-btn-block">Choose Plan</button>
          </div>
          <button className="shell-exit" onClick={onExit}>
            <Icon name="arrowRight" size={16} />
            <span>Exit Demo</span>
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="shell-main">
        <header className="shell-top">
          <button className="sp-btn sp-btn-icon sp-btn-ghost shell-menu-btn"
                  onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu">
            <Icon name="menu" size={22} />
          </button>

          <div className="shell-search sp-input-with-icon">
            <Icon name="search" size={18} className="sp-input-icon" />
            <input className="sp-input" placeholder={`Search customers, ${ACTIVE_TRADE.jobNoun.toLowerCase()}s, invoices...`} />
          </div>

          <div className="shell-top-right">
            <button className="sp-btn sp-btn-dark sp-btn-sm">
              <Icon name="plus" size={16} />
              New {ACTIVE_TRADE.jobNoun}
            </button>
            <button className="sp-btn sp-btn-icon sp-btn-ghost" aria-label="Notifications">
              <Icon name="bell" size={20} />
              <span className="shell-bell-dot" />
            </button>
            <div className="shell-user">
              <div className="sp-avatar sp-avatar-orange sp-avatar-sm">DM</div>
              <div className="shell-user-meta">
                <div className="shell-user-name">Dave M.</div>
                <div className="shell-user-role">Owner</div>
              </div>
            </div>
          </div>
        </header>

        <main className="shell-content">
          {children}
        </main>
      </div>

      {mobileOpen && <div className="shell-overlay" onClick={() => setMobileOpen(false)} />}
    </div>
  );
}
