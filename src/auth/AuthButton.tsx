import { useIsLogged } from '@auth/AuthContextProvider'
import { Button } from '@components/styledComponents/Button'
import { Link } from "react-router-dom";
import { storage } from '@shared/utils/storage'
import { useAuthHandlers } from '@auth/AuthContextProvider'

interface AuthButtonProps {
  toggleMenu: (value: boolean) => void;
}

export function AuthButton({ toggleMenu }: AuthButtonProps) {
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
        ? <Button onClick={()=>{handleLogout()}} $variant='default'>Cerrar sesión</Button>
        : <Link
            to='/login'
            onClick={() => {toggleMenu(false) }}
          >
            <Button $variant='default'>Inicia sesión</Button>
          </Link>
      }
    </>
  )
}
