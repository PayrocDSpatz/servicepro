// DataContext — single source of truth for app data.
// When a user is signed in and Firebase is configured, reads from Firestore.
// In demo mode (signed out, or Firebase not configured), falls back to mockData.

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as mock from './mockData.js';
import { loadAll, seedDemoData, isSeeded } from './firestore.js';
import { isConfigured } from '../firebase.js';

const DataCtx = createContext(null);
export const useData = () => useContext(DataCtx);

export function DataProvider({ user, children }) {
  const [state, setState] = useState({
    loading: false,
    error: null,
    customers: mock.customers,
    jobs: mock.jobs,
    invoices: mock.invoices,
    servicePlans: mock.servicePlans,
    equipment: mock.equipment,
    technicians: mock.technicians,
    isLive: false, // true when reading from Firestore, false in demo
  });

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!user || !isConfigured) {
        // Demo mode — use mock data, no async needed.
        setState((s) => ({ ...s, isLive: false, loading: false, error: null }));
        return;
      }

      setState((s) => ({ ...s, loading: true, error: null }));
      try {
        const seeded = await isSeeded(user.uid);
        if (!seeded) {
          await seedDemoData(user.uid);
        }
        const data = await loadAll(user.uid);
        if (cancelled) return;
        setState({
          loading: false,
          error: null,
          customers: data.customers.length ? data.customers : mock.customers,
          jobs: data.jobs.length ? data.jobs : mock.jobs,
          invoices: data.invoices.length ? data.invoices : mock.invoices,
          servicePlans: data.servicePlans.length ? data.servicePlans : mock.servicePlans,
          equipment: data.equipment.length ? data.equipment : mock.equipment,
          technicians: data.technicians.length ? data.technicians : mock.technicians,
          isLive: true,
        });
      } catch (err) {
        console.error('Failed to load data:', err);
        if (!cancelled) {
          setState((s) => ({ ...s, loading: false, error: err.message, isLive: false }));
        }
      }
    }
    load();
    return () => { cancelled = true; };
  }, [user]);

  const value = useMemo(() => state, [state]);
  return <DataCtx.Provider value={value}>{children}</DataCtx.Provider>;
}
