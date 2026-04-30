import React from 'react';
import Icon from '../components/Icon.jsx';
import { customers, jobs, invoices, technicians } from '../data/mockData.js';
import { ACTIVE_TRADE } from '../data/tradeConfig.js';
import { money, moneyCompact, time, dayOfWeek, statusBadgeClass, dateLong } from '../utils/format.js';
import './DashboardView.css';

export default function DashboardView() {
  const todayJobs = jobs.filter(j => j.start.startsWith('2026-04-30'));
  const upcoming = jobs.filter(j => !j.start.startsWith('2026-04-30') && j.status !== 'Completed').slice(0, 4);
  const overdueInv = invoices.filter(i => i.status === 'Overdue');
  const mrr = 18 * 4 + 695 + 425; // crude — just for display
  const todayRevenue = todayJobs.reduce((s, j) => s + (j.estTotal || 0), 0);
  const wkRevenue = invoices.filter(i => i.status === 'Paid').reduce((s, i) => s + i.paid, 0);

  return (
    <>
      <div className="sp-page-header">
        <div>
          <h1 className="sp-page-title">Today &middot; Thu Apr 30</h1>
          <p className="sp-page-subtitle">{ACTIVE_TRADE.label} &middot; 3 crews running &middot; weather: 78°F, partly cloudy</p>
        </div>
        <div className="sp-row">
          <button className="sp-btn sp-btn-outline">
            <Icon name="download" size={16} />
            Export
          </button>
          <button className="sp-btn sp-btn-primary">
            <Icon name="plus" size={16} />
            New Job
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="dash-kpi-grid">
        <Kpi label="Today's Jobs"        value={todayJobs.length}        delta="+2 vs avg"    accent="navy" icon="jobs" />
        <Kpi label="Today's Revenue"     value={money(todayRevenue)}     delta="+18%"         accent="" icon="dollar" />
        <Kpi label="This Week Collected" value={moneyCompact(wkRevenue)} delta="+24%"         accent="green" icon="zap" />
        <Kpi label="Overdue Invoices"    value={overdueInv.length}       delta={money(overdueInv.reduce((s, i) => s + i.total, 0)) + ' open'} deltaDown accent="yellow" icon="alert" />
      </div>

      <div className="dash-grid">
        {/* TODAY'S BOARD */}
        <div className="sp-card dash-board">
          <div className="sp-card-header">
            <div>
              <div className="sp-card-title">Today's Board</div>
              <div className="sp-mute" style={{ fontSize: 13 }}>{todayJobs.length} {ACTIVE_TRADE.jobNoun.toLowerCase()}s scheduled</div>
            </div>
            <button className="sp-btn sp-btn-ghost sp-btn-sm">View Schedule <Icon name="chevronRight" size={14} /></button>
          </div>

          <div className="dash-jobs">
            {todayJobs.map((j) => {
              const cust = customers.find(c => c.id === j.customerId);
              const tech = technicians.find(t => t.id === j.technicianId);
              return (
                <div key={j.id} className={`dash-job ${j.priority === 'Urgent' ? 'is-urgent' : ''}`}>
                  <div className="dash-job-time">
                    <div className="dash-job-time-h">{time(j.start)}</div>
                    <div className="dash-job-time-d">{j.durationMin}m</div>
                  </div>
                  <div className="dash-job-main">
                    <div className="dash-job-cust">{cust?.name}</div>
                    <div className="dash-job-svc">
                      <span>{j.service}</span>
                      <span className="sp-mute">&middot; {j.address}</span>
                    </div>
                  </div>
                  <div className={`sp-avatar sp-avatar-sm sp-avatar-${tech?.color}`}>{tech?.initials}</div>
                  <span className={`sp-badge ${statusBadgeClass(j.status)}`}>{j.status}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* CREWS */}
        <div className="sp-card">
          <div className="sp-card-header">
            <div className="sp-card-title">Crews</div>
            <button className="sp-btn sp-btn-ghost sp-btn-sm">All <Icon name="chevronRight" size={14} /></button>
          </div>
          <div className="dash-crews">
            {technicians.map((t) => (
              <div className="dash-crew" key={t.id}>
                <div className={`sp-avatar sp-avatar-${t.color}`}>{t.initials}</div>
                <div className="dash-crew-main">
                  <div className="dash-crew-name">{t.name}</div>
                  <div className="dash-crew-meta">
                    {t.activeJobs} jobs &middot; {t.todayHours}h scheduled
                  </div>
                </div>
                <div className="dash-crew-bar">
                  <div className="dash-crew-bar-fill" style={{ width: `${(t.todayHours / 8) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* UPCOMING */}
        <div className="sp-card">
          <div className="sp-card-header">
            <div className="sp-card-title">Coming Up</div>
            <button className="sp-btn sp-btn-ghost sp-btn-sm">Calendar <Icon name="chevronRight" size={14} /></button>
          </div>
          <ul className="dash-upcoming">
            {upcoming.map((j) => {
              const cust = customers.find(c => c.id === j.customerId);
              return (
                <li key={j.id}>
                  <div className="dash-upcoming-day">
                    <div className="dash-upcoming-dow">{dayOfWeek(j.start)}</div>
                    <div className="dash-upcoming-time">{time(j.start)}</div>
                  </div>
                  <div>
                    <div className="dash-upcoming-cust">{cust?.name}</div>
                    <div className="sp-mute" style={{ fontSize: 13 }}>{j.service}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* OVERDUE */}
        <div className="sp-card dash-overdue">
          <div className="sp-card-header">
            <div className="sp-card-title">Needs Follow-Up</div>
            <span className="sp-badge sp-badge-danger">{overdueInv.length}</span>
          </div>
          <ul className="dash-overdue-list">
            {overdueInv.map((inv) => {
              const cust = customers.find(c => c.id === inv.customerId);
              return (
                <li key={inv.id}>
                  <div>
                    <div className="dash-overdue-cust">{cust?.name}</div>
                    <div className="sp-mute" style={{ fontSize: 13 }}>{inv.id} &middot; due {dateLong(inv.due)}</div>
                  </div>
                  <div className="dash-overdue-amt">{money(inv.total)}</div>
                </li>
              );
            })}
          </ul>
          <div className="sp-card-footer">
            <button className="sp-btn sp-btn-dark sp-btn-sm sp-btn-block">
              Send Reminders ({overdueInv.length})
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function Kpi({ label, value, delta, deltaDown, accent, icon }) {
  return (
    <div className={`sp-kpi sp-kpi-${accent || ''}`}>
      <div className="sp-row-between" style={{ alignItems: 'flex-start' }}>
        <div className="sp-kpi-label">{label}</div>
        <Icon name={icon} size={18} className="sp-mute" />
      </div>
      <div className="sp-kpi-value">{value}</div>
      <div className={`sp-kpi-delta ${deltaDown ? 'sp-kpi-delta-down' : 'sp-kpi-delta-up'}`}>
        {delta}
      </div>
    </div>
  );
}
