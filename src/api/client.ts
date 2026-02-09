import axios, { AxiosInstance } from 'axios';

/**
 * Creates an instance of Axios with a base configuration.
 * `baseURL` is set from an environment variable 
 */
export const client: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL,
});

/**
 * Sets the authorization header for all outgoing HTTP requests.
 * Useful to ensure that requests include the necessary JWT token for authentication.
 *
 * @param {string} token - JWT token to be included in the authorization header.
 */
export const setAuthorizationHeader = (token: string): void => {
    client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

/**
 * Removes the authorization header from HTTP requests.
 * Useful for when the user logs out and no longer needs to send the JWT token.
 */
export const removeAuthorizationHeader = (): void => {
    delete client.defaults.headers.common['Authorization'];
}
