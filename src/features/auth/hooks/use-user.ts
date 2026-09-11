import { useQuery } from '@tanstack/react-query';

import { getCurrentUser } from '@/features/auth/api/auth.service';

export function useCurrentUser() {
  return useQuery<string | null>({
    queryKey: ['auth', 'currentUser'],
    queryFn: () => getCurrentUser(),
  });
}
