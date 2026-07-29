import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { getSingleAdvert, deleteAdvert } from "@services/advertsService";
import { Button } from '@components/styledComponents/Button';
import { Spinner } from '@components/Spinner/Spinner';
import { Product } from '@shared/dtos';
import { useIsLogged } from '@auth/AuthContextProvider';

export function AdvertPage() {
    const { advertId } = useParams<{ advertId: string }>();
    const navigate = useNavigate();

    const [advert, setAdvert] = useState<Product | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        const fetchAdvert = async (): Promise<void> => {
            if (!advertId) {
                navigate('/404', { replace: true });
                return;
            }
            try {
                const response = await getSingleAdvert(advertId);
                if (!cancelled) setAdvert(response.data);
            } catch {
                if (!cancelled) {
                    setError('No se pudo cargar el producto.');
                    navigate('/404', { replace: true });
                }
            }
        };
        fetchAdvert();
        return () => {
            cancelled = true;
        };
    }, [advertId, navigate]);

    if (error) {
        return <div className="p-6 text-center text-red-600">{error}</div>;
    }
    if (!advert) return <Spinner />;
    return <AdvertDetail advert={advert} />;
}

interface AdvertDetailProps {
    advert: Product;
}

function AdvertDetail({ advert }: AdvertDetailProps) {
    const isLogged = useIsLogged();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

    const onDelete = async (): Promise<void> => {
        setIsDeleting(true);
        try {
            await deleteAdvert(advert._id);
            navigate('/');
        } catch (err) {
            console.error(err);
            setIsDeleting(false);
        }
    };

    return (
        <div className="rounded-lg overflow-hidden p-6">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    {advert.imgSrc ? (
                        <img
                            alt={advert.name}
                            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded-sm"
                            src={advert.imgSrc}
                        />
                    ) : (
                        <div className="lg:w-1/2 w-full h-64 rounded-sm bg-gray-100 flex items-center justify-center text-gray-400">
                            Sin imagen
                        </div>
                    )}
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">
                            {advert.isForSale ? 'ON SALE' : 'NOT ON SALE'}
                        </h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                            {advert.name.toUpperCase()}
                        </h1>
                        {advert.tags?.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-4">
                                {advert.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="bg-(--primary-color) text-white text-xs px-2 py-1 rounded-md"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                        <div className="flex justify-end">
                            <span className="title-font font-medium text-2xl text-gray-900">
                                {advert.price.toFixed(2)} $
                            </span>
                        </div>
                        <div className="flex sm:my-10 items-center pb-5 border-b-2 border-gray-100 mb-5" />
                        {isLogged && (
                            <div>
                                <Button
                                    $size="full"
                                    onClick={() => setIsModalOpen(true)}
                                    $variant="danger"
                                    disabled={isDeleting}
                                >
                                    Eliminar
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <ConfirmDeleteModal
                    onClose={() => setIsModalOpen(false)}
                    onDelete={onDelete}
                    isDeleting={isDeleting}
                />
            )}
        </div>
    );
}

interface ConfirmDeleteModalProps {
    onClose: () => void;
    onDelete: () => Promise<void>;
    isDeleting: boolean;
}

const ConfirmDeleteModal = ({ onClose, onDelete, isDeleting }: ConfirmDeleteModalProps) => (
    <div
        className="fixed inset-0 bg-black/50 flex justify-center items-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
    >
        <div className="bg-white rounded-lg shadow-xl overflow-hidden p-6 w-full max-w-md">
            <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                Confirmación de eliminación
            </h3>
            <p className="mt-2 text-sm text-gray-500">
                Estás a punto de borrar este artículo. ¿Estás seguro?
            </p>
            <div className="mt-4 flex flex-col justify-end gap-3 md:flex-row">
                <Button type="button" onClick={onDelete} $variant="danger" $size="full" disabled={isDeleting}>
                    {isDeleting ? 'Eliminando…' : 'Borrar'}
                </Button>
                <Button $size="full" onClick={onClose} disabled={isDeleting}>
                    Cancelar
                </Button>
            </div>
        </div>
    </div>
);
