"use client";

import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/utils/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const { isDark, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />;
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300",
        "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700",
        "border border-gray-200 dark:border-gray-700",
        className
      )}
    >
      <span className={cn(
        "absolute inset-0 flex items-center justify-center text-lg transition-all duration-300",
        isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-75"
      )}>
        🌙
      </span>
      <span className={cn(
        "absolute inset-0 flex items-center justify-center text-lg transition-all duration-300",
        !isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"
      )}>
        ☀️
      </span>
    </button>
  );
}
