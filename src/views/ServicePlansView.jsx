import React from 'react';
import Icon from '../components/Icon.jsx';
import { customers, servicePlans } from '../data/mockData.js';
import { money, dateLong, statusBadgeClass, initials } from '../utils/format.js';
import './ServicePlansView.css';

export default function ServicePlansView() {
  const active = servicePlans.filter(p => p.status === 'Active');
  const monthlyValue = active.reduce((s, p) => s + p.priceMonthly, 0);
  const annualValue = monthlyValue * 12;
  const visitsPerYear = active.reduce((s, p) => s + p.visitsPerYear, 0);

  return (
    <>
      <div className="sp-page-header">
        <div>
          <h1 className="sp-page-title">Service Plans</h1>
          <p className="sp-page-subtitle">Recurring contracts &amp; maintenance agreements &middot; the engine of repeat revenue</p>
        </div>
        <div className="sp-row">
          <button className="sp-btn sp-btn-outline">
            <Icon name="filter" size={16} />
            Filter
          </button>
          <button className="sp-btn sp-btn-primary">
            <Icon name="plus" size={16} />
            New Plan
          </button>
        </div>
      </div>

      <div className="dash-kpi-grid">
        <div className="sp-kpi sp-kpi-navy">
          <div className="sp-kpi-label">Active Members</div>
          <div className="sp-kpi-value">{active.length}</div>
          <div className="sp-kpi-delta sp-kpi-delta-up">+3 this month</div>
        </div>
        <div className="sp-kpi">
          <div className="sp-kpi-label">Monthly Recurring</div>
          <div className="sp-kpi-value">{money(monthlyValue)}</div>
          <div className="sp-kpi-delta sp-kpi-delta-up">+18% YoY</div>
        </div>
        <div className="sp-kpi sp-kpi-green">
          <div className="sp-kpi-label">Annual Contract Value</div>
          <div className="sp-kpi-value">{money(annualValue)}</div>
          <div className="sp-kpi-delta sp-kpi-delta-up">92% retention</div>
        </div>
        <div className="sp-kpi sp-kpi-blue">
          <div className="sp-kpi-label">Visits Booked / Year</div>
          <div className="sp-kpi-value">{visitsPerYear}</div>
          <div className="sp-kpi-delta sp-kpi-delta-up">Auto-scheduled</div>
        </div>
      </div>

      {/* PLAN TYPE SUMMARY */}
      <div className="sp-section-title">Plan Templates</div>
      <div className="plan-templates">
        <PlanTemplate
          name="Comfort Club — Residential"
          cadence="Spring + Fall"
          price={18}
          members={4}
          color="orange"
          inclusions={['AC Tune-Up', 'Furnace Tune-Up', 'Priority Booking', '15% Repair Discount']}
        />
        <PlanTemplate
          name="Commercial Quarterly"
          cadence="Quarterly"
          price={695}
          members={2}
          color="navy"
          inclusions={['RTU Service', '24/7 Emergency Response', 'Filter Program', '10% Equipment Discount']}
        />
        <PlanTemplate
          name="Premium Care"
          cadence="Spring + Fall + 2 Filter"
          price={32}
          members={0}
          color="green"
          inclusions={['Everything in Comfort Club', '4 Filter Replacements', 'Free Diagnostics', '20% Repair Discount']}
        />
      </div>

      {/* MEMBER LIST */}
      <div className="sp-section-title" style={{ marginTop: 'var(--sp-space-8)' }}>Members</div>
      <div className="sp-table-wrap">
        <table className="sp-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Plan</th>
              <th>Cadence</th>
              <th>Next Visit</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Monthly</th>
              <th style={{ width: 60 }}></th>
            </tr>
          </thead>
          <tbody>
            {servicePlans.map((p) => {
              const cust = customers.find(c => c.id === p.customerId);
              return (
                <tr key={p.id}>
                  <td>
                    <div className="sp-row">
                      <div className="sp-avatar sp-avatar-sm">{initials(cust?.name)}</div>
                      <div>
                        <div className="sp-strong">{cust?.name}</div>
                        <div className="sp-mute" style={{ fontSize: 12 }}>{cust?.address}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="sp-strong">{p.name}</div>
                    <div className="sp-mute" style={{ fontSize: 12 }}>{p.visitsPerYear} visits/year</div>
                  </td>
                  <td>{p.cadence}</td>
                  <td>
                    <div className="sp-strong">{dateLong(p.nextVisit)}</div>
                    <div className="sp-mute" style={{ fontSize: 12 }}>auto-scheduled</div>
                  </td>
                  <td><span className={`sp-badge ${statusBadgeClass(p.status)}`}>{p.status}</span></td>
                  <td style={{ textAlign: 'right', fontFamily: 'var(--sp-font-mono)' }}>{money(p.priceMonthly)}</td>
                  <td>
                    <button className="sp-btn sp-btn-icon sp-btn-ghost" aria-label="More">
                      <Icon name="more" size={18} />
                    </button>
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

function PlanTemplate({ name, cadence, price, members, inclusions, color }) {
  return (
    <div className={`plan-tpl plan-tpl-${color}`}>
      <div className="plan-tpl-head">
        <div className="plan-tpl-name">{name}</div>
        <div className="plan-tpl-cadence">{cadence}</div>
      </div>
      <div className="plan-tpl-price">
        <span className="plan-tpl-amt">{money(price)}</span>
        <span className="plan-tpl-per">/ mo</span>
      </div>
      <ul className="plan-tpl-list">
        {inclusions.map((inc) => (
          <li key={inc}><Icon name="check" size={14} /> {inc}</li>
        ))}
      </ul>
      <div className="plan-tpl-foot">
        <span className="plan-tpl-members">{members} active</span>
        <button className="sp-btn sp-btn-sm sp-btn-outline">Edit</button>
      </div>
    </div>
  );
}
