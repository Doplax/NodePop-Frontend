import { client, removeAuthorizationHeader, setAuthorizationHeader } from '@api/client';
import { storage } from '@shared/utils/storage';
import { LoginDTO, LoginResponseDTO } from '@shared/dtos';
import { AxiosError } from 'axios';

export interface LoginError {
    message: string;
    status?: number;
}

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
        const axiosError = error as AxiosError;
        const responseData = axiosError.response?.data as any;
        const errorMessage = responseData?.message ||
            axiosError.message ||
            'Error en el inicio de sesión';

        console.error("Error de autenticación:", {
            status: axiosError.response?.status,
            message: errorMessage,
            url: axiosError.config?.url,
        });

        throw {
            message: errorMessage,
            status: axiosError.response?.status,
        } as LoginError;
    }
};

export const logout = async (): Promise<void> => {
    return Promise.resolve().then(() => {
        removeAuthorizationHeader();
        storage.remove('auth');
    });
};