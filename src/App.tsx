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
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

// Components
import NavBar from './components/NavBar';

// Constants
import { routes } from './constants/app';

// Store
import { store } from './store';

// Styles
import './index.css';

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistStore(store)}
      />
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
                    element={
                      <Element />
                    }
                  />
                );
              }
            )}
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
