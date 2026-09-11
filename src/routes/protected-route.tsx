import { Navigate, useLocation } from 'react-router-dom';

import { useIsAuthenticated } from '@/features/auth/hooks/use-login';
import { ROUTE_PATHS } from '@/routes/route-paths';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useIsAuthenticated();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTE_PATHS.login}
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
}
