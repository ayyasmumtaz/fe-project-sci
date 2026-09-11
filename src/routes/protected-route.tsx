import { Navigate, useLocation } from 'react-router-dom';

// Wrap private routes with this. Once you build src/features/auth, swap the
// TODO below for a real auth hook (e.g. useIsAuthenticated from your store)
// and point `to` at ROUTE_PATHS.login.
type ProtectedRouteProps = {
  children: React.ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = true; // TODO: replace with real auth check
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate to="/login" replace state={{ from: location.pathname }} />
    );
  }

  return children;
}
