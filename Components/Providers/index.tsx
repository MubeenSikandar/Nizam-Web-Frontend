"use client";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import ToastContainer from "@/components/UI/Toast/ToastContainer";

export default function Providers({ children }: { children: React.ReactNode }) {
  // useState ensures a new QueryClient is created per-session, not shared across requests
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
          },
          mutations: { retry: 0 },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
        <ToastContainer />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
