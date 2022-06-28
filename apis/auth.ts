import axios from 'axios';
import axiosInstance from './axiosInstance';

export const getUserAccessToken = async (kakao_token: string) => {
  try {
    const { data } = await axiosInstance.post('/api/auth/login', {
      kakao_token,
    });
    return data.data.access_token;
  } catch (error) {
    console.log('Error');
    return null;
  }
};

// export const getKakaoAccessToken = async (code: string) => {
//   const grant_type = 'authorization_code';
//   const { data } = await axios.post(
//     `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL}&code=${code}`,
//     {
//       headers: {
//         'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
//       },
//     },
//   );

//   return data.access_token;
// };

export const getKakaoAccessToken = async (code: string) => {
  const grant_type = 'authorization_code';
  try {
    const { data } = await axios.post(
      `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL}&code=${code}`,
      {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      },
    );

    return data.access_token;
  } catch (error) {
    console.log('Error');
    return null;
  }
};
