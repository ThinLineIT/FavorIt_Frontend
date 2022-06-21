// TODO 만료시간 확인
export const setCookie = (name: string, cookie: string, day: number) => {
  const max = day * 24 * 60 * 60;
  document.cookie = `${name}=${cookie}; max-age=${max};`;
};
