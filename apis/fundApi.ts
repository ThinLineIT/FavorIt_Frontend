import axiosInstance from '@apis/axiosInstance';

export const detailApi = () => axiosInstance.get('/fund/detail');
