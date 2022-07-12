import { clientAuthApi as ax } from './auth';
import { addPresentTypes } from '@components/domain/present/hooks/useAddPresent';

export const detailFundApi = (fundId?: string | string[]) =>
  ax.get(`/api/funding/${fundId}`);

export const addPayments = (
  data: addPresentTypes,
  fundId?: string | string[],
) => {
  return ax.post(`/api/funding/${fundId}/payment`, data);
};
