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
    return { status: error.status, message: error.data.detail };
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
