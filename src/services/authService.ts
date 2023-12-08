import  {client, removeAuthorizarionHeader, setAuthorizationHeader } from '../api/client';
import { storage } from '@utils/storage';

export const login = async credentials => {
	return client
        .post('/api/auth/login', credentials)
		.then(({ accessToken }) => {
            setAuthorizationHeader(accessToken)
            storage.set('auth', accessToken);
        })
}

export const logout = async () => {
    return Promise.resolve().then(()=>{
        removeAuthorizarionHeader();
        storage.remove('auth');
    })
}