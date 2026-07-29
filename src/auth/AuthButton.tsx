import { useIsLogged, useAuthHandlers } from '@auth/AuthContextProvider';
import { Button } from '@components/styledComponents/Button';
import { Link, useNavigate } from 'react-router';
import { logout } from '@services/authService';

interface AuthButtonProps {
  toggleMenu: (value: boolean) => void;
}

export function AuthButton({ toggleMenu }: AuthButtonProps) {
  const isLogged = useIsLogged();
  const { onLogout } = useAuthHandlers();
  const navigate = useNavigate();

  const handleLogout = async (): Promise<void> => {
    toggleMenu(false);
    await logout();
    onLogout();
    navigate('/');
  };

  if (isLogged) {
    return (
      <Button onClick={handleLogout} $variant="default">
        Cerrar sesión
      </Button>
    );
  }

  return (
    <Link to="/login" onClick={() => toggleMenu(false)}>
      <Button $variant="default">Inicia sesión</Button>
    </Link>
  );
}
