import axios from 'axios';
import axiosInstance from './axiosInstance';
import { COOKIE } from '@util/cookie';
import { getCookie, setCookie } from 'cookies-next';

export const clientAuthApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});
// TODO: 타입 정의 custom
clientAuthApi.interceptors.request.use((config) => {
  const accessToken = getCookie(COOKIE.ACCESS_TOKEN);
  if (accessToken && config.headers) {
    config.headers['Authorization'] = `Bearer ${accessToken}` as string;
  }
  return config;
});

clientAuthApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const refresh_token = getCookie(COOKIE.REFRESH_TOKEN);
    const requestRecycle = error.config;
    if (
      error.response.status === 401 &&
      typeof refresh_token === 'string' &&
      !requestRecycle.isRecycle
    ) {
      requestRecycle.isRecycle = true;
      const { data } = await renewUserToken(refresh_token);
      setCookie(COOKIE.ACCESS_TOKEN, data[COOKIE.ACCESS_TOKEN], {
        maxAge: COOKIE.ACCESS_MAX_AGE,
      });
      setCookie(COOKIE.REFRESH_TOKEN, data[COOKIE.REFRESH_TOKEN], {
        maxAge: COOKIE.REFRESH_MAX_AGE,
      });
      return await clientAuthApi(requestRecycle);
    }
    return Promise.reject(error);
  },
);

export const getUserAccessToken = async (kakao_token: string) => {
  try {
    const { data } = await axiosInstance.post('/api/auth/login', {
      kakao_token,
    });

    return {
      accessToken: data.data.access_token,
      refreshToken: data.data.refresh_token,
    };
  } catch (error) {
    return null;
  }
};

// KAKAO LOGIN을 위한 로직입니다.
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
    return null;
  }
};

export const renewUserToken = async (refreshToken: string) => {
  try {
    const { data } = await clientAuthApi.post('/api/auth/refresh-token', {
      refresh_token: refreshToken,
    });
    return data;
  } catch (error) {
    return null;
  }
};
