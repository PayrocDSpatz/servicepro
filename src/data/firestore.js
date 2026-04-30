// Firestore data layer. Each authenticated user gets their own workspace under
//   companies/{uid}/{collection}
// (For a real multi-tenant company you'd swap uid for a separate company doc.)
//
// Collections: customers, jobs, invoices, servicePlans, equipment, technicians

import {
  db, collection, doc, getDocs, setDoc, writeBatch, query, orderBy,
} from '../firebase.js';
import * as mock from './mockData.js';

function workspace(uid) {
  return `companies/${uid}`;
}

async function readCollection(uid, name, orderField) {
  if (!db) return [];
  const ref = collection(db, `${workspace(uid)}/${name}`);
  const q = orderField ? query(ref, orderBy(orderField)) : ref;
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function loadAll(uid) {
  if (!db) return null;
  const [customers, jobs, invoices, servicePlans, equipment, technicians] = await Promise.all([
    readCollection(uid, 'customers'),
    readCollection(uid, 'jobs', 'start'),
    readCollection(uid, 'invoices'),
    readCollection(uid, 'servicePlans'),
    readCollection(uid, 'equipment'),
    readCollection(uid, 'technicians'),
  ]);
  return { customers, jobs, invoices, servicePlans, equipment, technicians };
}

/* ---------- SEED ---------- */
// On first sign-in, populate the user's workspace with the demo dataset
// so the dashboard has something to show. Called once after sign-up.

export async function seedDemoData(uid) {
  if (!db) throw new Error('Firestore is not configured');
  const batch = writeBatch(db);

  const sets = [
    ['customers',    mock.customers],
    ['jobs',         mock.jobs],
    ['invoices',     mock.invoices],
    ['servicePlans', mock.servicePlans],
    ['equipment',    mock.equipment],
    ['technicians',  mock.technicians],
  ];

  for (const [name, items] of sets) {
    for (const item of items) {
      const id = item.id || doc(collection(db, `${workspace(uid)}/${name}`)).id;
      const ref = doc(db, `${workspace(uid)}/${name}/${id}`);
      // strip the `id` field from the doc body since it lives in the doc id already
      const { id: _drop, ...body } = item;
      batch.set(ref, body);
    }
  }

  // Also write a "company" profile doc so we know seed has run
  batch.set(doc(db, `companies/${uid}`), {
    seededAt: new Date().toISOString(),
    activeTrade: 'hvac',
  }, { merge: true });

  await batch.commit();
}

export async function isSeeded(uid) {
  if (!db) return false;
  const ref = collection(db, `${workspace(uid)}/customers`);
  const snap = await getDocs(query(ref));
  return snap.size > 0;
}
