import React, { useState } from 'react';
import Icon from '../components/Icon.jsx';
import { TRADES, ACTIVE_TRADE } from '../data/tradeConfig.js';

export default function SettingsView() {
  const [trade, setTrade] = useState(ACTIVE_TRADE.id);
  const config = TRADES[trade];

  return (
    <>
      <div className="sp-page-header">
        <div>
          <h1 className="sp-page-title">Settings</h1>
          <p className="sp-page-subtitle">Trade configuration, branding, billing, integrations.</p>
        </div>
      </div>

      <div className="sp-card sp-card-pad-lg" style={{ marginBottom: 'var(--sp-space-6)' }}>
        <div className="sp-section-title">Active Trade</div>
        <p className="sp-mute" style={{ fontSize: 14, marginBottom: 'var(--sp-space-4)' }}>
          ServicePro is configured for the trade you select below — service codes, recurrence patterns, equipment
          categories, and dashboard terminology all adapt automatically.
        </p>

        <div className="dash-kpi-grid" style={{ marginBottom: 'var(--sp-space-6)' }}>
          {Object.values(TRADES).map((t) => (
            <button
              key={t.id}
              onClick={() => setTrade(t.id)}
              className="sp-card sp-card-pad-sm"
              style={{
                cursor: 'pointer',
                textAlign: 'left',
                border: trade === t.id ? `2px solid ${t.accent}` : '2px solid var(--sp-border)',
                background: trade === t.id ? '#fff' : 'var(--sp-bg)',
                outline: 'none',
              }}
            >
              <div className="sp-row" style={{ marginBottom: 6 }}>
                <div className="sp-avatar sp-avatar-sm" style={{ background: t.accent }}>
                  <Icon name={t.icon} size={16} />
                </div>
                <div className="sp-strong">{t.label}</div>
                {trade === t.id && <Icon name="check" size={18} style={{ color: t.accent, marginLeft: 'auto' }} />}
              </div>
              <div className="sp-mute" style={{ fontSize: 12 }}>{t.tagline}</div>
            </button>
          ))}
        </div>

        <div className="sp-section-title">Default Service Codes</div>
        <div className="sp-table-wrap">
          <table className="sp-table sp-table-compact">
            <thead>
              <tr>
                <th>Code</th>
                <th>Service</th>
                <th>Default Duration</th>
                <th style={{ textAlign: 'right' }}>Default Price</th>
              </tr>
            </thead>
            <tbody>
              {config.services.map(s => (
                <tr key={s.code}>
                  <td className="sp-mono sp-strong">{s.code}</td>
                  <td>{s.label}</td>
                  <td>{s.defaultDurationMin} min</td>
                  <td style={{ textAlign: 'right', fontFamily: 'var(--sp-font-mono)' }}>${s.defaultPrice.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="sp-row" style={{ marginTop: 'var(--sp-space-5)', flexWrap: 'wrap', gap: 'var(--sp-space-4)' }}>
          <SettingChip label="Recurrence Presets" value={config.recurrencePresets.join(', ')} />
          <SettingChip label="Equipment Categories" value={config.equipmentCategories.join(', ')} />
          <SettingChip label="Seasonal Peak" value={config.seasonalPeak} />
        </div>
      </div>

      <div className="sp-card sp-card-pad-lg">
        <div className="sp-section-title">Sections</div>
        <div className="dash-kpi-grid">
          {[
            { name: 'Company & Branding', icon: 'shield', desc: 'Logo, colors, address, hours.' },
            { name: 'Users & Crews', icon: 'customers', desc: 'Add technicians, set roles, hourly rates.' },
            { name: 'Billing & Payments', icon: 'invoices', desc: 'Stripe, ACH, late fees, terms.' },
            { name: 'Tax & Surcharges', icon: 'dollar', desc: 'Sales tax, fuel surcharge, trip charge.' },
            { name: 'Notifications', icon: 'bell', desc: 'Customer reminders, internal alerts.' },
            { name: 'Integrations', icon: 'zap', desc: 'QuickBooks, Twilio, Google Maps.' },
          ].map((s) => (
            <div key={s.name} className="sp-card sp-card-pad-sm" style={{ cursor: 'pointer' }}>
              <div className="sp-row" style={{ marginBottom: 4 }}>
                <Icon name={s.icon} size={18} />
                <div className="sp-strong">{s.name}</div>
                <Icon name="chevronRight" size={16} className="sp-mute" style={{ marginLeft: 'auto' }} />
              </div>
              <div className="sp-mute" style={{ fontSize: 13, marginLeft: 26 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function SettingChip({ label, value }) {
  return (
    <div style={{ background: 'var(--sp-navy-100)', padding: '8px 14px', borderRadius: 'var(--sp-radius-md)' }}>
      <div className="sp-mute" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 600 }}>{value}</div>
    </div>
  );
}
