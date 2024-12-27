import { getAdverts } from "@services/advertsService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Spinner } from '@components/Spinner/Spinner';
//import { useAuthHandlers } from '../Filters/FiltersContext'
import { useFilterValues } from '../Filters/FiltersContext';
import { LabelsBar } from '../Filters/LabelsBar';

export function AdvertsPage() {
    const [advertsList, setAdvertsList] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    
    const { searchValue, selectedTag } = useFilterValues();

    const filterAdverts = (unOrderAdvertsList) => {
        let filteredAdverts = unOrderAdvertsList; // Cambiado el nombre para evitar colisiones
        
        if (searchValue !== '') {
            filteredAdverts = filteredAdverts.filter(advert =>
                advert.name.toLowerCase().includes(searchValue)
            );
        } 
        
        if (selectedTag !== '') {
            filteredAdverts = filteredAdverts.filter(objeto =>
                objeto.tags.some(tag => 
                    tag.toLowerCase().includes(selectedTag)
                )
            );
        }
        
        setAdvertsList(filteredAdverts);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsFetching(true);
                const response = await getAdverts();
                filterAdverts(response.data);
                setIsFetching(false);
            } catch (err) {
                console.log('Error: ', err);
            }
        };
        fetchData();
    }, [searchValue, selectedTag]);

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

function RenderAdvertList({ advertsList }) {
    return (
        <>
            {advertsList.map((advert, key) => (
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
