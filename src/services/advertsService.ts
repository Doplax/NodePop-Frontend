import { client } from '@api/client';
import { Product, CreateProductDTO } from '@shared/dtos';
import { AxiosResponse } from 'axios';

const advertsBaseUrl = '/api/products';

export const getSingleAdvert = (advertId: string): Promise<AxiosResponse<Product>> => {
    return client.get(`${advertsBaseUrl}/${advertId}`);
};

export const getAdverts = (): Promise<AxiosResponse<Product[]>> => {
    return client.get(advertsBaseUrl);
};

export const createAdvert = (advert: CreateProductDTO): Promise<AxiosResponse<Product>> => {
    return client.post(advertsBaseUrl, advert);
};

export const deleteAdvert = (advertId: string): Promise<AxiosResponse<void>> => {
    return client.delete(`${advertsBaseUrl}/${advertId}`);
};
