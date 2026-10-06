import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyDxmWd_owgcPxyrJ0ARRDupqSzGmFcLFN4",
  authDomain: "chalojii-79c99.firebaseapp.com",
  projectId: "chalojii-79c99",
  storageBucket: "chalojii-79c99.firebasestorage.app",
  messagingSenderId: "1053199308891",
  appId: "1:1053199308891:web:da3b419ddbb7a3ef128716",
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const functions = getFunctions(app, "asia-south1");

export { signInAnonymously, httpsCallable };

