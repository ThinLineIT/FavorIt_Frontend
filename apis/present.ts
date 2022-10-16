import { clientAuthApi as ax } from './auth';

export const presentListApi = async (fundId: number) =>
  await ax.get(`/api/funding/${fundId}/presents`);
