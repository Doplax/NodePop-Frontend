import axios from 'axios';

const client = axios.create({
 baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL,
});

console.log(client.defaults.baseURL);

client.interceptors.response.use(response => response.data);

export const setAuthorizarionHeader = token => {
	(client.defaults.headers.common['Authorization'] = `Bearer ${token}`)
}

export const removeAuthorizarionHeader = () => {
    delete client.defaults.headers.common['Authorization'];
}

export default client;