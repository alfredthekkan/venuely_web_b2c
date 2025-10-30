// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Environment-aware Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_APP_MEASUREMENT_ID
};

// Log current environment for debugging
if (typeof window !== 'undefined') {
  console.log(`🔥 Firebase Environment: ${process.env.NEXT_PUBLIC_ENVIRONMENT}`);
  console.log(`📱 Project ID: ${firebaseConfig.projectId}`);
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig): getApp()
const auth = getAuth(app)
auth.useDeviceLanguage();
export { auth }