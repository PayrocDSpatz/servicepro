import React from 'react';
import Icon from '../components/Icon.jsx';
import { useData } from '../data/DataContext.jsx';
import { money } from '../utils/format.js';

export default function ReportsView() {
  const { invoices, jobs } = useData();
  const revenue30 = invoices.filter(i => i.status === 'Paid').reduce((s, i) => s + i.paid, 0);
  const open = invoices.filter(i => i.status !== 'Paid').reduce((s, i) => s + (i.total - i.paid), 0);
  const completedJobs = jobs.filter(j => j.status === 'Completed').length;
  const avgTicket = revenue30 / Math.max(1, completedJobs);

  const reports = [
    { name: 'Revenue by Service', icon: 'dollar', desc: 'Where the money came from this period.' },
    { name: 'Crew Productivity', icon: 'truck', desc: 'Hours billed vs. hours worked, by tech.' },
    { name: 'Maintenance Plan Retention', icon: 'shield', desc: 'Renewals, churn, lifetime value.' },
    { name: 'Equipment Replacement Pipeline', icon: 'equipment', desc: 'Out-of-warranty units worth a sales call.' },
    { name: 'Aging A/R', icon: 'alert', desc: 'Open receivables by age bucket.' },
    { name: 'Tax / Sales by Jurisdiction', icon: 'reports', desc: 'For your accountant.' },
  ];

  return (
    <>
      <div className="sp-page-header">
        <div>
          <h1 className="sp-page-title">Reports</h1>
          <p className="sp-page-subtitle">The numbers owners actually use.</p>
        </div>
        <div className="sp-row">
          <button className="sp-btn sp-btn-outline">
            <Icon name="download" size={16} />
            Export All
          </button>
        </div>
      </div>

      <div className="dash-kpi-grid">
        <div className="sp-kpi sp-kpi-green">
          <div className="sp-kpi-label">Revenue (30d)</div>
          <div className="sp-kpi-value">{money(revenue30)}</div>
          <div className="sp-kpi-delta sp-kpi-delta-up">+24% MoM</div>
        </div>
        <div className="sp-kpi sp-kpi-yellow">
          <div className="sp-kpi-label">Open Receivable</div>
          <div className="sp-kpi-value">{money(open)}</div>
          <div className="sp-kpi-delta sp-kpi-delta-down">3 invoices overdue</div>
        </div>
        <div className="sp-kpi sp-kpi-navy">
          <div className="sp-kpi-label">Completed Jobs</div>
          <div className="sp-kpi-value">{completedJobs}</div>
          <div className="sp-kpi-delta sp-kpi-delta-up">+8 vs last week</div>
        </div>
        <div className="sp-kpi">
          <div className="sp-kpi-label">Avg Ticket</div>
          <div className="sp-kpi-value">{money(avgTicket)}</div>
          <div className="sp-kpi-delta sp-kpi-delta-up">+$42 vs avg</div>
        </div>
      </div>

      <div className="sp-section-title">Report Library</div>
      <div className="dash-kpi-grid">
        {reports.map((r) => (
          <div key={r.name} className="sp-card sp-card-pad" style={{ cursor: 'pointer', transition: 'transform 120ms' }}>
            <div className="sp-row" style={{ marginBottom: 'var(--sp-space-3)' }}>
              <div className="sp-avatar sp-avatar-sm" style={{ background: 'var(--sp-navy-900)' }}>
                <Icon name={r.icon} size={16} />
              </div>
              <div className="sp-strong">{r.name}</div>
            </div>
            <p className="sp-mute" style={{ fontSize: 13, marginBottom: 'var(--sp-space-3)' }}>{r.desc}</p>
            <button className="sp-btn sp-btn-sm sp-btn-outline">Run Report <Icon name="chevronRight" size={14} /></button>
          </div>
        ))}
      </div>
    </>
  );
}
