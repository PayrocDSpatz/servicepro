import React, { useMemo, useState } from 'react';
import Icon from '../components/Icon.jsx';
import { customers, jobs, technicians } from '../data/mockData.js';
import { ACTIVE_TRADE } from '../data/tradeConfig.js';
import { time, dateLong, statusBadgeClass, money } from '../utils/format.js';
import './JobsView.css';

export default function JobsView() {
  const [view, setView] = useState('day'); // day | list | route

  return (
    <>
      <div className="sp-page-header">
        <div>
          <h1 className="sp-page-title">{ACTIVE_TRADE.jobNoun}s</h1>
          <p className="sp-page-subtitle">Dispatch &middot; routing &middot; daily schedule</p>
        </div>
        <div className="sp-row">
          <button className="sp-btn sp-btn-outline">
            <Icon name="filter" size={16} />
            Filters
          </button>
          <button className="sp-btn sp-btn-primary">
            <Icon name="plus" size={16} />
            New {ACTIVE_TRADE.jobNoun}
          </button>
        </div>
      </div>

      <div className="sp-tabs">
        <button className={`sp-tab ${view === 'day' ? 'sp-tab-active' : ''}`} onClick={() => setView('day')}>Day Board</button>
        <button className={`sp-tab ${view === 'list' ? 'sp-tab-active' : ''}`} onClick={() => setView('list')}>List</button>
        <button className={`sp-tab ${view === 'route' ? 'sp-tab-active' : ''}`} onClick={() => setView('route')}>Route Sheet</button>
      </div>

      {view === 'day' && <DayBoard />}
      {view === 'list' && <JobList />}
      {view === 'route' && <RouteSheet />}
    </>
  );
}

/* ---------------- DAY BOARD ---------------- */

function DayBoard() {
  const todayJobs = jobs.filter(j => j.start.startsWith('2026-04-30'));
  const hours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

  const jobsByTech = useMemo(() => {
    const map = {};
    technicians.forEach(t => { map[t.id] = []; });
    todayJobs.forEach(j => { if (map[j.technicianId]) map[j.technicianId].push(j); });
    return map;
  }, [todayJobs]);

  return (
    <div className="board">
      <div className="board-grid">
        {/* time column */}
        <div className="board-col board-col-times">
          <div className="board-col-head">&nbsp;</div>
          {hours.map((h) => (
            <div key={h} className="board-time-cell">
              <span>{h > 12 ? `${h - 12}` : h}{h >= 12 ? 'p' : 'a'}</span>
            </div>
          ))}
        </div>

        {/* tech columns */}
        {technicians.map((tech) => (
          <div className="board-col" key={tech.id}>
            <div className="board-col-head">
              <div className={`sp-avatar sp-avatar-sm sp-avatar-${tech.color}`}>{tech.initials}</div>
              <div>
                <div className="board-col-name">{tech.name}</div>
                <div className="board-col-meta">{tech.activeJobs} jobs &middot; {tech.todayHours}h</div>
              </div>
            </div>

            <div className="board-col-body">
              {hours.map((h) => <div key={h} className="board-slot" />)}

              {jobsByTech[tech.id].map((j) => {
                const cust = customers.find(c => c.id === j.customerId);
                const start = new Date(j.start);
                const startHour = start.getHours() + start.getMinutes() / 60;
                const top = (startHour - hours[0]) * 60; // 60px per hour
                const height = Math.max(40, (j.durationMin / 60) * 60);
                return (
                  <div
                    key={j.id}
                    className={`board-job ${j.priority === 'Urgent' ? 'is-urgent' : ''} ${j.status === 'In Progress' ? 'is-progress' : ''}`}
                    style={{ top: `${top}px`, height: `${height}px` }}
                  >
                    <div className="board-job-time">{time(j.start)}</div>
                    <div className="board-job-cust">{cust?.name}</div>
                    <div className="board-job-svc">{j.service}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- LIST ---------------- */

function JobList() {
  return (
    <div className="sp-table-wrap">
      <table className="sp-table">
        <thead>
          <tr>
            <th>When</th>
            <th>Customer / Address</th>
            <th>Service</th>
            <th>Crew</th>
            <th>Priority</th>
            <th>Status</th>
            <th style={{ textAlign: 'right' }}>Est. Total</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((j) => {
            const cust = customers.find(c => c.id === j.customerId);
            const tech = technicians.find(t => t.id === j.technicianId);
            return (
              <tr key={j.id}>
                <td>
                  <div className="sp-strong">{dateLong(j.start)}</div>
                  <div className="sp-mute" style={{ fontSize: 12, fontFamily: 'var(--sp-font-mono)' }}>{time(j.start)}</div>
                </td>
                <td>
                  <div className="sp-strong">{cust?.name}</div>
                  <div className="sp-mute" style={{ fontSize: 12 }}>{j.address}</div>
                </td>
                <td>{j.service}</td>
                <td>
                  <div className="sp-row">
                    <div className={`sp-avatar sp-avatar-sm sp-avatar-${tech?.color}`}>{tech?.initials}</div>
                    <span style={{ fontSize: 13 }}>{tech?.name}</span>
                  </div>
                </td>
                <td>
                  <span className={`sp-badge ${statusBadgeClass(j.priority)}`}>{j.priority}</span>
                </td>
                <td><span className={`sp-badge ${statusBadgeClass(j.status)}`}>{j.status}</span></td>
                <td style={{ textAlign: 'right', fontFamily: 'var(--sp-font-mono)' }}>{money(j.estTotal)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ---------------- ROUTE SHEET ---------------- */

function RouteSheet() {
  const todayJobs = jobs
    .filter(j => j.start.startsWith('2026-04-30'))
    .sort((a, b) => a.start.localeCompare(b.start));

  return (
    <div className="route">
      {technicians.map((tech) => {
        const techJobs = todayJobs.filter(j => j.technicianId === tech.id);
        if (techJobs.length === 0) return null;
        return (
          <div key={tech.id} className="route-card sp-card">
            <div className="route-head">
              <div className="sp-row">
                <div className={`sp-avatar sp-avatar-${tech.color}`}>{tech.initials}</div>
                <div>
                  <div className="route-tech">{tech.name}</div>
                  <div className="sp-mute" style={{ fontSize: 13 }}>Today's run &middot; {techJobs.length} stops</div>
                </div>
              </div>
              <button className="sp-btn sp-btn-dark sp-btn-sm">
                <Icon name="truck" size={16} /> Start Day
              </button>
            </div>
            <ol className="route-stops">
              {techJobs.map((j, idx) => {
                const cust = customers.find(c => c.id === j.customerId);
                return (
                  <li key={j.id} className={`route-stop ${j.priority === 'Urgent' ? 'is-urgent' : ''}`}>
                    <div className="route-stop-num">{idx + 1}</div>
                    <div className="route-stop-body">
                      <div className="route-stop-row">
                        <span className="route-stop-time">{time(j.start)}</span>
                        <span className={`sp-badge ${statusBadgeClass(j.status)}`}>{j.status}</span>
                      </div>
                      <div className="route-stop-cust">{cust?.name}</div>
                      <div className="route-stop-addr"><Icon name="pin" size={14} /> {j.address}</div>
                      <div className="route-stop-svc">{j.service} &middot; {j.durationMin}m &middot; {money(j.estTotal)}</div>
                      {j.notes && <div className="route-stop-notes">"{j.notes}"</div>}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        );
      })}
    </div>
  );
}
