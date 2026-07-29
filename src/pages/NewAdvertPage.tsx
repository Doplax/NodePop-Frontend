import { BackArrow } from '@components/svg/BackArrow'
import { Cross } from '@components/svg/Cross'
import { Input } from '@components/styledComponents/Input'
import { Button } from '@components/styledComponents/Button'
import { useState, FormEvent, ChangeEvent } from 'react';
import { createAdvert } from '@services/advertsService'
import { useNavigate, Link } from 'react-router-dom';
import { Select } from '@components/styledComponents/Select';
import { PRODUCT_TAGS, Tag } from '@shared/dtos';
import axios from 'axios';

interface FormState {
    name: string;
    price: number;
    isForSale: boolean;
    tags: Tag[];
    photo: File | null;
}

const TAG_LABELS: Record<Tag, string> = {
    lifestyle: 'Lifestyle',
    mobile: 'Mobile',
    motor: 'Motor',
    work: 'Work',
};

const initialState: FormState = {
    name: '',
    price: 0,
    isForSale: true,
    tags: [],
    photo: null,
};

export const NewAdvertPage = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState<FormState>(initialState);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isValid =
        form.name.trim().length > 0 &&
        form.price >= 0 &&
        form.tags.length > 0 &&
        form.photo !== null;

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const target = event.target as HTMLInputElement;
        const { name, type, value } = target;

        if (type === 'checkbox') {
            setForm((current) => ({ ...current, [name]: target.checked }));
            return;
        }
        if (type === 'file') {
            const file = target.files?.[0] ?? null;
            setForm((current) => ({ ...current, photo: file }));
            return;
        }
        if (name === 'tags') {
            setForm((current) => ({
                ...current,
                tags: value ? [value as Tag] : [],
            }));
            return;
        }
        if (name === 'price') {
            setForm((current) => ({ ...current, price: parseFloat(value) || 0 }));
            return;
        }
        setForm((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        if (!isValid || !form.photo) return;
        setIsSubmitting(true);
        setError(null);
        try {
            const response = await createAdvert({
                name: form.name.trim(),
                price: form.price,
                isForSale: form.isForSale,
                tags: form.tags,
                photo: form.photo,
            });
            const advertId = response.data.data._id;
            navigate(`/adverts/${advertId}`);
        } catch (err) {
            const message =
                axios.isAxiosError(err) && (err.response?.data as { error?: string })?.error
                    ? (err.response?.data as { error?: string }).error
                    : 'No se pudo crear el producto. Inténtalo de nuevo.';
            setError(message ?? 'Error desconocido');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='w-full h-full flex justify-center align-middle'>
            <form className='shadow-2xl border w-[400px] p-8 rounded-lg' onSubmit={handleSubmit}>
                <div className='flex justify-between'>
                    <Link to="/"><BackArrow /></Link>
                    <Link to="/"><Cross /></Link>
                </div>

                <div className='my-3'>
                    <h1 className='text-2xl font-bold'>Crea un nuevo producto</h1>
                </div>

                {error && (
                    <div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-sm'>
                        {error}
                    </div>
                )}

                <div className='flex flex-col gap-3'>
                    <Input
                        required
                        value={form.name}
                        name='name'
                        onChange={handleChange}
                        placeholder='Nombre del producto'
                        type='text'
                        disabled={isSubmitting}
                    />
                    <Input
                        required
                        value={form.price}
                        name='price'
                        onChange={handleChange}
                        placeholder='Precio'
                        type='number'
                        min={0}
                        max={99999}
                        step='0.01'
                        disabled={isSubmitting}
                    />
                    <Select
                        required
                        value={form.tags[0] ?? ''}
                        name='tags'
                        onChange={handleChange}
                        disabled={isSubmitting}
                    >
                        <option value=''>Selecciona un tag</option>
                        {PRODUCT_TAGS.map((tag) => (
                            <option key={tag} value={tag}>{TAG_LABELS[tag]}</option>
                        ))}
                    </Select>
                    <label className='flex flex-col text-sm'>
                        <span className='mb-1'>Foto del producto</span>
                        <input
                            required
                            type='file'
                            name='photo'
                            accept='image/jpeg,image/png,image/gif,image/webp'
                            onChange={handleChange}
                            disabled={isSubmitting}
                        />
                    </label>
                    <label className='flex items-center gap-2 justify-center'>
                        <input
                            checked={form.isForSale}
                            name='isForSale'
                            onChange={handleChange}
                            type='checkbox'
                            disabled={isSubmitting}
                        />
                        <span>En venta</span>
                    </label>
                </div>

                <div className='w-full my-10 flex items-end justify-center'>
                    <Button
                        $variant='fullFill'
                        type='submit'
                        disabled={!isValid || isSubmitting}
                    >
                        {isSubmitting ? 'Creando…' : 'Crear Producto'}
                    </Button>
                </div>
            </form>
        </div>
    );
};
