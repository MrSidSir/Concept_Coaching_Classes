"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
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
  user: AppUser | null;
  role: UserRole;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (name: string, email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [role, setRole] = useState<UserRole>("public");
  const [loading, setLoading] = useState(true);

  const fetchUserRole = async (firebaseUser: User): Promise<UserRole> => {
    try {
      const snap = await getDoc(doc(db, "users", firebaseUser.uid));
      if (snap.exists()) return (snap.data().role as UserRole) ?? "student";
    } catch {}
    return "student";
  };

  useEffect(() => {
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
  }, []);

  const saveUserToFirestore = async (firebaseUser: User, name?: string, roleOverride?: UserRole) => {
    const ref = doc(db, "users", firebaseUser.uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      await setDoc(ref, {
        uid: firebaseUser.uid,
        name: name ?? firebaseUser.displayName ?? "",
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL ?? "",
        role: roleOverride ?? "student",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: "active",
      });
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    const result = await signInWithPopup(auth, googleProvider);
    await saveUserToFirestore(result.user);
    setLoading(false);
  };

  const loginWithFacebook = async () => {
    setLoading(true);
    const result = await signInWithPopup(auth, facebookProvider);
    await saveUserToFirestore(result.user);
    setLoading(false);
  };

  const loginWithEmail = async (email: string, password: string) => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password);
    setLoading(false);
  };

  const registerWithEmail = async (name: string, email: string, password: string) => {
    setLoading(true);
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: name });
    await saveUserToFirestore(result.user, name);
    setLoading(false);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const logout = async () => {
    setLoading(true);
    await signOut(auth);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, role, loading, loginWithGoogle, loginWithFacebook, loginWithEmail, registerWithEmail, resetPassword, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
