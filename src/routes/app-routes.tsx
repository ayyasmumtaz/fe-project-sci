import { Navigate, type RouteObject } from 'react-router-dom';

// import { ProtectedRoute } from '@/routes/protected-route';
// import { ROUTE_PATHS } from '@/routes/route-paths';

// Routes with no auth required (e.g. login). Add entries as you build pages:
// { path: ROUTE_PATHS.login, element: <LoginPage /> }
export const publicRoutes: RouteObject[] = [];

// Routes that require auth — wrap each element in <ProtectedRoute> and a
// layout component once you have one, e.g.:
// { path: ROUTE_PATHS.dashboard, element: <ProtectedRoute><MainLayout><DashboardPage /></MainLayout></ProtectedRoute> }
export const privateRoutes: RouteObject[] = [];

// Catch-all for unmatched paths. Point it at your real default route once
// one exists (e.g. ROUTE_PATHS.dashboard) instead of '/'.
export const fallbackRoute: RouteObject = {
  path: '*',
  element: <Navigate to="/" replace />,
};
