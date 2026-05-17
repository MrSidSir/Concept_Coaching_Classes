"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import LogoutButton from "@/app/auth/LogoutButton";
import { SocialLinks } from "@/components/shared/SocialLinks";

const ADMIN_NAV = [
  { label: "Dashboard",          href: "/admin",                    icon: "📊" },
  { label: "Content Management", href: "/admin/content-management", icon: "🗂️" },
  { label: "Videos",             href: "/admin/videos",             icon: "🎬" },
  { label: "Notes & PDFs",       href: "/admin/notes",              icon: "📝" },
  { label: "Quizzes",            href: "/admin/quizzes",            icon: "✏️" },
  { label: "Students",           href: "/admin/students",           icon: "👨‍🎓" },
  { label: "Analytics",          href: "/admin/analytics",          icon: "📈" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { role, loading, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && role !== "admin" && role !== "super_admin") {
      router.replace("/dashboard");
    }
  }, [role, loading, router]);

  useEffect(() => { setSidebarOpen(false); }, [pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0a0a0f] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full" />
          <p className="text-gray-500 dark:text-slate-400 text-sm">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (role !== "admin" && role !== "super_admin") return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f] flex">
      {/* ── Mobile Overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Admin Sidebar ── */}
      <aside className={cn(
        "fixed top-0 left-0 h-full z-50 flex flex-col w-64",
        "bg-white dark:bg-[#111118] border-r border-gray-100 dark:border-[#33334b]",
        "shadow-xl transition-transform duration-300",
        "lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-gray-100 dark:border-[#33334b]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow">
              C
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">Admin Panel</p>
              <p className="text-[10px] text-gray-400 dark:text-slate-500 leading-tight">Concept Coaching</p>
            </div>
          </div>
          <button
            className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Admin Info */}
        <div className="px-4 py-3 mx-3 mt-3 mb-1 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-400">Mr. Sidsir</p>
          <p className="text-[10px] text-blue-500 dark:text-blue-500 truncate">irshad1554@gmail.com</p>
          <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 rounded-full text-[10px] font-medium capitalize">
            {role}
          </span>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto scrollbar-hide">
          {ADMIN_NAV.map((item) => {
            const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn("nav-item", active ? "nav-item-active" : "nav-item-idle")}
              >
                <span className="w-5 text-center text-base">{item.icon}</span>
                <span>{item.label}</span>
                {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="px-3 py-4 border-t border-gray-100 dark:border-[#33334b] space-y-3">
          <Link href="/" className="nav-item nav-item-idle text-xs">
            <span>🌐</span> View Public Site
          </Link>
          <div className="px-1">
            <SocialLinks size="xs" bare gap="gap-3" />
          </div>
          <LogoutButton />
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <div className="flex-1 flex flex-col lg:ml-64 min-w-0">
        {/* Admin Top Bar */}
        <header className="h-16 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 bg-white/95 dark:bg-[#0a0a0f]/95 backdrop-blur-sm border-b border-gray-100 dark:border-[#33334b]">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 rounded-xl text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-white/5 transition"
              onClick={() => setSidebarOpen(true)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            {/* Breadcrumb */}
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <span className="text-gray-400 dark:text-slate-500">Admin</span>
              <span className="text-gray-300 dark:text-slate-600">/</span>
              <span className="font-medium text-gray-800 dark:text-slate-200 capitalize">
                {pathname.split("/").pop()?.replace(/-/g, " ") || "Dashboard"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
              {user?.displayName?.[0] ?? "A"}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-x-hidden animate-fade-in-up">
          {children}
        </main>
      </div>
    </div>
  );
}
