// ServicePro is a generic field-service platform.
// Each trade gets its own config: terminology, default service types,
// recurrence patterns, equipment categories, and KPI focus.

export const TRADES = {
  lawn: {
    id: 'lawn',
    label: 'Lawn & Landscape',
    tagline: 'Mowing, fertilization, irrigation, cleanups.',
    icon: 'leaf',
    accent: '#16A34A',
    jobNoun: 'Service Visit',
    technicianNoun: 'Crew',
    sites: 'Property',
    services: [
      { code: 'MOW', label: 'Mow & Edge', defaultPrice: 65, defaultDurationMin: 30 },
      { code: 'FERT', label: 'Fertilization', defaultPrice: 95, defaultDurationMin: 25 },
      { code: 'AERATE', label: 'Core Aeration', defaultPrice: 180, defaultDurationMin: 60 },
      { code: 'CLEANUP', label: 'Seasonal Cleanup', defaultPrice: 240, defaultDurationMin: 120 },
      { code: 'IRR', label: 'Irrigation Tune-Up', defaultPrice: 145, defaultDurationMin: 75 },
    ],
    recurrencePresets: ['Weekly', 'Bi-weekly', 'Monthly', '6 visits/yr', 'Spring/Fall'],
    equipmentCategories: ['Irrigation Controller', 'Backflow Preventer', 'Sprinkler Zone'],
    seasonalPeak: 'Spring–Fall',
  },
  hvac: {
    id: 'hvac',
    label: 'HVAC',
    tagline: 'Heating, cooling, maintenance contracts.',
    icon: 'thermo',
    accent: '#2563EB',
    jobNoun: 'Service Call',
    technicianNoun: 'Technician',
    sites: 'Site',
    services: [
      { code: 'PM-AC', label: 'AC Tune-Up', defaultPrice: 149, defaultDurationMin: 60 },
      { code: 'PM-FUR', label: 'Furnace Tune-Up', defaultPrice: 149, defaultDurationMin: 60 },
      { code: 'DIAG', label: 'Diagnostic Visit', defaultPrice: 89, defaultDurationMin: 45 },
      { code: 'INST', label: 'New System Install', defaultPrice: 6800, defaultDurationMin: 480 },
      { code: 'EMER', label: 'Emergency Call', defaultPrice: 195, defaultDurationMin: 90 },
    ],
    recurrencePresets: ['Spring + Fall', 'Quarterly', 'Annual', 'Monthly'],
    equipmentCategories: ['Air Handler', 'Condenser', 'Furnace', 'Mini-Split', 'Thermostat'],
    seasonalPeak: 'Summer & Winter',
  },
  plumbing: {
    id: 'plumbing',
    label: 'Plumbing',
    tagline: 'Repairs, installs, drain service, emergency.',
    icon: 'wrench',
    accent: '#0EA5E9',
    jobNoun: 'Job',
    technicianNoun: 'Plumber',
    sites: 'Property',
    services: [
      { code: 'DRAIN', label: 'Drain Cleaning', defaultPrice: 175, defaultDurationMin: 60 },
      { code: 'WH', label: 'Water Heater Service', defaultPrice: 245, defaultDurationMin: 90 },
      { code: 'FIX', label: 'Fixture Repair', defaultPrice: 145, defaultDurationMin: 60 },
      { code: 'LEAK', label: 'Leak Detection', defaultPrice: 295, defaultDurationMin: 120 },
      { code: 'EMER', label: 'Emergency Call', defaultPrice: 225, defaultDurationMin: 90 },
    ],
    recurrencePresets: ['Annual Inspection', 'Bi-annual', 'On-call'],
    equipmentCategories: ['Water Heater', 'Sump Pump', 'Water Softener', 'Backflow'],
    seasonalPeak: 'Year-round',
  },
  pool: {
    id: 'pool',
    label: 'Pool Service',
    tagline: 'Cleaning, chemistry, equipment, openings.',
    icon: 'drop',
    accent: '#06B6D4',
    jobNoun: 'Visit',
    technicianNoun: 'Tech',
    sites: 'Pool',
    services: [
      { code: 'CLEAN', label: 'Weekly Cleaning', defaultPrice: 85, defaultDurationMin: 30 },
      { code: 'CHEM', label: 'Chemistry Balance', defaultPrice: 45, defaultDurationMin: 15 },
      { code: 'OPEN', label: 'Pool Opening', defaultPrice: 325, defaultDurationMin: 180 },
      { code: 'CLOSE', label: 'Pool Closing', defaultPrice: 295, defaultDurationMin: 150 },
      { code: 'EQUIP', label: 'Equipment Service', defaultPrice: 165, defaultDurationMin: 75 },
    ],
    recurrencePresets: ['Weekly', 'Bi-weekly', 'Open/Close', 'Monthly'],
    equipmentCategories: ['Pump', 'Filter', 'Heater', 'Salt Cell', 'Automation'],
    seasonalPeak: 'May–Sept',
  },
  pest: {
    id: 'pest',
    label: 'Pest Control',
    tagline: 'General pest, termite, rodent, mosquito.',
    icon: 'bug',
    accent: '#84CC16',
    jobNoun: 'Treatment',
    technicianNoun: 'Tech',
    sites: 'Property',
    services: [
      { code: 'GEN', label: 'General Pest Treatment', defaultPrice: 110, defaultDurationMin: 45 },
      { code: 'TERM', label: 'Termite Inspection', defaultPrice: 195, defaultDurationMin: 75 },
      { code: 'MOSQ', label: 'Mosquito Treatment', defaultPrice: 95, defaultDurationMin: 30 },
      { code: 'ROD', label: 'Rodent Service', defaultPrice: 185, defaultDurationMin: 60 },
    ],
    recurrencePresets: ['Monthly', 'Quarterly', 'Bi-monthly', 'Seasonal'],
    equipmentCategories: ['Bait Station', 'Termite Monitor', 'Mosquito Misting'],
    seasonalPeak: 'Spring–Summer',
  },
};

// The active trade. In production this would come from the company's settings.
export const ACTIVE_TRADE = TRADES.hvac;

// Helper — given a trade id, return its config (falls back to active).
export function getTrade(id) {
  return TRADES[id] || ACTIVE_TRADE;
}
