import * as dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
const authDomain = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
const projectId = process.env.REACT_APP_FIREBASE_PROJECT_ID;
const storageBucket = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID;
const appId = process.env.REACT_APP_FIREBASE_APP_ID;
const databaseURL = process.env.REACT_APP_FIREBASE_DATABASE_URL;
const measurementId = process.env.REACT_APP_FIREBASE_MEASUREMENT_ID;
const performanceEnabled =
  process.env.REACT_APP_FIREBASE_PERFORMANCE_ENABLED === 'true';

export const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  databaseURL,
  measurementId,
  performanceEnabled,
};
