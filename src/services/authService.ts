import  {client, removeAuthorizarionHeader, setAuthorizationHeader } from '../api/client';
import { storage } from '@utils/storage';


export const login = async (credentials, rememberPassword) => {
    try {
        const response = await client.post('/api/auth/login', credentials);
        const { accessToken } = response.data;
        setAuthorizationHeader(accessToken);

        if (rememberPassword) { storage.set('auth', accessToken)}

    } catch (error) {
        console.error("Error en el inicio de sesión:", error);
        throw error; 
    }
}


export const logout = async () => {
    return Promise.resolve().then(()=>{
        removeAuthorizarionHeader();
        storage.remove('auth');
    })
}