import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useIsCheckingSession, useIsLogged } from '@auth/AuthContextProvider';
import { Spinner } from '@components/Spinner/Spinner';

interface RequireAuthProps {
  children: ReactElement;
}

export const RequireAuth = ({ children }: RequireAuthProps): ReactElement => {
  const isLogged = useIsLogged();
  const isCheckingSession = useIsCheckingSession();
  const location = useLocation();

  // Mientras se comprueba el token guardado no se puede decidir: redirigir aquí
  // expulsaría a un usuario con sesión válida, y dejar pasar admitiría a uno
  // con el token ya caducado.
  if (isCheckingSession) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Spinner />
      </div>
    );
  }

  if (!isLogged) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return children;
};
