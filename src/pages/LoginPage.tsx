import { BackArrow } from '@components/svg/BackArrow'
import { Cross } from '@components/svg/Cross'
import { Input } from '@components/styledComponents/Input'
import { Button } from '@components/styledComponents/Button'
import { useState, FormEvent, ChangeEvent } from 'react';

import { login, LoginError } from '@services/authService'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuthHandlers } from '@auth/AuthContextProvider'
import { LoginDTO } from '@shared/dtos'

export const LoginPage = () => {
    const { onLogin } = useAuthHandlers();
    const navigate = useNavigate()

    const [credentials, setCredentials] = useState<LoginDTO>({
        email: 'pedro@gmail.com',
        password: '1234',
    })

    const [rememberPassword, setRememberPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        try {
            event.preventDefault();
            setError(null);
            setIsLoading(true);

            await login(credentials, rememberPassword)
            onLogin();
            navigate('/')
        } catch (err) {
            const loginError = err as LoginError;
            const errorMsg = loginError.message || 'Error al iniciar sesión';
            setError(errorMsg);
            console.error("Login error:", loginError);
        } finally {
            setIsLoading(false);
        }
    }

    const handleCredentials = (event: ChangeEvent<HTMLInputElement>): void => {
        setCredentials(currentCredentials => ({
            ...currentCredentials,
            [event.target.name]: event.target.value,
        }))
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setRememberPassword(event.target.checked);
    }
    

    return (
        <div className='w-screen h-screen items-center flex justify-center bg-[#29363dcc]'>
            <form className='bg-white w-[400px] h-max p-8 rounded-lg' onSubmit={handleSubmit}>
                <div className='flex justify-between'>
                    <Link to="/"><BackArrow/></Link>
                    <Link to="/"><Cross/></Link>
                </div>

                <div className='my-3'>
                    <h1 className='text-2xl font-bold'>Únete a Wallapop</h1>
                </div>

                {error && (
                    <div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded'>
                        {error}
                    </div>
                )}

                <div className='flex flex-col'>
                    <Input
                        value={credentials.email}
                        name='email'
                        onChange={handleCredentials}
                        placeholder='Direccion de email'
                        type="email"
                        disabled={isLoading}
                    />
                    <Input
                        value={credentials.password}
                        name='password'
                        onChange={handleCredentials}
                        placeholder='Contraseña'
                        type="password"
                        disabled={isLoading}
                    />
                    <label className='m-5'>
                        <input type="checkbox" onChange={handleChange} disabled={isLoading} />
                        <span> Recordar contraseña</span>
                    </label>
                </div>

                <div className='w-full mt-10 flex items-end justify-center'>
                    <Button
                        $size='full'
                        $variant='fullFill'
                        type='submit'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                    </Button>
                </div>
            </form>
        </div>
    )
}