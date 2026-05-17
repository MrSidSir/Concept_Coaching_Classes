"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/utils/cn";

interface NavItem {
  label: string;
  href: string;
  icon: string;
  roles: string[];
}

const navItems: NavItem[] = [
  { label: "Home",       href: "/",          icon: "🏠", roles: ["public","student","teacher","admin","super_admin"] },
  { label: "Dashboard",  href: "/dashboard", icon: "📊", roles: ["student","teacher","admin","super_admin"] },
  { label: "Courses",    href: "/courses",   icon: "📚", roles: ["public","student","teacher","admin","super_admin"] },
  { label: "Videos",     href: "/videos",    icon: "🎬", roles: ["public","student","teacher","admin","super_admin"] },
  { label: "Notes",      href: "/notes",     icon: "📝", roles: ["student","teacher","admin","super_admin"] },
  { label: "Tests",      href: "/tests",     icon: "✏️",  roles: ["student","teacher","admin","super_admin"] },
  { label: "Admin",      href: "/admin",     icon: "⚙️",  roles: ["admin","super_admin"] },
];

// Bottom nav shows only key 5 items on mobile
const bottomNav: NavItem[] = [
  { label: "Home",      href: "/",          icon: "🏠", roles: ["public","student","teacher","admin","super_admin"] },
  { label: "Courses",   href: "/courses",   icon: "📚", roles: ["public","student","teacher","admin","super_admin"] },
  { label: "Videos",    href: "/videos",    icon: "🎬", roles: ["public","student","teacher","admin","super_admin"] },
  { label: "Tests",     href: "/tests",     icon: "✏️",  roles: ["student","teacher","admin","super_admin"] },
  { label: "Dashboard", href: "/dashboard", icon: "📊", roles: ["student","teacher","admin","super_admin"] },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { role } = useAuth();

  const visibleSidebar = navItems.filter((item) => item.roles.includes(role));
  const visibleBottom = bottomNav.filter((item) => item.roles.includes(role));

  return (
    <>
      {/* ─── Desktop / Tablet Sidebar ─── */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-white border-r border-gray-100 shadow-sm fixed top-16 left-0 bottom-0 z-40 overflow-y-auto">
        <nav className="flex-1 px-3 pt-5 space-y-1">
          {visibleSidebar.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all group",
                  active
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
                )}
              >
                <span className="text-base w-5 text-center">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="px-4 pb-5 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-400 text-center">
            © {new Date().getFullYear()} Concept Coaching Classes
          </p>
        </div>
      </aside>

      {/* ─── Mobile Bottom Navigation Bar ─── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-xl z-40 safe-area-pb">
        <div className="flex items-center justify-around px-1 py-1 max-w-lg mx-auto">
          {visibleBottom.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-2 py-2 rounded-xl min-w-[56px] transition-all",
                  active ? "text-blue-600" : "text-gray-400 hover:text-blue-500"
                )}
              >
                <span className={cn("text-xl leading-none transition-transform", active ? "scale-110" : "")}>
                  {item.icon}
                </span>
                <span className={cn("text-[10px] font-medium leading-none", active ? "text-blue-600" : "text-gray-400")}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
