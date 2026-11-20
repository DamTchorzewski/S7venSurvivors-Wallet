import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// The public settings of the Firebase web app (they are not secrets), set at build time from the repository variables.
const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
};

export const isFirebaseConfigured = Boolean(config.apiKey && config.projectId);

// Created on first use, so a build without the settings still starts (the demo works without Firebase).
export const getFirebaseAuth = () => {
  if (!isFirebaseConfigured) return null;
  if (!getApps().length) initializeApp(config);
  return getAuth();
};

export const googleProvider = new GoogleAuthProvider();

const MESSAGES = {
  'auth/invalid-credential': 'Incorrect e-mail or password',
  'auth/wrong-password': 'Incorrect e-mail or password',
  'auth/user-not-found': 'Incorrect e-mail or password',
  'auth/invalid-email': 'Enter a valid e-mail',
  'auth/email-already-in-use': 'E-mail is already in use',
  'auth/weak-password': 'Password is too weak',
  'auth/too-many-requests': 'Too many attempts, try again later',
  'auth/popup-closed-by-user': 'The Google window was closed',
  'auth/popup-blocked': 'The browser blocked the Google window',
  'auth/network-request-failed': 'No connection, try again',
};

export const authMessage = err =>
  MESSAGES[err?.code] ?? err?.message ?? 'Something went wrong';
