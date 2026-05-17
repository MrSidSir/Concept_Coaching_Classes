"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import LogoutButton from "@/app/auth/LogoutButton";
import { cn } from "@/utils/cn";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Videos", href: "/videos" },
  { label: "Notes", href: "/notes" },
  { label: "Tests", href: "/tests" },
];

export default function Header() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close drawer on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Close drawer on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  // Prevent scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header className="w-full bg-white/95 dark:bg-[#0a0a0f]/95 backdrop-blur-sm shadow-sm border-b border-gray-100 dark:border-[#33334b] py-3 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-50 h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            C
          </div>
          <span className="text-base sm:text-lg font-bold text-blue-700 tracking-tight leading-tight">
            <span className="hidden xs:inline">Concept Coaching</span>
            <span className="xs:hidden">Concept</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                pathname === link.href
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              )}
            >
              {link.label}
            </Link>
          ))}
          {user && (
            <Link
              href="/dashboard"
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                pathname === "/dashboard"
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              )}
            >
              Dashboard
            </Link>
          )}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          {user ? (
            <>
              <span className="text-sm text-gray-500 max-w-[140px] truncate">
                {user.displayName ?? user.email}
              </span>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition shadow-sm"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile: Auth shortcut + Hamburger */}
        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle />
          {!user && (
            <Link
              href="/login"
              className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </Link>
          )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition focus:outline-none"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" aria-hidden="true" />
      )}

      {/* Mobile Drawer */}
      <div
        ref={drawerRef}
        className={cn(
          "fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-white shadow-2xl z-50 lg:hidden transform transition-transform duration-300 ease-in-out flex flex-col",
          menuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              C
            </div>
            <span className="font-bold text-blue-700">Concept Coaching</span>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* User Info */}
        {user && (
          <div className="px-5 py-3 bg-blue-50 border-b border-blue-100">
            <p className="text-xs text-gray-500">Logged in as</p>
            <p className="text-sm font-semibold text-gray-800 truncate">{user.displayName ?? user.email}</p>
          </div>
        )}

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {[...NAV_LINKS, ...(user ? [{ label: "Dashboard", href: "/dashboard" }] : [])].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                pathname === link.href
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
              )}
            >
              {link.label}
            </Link>
          ))}
          {(user as any)?.role === "admin" || (user as any)?.role === "super_admin" ? (
            <Link
              href="/admin"
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                pathname === "/admin" ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
              )}
            >
              ⚙️ Admin Panel
            </Link>
          ) : null}
        </nav>

        {/* Drawer Footer Auth */}
        <div className="px-5 py-4 border-t border-gray-100 space-y-2">
          {user ? (
            <LogoutButton />
          ) : (
            <>
              <Link
                href="/register"
                className="block w-full text-center px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition"
              >
                Register Now
              </Link>
              <Link
                href="/login"
                className="block w-full text-center px-4 py-2.5 border border-blue-600 text-blue-600 rounded-xl text-sm font-semibold hover:bg-blue-50 transition"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
