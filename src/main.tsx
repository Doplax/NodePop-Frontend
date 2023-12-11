import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import {AuthContextProvider} from './auth/AuthContextProvider.jsx'
import { storage } from '@utils/storage'
import { setAuthorizationHeader } from './api/client.js'
import {FilterContextProvider}  from '../src/Filters/FiltersContext'

const accessToken = storage.get('auth');
if (accessToken) {
  setAuthorizationHeader(accessToken);
}
console.log("Main");
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
