import { clientAuthApi as ax } from './auth';
import { addPresentTypes } from './types';

export const detailFundApi = (fundId?: string | string[]) =>
  ax.get(`/api/funding/${fundId}`);

export const addPayments = (
  data: addPresentTypes,
  fundId?: string | string[],
) => ax.post(`/api/funding/${fundId}/payment`, data);
