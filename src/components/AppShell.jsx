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

export default function AppShell({ activeView, onNavigate, onExit, onSignOut, user, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const displayName = user?.displayName || (user?.email ? user.email.split('@')[0] : 'Demo User');
  const role = user ? 'Owner' : 'Demo';
  const init = (user?.displayName || user?.email || 'D M')
    .split(/[\s@.]+/).filter(Boolean).slice(0, 2).map(p => p[0]?.toUpperCase()).join('');

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
            <div className="shell-user-wrap">
              <button className="shell-user" onClick={() => setUserMenuOpen(v => !v)}>
                <div className="sp-avatar sp-avatar-orange sp-avatar-sm">{init || 'DM'}</div>
                <div className="shell-user-meta">
                  <div className="shell-user-name">{displayName}</div>
                  <div className="shell-user-role">{role}</div>
                </div>
                <Icon name="chevronDown" size={14} />
              </button>
              {userMenuOpen && (
                <>
                  <div className="shell-user-menu-overlay" onClick={() => setUserMenuOpen(false)} />
                  <div className="shell-user-menu">
                    <div className="shell-user-menu-head">
                      <div className="sp-strong">{displayName}</div>
                      {user?.email && <div className="sp-mute" style={{ fontSize: 12 }}>{user.email}</div>}
                      {!user && <div className="sp-mute" style={{ fontSize: 12 }}>Demo session — not signed in</div>}
                    </div>
                    <button className="shell-user-menu-item" onClick={() => { setUserMenuOpen(false); onNavigate('settings'); }}>
                      <Icon name="settings" size={16} /> Settings
                    </button>
                    {user ? (
                      <button className="shell-user-menu-item" onClick={() => { setUserMenuOpen(false); onSignOut?.(); }}>
                        <Icon name="arrowRight" size={16} /> Sign Out
                      </button>
                    ) : (
                      <button className="shell-user-menu-item" onClick={() => { setUserMenuOpen(false); onExit?.(); }}>
                        <Icon name="arrowRight" size={16} /> Sign In
                      </button>
                    )}
                  </div>
                </>
              )}
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
