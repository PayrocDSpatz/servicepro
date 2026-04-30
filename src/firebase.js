// Firebase initialization. All values come from Vite env vars (VITE_FIREBASE_*),
// which Vercel passes through to the browser at build time. Locally, put them
// in a .env.local file at the project root (see .env.example).

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as fbSignOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  setDoc,
  writeBatch,
  query,
  orderBy,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

// `isConfigured` lets the app run in demo mode (mock data only) when env vars
// aren't set yet — useful for the landing page and previews.
export const isConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

let app, auth, db;
if (isConfigured) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
}

const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };

/* ---------- Auth helpers ---------- */

export async function signInEmail(email, password) {
  if (!auth) throw new Error('Firebase is not configured');
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signUpEmail(email, password, displayName) {
  if (!auth) throw new Error('Firebase is not configured');
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) {
    await updateProfile(cred.user, { displayName });
  }
  return cred;
}

export async function signInGoogle() {
  if (!auth) throw new Error('Firebase is not configured');
  return signInWithPopup(auth, googleProvider);
}

export async function resetPassword(email) {
  if (!auth) throw new Error('Firebase is not configured');
  return sendPasswordResetEmail(auth, email);
}

export function signOut() {
  if (!auth) return Promise.resolve();
  return fbSignOut(auth);
}

export function watchAuth(cb) {
  if (!auth) {
    cb(null);
    return () => {};
  }
  return onAuthStateChanged(auth, cb);
}

/* ---------- Firestore helpers (used by data/firestore.js) ---------- */

export {
  collection, doc, getDocs, setDoc, writeBatch, query, orderBy,
};
