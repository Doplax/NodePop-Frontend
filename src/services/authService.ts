import { client, removeAuthorizationHeader, setAuthorizationHeader } from '@api/client';
import { storage } from '@shared/utils/storage';
import { LoginDTO, LoginResponseDTO } from '@shared/dtos';

export const login = async (credentials: LoginDTO, rememberPassword: boolean): Promise<LoginResponseDTO> => {
    try {
        const response = await client.post<LoginResponseDTO>('/api/auth/login', credentials);
        const { token } = response.data;
        setAuthorizationHeader(token);

        if (rememberPassword) {
            storage.set('auth', token);
        }

        return response.data;
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