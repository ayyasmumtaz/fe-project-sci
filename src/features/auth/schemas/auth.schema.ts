import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('Please enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
});

export const authUserSchema = z.object({
  id: z.string().min(1),
  email: z.email(),
  name: z.string().optional(),
});

export const loginResponseSchema = z.object({
  accessToken: z.string().min(1),
  user: authUserSchema,
});
