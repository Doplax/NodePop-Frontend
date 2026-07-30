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

// La API responde con códigos (`INVALID_CREDENTIALS`), no con texto para el
// usuario. Sin esta traducción la pantalla de login mostraba el código tal cual.
const ERROR_MESSAGES: Record<string, string> = {
    INVALID_CREDENTIALS: 'Email o contraseña incorrectos.',
    TOO_MANY_AUTH_ATTEMPTS:
        'Demasiados intentos fallidos. Vuelve a probar en unos minutos.',
    ERROR_LOGIN_USER: 'No hemos podido iniciar sesión. Inténtalo más tarde.',
    ERROR_REGISTER_USER: 'No hemos podido crear la cuenta. Inténtalo más tarde.',
    ERROR_REGISTER_USER_ALREADY_EXISTS: 'Ya existe una cuenta con ese email.',
    ERROR_AUTHENTICATION_MISSING_TOKEN: 'Tu sesión ha caducado. Vuelve a entrar.',
    ERROR_TOKEN_INVALID_OR_EXPIRED: 'Tu sesión ha caducado. Vuelve a entrar.',
    ERROR_USER_NOT_FOUND_FOR_TOKEN: 'Tu sesión ya no es válida. Vuelve a entrar.',
    ERROR_UNAUTHORIZED: 'No tienes permiso para hacer esto.',
    INTERNAL_SERVER_ERROR: 'Error interno del servidor. Inténtalo más tarde.',
    CORS_NOT_ALLOWED: 'El servidor ha rechazado la petición de este origen.',
};

interface ApiErrorBody {
    error?: string;
    message?: string;
    // Los errores de validación llegan como `{ success, errors: [...] }`, una
    // forma que antes no se contemplaba y acababa mostrando el texto de axios
    // ("Request failed with status code 400").
    errors?: Array<{ msg?: string }>;
}

const extractErrorMessage = (error: unknown, fallback: string): string => {
    if (!axios.isAxiosError(error)) return fallback;

    // Sin respuesta: la API no está accesible (caída, CORS, timeout, sin red).
    if (!error.response) {
        return error.code === 'ECONNABORTED'
            ? 'El servidor ha tardado demasiado en responder. Inténtalo de nuevo.'
            : 'No hemos podido conectar con el servidor. Comprueba tu conexión.';
    }

    const data = error.response.data as ApiErrorBody | undefined;

    if (data?.error && ERROR_MESSAGES[data.error]) return ERROR_MESSAGES[data.error];

    const validationMessage = data?.errors?.find((e) => e.msg)?.msg;
    if (validationMessage) return validationMessage;

    return data?.message || fallback;
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
