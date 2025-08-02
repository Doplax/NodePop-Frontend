import React, { useEffect, useState, useCallback } from "react";
import { getAdverts } from "@services/advertsService";
import { Link } from "react-router-dom";
import { Spinner } from '@components/Spinner/Spinner';
//import { useAuthHandlers } from '../Filters/FiltersContext'
import { useFilterValues } from '../Filters/FiltersContext';
import { LabelsBar } from '../Filters/LabelsBar';
import { Advert, RenderAdvertListProps } from '@shared/index';

export const AdvertsPage: React.FC = () => {
    const [advertsList, setAdvertsList] = useState<Advert[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    
    const { searchValue, selectedTag } = useFilterValues();

    const filterAdverts = useCallback((unOrderAdvertsList: Advert[]): Advert[] => {
        let filteredAdverts = unOrderAdvertsList; // Cambiado el nombre para evitar colisiones
        
        if (searchValue !== '') {
            filteredAdverts = filteredAdverts.filter((advert: Advert) =>
                advert.name.toLowerCase().includes(searchValue)
            );
        } 
        
        if (selectedTag !== '') {
            filteredAdverts = filteredAdverts.filter((objeto: Advert) =>
                objeto.tags.some((tag: string) => 
                    tag.toLowerCase().includes(selectedTag)
                )
            );
        }
        
        return filteredAdverts;
    }, [searchValue, selectedTag]);

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                setIsFetching(true);
                const response = await getAdverts();
                const filteredData = filterAdverts(response.data);
                setAdvertsList(filteredData);
                setIsFetching(false);
            } catch (err) {
                console.log('Error: ', err);
            }
        };
        fetchData();
    }, [searchValue, selectedTag, filterAdverts]);

    return (
        <div>
            <LabelsBar/>
            <div className="flex flex-wrap justify-center">
                {isFetching
                    ? <Spinner />
                    : <RenderAdvertList advertsList={advertsList} />
                }
            </div>
        </div>
    );
}

const RenderAdvertList: React.FC<RenderAdvertListProps> = ({ advertsList }) => {
    return (
        <>
            {advertsList.map((advert: Advert, key: number) => (
                <Link to={`/adverts/${advert._id}`} key={key} className="m-3">
                    <div className="max-w-sm rounded overflow-hidden">
                        <img className="w-full rounded-lg" src={advert.imgSrc} alt={`${advert.name}`} />
                        <div className="flex justify-between w-full mt-1">
                            <span className="text-gray-700 font-bold text-xl">{advert.price} $</span>
                            <span className="bg-[--primary-color] font-bold text-white rounded-md text-xs py-1 px-2 hover:bg-[--secondary-color]">{advert.tags}</span>
                        </div>
                        <div className="flex justify-between w-full">
                            <span>{advert.name}</span>
                            <span> {advert.sale ? "En Venta" : "NO en venta"}</span>
                        </div>
                    </div>
                </Link>
            ))}
        </>
    );
}
