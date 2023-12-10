import { useIsLogged } from '@auth/AuthContextProvider'
import { Button } from '@components/styledComponents/Button'
import { Link } from "react-router-dom";

import { useAuthHandlers } from '@auth/AuthContextProvider'


export function AuthButton({toggleMenu}) {
  const IsLogged = useIsLogged()

  const { onLogout } = useAuthHandlers();

  const handleLogout = () => {
    toggleMenu(false)
    onLogout()
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
