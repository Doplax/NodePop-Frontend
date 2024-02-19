import { BackArrow } from '@components/svg/BackArrow'
import { Cross } from '@components/svg/Cross'
import { Input } from '@components/styledComponents/Input'
import { Button } from '@components/styledComponents/Button'
import { useState } from 'react';

import { login } from '../services/authService'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuthHandlers } from '@auth/AuthContextProvider'


interface Credentials {
    email?: string;
    password?: string;
}

export const LoginPage = () => {
    const { onLogin } = useAuthHandlers();


    const navigate = useNavigate()
    console.log("login");
    const [credentials, setCredentials] = useState<Credentials>({
        email: 'pedro@gmail.com',
        password: 'pedro',
    })

    const [rememberPassword, setRememberPassword] = useState(false)

    const handleSubmit = async (event) => {
       try{
        event.preventDefault();
        await login(credentials,rememberPassword)
        onLogin();
        navigate('/')
       } catch (error) {
        console.log(error);
       }
    }

    const handleCredentials = (event) => {
        setCredentials(currentCredentials => ({
            ...currentCredentials,
            [event.target.name]: event.target.value, // Es necesaria la propiedad name en el input de abajo para que esto funcione
        }))
    }

    const handleChange = () => {
        (event) => {setRememberPassword(event.target.checked)}
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
                    <label className='m-5' onChange={handleChange}>
                        <input type="checkbox" />
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