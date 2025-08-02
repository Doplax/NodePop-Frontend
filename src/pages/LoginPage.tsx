import React, { useState } from 'react';
import { BackArrow } from '@components/svg/BackArrow'
import { Cross } from '@components/svg/Cross'
import { Input } from '@components/styledComponents/Input'
import { Button } from '@components/styledComponents/Button'

import { login } from '../services/authService'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuthHandlers } from '@auth/AuthContextProvider'
import { LoginCredentials } from '@shared/index';

export const LoginPage: React.FC = () => {
  console.log("BackendURL",import.meta.env.VITE_REACT_APP_API_BASE_URL);

    const { onLogin } = useAuthHandlers();

    const navigate = useNavigate()
    const [credentials, setCredentials] = useState<LoginCredentials>({
        email: 'pedro@gmail.com',
        password: 'pedro',
    })

    const [rememberPassword, setRememberPassword] = useState<boolean>(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
       try{
        event.preventDefault();
        await login(credentials,rememberPassword)
        onLogin();
        navigate('/')
       } catch (error) {
        console.log(error);
       }
    }

    const handleCredentials = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setCredentials(currentCredentials => ({
            ...currentCredentials,
            [event.target.name]: event.target.value,
        }))
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => { 
        setRememberPassword(event.target.checked);
    }
    

    return (
        <div className='w-screen h-screen items-center  flex justify-center bg-[#29363dcc]'>
            <form className='bg-white w-[400px] h-max  p-8  rounded-lg ' onSubmit={handleSubmit} >
            <div className='flex justify-between'>
                    <Link to="/"><BackArrow/></Link>
                    <Link to="/"><Cross/></Link>
                </div>

                <div className='my-3'>
                    <h1 className='text-2xl font-bold '>Únete a Wallapop</h1>
                </div>

                <div className='flex flex-col'>
                    <Input value={credentials.email} name='email' onChange={handleCredentials} placeholder='Direccion de email' type="text" />
                    <Input value={credentials.password} name='password' onChange={handleCredentials} placeholder='Contraseña' type="password" />
                    <label className='m-5'>
                        <input type="checkbox" onChange={handleChange} />
                        <span> Recordar contraseña</span>
                    </label>
                </div>

               

                <div className='w-full mt-10 flex items-end justify-center'>
                    <Button $size='full' $variant='fullFill'  type='submit'>Iniciar sesión</Button>
                </div>
            </form>
        </div>
    )
}