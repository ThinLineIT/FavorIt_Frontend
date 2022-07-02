export const COOKIE = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  ACCESS_MAX_AGE: 604800,
  REFRESH_MAX_AGE: 1209600,
};

export const setCookie = (name: string, cookie: string, day: number) => {
  const max = day * 24 * 60 * 60;
  document.cookie = `${name}=${cookie}; max-age=${max};`;
};

export const getCookie = (key: string) => {
  if (typeof document !== 'undefined') {
    const cookieKey = key + '=';
    let result = '';
    const cookieArr = document.cookie.split(';');

    for (let i = 0; i < cookieArr.length; i++) {
      if (cookieArr[i][0] === ' ') {
        cookieArr[i] = cookieArr[i].substring(1);
      }

      if (cookieArr[i].indexOf(cookieKey) === 0) {
        result = cookieArr[i].slice(cookieKey.length, cookieArr[i].length);
        return result;
      }
    }
    return null;
  }
};
