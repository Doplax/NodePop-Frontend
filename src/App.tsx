
import { useState } from 'react';
import './App.css'
import { LoginPage } from './pages/LoginPage';
import { AdvertsPage } from './pages/AdvertsPage'

function App() {
  const [login, setLogin] = useState(false)

  const handleLogin = () => { setLogin(!login) }
  
  return (
    <>
        {login ? <AdvertsPage/> : <LoginPage handleLogin={handleLogin}/>}
    </>    
  );
}

export default App
