import BaseApi from '@/services/BaseApi';

const backendApi = new BaseApi(import.meta.env.VITE_API_URL);

export default backendApi;
