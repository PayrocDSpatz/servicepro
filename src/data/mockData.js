// Mock dataset for ServicePro demos. Configured against an HVAC trade by default,
// but the shape is generic so any trade can render against it.

export const customers = [
  { id: 'c1', name: 'Margaret Chen', address: '4128 Willow Creek Dr', city: 'Plano', state: 'TX', zip: '75024', phone: '(214) 555-0142', email: 'mchen@example.com', tags: ['VIP', 'Maintenance Plan'], balance: 0, lastVisit: '2026-04-12', accountValue: 4820 },
  { id: 'c2', name: 'Davidson Family Trust', address: '2210 Park Lane', city: 'Frisco', state: 'TX', zip: '75034', phone: '(972) 555-0188', email: 'davidson@example.com', tags: ['Maintenance Plan'], balance: 245, lastVisit: '2026-04-22', accountValue: 6240 },
  { id: 'c3', name: 'Rio Grande Coffee Co.', address: '880 W Industrial', city: 'Dallas', state: 'TX', zip: '75207', phone: '(214) 555-0119', email: 'ops@riogrande.example', tags: ['Commercial', 'Net-30'], balance: 1875, lastVisit: '2026-04-28', accountValue: 18450 },
  { id: 'c4', name: 'Aaron Velasquez', address: '1518 Oak Hollow', city: 'McKinney', state: 'TX', zip: '75070', phone: '(469) 555-0124', email: 'av@example.com', tags: [], balance: 0, lastVisit: '2026-03-30', accountValue: 1450 },
  { id: 'c5', name: 'Sterling Property Mgmt', address: '12 Pegasus Plaza', city: 'Irving', state: 'TX', zip: '75063', phone: '(972) 555-0166', email: 'maint@sterling.example', tags: ['Commercial', 'Maintenance Plan', 'Multi-site'], balance: 0, lastVisit: '2026-04-25', accountValue: 24300 },
  { id: 'c6', name: 'Nadia & Owen Park', address: '775 Chisholm Rd', city: 'Allen', state: 'TX', zip: '75002', phone: '(214) 555-0177', email: 'parks@example.com', tags: ['New'], balance: 0, lastVisit: null, accountValue: 0 },
  { id: 'c7', name: 'Bayside Restaurant Group', address: '2420 Lakefront Blvd', city: 'Lewisville', state: 'TX', zip: '75057', phone: '(972) 555-0103', email: 'ops@bayside.example', tags: ['Commercial', 'Priority'], balance: 0, lastVisit: '2026-04-20', accountValue: 11200 },
  { id: 'c8', name: 'Helena Brookfield', address: '60 Sycamore Ct', city: 'Plano', state: 'TX', zip: '75093', phone: '(214) 555-0190', email: 'hb@example.com', tags: ['Maintenance Plan'], balance: 89, lastVisit: '2026-04-08', accountValue: 2980 },
];

export const technicians = [
  { id: 't1', name: 'Carlos Mendez', initials: 'CM', color: 'orange', activeJobs: 3, todayHours: 6.5 },
  { id: 't2', name: 'Tasha Wright', initials: 'TW', color: 'blue', activeJobs: 4, todayHours: 7.0 },
  { id: 't3', name: 'Devon Harper', initials: 'DH', color: 'green', activeJobs: 2, todayHours: 4.0 },
];

const today = new Date('2026-04-30');
const iso = (d) => d.toISOString().slice(0, 10);
const dayOffset = (n, h = 9) => {
  const d = new Date(today);
  d.setDate(d.getDate() + n);
  d.setHours(h, 0, 0, 0);
  return d.toISOString();
};

