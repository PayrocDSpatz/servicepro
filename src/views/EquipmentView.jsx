import React, { useMemo, useState } from 'react';
import Icon from '../components/Icon.jsx';
import { useData } from '../data/DataContext.jsx';
import { dateLong, statusBadgeClass, initials } from '../utils/format.js';

export default function EquipmentView() {
  const { customers, equipment } = useData();
  const [category, setCategory] = useState('All');
  const categories = ['All', ...new Set(equipment.map(e => e.category))];

  const filtered = useMemo(() => {
    return category === 'All' ? equipment : equipment.filter(e => e.category === category);
  }, [category]);

  const attentionCount = equipment.filter(e => e.status === 'Attention').length;
  const soonCount = equipment.filter(e => e.status === 'Service Soon').length;
  const outOfWarranty = equipment.filter(e => new Date(e.warrantyEnd) < new Date('2026-04-30')).length;

  return (
    <>
      <div className="sp-page-header">
        <div>
          <h1 className="sp-page-title">Equipment</h1>
          <p className="sp-page-subtitle">Customer-owned equipment under your service. Make, model, serial, warranty, history.</p>
        </div>
        <div className="sp-row">
          <button className="sp-btn sp-btn-outline">
            <Icon name="download" size={16} />
            Export
          </button>
          <button className="sp-btn sp-btn-primary">
            <Icon name="plus" size={16} />
            Add Equipment
          </button>
        </div>
      </div>

      <div className="dash-kpi-grid">
        <div className="sp-kpi sp-kpi-navy">
          <div className="sp-kpi-label">Total Tracked</div>
          <div className="sp-kpi-value">{equipment.length}</div>
          <div className="sp-kpi-delta sp-kpi-delta-up">across {new Set(equipment.map(e => e.customerId)).size} sites</div>
        </div>
        <div className="sp-kpi" style={{ borderLeftColor: 'var(--sp-red-600)' }}>
          <div className="sp-kpi-label">Needs Attention</div>
          <div className="sp-kpi-value">{attentionCount}</div>
          <div className="sp-kpi-delta sp-kpi-delta-down">flagged units</div>
        </div>
        <div className="sp-kpi sp-kpi-yellow">
          <div className="sp-kpi-label">Service Soon</div>
          <div className="sp-kpi-value">{soonCount}</div>
          <div className="sp-kpi-delta sp-kpi-delta-down">due within 30d</div>
        </div>
        <div className="sp-kpi" style={{ borderLeftColor: 'var(--sp-orange-500)' }}>
          <div className="sp-kpi-label">Out of Warranty</div>
          <div className="sp-kpi-value">{outOfWarranty}</div>
          <div className="sp-kpi-delta sp-kpi-delta-up">replacement opportunity</div>
        </div>
      </div>

      <div className="sp-tabs">
        {categories.map((c) => (
          <button key={c} className={`sp-tab ${category === c ? 'sp-tab-active' : ''}`} onClick={() => setCategory(c)}>
            {c}
          </button>
        ))}
      </div>

      <div className="sp-table-wrap">
        <table className="sp-table">
          <thead>
            <tr>
              <th>Equipment</th>
              <th>Customer / Site</th>
              <th>Make / Model</th>
              <th>Serial</th>
              <th>Installed</th>
              <th>Warranty</th>
              <th>Last Service</th>
              <th>Status</th>
              <th style={{ width: 60 }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((eq) => {
              const cust = customers.find(c => c.id === eq.customerId);
              const expired = new Date(eq.warrantyEnd) < new Date('2026-04-30');
              return (
                <tr key={eq.id}>
                  <td>
                    <div className="sp-row">
                      <div className="sp-avatar sp-avatar-sm" style={{ background: 'var(--sp-navy-700)' }}>
                        <Icon name="equipment" size={16} />
                      </div>
                      <div>
                        <div className="sp-strong">{eq.category}</div>
                        {eq.notes && <div className="sp-mute" style={{ fontSize: 12 }}>{eq.notes}</div>}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="sp-strong">{cust?.name}</div>
                    <div className="sp-mute" style={{ fontSize: 12 }}>{cust?.address}</div>
                  </td>
                  <td>
                    <div className="sp-strong">{eq.make}</div>
                    <div className="sp-mute" style={{ fontSize: 12 }}>{eq.model}</div>
                  </td>
                  <td className="sp-mono" style={{ fontSize: 13 }}>{eq.serial}</td>
                  <td>{dateLong(eq.installDate)}</td>
                  <td>
                    <div style={{ color: expired ? 'var(--sp-red-600)' : 'inherit', fontWeight: expired ? 700 : 400 }}>
                      {dateLong(eq.warrantyEnd)}
                    </div>
                    {expired && <div className="sp-mute" style={{ fontSize: 11, color: 'var(--sp-red-600)' }}>EXPIRED</div>}
                  </td>
                  <td>{dateLong(eq.lastService)}</td>
                  <td><span className={`sp-badge ${statusBadgeClass(eq.status)}`}>{eq.status}</span></td>
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
