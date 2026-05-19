import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import './index.css';
import { AuthContextProvider } from '@auth/AuthContextProvider';
import { storage } from '@shared/utils/storage';
import { setAuthorizationHeader } from '@api/client';
import { FilterContextProvider } from '@filters/FiltersContext';

const accessToken = storage.get<string>('auth');
if (accessToken) {
  setAuthorizationHeader(accessToken);
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element #root not found in document.');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider initiallyLogged={!!accessToken}>
        <FilterContextProvider>
          <App />
        </FilterContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
