import { clientAuthApi as ax } from './auth';

export const presentListApi = async (fundId: number) =>
  await ax.get(`/api/funding/${fundId}/presents`);

export const presentApi = async (fundId: number, formData: FormData) => {
  const { data } = await ax.post(
    `/api/v2/funding/${fundId}/present`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return data;
};
