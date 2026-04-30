import React, { useEffect, useState } from 'react';
import LandingPage from './views/LandingPage.jsx';
import AuthView from './views/AuthView.jsx';
import AppShell from './components/AppShell.jsx';
import DashboardView from './views/DashboardView.jsx';
import JobsView from './views/JobsView.jsx';
import CustomersView from './views/CustomersView.jsx';
import InvoicesView from './views/InvoicesView.jsx';
import ServicePlansView from './views/ServicePlansView.jsx';
import EquipmentView from './views/EquipmentView.jsx';
import ReportsView from './views/ReportsView.jsx';
import SettingsView from './views/SettingsView.jsx';
import { watchAuth, signOut, isConfigured } from './firebase.js';
import { DataProvider } from './data/DataContext.jsx';

export default function App() {
  const [mode, setMode] = useState('landing');
  const [view, setView] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(!isConfigured);

  useEffect(() => {
    const unsub = watchAuth((u) => {
      setUser(u);
      setAuthReady(true);
      if (u) setMode('app');
    });
    return unsub;
  }, []);

  if (!authReady) {
    return <div style={{ padding: 40, fontFamily: 'system-ui' }}>Loading...</div>;
  }

  if (mode === 'landing') {
    return (
      <LandingPage
        onEnterApp={() => setMode(isConfigured ? 'auth' : 'app')}
      />
    );
  }

  if (mode === 'auth') {
    return (
      <AuthView
        onBack={() => setMode('landing')}
        onContinueDemo={() => setMode('app')}
      />
    );
  }

  return (
    <DataProvider user={user}>
      <AppShell
        activeView={view}
        onNavigate={setView}
        user={user}
        onSignOut={async () => { await signOut(); setMode('landing'); }}
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
    </DataProvider>
  );
}
