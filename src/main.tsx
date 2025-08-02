import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import {AuthContextProvider} from './auth/AuthContextProvider.tsx'
import { storage } from '@utils/storage'
import { setAuthorizationHeader } from './api/client.ts'
import {FilterContextProvider}  from '../src/Filters/FiltersContext'

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
