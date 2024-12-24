import { getAdverts } from "@services/advertsService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Spinner } from '@components/Spinner/Spinner'
//import { useAuthHandlers } from '../Filters/FiltersContext'
import { useFilterValues } from '../Filters/FiltersContext'
import { LabelsBar } from '../Filters/LabelsBar'

export function AdvertsPage() {
    const [advertsList, setAdvertsList] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    
    const { searchValue, selectedTag} = useFilterValues();

    const filterAdverts = (unOrderAdvertsList) => {
        let advertslist = unOrderAdvertsList
        if (searchValue !== ''){
            advertslist = advertslist.filter(advert =>
                advert.name.toLowerCase().includes(searchValue)
            );
        } 
        
        //TODO: Acaba Filtro
        if (selectedTag !== ''){
            advertslist = advertslist.filter(objeto =>
                objeto.tags.some(tag => 
                    tag.toLowerCase().includes(selectedTag)
                )
        )}
        
        setAdvertsList(advertslist)
    }

    //TODO: sacar filter fuera del fetch para no sobrecargar el servidor 
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsFetching(true)
                const response = await getAdverts();
                filterAdverts(response.data.data);
                setIsFetching(false)
            } catch (err) {
                console.log('Error: ', err);
            }
        };
        fetchData();
        console.log(searchValue);
    }, [searchValue,selectedTag]);

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
                <Link to={`/adverts/${advert.id}`} key={key} className="m-3">
                    <div className="max-w-sm rounded overflow-hidden">
                        <img className="w-full rounded-lg" src="https://github.com/Doplax/doplax/blob/main/assets/img/product/defaultImage.png?raw=true" alt={`${advert.name}`} />
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
    )
}

