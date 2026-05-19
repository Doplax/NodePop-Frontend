import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';

const baseURL =
    import.meta.env.VITE_REACT_APP_API_BASE_URL || 'http://localhost:4500';

export const UNAUTHORIZED_EVENT = 'auth:unauthorized';

let isAuthorized = false;
let listenersBound = false;

export const client: AxiosInstance = axios.create({
    baseURL,
    timeout: 15000,
});

// Set a sensible default Content-Type only when no body is provided as FormData.
client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (!(config.data instanceof FormData) && !config.headers['Content-Type']) {
        config.headers.set('Content-Type', 'application/json');
    }
    return config;
});

client.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            removeAuthorizationHeader();
            if (typeof window !== 'undefined' && listenersBound) {
                window.dispatchEvent(new CustomEvent(UNAUTHORIZED_EVENT));
            }
        }
        return Promise.reject(error);
    },
);

export const setAuthorizationHeader = (token: string): void => {
    client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    isAuthorized = true;
};

export const removeAuthorizationHeader = (): void => {
    delete client.defaults.headers.common['Authorization'];
    isAuthorized = false;
};

export const hasAuthorizationHeader = (): boolean => isAuthorized;

export const subscribeToUnauthorized = (handler: () => void): (() => void) => {
    if (typeof window === 'undefined') return () => {};
    listenersBound = true;
    window.addEventListener(UNAUTHORIZED_EVENT, handler);
    return () => window.removeEventListener(UNAUTHORIZED_EVENT, handler);
};
