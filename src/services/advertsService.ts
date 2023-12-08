import {client} from '../api/client'

const advertsBaseUrl = '/api/v1/adverts';



export const createAdvert = (advert) => {
    const url = advertsBaseUrl;
    return client.post(url, advert);
}
