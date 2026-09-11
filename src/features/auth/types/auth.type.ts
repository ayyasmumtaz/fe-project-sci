export type LoginRequest = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: string;
  email: string;
  name?: string;
};

export type LoginResponse = {
  accessToken: string;
  user: AuthUser;
};

export type AuthState = {
  accessToken: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
};
