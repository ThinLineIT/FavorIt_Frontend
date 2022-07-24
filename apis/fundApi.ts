import { clientAuthApi as ax } from './auth';
import {
  Bank,
  addFundFormType,
  addPaymentTypes,
  BankAccount,
  CheckBanksTypes,
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
    return { status: error.status, message: error.data.detail };
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
    .post('/api/funding/verification/bank-account', {
      ...data,
    })
    .then((res) => res.data);
};
