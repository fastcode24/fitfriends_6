import axios, {AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig} from 'axios';
import {getAccessToken, getRefreshToken} from './token-service';
import {APIRoute, BACKEND_URL} from '../const';

const REQUEST_TIMEOUT = 15000;

enum HttpStatus {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

const isError = (response: AxiosResponse) => Object.values(HttpStatus).includes(response.status);

export const handleApiError = (error: AxiosError<{ error: string }>): void => {
  if (error.response && isError(error.response)) {
    console.error('API error:', error.response.data.error);
  }
  throw error;
};

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig ) => {
      let token = getAccessToken();
      if (config.url === APIRoute.RefreshToken) {
        token = getRefreshToken();
      }

      if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{error: string}>) => {
      if (error.response && isError(error.response)) {
        handleApiError(error);
      }

      throw error;
    }
  );

  return api;
};
