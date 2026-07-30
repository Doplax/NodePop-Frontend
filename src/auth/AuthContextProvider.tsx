import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import { removeAuthorizationHeader, subscribeToUnauthorized } from '@api/client';
import { storage } from '@shared/utils/storage';
import { getCurrentUser } from '@services/authService';

interface AuthHandlers {
  onLogin: () => void;
  onLogout: () => void;
}

interface AuthState {
  isLogged: boolean;
  /** Cierto mientras se valida contra la API el token guardado. */
  isCheckingSession: boolean;
}

const AuthContext = createContext<AuthState>({
  isLogged: false,
  isCheckingSession: false,
});
const AuthContextHandlers = createContext<AuthHandlers | undefined>(undefined);

export const useIsLogged = (): boolean => useContext(AuthContext).isLogged;

export const useIsCheckingSession = (): boolean =>
  useContext(AuthContext).isCheckingSession;

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
  // Si arrancamos con un token guardado, la sesión está "por confirmar" hasta
  // que la API nos diga que sigue siendo válido.
  const [isCheckingSession, setIsCheckingSession] = useState(initiallyLogged);

  const authHandlers = useMemo<AuthHandlers>(
    () => ({
      onLogin: () => setIsLogged(true),
      onLogout: () => {
        removeAuthorizationHeader();
        storage.remove('auth');
        setIsLogged(false);
      },
    }),
    [],
  );

  // Valida el token guardado una sola vez al montar. Sin esto, un token
  // caducado dejaba la UI como si hubiera sesión: RequireAuth permitía entrar
  // en las rutas protegidas y el usuario sólo se enteraba al enviar el
  // formulario, perdiendo lo que hubiera escrito.
  useEffect(() => {
    if (!initiallyLogged) return;
    let cancelled = false;
    getCurrentUser()
      .then(() => {
        if (!cancelled) setIsLogged(true);
      })
      .catch(() => {
        if (!cancelled) authHandlers.onLogout();
      })
      .finally(() => {
        if (!cancelled) setIsCheckingSession(false);
      });
    return () => {
      cancelled = true;
    };
  }, [initiallyLogged, authHandlers]);

  // If any request comes back 401, force logout so the UI reflects reality.
  useEffect(
    () => subscribeToUnauthorized(() => authHandlers.onLogout()),
    [authHandlers],
  );

  const authState = useMemo<AuthState>(
    () => ({ isLogged, isCheckingSession }),
    [isLogged, isCheckingSession],
  );

  return (
    <AuthContextHandlers.Provider value={authHandlers}>
      <AuthContext.Provider value={authState}>
        {children}
      </AuthContext.Provider>
    </AuthContextHandlers.Provider>
  );
};
