import { useMutation } from '@tanstack/react-query';

import { login } from '@/features/auth/api/auth.service';
import { useAuth } from '@/features/auth/store/auth.store';
import type { LoginRequest } from '@/features/auth/types/auth.type';

export function useLoginMutation() {
  const setSession = useAuth((state) => state.setSession);

  return useMutation({
    mutationKey: ['auth', 'login'],
    mutationFn: (payload: LoginRequest) => login(payload),
    onSuccess: (data) => {
      setSession(data);
    },
  });
}

export function useLogout() {
  return useAuth((state) => state.clearSession);
}

export function useIsAuthenticated() {
  return useAuth((state) => state.isAuthenticated);
}
