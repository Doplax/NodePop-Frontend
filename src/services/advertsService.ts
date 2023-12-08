import {client} from '../api/client'

const advertsBaseUrl = '/api/v1/adverts';


export const getSingleAdvert = (advertId) => {
    const url = advertsBaseUrl;
    return client.get(`${url}/${advertId}`);
}

export const createAdvert = (advert) => {
    const url = advertsBaseUrl;
    return client.post(url, advert);
}
