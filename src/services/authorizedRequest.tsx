import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useAuthStore } from '@/hooks/auth';

export interface ApiRequestConfig {
  headers?: any,
  queryParams?: any,
  data?: any,
  signal: any,
}

export type PaginationPayload<T extends Object = any> = {
  data: T[];
  paging: {
    cursors: {
      before: string,
      after: string
    }
  };
};

export interface PaginationParams {
  nextToken?: string,
  limit?: number,
  sortDesc?: boolean,
}

const baseUrl = import.meta.env.VITE_BASE_URL;

const authorizedRequest = {
  toAxiosRequestConfig: (apiRequestConfig?: ApiRequestConfig) => {
    const axiosRequestConfig: AxiosRequestConfig = {
      headers: { Authorization: useAuthStore.getState().accessToken },
      params: apiRequestConfig?.queryParams,
      data: apiRequestConfig?.data,
      signal: apiRequestConfig?.signal,
    };
    return axiosRequestConfig;
  },

  proxyResponseApi<T>(response: AxiosResponse): T {
    const responseMessage = response.data.data.message;
    if (responseMessage === 'Failed') {
      throw new Error(response.data.hint);
    }
    return response.data.data as T;
  },

  async get<T>(path: string, config?: ApiRequestConfig): Promise<T> {
    const axiosConfig = this.toAxiosRequestConfig(config);
    const response = await axios.get(`${baseUrl}${path}`, axiosConfig);
    return this.proxyResponseApi(response);
  },

  async post<T>(path: string, data?: any, config?: ApiRequestConfig): Promise<T> {
    const axiosConfig = this.toAxiosRequestConfig(config);
    const response = await axios.post(`${baseUrl}${path}`, data, axiosConfig);
    return this.proxyResponseApi(response);
  },

  async put<T>(path: string, data?: any, config?: ApiRequestConfig): Promise<T> {
    const axiosConfig = this.toAxiosRequestConfig(config);
    const response = await axios.put(`${baseUrl}${path}`, data, axiosConfig);
    return this.proxyResponseApi(response);
  },

  async delete<T>(path: string, config?: ApiRequestConfig): Promise<T> {
    const axiosConfig = this.toAxiosRequestConfig(config);
    const response = await axios.delete(`${baseUrl}${path}`, axiosConfig);
    return this.proxyResponseApi(response);
  },
};

export default authorizedRequest;
