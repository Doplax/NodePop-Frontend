import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom"
import { getSingleAdvert } from "@services/advertsService";


export function AdvertPage() {
    const { advertId } = useParams()

    const [advertData, setAdvertData] = useState({
        name: '',
        sale: false,
        price: 0,
        tags: ['tag'],
        image: 'https://github.com/Doplax/doplax/blob/main/assets/img/product/defaultImage.png?raw=true'
    });



    useEffect(() => {
        const fetchAdvert = async () => {
            try {
                
                const response = await getSingleAdvert(advertId);
                const { name, sale, price, tags } = response.data
                setAdvertData({ ...advertData, name, sale, price, tags });
            } catch (error) {
                console.error('Error', error);
                
            }
        };
    
        fetchAdvert();
    }, []);
    


    return (
        <>
            {advertData.name.length === 0  
                ? <h1>socorro</h1>
                : <RenderAdvert advertData={advertData} />
                //<Navigate to="/404"/>
            }
        </>
    )
}

function RenderAdvert({advertData}) {
    return(
        <div className=" rounded-lg overflow-hidden p-6">
                <div className="container px-5 py-24 mx-auto" >
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                            src={advertData.image} />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0" >
                            <h2 className="text-sm title-font text-gray-500 tracking-widest" >
                                {advertData.sale ? 'ON SALE' : 'NOT ON LSAE'}
                            </h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1" >
                                {advertData.name.toUpperCase()}
                            </h1>
                            <div className="flex mb-4">
                                <span className="flex items-center">
                                    <svg fill="currentColor" stroke="currentColor" stroke-linecap="round"
                                        stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-greenColor"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
                                        </path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" stroke-linecap="round"
                                        stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-greenColor"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
                                        </path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" stroke-linecap="round"
                                        stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-greenColor"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
                                        </path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" stroke-linecap="round"
                                        stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-greenColor"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
                                        </path>
                                    </svg>
                                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" className="w-4 h-4 text-greenColor" viewBox="0 0 24 24">
                                        <path
                                            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
                                        </path>
                                    </svg>
                                    <span className="text-gray-600 ml-3">20 Reviews</span>
                                </span>
                                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                        </svg>
                                    </a>
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path
                                                d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z">
                                            </path>
                                        </svg>
                                    </a>
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path
                                                d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z">
                                            </path>
                                        </svg>
                                    </a>
                                </span>
                            </div>
                            <p className="leading-relaxed">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, dolores! Non exercitationem iure accusantium doloremque quae laborum aspernatur illo qui perferendis, voluptatum ullam voluptate obcaecati minus libero nesciunt neque consectetur?
                            </p>
                            <div className="flex sm:my-20 items-center pb-5 border-b-2 border-gray-100 mb-5"></div>
                            <div className="flex">
                                <span className="title-font font-medium text-2xl text-gray-900">{advertData.price.toFixed(2)} $
                                </span>
                                <button
                                    className="flex ml-auto text-white bg-greenColor font-bold border-0 py-2 px-6 focus:outline-none rounded">
                                    Buy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}