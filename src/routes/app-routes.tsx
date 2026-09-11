import { Navigate, type RouteObject } from 'react-router-dom';

import MainLayout from '@/components/layouts/main-layout';
import { LoginPage } from '@/features/auth/login-page';
import { ChartsPage } from '@/features/charts/charts-page';
import { DashboardPage } from '@/features/dashboard/dashboard-page';
import { ProtectedRoute } from '@/routes/protected-route';
import { ROUTE_PATHS } from '@/routes/route-paths';

export const publicRoutes: RouteObject[] = [
  {
    path: ROUTE_PATHS.login,
    element: <LoginPage />,
  },
];

export const privateRoutes: RouteObject[] = [
  {
    path: ROUTE_PATHS.dashboard,
    element: (
      <ProtectedRoute>
        <MainLayout>
          <DashboardPage />
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTE_PATHS.charts,
    element: (
      <ProtectedRoute>
        <MainLayout>
          <ChartsPage />
        </MainLayout>
      </ProtectedRoute>
    ),
  },
];

export const fallbackRoute: RouteObject = {
  path: '*',
  element: <Navigate to={ROUTE_PATHS.dashboard} replace />,
};
