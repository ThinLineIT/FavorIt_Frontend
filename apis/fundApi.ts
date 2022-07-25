import axios from 'axios';
import { getCookie } from 'cookies-next';
import { clientAuthApi as ax } from './auth';
import { addFundFormType, addPaymentTypes } from './@types/fund';

export const addFundApi = async (data: addFundFormType) =>
  await ax.post(`/api/funding`, data);

export const detailFundApi = async (fundId?: string | string[]) => {
  try {
    const {
      data: { data },
    } = await ax.get(`/api/funding/${fundId}`);
    return data;
  } catch (error: any) {
    return {
      status: error.response.status,
      message: error.response.data.detail,
    };
  }
};

export const fundingCloseApi = async (fundId: string) => {
  try {
    const data = await ax.post(`/api/funding/${fundId}/close`);
    // console.log(data);
    return data;
  } catch (error) {
    // console.log(error);
    return error;
  }
};

export const addPayments = async (
  data: addPaymentTypes,
  fundId?: string | string[],
) => await ax.post(`/api/funding/${fundId}/present`, data);

export const getBanksApi = async () =>
  await ax.post('/api/funding/options/bank');

export const getCheckBanksApi = async (data: any) =>
  await ax.post('/api/funding/verification/bank-account', {
    data,
  });
