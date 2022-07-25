import axios from 'axios';
import { getCookie } from 'cookies-next';
import { clientAuthApi as ax } from './auth';
import {
  Bank,
  addFundFormType,
  addPaymentTypes,
  BankAccount,
  CheckBanksTypes,
  paymentsDoneData,
} from './@types/fund';

export const addFundApi = async (data: addFundFormType) =>
  await ax.post(`/api/funding`, data);

export const detailFundApi = async (fundId: number) => {
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

export const addPaymentsApi = async (data: addPaymentTypes, fundId: number) =>
  await ax.post(`/api/funding/${fundId}/present`, data);

export const getBanksApi = async (): Promise<Bank> =>
  await ax.post('/api/funding/options/bank');

export const checkBankAccountApi = async (
  data: CheckBanksTypes,
): Promise<BankAccount> => {
  return await ax
    .post('/api/funding/verification/bank-account', data)
    .then((res) => res.data);
};

export const paymentFundApi = async (
  paymentData: paymentsDoneData,
  fundId: number,
) => await ax.post(`/api/funding/${fundId}/payment`, paymentData);
