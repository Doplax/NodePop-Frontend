import {
    client,
    removeAuthorizationHeader,
    setAuthorizationHeader,
} from '@api/client';
import { storage } from '@shared/utils/storage';
import { LoginDTO, LoginResponseDTO } from '@shared/dtos';
import axios, { AxiosError } from 'axios';

export interface LoginError {
    message: string;
    status?: number;
}

const extractErrorMessage = (error: unknown, fallback: string): string => {
    if (axios.isAxiosError(error)) {
        const data = error.response?.data as
            | { error?: string; message?: string }
            | undefined;
        return data?.error || data?.message || error.message || fallback;
    }
    return fallback;
};

export const login = async (
    credentials: LoginDTO,
    rememberPassword: boolean,
): Promise<LoginResponseDTO> => {
    try {
        const response = await client.post<LoginResponseDTO>(
            '/api/auth/login',
            credentials,
        );
        const { token } = response.data;
        setAuthorizationHeader(token);
        if (rememberPassword) {
            storage.set('auth', token);
        } else {
            storage.remove('auth');
        }
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        throw {
            message: extractErrorMessage(error, 'Error en el inicio de sesión'),
            status: axiosError.response?.status,
        } as LoginError;
    }
};

export const logout = async (): Promise<void> => {
    removeAuthorizationHeader();
    storage.remove('auth');
};
