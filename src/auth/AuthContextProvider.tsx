import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import { subscribeToUnauthorized } from '@api/client';
import { storage } from '@shared/utils/storage';

interface AuthHandlers {
  onLogin: () => void;
  onLogout: () => void;
}

const AuthContext = createContext<boolean>(false);
const AuthContextHandlers = createContext<AuthHandlers | undefined>(undefined);

export const useIsLogged = (): boolean => useContext(AuthContext);

export const useAuthHandlers = (): AuthHandlers => {
  const authHandlers = useContext(AuthContextHandlers);
  if (!authHandlers) {
    throw new Error('useAuthHandlers must be used within an AuthContextProvider');
  }
  return authHandlers;
};

interface AuthContextProviderProps {
  initiallyLogged: boolean;
  children: ReactNode;
}

export const AuthContextProvider = ({ initiallyLogged, children }: AuthContextProviderProps) => {
  const [isLogged, setIsLogged] = useState(initiallyLogged);

  const authHandlers = useMemo<AuthHandlers>(
    () => ({
      onLogin: () => setIsLogged(true),
      onLogout: () => {
        storage.remove('auth');
        setIsLogged(false);
      },
    }),
    [],
  );

  // If any request comes back 401, force logout so the UI reflects reality.
  useEffect(
    () => subscribeToUnauthorized(() => authHandlers.onLogout()),
    [authHandlers],
  );

  return (
    <AuthContextHandlers.Provider value={authHandlers}>
      <AuthContext.Provider value={isLogged}>
        {children}
      </AuthContext.Provider>
    </AuthContextHandlers.Provider>
  );
};
