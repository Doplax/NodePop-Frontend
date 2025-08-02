export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface AuthContextType {
  isLogged: boolean;
}

export interface AuthHandlers {
  onLogin: () => void;
  onLogout: () => void;
}

export interface AuthContextProviderProps {
  initiallyLogged: boolean;
  children: React.ReactNode;
}