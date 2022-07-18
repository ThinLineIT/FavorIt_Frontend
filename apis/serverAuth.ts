import { setCookie, getCookie } from 'cookies-next';
import { AxiosInstance } from 'axios';
import { COOKIE } from '@util/cookie';
import { ServerResponse, IncomingMessage } from 'http';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import axios from 'axios';

export const serverRequestInterceptor = (
  serverApiInstance: AxiosInstance,
  req: IncomingMessage & {
    cookies: NextApiRequestCookies;
  },
  res: ServerResponse,
) => {
  serverApiInstance.interceptors.request.use((config) => {
    const accessToken = getCookie(COOKIE.ACCESS_TOKEN, { req, res });
    if (accessToken && config.headers) {
      config.headers['Authorization'] = `Bearer ${accessToken}` as string;
    }
    return config;
  });

  serverApiInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const refresh_token = getCookie(COOKIE.REFRESH_TOKEN, { req, res });
      console.log(refresh_token, '리프레쉬 토큰 확인');
      const requestRecycle = error.config;
      if (
        error.response.status === 401 &&
        typeof refresh_token === 'string' &&
        refresh_token !== undefined &&
        !requestRecycle.isRecycle
      ) {
        requestRecycle.isRecycle = true;

        const { data } = await axios
          .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/refresh-token`, {
            refresh_token,
          })
          .then((res) => {
            // console.log(res, '결과값');
            return res.data;
          })
          .catch((err) => {
            // console.log(err, '에러');
            return err;
          });
        setCookie(COOKIE.ACCESS_TOKEN, data[COOKIE.ACCESS_TOKEN], {
          req,
          res,
          maxAge: COOKIE.ACCESS_MAX_AGE,
        });
        setCookie(COOKIE.REFRESH_TOKEN, data[COOKIE.REFRESH_TOKEN], {
          req,
          res,
          maxAge: COOKIE.REFRESH_MAX_AGE,
        });
        return await serverApiInstance(requestRecycle);
      }
      return Promise.reject(error);
    },
  );
};

// export const serverResponseInterceptor = (
//   serverApiInstance: AxiosInstance,
//   req: IncomingMessage & {
//     cookies: NextApiRequestCookies;
//   },
//   res: ServerResponse,
// ) => {

// };
