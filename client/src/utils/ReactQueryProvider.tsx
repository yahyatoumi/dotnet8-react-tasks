"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Stale time defines how long the data remains fresh before it needs to be refetched
        staleTime: 1000 * 60 * 10, // 10 minute

        // Set other options you may want to configure
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
      },
    },
  }));

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
