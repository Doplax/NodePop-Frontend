import {client} from '../api/client'

const advertsBaseUrl = '/api/products';


export const getSingleAdvert = (advertId) => {
    const url = advertsBaseUrl;
    
    return client.get(`${url}/${advertId}`);
}

export const getAdverts = () => {
    const url = advertsBaseUrl;
    return client.get(url);
}

export const createAdvert = (advert) => {
    const url = advertsBaseUrl;
    return client.post(url, advert);
}


export const deleteAdvert = (advertId) => {
    const url = advertsBaseUrl;
    return client.delete(`${url}/${advertId}`);
}