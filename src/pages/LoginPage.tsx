import { BackArrow } from '@components/svg/BackArrow'
import { Cross } from '@components/svg/Cross'
import { Input } from '@components/styledComponents/Input'
import { ChangeEvent, useState } from 'react'
import { Button } from '@components/styledComponents/Button'

interface LoginPageProps {
    handleLogin: () => void; // Define que handleLogin es una función que no recibe argumentos y no retorna nada
  }

  export const LoginPage = ({ handleLogin }: LoginPageProps) => {


    const [name, setName] = useState('')

    const handleClick = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }


    console.log(name);
    return (
        <div className='w-full h-full flex justify-center align-middle'>
            <form className='bg-slate-100 w-[400px] p-8  rounded-lg ' >
                <div className='flex justify-between  '>
                    <BackArrow></BackArrow>
                    <Cross></Cross>
                </div>

                <div className='my-3'>
                    <h1 className='text-2xl font-bold '>Únete a Wallapop</h1>
                </div>

                <div className='flex flex-col'>
                    <Input onChange={handleClick} placeholder='Nombre y apellidos' type="text" />
                    <Input placeholder='Direccion de email' type="text" />
                    <Input placeholder='Contraseña'  type="text" />
                    <Input placeholder='Nombre'  type="text" />
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
                    <Button onClick={handleLogin}  type='submit'>Crear una cuenta</Button>
                </div>
            </form>
        </div>
    )
}