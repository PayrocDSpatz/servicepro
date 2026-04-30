import React, { useMemo, useState } from 'react';
import Icon from '../components/Icon.jsx';
import { useData } from '../data/DataContext.jsx';
import { money, dateLong, initials } from '../utils/format.js';

const FILTERS = ['All', 'Maintenance Plan', 'Commercial', 'New', 'Has Balance'];

export default function CustomersView() {
  const { customers } = useData();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = useMemo(() => {
    return customers.filter((c) => {
      if (query) {
        const q = query.toLowerCase();
        if (!`${c.name} ${c.address} ${c.city} ${c.email}`.toLowerCase().includes(q)) return false;
      }
      if (filter === 'Maintenance Plan' && !c.tags.includes('Maintenance Plan')) return false;
      if (filter === 'Commercial' && !c.tags.includes('Commercial')) return false;
      if (filter === 'New' && !c.tags.includes('New')) return false;
      if (filter === 'Has Balance' && !(c.balance > 0)) return false;
      return true;
    });
  }, [query, filter]);

  const totalValue = filtered.reduce((s, c) => s + c.accountValue, 0);
  const balance = filtered.reduce((s, c) => s + c.balance, 0);

  return (
    <>
      <div className="sp-page-header">
        <div>
          <h1 className="sp-page-title">Customers</h1>
          <p className="sp-page-subtitle">{filtered.length} accounts &middot; {money(totalValue)} lifetime value &middot; {money(balance)} open balance</p>
        </div>
        <div className="sp-row">
          <button className="sp-btn sp-btn-outline">
            <Icon name="download" size={16} />
            Export
          </button>
          <button className="sp-btn sp-btn-primary">
            <Icon name="plus" size={16} />
            New Customer
          </button>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="sp-card sp-card-pad-sm" style={{ marginBottom: 'var(--sp-space-4)' }}>
        <div className="sp-row" style={{ flexWrap: 'wrap' }}>
          <div className="sp-input-with-icon" style={{ flex: '1 1 280px' }}>
            <Icon name="search" size={18} className="sp-input-icon" />
            <input
              className="sp-input"
              placeholder="Search by name, address, email..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="sp-row" style={{ gap: 0, border: '2px solid var(--sp-border-strong)', borderRadius: 'var(--sp-radius-md)', overflow: 'hidden' }}>
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="sp-btn sp-btn-sm"
                style={{
                  borderRadius: 0,
                  border: 'none',
                  background: filter === f ? 'var(--sp-navy-900)' : 'transparent',
                  color: filter === f ? '#fff' : 'var(--sp-navy-700)',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="sp-table-wrap">
        <table className="sp-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Location</th>
              <th>Tags</th>
              <th>Last Visit</th>
              <th style={{ textAlign: 'right' }}>Account Value</th>
              <th style={{ textAlign: 'right' }}>Balance</th>
              <th style={{ width: 60 }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id}>
                <td>
                  <div className="sp-row">
                    <div className="sp-avatar sp-avatar-sm">{initials(c.name)}</div>
                    <div>
                      <div className="sp-strong">{c.name}</div>
                      <div className="sp-mute" style={{ fontSize: 12 }}>{c.email} &middot; {c.phone}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div>{c.address}</div>
                  <div className="sp-mute" style={{ fontSize: 12 }}>{c.city}, {c.state} {c.zip}</div>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {c.tags.length === 0 && <span className="sp-mute" style={{ fontSize: 12 }}>—</span>}
                    {c.tags.map((t) => {
                      let cls = '';
                      if (t === 'VIP' || t === 'Priority') cls = 'sp-badge-accent';
                      else if (t === 'Commercial') cls = 'sp-badge-info';
                      else if (t === 'Maintenance Plan') cls = 'sp-badge-success';
                      else if (t === 'New') cls = 'sp-badge-warn';
                      return <span key={t} className={`sp-badge ${cls}`}>{t}</span>;
                    })}
                  </div>
                </td>
                <td>{dateLong(c.lastVisit)}</td>
                <td style={{ textAlign: 'right', fontFamily: 'var(--sp-font-mono)' }}>{money(c.accountValue)}</td>
                <td style={{ textAlign: 'right', fontFamily: 'var(--sp-font-mono)', color: c.balance > 0 ? 'var(--sp-red-600)' : 'inherit', fontWeight: c.balance > 0 ? 700 : 400 }}>
                  {c.balance > 0 ? money(c.balance) : '—'}
                </td>
                <td>
                  <button className="sp-btn sp-btn-icon sp-btn-ghost" aria-label="More">
                    <Icon name="more" size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="sp-empty">
            <div className="sp-empty-title">No customers match your filters</div>
            <div>Try clearing the search or switching tabs.</div>
          </div>
        )}
      </div>
    </>
  );
}
