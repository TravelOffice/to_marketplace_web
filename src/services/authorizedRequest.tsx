import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface ApiRequestConfig {
  headers?: any,
  queryParams?: any,
  data?: any,
  signal: any,
}

const baseUrl = import.meta.env.VITE_BASE_URL;

const authorizedRequest = {
  accessToken: '',

  toAxiosRequestConfig: (apiRequestConfig?: ApiRequestConfig) => {
    const axiosRequestConfig: AxiosRequestConfig = {
      headers: { Authorization: authorizedRequest.accessToken },
      params: apiRequestConfig?.queryParams,
      data: apiRequestConfig?.data,
      signal: apiRequestConfig?.signal,
    };
    return axiosRequestConfig;
  },

  proxyResponseApi: (response: AxiosResponse<any, any>): any => {
    const responseMessage = response.data.data.message;
    if (responseMessage === 'Failed') {
      throw new Error(response.data.hint);
    }
    return response.data.data;
  },

  async get(path: string, config?: ApiRequestConfig): Promise<any> {
    const axiosConfig = this.toAxiosRequestConfig(config);
    const response = await axios.get(`${baseUrl}${path}`, axiosConfig);
    console.log('Response', response);
    return this.proxyResponseApi(response);
  },

  async post(path: string, data?: any, config?: ApiRequestConfig): Promise<any> {
    const axiosConfig = this.toAxiosRequestConfig(config);
    const response = await axios.post(`${baseUrl}${path}`, data, axiosConfig);
    return this.proxyResponseApi(response);
  },

  async put(path: string, data?: any, config?: ApiRequestConfig): Promise<any> {
    const axiosConfig = this.toAxiosRequestConfig(config);
    const response = await axios.put(`${baseUrl}${path}`, data, axiosConfig);
    return this.proxyResponseApi(response);
  },

  async delete(path: string, config?: ApiRequestConfig): Promise<any> {
    const axiosConfig = this.toAxiosRequestConfig(config);
    const response = await axios.delete(`${baseUrl}${path}`, axiosConfig);
    return this.proxyResponseApi(response);
  },
};

export default authorizedRequest;
