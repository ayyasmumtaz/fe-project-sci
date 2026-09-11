import {
  loginResponseSchema,
  loginSchema,
} from '@/features/auth/schemas/auth.schema';
import type {
  LoginRequest,
  LoginResponse,
} from '@/features/auth/types/auth.type';
import axiosInstance from '@/lib/api';

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const requestPayload = loginSchema.parse(payload);

  const response = await axiosInstance.post('/auth/login', requestPayload);

  return loginResponseSchema.parse(response.data);
}

export function getCurrentUser(): Promise<string | null> {
  // This is a placeholder implementation. In a real application, you would make an API call to fetch the current user's information based on the stored access token.
  return Promise.resolve('mock-user-id');
}
