import React, { useState } from 'react';
import LandingPage from './views/LandingPage.jsx';
import AppShell from './components/AppShell.jsx';
import DashboardView from './views/DashboardView.jsx';
import JobsView from './views/JobsView.jsx';
import CustomersView from './views/CustomersView.jsx';
import InvoicesView from './views/InvoicesView.jsx';
import ServicePlansView from './views/ServicePlansView.jsx';
import EquipmentView from './views/EquipmentView.jsx';
import ReportsView from './views/ReportsView.jsx';
import SettingsView from './views/SettingsView.jsx';

export default function App() {
  // Two top-level modes: marketing landing page or in-app shell.
  const [mode, setMode] = useState('landing'); // 'landing' | 'app'
  const [view, setView] = useState('dashboard');

  if (mode === 'landing') {
    return <LandingPage onEnterApp={() => setMode('app')} />;
  }

  return (
    <AppShell
      activeView={view}
      onNavigate={setView}
      onExit={() => setMode('landing')}
    >
      {view === 'dashboard'    && <DashboardView />}
      {view === 'jobs'         && <JobsView />}
      {view === 'customers'    && <CustomersView />}
      {view === 'invoices'     && <InvoicesView />}
      {view === 'servicePlans' && <ServicePlansView />}
      {view === 'equipment'    && <EquipmentView />}
      {view === 'reports'      && <ReportsView />}
      {view === 'settings'     && <SettingsView />}
    </AppShell>
  );
}
