import { BackArrow } from '@components/svg/BackArrow'
import { Cross } from '@components/svg/Cross'
import { Input } from '@components/styledComponents/Input'
import { Button } from '@components/styledComponents/Button'
import { useState } from 'react';
import { createAdvert } from '../services/advertsService'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Select } from '@components/styledComponents/Select';


export const NewAdvertPage = () => {
    const navigate = useNavigate();


    const [advertData, setAdvertData] = useState({
        name: 'product',
        sale: true,
        price: 100,
        tags: '',

    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await createAdvert(advertData)
            const advertId = response.data.id
            console.log(advertId);
            navigate(`../${advertId}`, { relative: 'path' });

        } catch (error) {
            console.log(error);
        }
    }

    const handleCredentials = (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setAdvertData(currentCredentials => ({
            ...currentCredentials,
            [event.target.name]: value,
        }));
    }





    return (
        <div className='w-full h-full flex justify-center align-middle'>
            <form className='shadow-2xl border w-[400px] p-8  rounded-lg ' onSubmit={handleSubmit} >
                {/* Icons */}
                <div className='flex justify-between'>
                    <Link to="/"><BackArrow /></Link>
                    <Link to="/"><Cross /></Link>
                </div>

                {/* Title */}
                <div className='my-3'>
                    <h1 className='text-2xl font-bold '>Crea un nuevo producto</h1>
                </div>

                {/* Inptus */}
                <div className='flex flex-col'>
                    <Input required value={advertData.name} name='name' onChange={handleCredentials} placeholder='Nombre del producto' type="text" />
                    <Input required value={advertData.price} name='price' onChange={handleCredentials} placeholder='Precio' type="number" />
                    <Select required value={advertData.tags} name='tags' onChange={handleCredentials} className="tu-clase-de-estilo-para-select">
                        <option value="">Selecciona un tag</option>
                        <option value="lifestyle">Lifestyle</option>
                        <option value="mobile">Mobile</option>
                        <option value="motor">Motor</option>
                        <option value="work">Work</option>
                    </Select>                    
                    <label className='flex justify-center'>
                        <input checked={advertData.sale} name='sale' onChange={handleCredentials} type="checkbox" />
                        <span>*Maque la casilla si está en venta  </span>
                    </label>
                </div>



                <div className='w-full my-14 flex items-end justify-center'>
                    <Button $variant='fullFill' type='submit'>Crear Producto</Button>
                </div>
            </form>
        </div>
    )
}