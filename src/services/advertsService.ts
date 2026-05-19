import { client } from '@api/client';
import {
  CreateProductInput,
  PaginatedProducts,
  Product,
  ProductsListQuery,
  UpdateProductInput,
} from '@shared/dtos';
import { AxiosResponse } from 'axios';

const advertsBaseUrl = '/api/products';

const buildFormData = (input: CreateProductInput | UpdateProductInput): FormData => {
    const form = new FormData();
    if (input.name !== undefined) form.append('name', input.name);
    if (input.price !== undefined) form.append('price', String(input.price));
    if (input.isForSale !== undefined) form.append('isForSale', String(input.isForSale));
    if (input.tags?.length) {
        for (const tag of input.tags) form.append('tags', tag);
    }
    if (input.photo) form.append('photo', input.photo);
    return form;
};

export const getAdverts = async (
    params: ProductsListQuery = {},
): Promise<PaginatedProducts> => {
    const response = await client.get<PaginatedProducts | Product[]>(advertsBaseUrl, { params });
    // Back-compat: if a legacy backend returns an array, wrap it.
    if (Array.isArray(response.data)) {
        return {
            items: response.data,
            total: response.data.length,
            page: 1,
            limit: response.data.length || 0,
            pages: 1,
        };
    }
    return response.data;
};

export const getSingleAdvert = (advertId: string): Promise<AxiosResponse<Product>> => {
    return client.get<Product>(`${advertsBaseUrl}/${advertId}`);
};

export const createAdvert = (input: CreateProductInput): Promise<AxiosResponse<{ data: Product }>> => {
    return client.post(advertsBaseUrl, buildFormData(input), {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

export const updateAdvert = (
    advertId: string,
    input: UpdateProductInput,
): Promise<AxiosResponse<{ data: Product }>> => {
    return client.put(`${advertsBaseUrl}/${advertId}`, buildFormData(input), {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

export const deleteAdvert = (advertId: string): Promise<AxiosResponse<void>> => {
    return client.delete(`${advertsBaseUrl}/${advertId}`);
};
