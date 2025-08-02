import { client } from '../api/client';
import { Advert, CreateAdvertRequest, ApiCall } from '@shared/index';

const advertsBaseUrl = '/api/products';

export const getSingleAdvert = (advertId: string): ApiCall<Advert> => {
    return client.get(`${advertsBaseUrl}/${advertId}`); 
};

export const getAdverts = (): ApiCall<Advert[]> => {
    return client.get(advertsBaseUrl);
};

export const createAdvert = (advert: CreateAdvertRequest): ApiCall<Advert> => {
    return client.post(advertsBaseUrl, advert);
};

export const deleteAdvert = (advertId: string): ApiCall<void> => {
    return client.delete(`${advertsBaseUrl}/${advertId}`);
};
