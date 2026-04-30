// Lightweight inline SVG icon set. Stroke-based, 24x24 viewBox.
// Keeps the bundle small and avoids a runtime icon library.

import React from 'react';

const PATHS = {
  // Navigation
  dashboard: <><rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" /></>,
  jobs: <><rect x="3" y="6" width="18" height="15" rx="2" /><path d="M3 10h18" /><path d="M8 3v4M16 3v4" /></>,
  customers: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" /></>,
  invoices: <><path d="M6 2h9l5 5v15H6z" /><path d="M14 2v6h6" /><path d="M9 13h6M9 17h6" /></>,
  servicePlans: <><path d="M9 12l2 2 4-4" /><path d="M21 12c0 5-3.5 8-9 9-5.5-1-9-4-9-9V5l9-3 9 3z" /></>,
  equipment: <><path d="M14.7 6.3l3 3-9.7 9.7H5v-3z" /><path d="M3 21h18" /><circle cx="6" cy="6" r="2" /><circle cx="18" cy="18" r="2" /></>,
  reports: <><path d="M3 3v18h18" /><path d="M7 14l3-3 4 4 5-7" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></>,

  // Actions
  search: <><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  filter: <><path d="M3 5h18l-7 9v6l-4-2v-4z" /></>,
  download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M7 10l5 5 5-5" /><path d="M12 15V3" /></>,
  more: <><circle cx="12" cy="12" r="1.5" /><circle cx="5" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" /></>,
  chevronRight: <><path d="M9 18l6-6-6-6" /></>,
  chevronDown: <><path d="M6 9l6 6 6-6" /></>,
  arrowRight: <><path d="M5 12h14M13 5l7 7-7 7" /></>,
  check: <><path d="M5 12l5 5L20 7" /></>,
  x: <><path d="M18 6L6 18M6 6l12 12" /></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></>,
  menu: <><path d="M3 12h18M3 6h18M3 18h18" /></>,

  // Domain icons
  phone: <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" /></>,
  pin: <><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  truck: <><rect x="1" y="6" width="14" height="11" rx="1" /><path d="M15 9h4l3 4v4h-7" /><circle cx="6" cy="19" r="2" /><circle cx="18" cy="19" r="2" /></>,
  wrench: <><path d="M14 6a4 4 0 1 1 4.6 3.95l-9 9a2.83 2.83 0 0 1-4-4l9-9A4 4 0 0 1 14 6z" /></>,
  thermo: <><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4 4 0 1 0 5 0z" /></>,
  leaf: <><path d="M11 20A7 7 0 0 1 4 13c0-7 9-11 17-11 0 8-4 17-10 17a7 7 0 0 1-3-1z" /><path d="M2 22l8-8" /></>,
  drop: <><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" /></>,
  bug: <><circle cx="12" cy="13" r="5" /><path d="M12 8v-3M9 5l3-2 3 2M5 13H2M22 13h-3M5 9l-3-2M22 9l-3-2M5 17l-3 2M22 17l-3 2M12 18v3" /></>,
  dollar: <><path d="M12 1v22" /><path d="M17 5H9.5a3.5 3.5 0 1 0 0 7h5a3.5 3.5 0 1 1 0 7H6" /></>,
  alert: <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><path d="M12 9v4M12 17h.01" /></>,
  zap: <><path d="M13 2L3 14h9l-1 8 10-12h-9z" /></>,
  shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></>,
};

export default function Icon({ name, size = 20, stroke = 2, className = '', style }) {
  const path = PATHS[name];
  if (!path) return null;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {path}
    </svg>
  );
}
