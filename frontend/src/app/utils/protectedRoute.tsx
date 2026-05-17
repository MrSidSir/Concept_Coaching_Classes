// utils/protectedRoute.tsx
// Protects a page/component so only authenticated users can access

"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // Redirect to login if not authenticated
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    // Show loading or nothing while checking auth
    return <div className="text-center py-12 text-blue-600">Loading...</div>;
  }

  // Render children if authenticated
  return <>{children}</>;
}

export {};
