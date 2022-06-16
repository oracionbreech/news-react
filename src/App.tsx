import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

// Constants
import { routes } from './constants/app';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider
      client={queryClient}
    >
      <BrowserRouter>
        <Routes>
          {routes.map(
            ({
              element: Element,
              path,
              name,
            }) => {
              return (
                <Route
                  key={name}
                  path={path}
                  element={<Element />}
                />
              );
            }
          )}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
