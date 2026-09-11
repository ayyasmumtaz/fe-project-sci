import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { AuthState, LoginResponse } from '@/features/auth/types/auth.type';

export type AuthStore = AuthState & {
  setSession: (session: LoginResponse) => void;
  clearSession: () => void;
};

const ACCESS_TOKEN_KEY = 'access_token';

export const useAuth = create<AuthStore>()(
  persist<AuthStore>(
    (set) => ({
      accessToken: null,
      user: null,
      isAuthenticated: false,
      setSession: (session) => {
        localStorage.setItem(ACCESS_TOKEN_KEY, session.accessToken);
        set({
          accessToken: session.accessToken,
          user: session.user,
          isAuthenticated: true,
        });
      },
      clearSession: () => {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        set({
          accessToken: null,
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
);
