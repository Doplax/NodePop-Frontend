import axios from 'axios';

export const client = axios.create({
 baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL,
});

axios.interceptors.request.use(request => {
  console.log('Starting Request', request);
  return request;
});


client.interceptors.response.use(response => response.data);

export const setAuthorizationHeader = token => {
	(client.defaults.headers.common['Authorization'] = `Bearer ${token}`)
}

export const removeAuthorizarionHeader = () => {
    delete client.defaults.headers.common['Authorization'];
}

