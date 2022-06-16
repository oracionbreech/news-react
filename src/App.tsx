import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

// Constants
import { routes } from './constants/app';

// Styles
import './App.css';

function App() {
  return (
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
  );
}

export default App;
