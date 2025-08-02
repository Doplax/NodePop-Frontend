import { AxiosResponse } from 'axios';

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
}

export type ApiCall<T = any> = Promise<AxiosResponse<T>>;

export interface ApiError {
  message: string;
  status?: number;
}