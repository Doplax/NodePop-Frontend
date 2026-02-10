import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from '@auth/AuthContextProvider'
import { storage } from '@shared/utils/storage'
import { setAuthorizationHeader } from '@api/client'
import { FilterContextProvider } from '@filters/FiltersContext'

const accessToken = storage.get<string>('auth');
if (accessToken) {
  setAuthorizationHeader(accessToken);
}
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>

      <AuthContextProvider initiallyLogged={!!accessToken}>
        <FilterContextProvider>
          <App />
        </FilterContextProvider>
      </AuthContextProvider>


    </BrowserRouter>
  </React.StrictMode>,
)
