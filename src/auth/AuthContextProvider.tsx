import React, { createContext, useContext, useMemo, useState } from 'react';
import { AuthHandlers, AuthContextProviderProps } from '@shared/index';

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

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ 
  initiallyLogged, 
  children 
}) => {
  const [isLogged, setIsLogged] = useState<boolean>(initiallyLogged);

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