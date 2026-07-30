import { BackArrow } from '@components/svg/BackArrow';
import { Cross } from '@components/svg/Cross';
import { Input } from '@components/styledComponents/Input';
import { Button } from '@components/styledComponents/Button';
import { useState, FormEvent, ChangeEvent } from 'react';

import { login, LoginError } from '@services/authService';
import { useLocation, useNavigate, Link, Navigate } from 'react-router';
import { useAuthHandlers, useIsLogged } from '@auth/AuthContextProvider';
import { LoginDTO } from '@shared/dtos';

interface LocationState {
    from?: string;
}

export const LoginPage = () => {
    const { onLogin } = useAuthHandlers();
    const isLogged = useIsLogged();
    const navigate = useNavigate();
    const location = useLocation();

    const [credentials, setCredentials] = useState<LoginDTO>({
        email: '',
        password: '',
    });
    const [rememberPassword, setRememberPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isValid = credentials.email.length > 0 && credentials.password.length > 0;

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        if (!isValid) return;
        setError(null);
        setIsLoading(true);
        try {
            await login(credentials, rememberPassword);
            onLogin();
            const target = (location.state as LocationState | null)?.from ?? '/';
            navigate(target, { replace: true });
        } catch (err) {
            const loginError = err as LoginError;
            setError(loginError.message || 'Error al iniciar sesión');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCredentials = (event: ChangeEvent<HTMLInputElement>): void => {
        setCredentials((current) => ({
            ...current,
            [event.target.name]: event.target.value,
        }));
    };

    // Con sesión abierta no tiene sentido mostrar el formulario: entrar aquí y
    // fallar el login dejaba al usuario en un estado confuso.
    if (isLogged) {
        return <Navigate to='/' replace />;
    }

    return (
        <div className='w-screen h-screen items-center flex justify-center bg-[#29363dcc]'>
            <form className='bg-white w-[400px] h-max p-8 rounded-lg' onSubmit={handleSubmit}>
                <div className='flex justify-between'>
                    <Link to="/"><BackArrow /></Link>
                    <Link to="/"><Cross /></Link>
                </div>

                <div className='my-3'>
                    <h1 className='text-2xl font-bold'>Únete a Wallapop</h1>
                </div>

                {error && (
                    <div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-sm' role='alert'>
                        {error}
                    </div>
                )}

                <div className='flex flex-col gap-2'>
                    <Input
                        value={credentials.email}
                        name='email'
                        onChange={handleCredentials}
                        placeholder='Dirección de email'
                        type="email"
                        autoComplete='email'
                        required
                        disabled={isLoading}
                    />
                    <Input
                        value={credentials.password}
                        name='password'
                        onChange={handleCredentials}
                        placeholder='Contraseña'
                        type="password"
                        autoComplete='current-password'
                        required
                        disabled={isLoading}
                    />
                    <label className='m-5'>
                        <input
                            type="checkbox"
                            checked={rememberPassword}
                            onChange={(e) => setRememberPassword(e.target.checked)}
                            disabled={isLoading}
                        />
                        <span> Recordar sesión</span>
                    </label>
                </div>

                <div className='w-full mt-10 flex items-end justify-center'>
                    <Button
                        $size='full'
                        $variant='fullFill'
                        type='submit'
                        disabled={isLoading || !isValid}
                    >
                        {isLoading ? 'Iniciando sesión…' : 'Iniciar sesión'}
                    </Button>
                </div>
            </form>
        </div>
    );
};
