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
import NavBar from './components/NavBar';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider
      client={queryClient}
    >
      <NavBar />
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
