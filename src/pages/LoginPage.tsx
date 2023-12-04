import { BackArrow } from '@components/svg/BackArrow'
import { Cross } from '@components/svg/Cross'
import { Input } from '@components/styledComponents/Input'
import { Button } from '@components/styledComponents/Button'
import { useState } from 'react';

import { login } from './auth/service'


//interface LoginPageProps {
//    handleLogin: () => void; // Define que handleLogin es una función que no recibe argumentos y no retorna nada
//}

interface Credentials {
    email?: string;
    password?: string;
}

//export const LoginPage = ({ handleLogin }: LoginPageProps) => {
export const LoginPage = () => {


    const [credentials, setCredentials] = useState<Credentials>({
        email: 'pedro@gmail.com',
        password: 'pedro',
    })

    const handleSubmit = (event) => {
        event.preventDefault();

    }

    const handleCredentials = (event) => {
        setCredentials(currentCredentials => ({
            ...currentCredentials,
            [event.target.name]: event.target.value, // Es necesaria la propiedad name en el input de abajo para que esto funcione
        }))
        console.table(event.target.name);
    }



    return (
        <div className='w-full h-full flex justify-center align-middle'>
            <form className='bg-slate-100 w-[400px] p-8  rounded-lg ' onSubmit={handleSubmit} >
                <div className='flex justify-between  '>
                    <BackArrow></BackArrow>
                    <Cross></Cross>
                </div>

                <div className='my-3'>
                    <h1 className='text-2xl font-bold '>Únete a Wallapop</h1>
                </div>

                <div className='flex flex-col'>
                    <Input value={credentials.email} name='email' onChange={handleCredentials} placeholder='Direccion de email' type="text" />
                    <Input value={credentials.password} name='password' onChange={handleCredentials} placeholder='Contraseña' type="text" />
                    <span>*Al menos 8 caracteres</span>
                </div>

                <div className='m-5 pt-10'>
                    <div className='flex'>
                        <input type="checkbox" />
                        <span>Quiero recibir comunicaciones sobre promociones y novedades de Wallapop</span>                </div>
                </div>
                <div className='flex'>
                    <input type="checkbox" />
                    <span slot="label">He leído y acepto las <a href="https://about.wallapop.com/condiciones-de-uso/" target="_blank">Condiciones de uso</a> y la <a href="https://about.wallapop.com/politica-privacidad/" target="_blank">Política de privacidad</a> de Wallapop.</span>
                </div>

                <div className='w-full my-14 flex items-end justify-center'>
                    <Button onClick={() => login(credentials)} type='submit'>Crear una cuenta</Button>
                </div>
            </form>
        </div>
    )
}