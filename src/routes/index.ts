import { createBrowserRouter } from 'react-router-dom';

import {
  fallbackRoute,
  privateRoutes,
  publicRoutes,
} from '@/routes/app-routes';

export function router() {
  return createBrowserRouter([
    ...publicRoutes,
    ...privateRoutes,
    fallbackRoute,
  ]);
}
