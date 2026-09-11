import '@/styles/App.css';

import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';

import { queryClient } from '@/lib/react-query';
import { router } from '@/routes';

const appRouter = router();

function App() {
  return (
    <div className="app-shell">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={appRouter} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
