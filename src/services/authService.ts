import { client, removeAuthorizationHeader, setAuthorizationHeader } from '../api/client';
import { storage } from '@utils/storage';
import { LoginCredentials, LoginResponse } from '@shared/index';

export const login = async (credentials: LoginCredentials, rememberPassword: boolean): Promise<void> => {
    try {
        const response = await client.post<LoginResponse>('/api/auth/login', credentials);
        const { token } = response.data;
        setAuthorizationHeader(token);

        if (rememberPassword) { 
            storage.set('auth', token);
        }

    } catch (error) {
        console.error("Error en el inicio de sesión:", error);
        throw error; 
    }
};

export const logout = async (): Promise<void> => {
    return Promise.resolve().then(() => {
        removeAuthorizationHeader();
        storage.remove('auth');
    });
};