import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getSingleAdvert } from "@services/advertsService";

export function AdvertPage(){
    const { advertId } = useParams()

    const [advertData, setAdvertData] = useState({
        name: 'name',
        sale: true,
        price: 100,
        tags: ['tag'],
    });

    useEffect(() => {
        const fetchAdvert = async () =>  {
            const {name, sale, price, tags} = await getSingleAdvert(advertId)
            setAdvertData({name, sale, price, tags})
        }
        fetchAdvert()
    },[advertId])
    
    console.log(advertData);
    console.log(advertData.sale);
    
    
    return(
        <>
            <h1>Name: {advertData.name}</h1>
            {advertData.sale ? <h1>En venta</h1> : <h1>No en venta</h1> }
            <h1>Price: {advertData.price}</h1>
            <h1>Tags: {advertData.tags[0]}</h1>



        </>
    )
}