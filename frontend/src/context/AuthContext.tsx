"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  type User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, googleProvider, facebookProvider } from "@/lib/firebase/config";

export type UserRole = "student" | "teacher" | "admin" | "super_admin" | "public";

export interface AppUser extends User {
  role?: UserRole;
  displayName: string | null;
}

interface AuthContextType {
  user:               AppUser | null;
  role:               UserRole;
  loading:            boolean;
  isConfigured:       boolean;
  loginWithGoogle:    () => Promise<void>;
  loginWithFacebook:  () => Promise<void>;
  loginWithEmail:     (email: string, password: string) => Promise<void>;
  registerWithEmail:  (name: string, email: string, password: string) => Promise<void>;
  resetPassword:      (email: string) => Promise<void>;
  logout:             () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/** True only when the Firebase Auth instance is a real (initialized) object */
function isRealAuth(a: typeof auth): boolean {
  return typeof (a as unknown as { onAuthStateChanged?: unknown }).onAuthStateChanged === "function";
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user,    setUser]    = useState<AppUser | null>(null);
  const [role,    setRole]    = useState<UserRole>("public");
  const [loading, setLoading] = useState(true);

  const configured = isRealAuth(auth);

  // ─── Subscribe to auth state ────────────────────────────────────────────────
  useEffect(() => {
    // If Firebase is not configured (missing .env.local), skip silently
    if (!configured) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userRole = await fetchUserRole(firebaseUser);
        setUser({ ...firebaseUser, role: userRole } as AppUser);
        setRole(userRole);
      } else {
        setUser(null);
        setRole("public");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configured]);

  // ─── Firestore helpers ───────────────────────────────────────────────────────
  const fetchUserRole = async (firebaseUser: User): Promise<UserRole> => {
    try {
      const snap = await getDoc(doc(db, "users", firebaseUser.uid));
      if (snap.exists()) return (snap.data().role as UserRole) ?? "student";
    } catch {}
    return "student";
  };

  const saveUserToFirestore = async (
    firebaseUser: User,
    name?: string,
    roleOverride?: UserRole
  ) => {
    try {
      const ref  = doc(db, "users", firebaseUser.uid);
      const snap = await getDoc(ref);
      if (!snap.exists()) {
        await setDoc(ref, {
          uid:       firebaseUser.uid,
          name:      name ?? firebaseUser.displayName ?? "",
          email:     firebaseUser.email,
          photoURL:  firebaseUser.photoURL ?? "",
          role:      roleOverride ?? "student",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          status:    "active",
        });
      }
    } catch (err) {
      console.error("[AuthContext] saveUserToFirestore failed:", err);
    }
  };

  // ─── Auth actions (no-op if Firebase not configured) ─────────────────────────
  const notConfiguredError = () => {
    throw new Error("Firebase is not configured. Add credentials to .env.local");
  };

  const loginWithGoogle = async () => {
    if (!configured) return notConfiguredError();
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await saveUserToFirestore(result.user);
    } finally { setLoading(false); }
  };

  const loginWithFacebook = async () => {
    if (!configured) return notConfiguredError();
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      await saveUserToFirestore(result.user);
    } finally { setLoading(false); }
  };

  const loginWithEmail = async (email: string, password: string) => {
    if (!configured) return notConfiguredError();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } finally { setLoading(false); }
  };

  const registerWithEmail = async (name: string, email: string, password: string) => {
    if (!configured) return notConfiguredError();
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: name });
      await saveUserToFirestore(result.user, name);
    } finally { setLoading(false); }
  };

  const resetPassword = async (email: string) => {
    if (!configured) return notConfiguredError();
    await sendPasswordResetEmail(auth, email);
  };

  const logout = async () => {
    if (!configured) return;
    setLoading(true);
    try { await signOut(auth); } finally { setLoading(false); }
  };

  return (
    <AuthContext.Provider value={{
      user, role, loading,
      isConfigured: configured,
      loginWithGoogle, loginWithFacebook,
      loginWithEmail, registerWithEmail,
      resetPassword, logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
