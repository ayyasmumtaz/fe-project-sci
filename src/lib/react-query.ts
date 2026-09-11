import { QueryClient } from '@tanstack/react-query';

// Single QueryClient shared app-wide, provided in App.tsx. Feature hooks
// (e.g. features/dashboard/hooks/use-xxx) call useQuery/useMutation and
// this client handles caching for them.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
