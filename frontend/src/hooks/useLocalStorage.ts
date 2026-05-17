"use client";

import { useState, useEffect, useCallback } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const set = useCallback((val: T | ((prev: T) => T)) => {
    setValue((prev) => {
      const next = val instanceof Function ? val(prev) : val;
      try { window.localStorage.setItem(key, JSON.stringify(next)); } catch {}
      return next;
    });
  }, [key]);

  const remove = useCallback(() => {
    try { window.localStorage.removeItem(key); } catch {}
    setValue(initialValue);
  }, [key, initialValue]);

  return [value, set, remove] as const;
}
