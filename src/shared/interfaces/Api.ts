import { AxiosResponse } from 'axios';

export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
}

export type ApiCall<T = unknown> = Promise<AxiosResponse<T>>;

export interface ApiError {
  message: string;
  status?: number;
}