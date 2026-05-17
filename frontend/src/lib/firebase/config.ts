import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { env } from "@/lib/env";

const firebaseConfig = {
  apiKey:            env.firebase.apiKey,
  authDomain:        env.firebase.authDomain,
  projectId:         env.firebase.projectId,
  storageBucket:     env.firebase.storageBucket,
  messagingSenderId: env.firebase.messagingSenderId,
  appId:             env.firebase.appId,
  measurementId:     env.firebase.measurementId,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth    = getAuth(app);
export const db      = getFirestore(app);
export const storage = getStorage(app);

export const googleProvider   = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export default app;
