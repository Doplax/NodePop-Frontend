import { useIsLogged } from '@auth/AuthContextProvider'
import { Button } from '@components/styledComponents/Button'
import { Link } from "react-router-dom";

import { useAuthHandlers } from '@auth/AuthContextProvider'


export function AuthButton({toggleMenu}) {
  const IsLogged = useIsLogged()

  const { onLogout } = useAuthHandlers();


  return (
    <>

      {IsLogged
        ? <Button onClick={()=>{onLogout()}} $variant='default'>Cerrar sesión</Button>
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
