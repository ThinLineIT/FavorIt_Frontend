import axios from 'axios';
import { getCookie } from 'cookies-next';
import { clientAuthApi as ax } from './auth';
import { addPresentTypes } from './types';

export const addFundApi = (data: addPresentTypes) =>
  ax.post(`/api/funding`, data);
import { COOKIE } from '@util/cookie';

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

export const addPayments = (
  data: addPresentTypes,
  fundId?: string | string[],
) => ax.post(`/api/funding/${fundId}/payment`, data);
