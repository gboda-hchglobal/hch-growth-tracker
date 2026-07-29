import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAZ5zhBySMG8VphO8bIn_1Ic-lwtippotw",
  appId: "1:279426418573:web:e9bffe5cb121928e855fc4",
  messagingSenderId: "279426418573",
  projectId: "hch-growth-tracker-c465a",
  authDomain: "hch-growth-tracker-c465a.firebaseapp.com",
  storageBucket: "hch-growth-tracker-c465a.firebasestorage.app",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
