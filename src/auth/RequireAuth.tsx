import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useIsLogged } from '@auth/AuthContextProvider';

interface RequireAuthProps {
  children: ReactElement;
}

export const RequireAuth = ({ children }: RequireAuthProps): ReactElement => {
  const isLogged = useIsLogged();
  const location = useLocation();
  if (!isLogged) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return children;
};
