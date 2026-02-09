import { createContext, useContext, useMemo, useState, ReactNode } from 'react';

// Tipos para los manejadores de autenticación
interface AuthHandlers {
  onLogin: () => void;
  onLogout: () => void;
}

const AuthContext = createContext<boolean>(false);
const AuthContextHandlers = createContext<AuthHandlers | undefined>(undefined);

export const useIsLogged = (): boolean => {
  const isLogged = useContext(AuthContext);
  return isLogged;
};

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
      onLogout: () => setIsLogged(false),
    }),
    [],
  );

  return (
    <AuthContextHandlers.Provider value={authHandlers}>
      <AuthContext.Provider value={isLogged}>
        {children}
      </AuthContext.Provider>
    </AuthContextHandlers.Provider>
  );
};
