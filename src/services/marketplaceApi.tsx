import BaseApi from '@/services/BaseApi';

const marketplaceApi = new BaseApi(import.meta.env.VITE_MARKETPLACE_API_URL);

export default marketplaceApi;
