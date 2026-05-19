import { getAdverts } from "@services/advertsService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Spinner } from '@components/Spinner/Spinner';
import { useFilterValues } from '@filters/FiltersContext';
import { LabelsBar } from '@filters/LabelsBar';
import { Product } from '@shared/dtos';

export function AdvertsPage() {
    const [adverts, setAdverts] = useState<Product[]>([]);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { searchValue, selectedTag } = useFilterValues();

    useEffect(() => {
        let cancelled = false;
        const fetchData = async (): Promise<void> => {
            setIsFetching(true);
            setError(null);
            try {
                const result = await getAdverts({
                    search: searchValue || undefined,
                    tag: selectedTag || undefined,
                    sort: '-createdAt',
                    limit: 100,
                });
                if (!cancelled) {
                    setAdverts(result.items);
                }
            } catch (err) {
                if (!cancelled) {
                    setError('No pudimos cargar los productos. Inténtalo más tarde.');
                    setAdverts([]);
                }
            } finally {
                if (!cancelled) setIsFetching(false);
            }
        };
        fetchData();
        return () => {
            cancelled = true;
        };
    }, [searchValue, selectedTag]);

    return (
        <div>
            <LabelsBar />
            <div className="flex flex-wrap justify-center min-h-[200px]">
                {isFetching ? (
                    <Spinner />
                ) : error ? (
                    <ErrorState message={error} />
                ) : adverts.length === 0 ? (
                    <EmptyState />
                ) : (
                    <AdvertList items={adverts} />
                )}
            </div>
        </div>
    );
}

const EmptyState = () => (
    <div className="text-center py-12 text-gray-500">
        <p className="text-lg">No hay productos que coincidan con tu búsqueda.</p>
        <p className="text-sm">Prueba a cambiar los filtros o crea un anuncio nuevo.</p>
    </div>
);

const ErrorState = ({ message }: { message: string }) => (
    <div className="text-center py-12 text-red-600">
        <p className="text-lg">{message}</p>
    </div>
);

interface AdvertListProps {
    items: Product[];
}

function AdvertList({ items }: AdvertListProps) {
    return (
        <>
            {items.map((advert) => (
                <Link to={`/adverts/${advert._id}`} key={advert._id} className="m-3">
                    <div className="max-w-sm rounded overflow-hidden">
                        {advert.imgSrc ? (
                            <img
                                className="w-full rounded-lg aspect-square object-cover"
                                src={advert.imgSrc}
                                alt={advert.name}
                                loading="lazy"
                            />
                        ) : (
                            <div className="w-full aspect-square rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                                Sin imagen
                            </div>
                        )}
                        <div className="flex justify-between w-full mt-1">
                            <span className="text-gray-700 font-bold text-xl">{advert.price} $</span>
                            {advert.tags?.[0] && (
                                <span className="bg-[--primary-color] font-bold text-white rounded-md text-xs py-1 px-2 hover:bg-[--secondary-color]">
                                    {advert.tags.join(', ')}
                                </span>
                            )}
                        </div>
                        <div className="flex justify-between w-full">
                            <span>{advert.name}</span>
                            <span>{advert.isForSale ? 'En venta' : 'No en venta'}</span>
                        </div>
                    </div>
                </Link>
            ))}
        </>
    );
}
