import { getAdverts } from "@services/advertsService"
import { useEffect, useState } from "react"

export function AdvertsPage() {
    const [advertsList, setAdvertsList] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const respone = await getAdverts()
                setAdvertsList(respone)
            } catch (err) {
                console.log('Error: ', err);
            }
        })()
    }, [])

    return (
        <div className="flex flex-wrap justify-center">
            {(advertsList.length > 0)
                ?
                <RenderAdvertList advertsList={advertsList} />
                :
                <AdvertsNotFound/>
            }
        </div>
    )
}


function RenderAdvertList(advertsList) {
    return (
        <>
            {advertsList.map((advert, key) => (
                <a href={`/adverts/${advert.id}`} key={key} className="m-3">
                    <div className="max-w-sm rounded overflow-hidden">
                        <img className="w-full rounded-lg" src="https://github.com/Doplax/doplax/blob/main/assets/img/product/defaultImage.png?raw=true" alt={`${advert.name}`} />
                        <div className=" flex items-center">
                            <span className="text-gray-700 font-bold text-xl">{advert.price} $</span>
                        </div>
                        <div className="">
                            <p className="text-gray-700 text-base">
                                {advert.name}
                            </p>
                        </div>
                    </div>
                </a>
            ))}
        </>
    )
}

function AdvertsNotFound() {
    return (
        <div>
            No hay anuncios para mostrar :c
        </div>
    )
}