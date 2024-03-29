import { clientAuthApi as ax } from './auth';
import {
  Bank,
  addFundFormType,
  addPaymentTypes,
  BankAccount,
  CheckBanksTypes,
  paymentsDoneData,
} from './@types/fund';
import { presentListApi } from './present';

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
    return data.status;
  } catch (error) {
    // console.log(error);
    return error;
  }
};

export const addPaymentsApi = async (data: addPaymentTypes, fundId: number) =>
  await ax.post(`/api/funding/${fundId}/present`, data);

export const getBanksApi = async (): Promise<Bank> =>
  await ax.get('/api/funding/options/bank');

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

export const fundSettlePageApi = async (fundId: number) => {
  try {
    const fundDetails = detailFundApi(fundId);
    const presentList = presentListApi(fundId);
    return {
      fundDetails,
      presentList,
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const closeFund = async (fundId: string | number) =>
  await ax.post(`/api/funding/${fundId}/close`);
