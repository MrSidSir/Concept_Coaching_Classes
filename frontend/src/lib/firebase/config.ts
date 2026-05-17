import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import {
  getAuth, GoogleAuthProvider, FacebookAuthProvider,
  type Auth,
} from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
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

// Guard: don't crash the entire app if Firebase isn't configured yet.
// In production, env.ts will throw early if keys are missing.
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

try {
  app     = getApps().length ? getApp() : initializeApp(firebaseConfig);
  auth    = getAuth(app);
  db      = getFirestore(app);
  storage = getStorage(app);
} catch (err) {
  if (process.env.NODE_ENV !== "production") {
    console.warn(
      "[Firebase] Initialization skipped — add real credentials to .env.local\n" +
      "Copy frontend/.env.example → frontend/.env.local and fill in your Firebase values."
    );
  } else {
    throw err;
  }
  // Provide typed stubs so imports don't break during local dev without credentials
  app     = {} as FirebaseApp;
  auth    = {} as Auth;
  db      = {} as Firestore;
  storage = {} as FirebaseStorage;
}

export { auth, db, storage };

export const googleProvider   = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
try { googleProvider.setCustomParameters({ prompt: "select_account" }); } catch {}

export default app;
