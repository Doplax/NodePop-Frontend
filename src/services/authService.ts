import { client, removeAuthorizationHeader, setAuthorizationHeader } from '@api/client';
import { storage } from '@shared/utils/storage';


export const login = async (credentials, rememberPassword) => {
    try {
        const response = await client.post('/api/auth/login', credentials);
        const { token } = response.data;
        setAuthorizationHeader(token);

        if (rememberPassword) { storage.set('auth', token)}

    } catch (error) {
        console.error("Error en el inicio de sesión:", error);
        throw error; 
    }
}


export const logout = async () => {
    return Promise.resolve().then(()=>{
        removeAuthorizationHeader();
        storage.remove('auth');
    })
}