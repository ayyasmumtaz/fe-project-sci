import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import type { z } from 'zod';

import { FormInput } from '@/components/forms/input-field';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import {
  useIsAuthenticated,
  // useLoginMutation,
} from '@/features/auth/hooks/use-login';
import { loginSchema } from '@/features/auth/schemas/auth.schema';
import { useAuth } from '@/features/auth/store/auth.store';
import { ROUTE_PATHS } from '@/routes/route-paths';

type RouteState = {
  from?: string;
};

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginPage() {
  // const { mutateAsync: login, isPending: isLoginPending } = useLoginMutation();

  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useIsAuthenticated();
  const setSession = useAuth((state) => state.setSession);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  if (isAuthenticated) {
    return <Navigate to={ROUTE_PATHS.dashboard} replace />;
  }

  const state = location.state as RouteState | null;
  const redirectTo = state?.from ?? ROUTE_PATHS.dashboard;

  const onSubmit = async (values: LoginFormValues) => {
    // await login(values);
    // API auth endpoint is not active yet, mock a successful login.
    setSession({
      accessToken: 'mock-access-token',
      user: {
        id: 'mock-user',
        email: values.email,
        name: 'Demo User',
      },
    });

    await navigate(redirectTo, { replace: true });
  };

  return (
    <section className="auth-card" aria-label="Login form">
      <Typography variant="title" as="h4" className="mb-2">
        Login
      </Typography>
      <Typography variant="caption" className="mb-6">
        Welcome back! Please enter your credentials to access your dashboard.
      </Typography>

      <form onSubmit={(event) => void handleSubmit(onSubmit)(event)} noValidate>
        <FormInput
          control={control}
          name="email"
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
        />

        <FormInput
          control={control}
          name="password"
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter password"
        />

        <Button
          type="submit"
          variant="default"
          size="lg"
          className="button"
          disabled={isSubmitting}
        >
          Sign in
        </Button>
      </form>
    </section>
  );
}
