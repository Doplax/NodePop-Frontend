import  {client, removeAuthorizarionHeader, setAuthorizationHeader } from '../api/client';
import { storage } from '@utils/storage';

export const login = async (credentials,rememberPassword) => {
	return client
        .post('/api/auth/login', credentials)
		.then(({ accessToken }) => {
            setAuthorizationHeader(accessToken)
            if (rememberPassword) {storage.set('auth', accessToken)}
        })
}

export const logout = async () => {
    return Promise.resolve().then(()=>{
        removeAuthorizarionHeader();
        storage.remove('auth');
    })
}