// Formatting helpers used across views.

export const money = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n || 0);

export const moneyCompact = (n) => {
  if (n == null) return '$0';
  if (Math.abs(n) >= 1000) return '$' + (n / 1000).toFixed(1) + 'k';
  return '$' + Math.round(n);
};

export const initials = (name) => {
  if (!name) return '?';
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('');
};

export const dateLong = (d) => {
  if (!d) return '—';
  const date = typeof d === 'string' ? new Date(d) : d;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const dateShort = (d) => {
  if (!d) return '—';
  const date = typeof d === 'string' ? new Date(d) : d;
  return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });
};

export const time = (d) => {
  if (!d) return '—';
  const date = typeof d === 'string' ? new Date(d) : d;
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
};

export const dayOfWeek = (d) => {
  if (!d) return '';
  const date = typeof d === 'string' ? new Date(d) : d;
  return date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
};

export const minutesToHM = (mins) => {
  if (!mins) return '0m';
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h && m) return `${h}h ${m}m`;
  if (h) return `${h}h`;
  return `${m}m`;
};

export const statusBadgeClass = (status) => {
  const s = (status || '').toLowerCase();
  if (s.includes('paid') || s.includes('complete') || s === 'good' || s === 'active') return 'sp-badge-success';
  if (s.includes('overdue') || s.includes('attention') || s === 'urgent') return 'sp-badge-danger';
  if (s.includes('progress') || s.includes('soon') || s === 'high') return 'sp-badge-warn';
  if (s.includes('sent') || s === 'pending' || s === 'normal') return 'sp-badge-info';
  return '';
};