export const jobs = [
  { id: 'j1001', customerId: 'c1', service: 'AC Tune-Up', serviceCode: 'PM-AC', start: dayOffset(0, 8), durationMin: 60, technicianId: 't1', status: 'Scheduled', priority: 'Normal', address: '4128 Willow Creek Dr, Plano', notes: 'Front gate code 4421. Two-system home.', estTotal: 298 },
  { id: 'j1002', customerId: 'c3', service: 'Emergency Call', serviceCode: 'EMER', start: dayOffset(0, 9, 30), durationMin: 90, technicianId: 't2', status: 'In Progress', priority: 'Urgent', address: '880 W Industrial, Dallas', notes: 'Walk-in cooler down. Manager on-site: Sam.', estTotal: 425 },
  { id: 'j1003', customerId: 'c5', service: 'Diagnostic Visit', serviceCode: 'DIAG', start: dayOffset(0, 11), durationMin: 45, technicianId: 't1', status: 'Scheduled', priority: 'Normal', address: '12 Pegasus Plaza, Irving', notes: 'Suite 240 - thermostat unresponsive.', estTotal: 89 },
  { id: 'j1004', customerId: 'c2', service: 'Furnace Tune-Up', serviceCode: 'PM-FUR', start: dayOffset(0, 13), durationMin: 60, technicianId: 't3', status: 'Scheduled', priority: 'Normal', address: '2210 Park Lane, Frisco', notes: 'Annual maintenance. Filter sizes on file.', estTotal: 149 },
  { id: 'j1005', customerId: 'c8', service: 'AC Tune-Up', serviceCode: 'PM-AC', start: dayOffset(0, 15), durationMin: 60, technicianId: 't2', status: 'Scheduled', priority: 'Normal', address: '60 Sycamore Ct, Plano', notes: '', estTotal: 149 },
  { id: 'j1006', customerId: 'c7', service: 'New System Install', serviceCode: 'INST', start: dayOffset(1, 7), durationMin: 480, technicianId: 't1', status: 'Scheduled', priority: 'High', address: '2420 Lakefront Blvd, Lewisville', notes: '5-ton rooftop unit replacement. Crane scheduled 7:30am.', estTotal: 8400 },
  { id: 'j1007', customerId: 'c4', service: 'Diagnostic Visit', serviceCode: 'DIAG', start: dayOffset(1, 10), durationMin: 45, technicianId: 't3', status: 'Scheduled', priority: 'Normal', address: '1518 Oak Hollow, McKinney', notes: 'Customer reports uneven cooling 2nd floor.', estTotal: 89 },
  { id: 'j1008', customerId: 'c6', service: 'AC Tune-Up', serviceCode: 'PM-AC', start: dayOffset(2, 9), durationMin: 60, technicianId: 't2', status: 'Scheduled', priority: 'Normal', address: '775 Chisholm Rd, Allen', notes: 'New customer. First visit.', estTotal: 149 },
  { id: 'j1009', customerId: 'c1', service: 'Filter Replacement', serviceCode: 'PM-AC', start: dayOffset(-1, 14), durationMin: 30, technicianId: 't3', status: 'Completed', priority: 'Normal', address: '4128 Willow Creek Dr, Plano', notes: 'Replaced 2x 16x25x1 MERV 11.', estTotal: 60 },
  { id: 'j1010', customerId: 'c5', service: 'Quarterly Maintenance', serviceCode: 'PM-AC', start: dayOffset(-2, 8), durationMin: 240, technicianId: 't1', status: 'Completed', priority: 'Normal', address: '12 Pegasus Plaza, Irving', notes: '6 RTUs serviced.', estTotal: 1200 },
];

export const invoices = [
  { id: 'INV-3142', customerId: 'c1', jobId: 'j1009', issued: '2026-04-29', due: '2026-05-13', total: 60.00, paid: 60.00, status: 'Paid' },
  { id: 'INV-3141', customerId: 'c5', jobId: 'j1010', issued: '2026-04-28', due: '2026-05-28', total: 1200.00, paid: 0, status: 'Sent' },
  { id: 'INV-3140', customerId: 'c3', jobId: null, issued: '2026-04-25', due: '2026-04-25', total: 1875.00, paid: 0, status: 'Overdue' },
  { id: 'INV-3139', customerId: 'c2', jobId: null, issued: '2026-04-22', due: '2026-05-06', total: 245.00, paid: 0, status: 'Sent' },
  { id: 'INV-3138', customerId: 'c8', jobId: null, issued: '2026-04-20', due: '2026-04-20', total: 89.00, paid: 0, status: 'Overdue' },
  { id: 'INV-3137', customerId: 'c7', jobId: null, issued: '2026-04-18', due: '2026-05-02', total: 425.00, paid: 425.00, status: 'Paid' },
  { id: 'INV-3136', customerId: 'c4', jobId: null, issued: '2026-04-15', due: '2026-04-29', total: 158.00, paid: 158.00, status: 'Paid' },
  { id: 'INV-3135', customerId: 'c1', jobId: null, issued: '2026-04-10', due: '2026-04-24', total: 295.00, paid: 295.00, status: 'Paid' },
];

