import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getAccessToken } from '@/utils/auth';

export interface ApiRequestConfig {
  headers?: any,
  queryParams?: any,
  data?: any,
  signal?: any,
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

const toAxiosRequestConfig = (apiRequestConfig?: ApiRequestConfig) => {
  const axiosRequestConfig: AxiosRequestConfig = {
    headers: { Authorization: getAccessToken() },
    params: apiRequestConfig?.queryParams,
    data: apiRequestConfig?.data,
    signal: apiRequestConfig?.signal,
  };
  return axiosRequestConfig;
};

const proxyResponseApi = <T>(response: AxiosResponse<any, any>): T => {
  const responseMessage = response.data.message;
  if (responseMessage === 'Failed!') {
    throw new Error(response.data.hint);
  }
  return response.data.data;
};

export default class BaseApi {
  constructor(private readonly baseUrl: string) {
  }

  async get<T>(path: string, config?: ApiRequestConfig): Promise<T> {
    const axiosConfig = toAxiosRequestConfig(config);
    const response = await axios.get(`${this.baseUrl}${path}`, axiosConfig);
    return proxyResponseApi(response);
  }

  async post<T>(path: string, data?: any, config?: ApiRequestConfig): Promise<T> {
    const axiosConfig = toAxiosRequestConfig(config);
    const response = await axios.post(`${this.baseUrl}${path}`, data, axiosConfig);
    return proxyResponseApi(response);
  }

  async put<T>(path: string, data?: any, config?: ApiRequestConfig): Promise<T> {
    const axiosConfig = toAxiosRequestConfig(config);
    const response = await axios.put(`${this.baseUrl}${path}`, data, axiosConfig);
    return proxyResponseApi(response);
  }

  async delete<T>(path: string, config?: ApiRequestConfig): Promise<T> {
    const axiosConfig = toAxiosRequestConfig(config);
    const response = await axios.delete(`${this.baseUrl}${path}`, axiosConfig);
    return proxyResponseApi(response);
  }
}
