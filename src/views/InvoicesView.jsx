import React, { useMemo, useState } from 'react';
import Icon from '../components/Icon.jsx';
import { useData } from '../data/DataContext.jsx';
import { money, dateLong, statusBadgeClass, initials } from '../utils/format.js';

const TABS = ['All', 'Sent', 'Overdue', 'Paid'];

export default function InvoicesView() {
  const { customers, invoices } = useData();
  const [tab, setTab] = useState('All');

  const filtered = useMemo(() => {
    if (tab === 'All') return invoices;
    return invoices.filter(i => i.status === tab);
  }, [tab]);

  const counts = useMemo(() => ({
    All: invoices.length,
    Sent: invoices.filter(i => i.status === 'Sent').length,
    Overdue: invoices.filter(i => i.status === 'Overdue').length,
    Paid: invoices.filter(i => i.status === 'Paid').length,
  }), []);

  const totalOpen = invoices.filter(i => i.status !== 'Paid').reduce((s, i) => s + (i.total - i.paid), 0);
  const totalOverdue = invoices.filter(i => i.status === 'Overdue').reduce((s, i) => s + (i.total - i.paid), 0);
  const totalPaid30 = invoices.filter(i => i.status === 'Paid').reduce((s, i) => s + i.paid, 0);

  return (
    <>
      <div className="sp-page-header">
        <div>
          <h1 className="sp-page-title">Invoices</h1>
          <p className="sp-page-subtitle">{invoices.length} invoices &middot; billing &amp; collections</p>
        </div>
        <div className="sp-row">
          <button className="sp-btn sp-btn-outline">
            <Icon name="download" size={16} />
            Export
          </button>
          <button className="sp-btn sp-btn-primary">
            <Icon name="plus" size={16} />
            New Invoice
          </button>
        </div>
      </div>

      {/* SUMMARY KPIs */}
      <div className="dash-kpi-grid">
        <div className="sp-kpi sp-kpi-yellow">
          <div className="sp-kpi-label">Open Receivable</div>
          <div className="sp-kpi-value">{money(totalOpen)}</div>
          <div className="sp-kpi-delta sp-kpi-delta-down">{counts.Sent + counts.Overdue} invoices outstanding</div>
        </div>
        <div className="sp-kpi" style={{ borderLeftColor: 'var(--sp-red-600)' }}>
          <div className="sp-kpi-label">Overdue</div>
          <div className="sp-kpi-value">{money(totalOverdue)}</div>
          <div className="sp-kpi-delta sp-kpi-delta-down">{counts.Overdue} past due</div>
        </div>
        <div className="sp-kpi sp-kpi-green">
          <div className="sp-kpi-label">Collected (30d)</div>
          <div className="sp-kpi-value">{money(totalPaid30)}</div>
          <div className="sp-kpi-delta sp-kpi-delta-up">+24% MoM</div>
        </div>
        <div className="sp-kpi sp-kpi-navy">
          <div className="sp-kpi-label">Avg Days to Pay</div>
          <div className="sp-kpi-value">11.4</div>
          <div className="sp-kpi-delta sp-kpi-delta-up">−2.1 days</div>
        </div>
      </div>

      <div className="sp-tabs">
        {TABS.map((t) => (
          <button key={t} className={`sp-tab ${tab === t ? 'sp-tab-active' : ''}`} onClick={() => setTab(t)}>
            {t}
            <span style={{ marginLeft: 6, opacity: 0.6, fontWeight: 400 }}>{counts[t]}</span>
          </button>
        ))}
      </div>

      <div className="sp-table-wrap">
        <table className="sp-table">
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Customer</th>
              <th>Issued</th>
              <th>Due</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Total</th>
              <th style={{ textAlign: 'right' }}>Balance</th>
              <th style={{ width: 120 }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((inv) => {
              const cust = customers.find(c => c.id === inv.customerId);
              const balance = inv.total - inv.paid;
              const isOverdue = inv.status === 'Overdue';
              return (
                <tr key={inv.id}>
                  <td>
                    <div className="sp-strong sp-mono">{inv.id}</div>
                    {inv.jobId && <div className="sp-mute" style={{ fontSize: 12 }}>Job {inv.jobId}</div>}
                  </td>
                  <td>
                    <div className="sp-row">
                      <div className="sp-avatar sp-avatar-sm">{initials(cust?.name)}</div>
                      <div className="sp-strong">{cust?.name}</div>
                    </div>
                  </td>
                  <td>{dateLong(inv.issued)}</td>
                  <td style={{ color: isOverdue ? 'var(--sp-red-600)' : 'inherit', fontWeight: isOverdue ? 700 : 400 }}>
                    {dateLong(inv.due)}
                  </td>
                  <td><span className={`sp-badge ${statusBadgeClass(inv.status)}`}>{inv.status}</span></td>
                  <td style={{ textAlign: 'right', fontFamily: 'var(--sp-font-mono)' }}>{money(inv.total)}</td>
                  <td style={{ textAlign: 'right', fontFamily: 'var(--sp-font-mono)', fontWeight: balance > 0 ? 700 : 400, color: balance > 0 ? 'var(--sp-red-600)' : 'inherit' }}>
                    {balance > 0 ? money(balance) : '—'}
                  </td>
                  <td>
                    <div className="sp-row" style={{ gap: 4, justifyContent: 'flex-end' }}>
                      {balance > 0 && <button className="sp-btn sp-btn-sm sp-btn-primary">Collect</button>}
                      <button className="sp-btn sp-btn-icon sp-btn-ghost" aria-label="More">
                        <Icon name="more" size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
