"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { ThemeProvider } from "./ThemeProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() =>
    new QueryClient({
      defaultOptions: { queries: { staleTime: 60_000, retry: 1 } },
    })
  );

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            className: "dark:!bg-gray-800 dark:!text-white",
            style: { borderRadius: "10px", background: "#333", color: "#fff" },
            success: { style: { background: "#16a34a" } },
            error:   { style: { background: "#dc2626" } },
          }}
        />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
