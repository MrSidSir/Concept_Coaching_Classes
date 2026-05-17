"use client";

import {
  createContext, useContext, useLayoutEffect,
  useEffect, useState, useCallback,
} from "react";

type Theme         = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

interface ThemeContextValue {
  theme:         Theme;
  resolvedTheme: ResolvedTheme;
  setTheme:      (t: Theme) => void;
  isDark:        boolean;
  toggleTheme:   () => void;
  mounted:       boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = "ccc-theme";

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(resolved: ResolvedTheme) {
  const root = document.documentElement;
  root.classList.toggle("dark", resolved === "dark");
  root.setAttribute("data-theme", resolved);
  // Instantly show correct background — avoids any white flash in dark mode
  root.style.colorScheme = resolved;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme,   setThemeState] = useState<Theme>("system");
  const [mounted, setMounted]    = useState(false);

  /*
   * useLayoutEffect fires synchronously AFTER React commits the DOM
   * but BEFORE the browser paints. This is the earliest safe moment
   * to read localStorage and apply the theme class — no FOUC, no script tags.
   *
   * Falls back to useEffect on server (where window doesn't exist) to
   * avoid the "useLayoutEffect does nothing on the server" SSR warning.
   */
  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    const saved = (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? "system";
    const resolved: ResolvedTheme = saved === "system" ? getSystemTheme() : saved;

    applyTheme(resolved);
    setThemeState(saved);
    // Enable transitions AFTER initial theme is applied — prevents flash on first load
    requestAnimationFrame(() => {
      document.body.classList.add("theme-ready");
    });
    setMounted(true);
  }, []);

  // Re-apply whenever the user switches themes
  useIsomorphicLayoutEffect(() => {
    if (!mounted) return;
    const resolved: ResolvedTheme = theme === "system" ? getSystemTheme() : theme;
    applyTheme(resolved);
  }, [theme, mounted]);

  // Track OS-level preference changes when in "system" mode
  useEffect(() => {
    const mq      = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (theme === "system") applyTheme(getSystemTheme());
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    try { localStorage.setItem(STORAGE_KEY, t); } catch {}
  }, []);

  const resolvedTheme: ResolvedTheme = !mounted
    ? "light"
    : theme === "system" ? getSystemTheme() : theme;

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  return (
    <ThemeContext.Provider
      value={{ theme, resolvedTheme, setTheme, isDark: resolvedTheme === "dark", toggleTheme, mounted }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeContext must be used inside ThemeProvider");
  return ctx;
}
