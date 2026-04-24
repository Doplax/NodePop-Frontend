import axios, { AxiosInstance, AxiosError } from 'axios';

const baseURL = import.meta.env.VITE_REACT_APP_API_BASE_URL || 'http://localhost:4500';

export const client: AxiosInstance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

client.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            removeAuthorizationHeader();
        }
        return Promise.reject(error);
    }
);

export const setAuthorizationHeader = (token: string): void => {
    client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const removeAuthorizationHeader = (): void => {
    delete client.defaults.headers.common['Authorization'];
}
