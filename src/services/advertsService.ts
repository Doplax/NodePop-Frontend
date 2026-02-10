import { client } from '@api/client';

const advertsBaseUrl = '/api/products';

export const getSingleAdvert = (advertId) => {
    return client.get(`${advertsBaseUrl}/${advertId}`); 
};

export const getAdverts = () => {
    return client.get(advertsBaseUrl);
};

export const createAdvert = (advert) => {
    return client.post(advertsBaseUrl, advert);
};

export const deleteAdvert = (advertId) => {
    return client.delete(`${advertsBaseUrl}/${advertId}`);
};
