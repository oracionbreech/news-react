import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

// Components
import App from './App';

// Monitoring
import reportWebVitals from './reportWebVitals';

// Styles
import './index.css';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById(
    'root'
  ) as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistStore(store)}
      />
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
