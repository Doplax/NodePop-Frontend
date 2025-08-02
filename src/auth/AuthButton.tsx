import React from 'react';
import { useIsLogged } from '@auth/AuthContextProvider'
import { Button } from '@components/styledComponents/Button'
import { Link } from "react-router-dom";
import { storage } from  '@utils/storage' 
import { useAuthHandlers } from '@auth/AuthContextProvider'
import { AuthButtonProps } from '@shared/index';

export const AuthButton: React.FC<AuthButtonProps> = ({ toggleMenu }) => {
  const IsLogged = useIsLogged()

  const { onLogout } = useAuthHandlers();

  const handleLogout = (): void => {
    toggleMenu(false)
    onLogout()
    storage.remove('auth')
  }
  
  return (
    <>
      {IsLogged
        ? <Button onClick={() => { handleLogout() }} $variant='default'>Cerrar sesión</Button>
        : <Link
            to='/login'
            onClick={() => { toggleMenu(false) }}
          >
            <Button $variant='default'>Inicia sesión</Button>
          </Link>
      }
    </>
  )
}