export const servicePlans = [
  { id: 'sp-201', customerId: 'c1', name: 'Comfort Club — Residential', cadence: 'Spring + Fall', priceMonthly: 18, includesServices: ['AC Tune-Up', 'Furnace Tune-Up', 'Priority Booking', '15% Repair Discount'], visitsPerYear: 2, nextVisit: '2026-09-15', status: 'Active' },
  { id: 'sp-202', customerId: 'c2', name: 'Comfort Club — Residential', cadence: 'Spring + Fall', priceMonthly: 18, includesServices: ['AC Tune-Up', 'Furnace Tune-Up', 'Priority Booking', '15% Repair Discount'], visitsPerYear: 2, nextVisit: '2026-10-08', status: 'Active' },
  { id: 'sp-203', customerId: 'c5', name: 'Commercial Quarterly', cadence: 'Quarterly', priceMonthly: 695, includesServices: ['Quarterly RTU Service', '24/7 Emergency Response', 'Filter Program', '10% Equipment Discount'], visitsPerYear: 4, nextVisit: '2026-07-25', status: 'Active' },
  { id: 'sp-204', customerId: 'c8', name: 'Comfort Club — Residential', cadence: 'Spring + Fall', priceMonthly: 18, includesServices: ['AC Tune-Up', 'Furnace Tune-Up', 'Priority Booking', '15% Repair Discount'], visitsPerYear: 2, nextVisit: '2026-09-22', status: 'Active' },
  { id: 'sp-205', customerId: 'c7', name: 'Commercial Quarterly', cadence: 'Quarterly', priceMonthly: 425, includesServices: ['Quarterly Service', 'Priority Response', 'Filter Program'], visitsPerYear: 4, nextVisit: '2026-07-18', status: 'Active' },
  { id: 'sp-206', customerId: 'c4', name: 'Comfort Club — Residential', cadence: 'Spring + Fall', priceMonthly: 18, includesServices: ['AC Tune-Up', 'Furnace Tune-Up', 'Priority Booking', '15% Repair Discount'], visitsPerYear: 2, nextVisit: '2026-09-30', status: 'Pending' },
];

export const equipment = [
  { id: 'eq-1', customerId: 'c1', category: 'Condenser', make: 'Trane', model: 'XR16', serial: 'TR-9912-A', installDate: '2019-06-12', warrantyEnd: '2029-06-12', lastService: '2026-04-12', notes: 'R-410A. East side of home.', status: 'Good' },
  { id: 'eq-2', customerId: 'c1', category: 'Furnace', make: 'Trane', model: 'S9X1', serial: 'TR-9912-B', installDate: '2019-06-12', warrantyEnd: '2029-06-12', lastService: '2025-10-04', notes: '95% AFUE.', status: 'Good' },
  { id: 'eq-3', customerId: 'c2', category: 'Condenser', make: 'Carrier', model: 'Performance 17', serial: 'CR-3380', installDate: '2017-08-04', warrantyEnd: '2027-08-04', lastService: '2026-04-22', notes: '', status: 'Good' },
  { id: 'eq-4', customerId: 'c5', category: 'Air Handler', make: 'Lennox', model: 'EL296V', serial: 'LX-77821', installDate: '2021-02-19', warrantyEnd: '2031-02-19', lastService: '2026-04-25', notes: 'Roof unit RTU-3.', status: 'Service Soon' },
  { id: 'eq-5', customerId: 'c5', category: 'Air Handler', make: 'Lennox', model: 'EL296V', serial: 'LX-77822', installDate: '2021-02-19', warrantyEnd: '2031-02-19', lastService: '2026-04-25', notes: 'Roof unit RTU-4.', status: 'Good' },
  { id: 'eq-6', customerId: 'c3', category: 'Condenser', make: 'York', model: 'YXV', serial: 'YK-44120', installDate: '2014-05-22', warrantyEnd: '2024-05-22', lastService: '2026-04-28', notes: 'Out of warranty. Recommend replacement Q3.', status: 'Attention' },
  { id: 'eq-7', customerId: 'c8', category: 'Mini-Split', make: 'Mitsubishi', model: 'MSZ-FH12', serial: 'MT-22910', installDate: '2022-03-08', warrantyEnd: '2032-03-08', lastService: '2026-04-08', notes: 'Master bedroom.', status: 'Good' },
  { id: 'eq-8', customerId: 'c7', category: 'Condenser', make: 'Goodman', model: 'GSXC18', serial: 'GD-11455', installDate: '2018-09-10', warrantyEnd: '2028-09-10', lastService: '2026-04-20', notes: '', status: 'Good' },
];
