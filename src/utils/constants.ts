import { refresh } from '../services/actions/user';
import { TRefresh } from './types';

export const BASE_API_URL = 'https://norma.nomoreparties.space/api';

export const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

export const getCookie = (name: string) => {
  const cookies = document.cookie.split('; ');
  const token = cookies.find((cookie) => (cookie.indexOf(name) !== -1 ? cookie : null));
  if (token === undefined) return;
  return name === 'accessToken' ? token.slice(12) : token.slice(13);
};

export const setCookies = (data: TRefresh) => {
	document.cookie = `accessToken=${data.accessToken!.slice(7)}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
	document.cookie = `refreshToken=${data.refreshToken}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
  
};

export const retriableFetch = async <ReturnType>(url: RequestInfo, options?: RequestInit | undefined | any): Promise<ReturnType> => {
  try {
    return await fetch(url, options).then((res) => {
      if (res.ok) return res.json();
      else return res.json().then((err) => Promise.reject(err));
    });
  } catch (err) {
    if (err instanceof Error && err.message === 'jwt expired') {
      const refreshTokens = await refresh();
      setCookies(refreshTokens);
      if (!options.headers) {
        options.headers = {};
      }
      options.headers.authorization = getCookie('refreshToken');
      return await fetch(url, options).then((res) => {
        if (res.ok) return res.json();
        else return res.json().then((err) => Promise.reject(err));
      });
    } else throw err;
  }
};
