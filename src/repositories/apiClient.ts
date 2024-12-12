import { ACCESS_TOKEN_KEY } from '@/constants/token.contant';
import token from '@/lib/token';
import axios, { AxiosResponse, InternalAxiosRequestConfig, AxiosError } from 'axios';
import sendRequest from './reconfig-async-client';

const host = 'http://127.0.0.1:8080/api';

const apiClient = axios.create({
  baseURL: host,
});

const logOnDev = (message: string, log?: AxiosResponse | InternalAxiosRequestConfig | AxiosError) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(message, log);
  }
};

apiClient.interceptors.request.use((request) => {
  const jwtToken: string | null = token.getToken(ACCESS_TOKEN_KEY);
  const { method, url } = request;

  if (jwtToken) {
    request.headers['Authorization'] = `Token ${jwtToken}`;
  }

  logOnDev(`🚀 [${method?.toUpperCase()}] ${url} | Request`, request);

  return request;
});

apiClient.interceptors.response.use(
  (response) => {
    const { method, url } = response.config;
    const { status } = response;

    logOnDev(`✨ [${method?.toUpperCase()}] ${url} | Response ${status}`, response);

    return response;
  },
  (error) => {
    const { message } = error;
    const { status, data } = error.response;
    const { method, url } = error.config;

    if (status === 429) {
      token.removeToken('ACCESS_TOKEN_KEY');
      window.location.reload();
    }

    logOnDev(`🚨 [${method?.toUpperCase()}] ${url} | Error ${status} ${data?.message || ''} | ${message}`, error);

    return Promise.reject(error);
  },
);

export const successCallback = (response: any) => {
  const { method, url } = response.config;
  const { status } = response;

  logOnDev(`✨ [${method?.toUpperCase()}] ${url} | Response ${status}`, response);

  return response;
};
export const errorCallback = (error: any) => {
  const { message } = error;
  const { status, data } = error.response;
  const { method, url } = error.config;

  if (status === 429) {
    token.removeToken('ACCESS_TOKEN_KEY');
    window.location.reload();
  }

  logOnDev(`🚨 [${method?.toUpperCase()}] ${url} | Error ${status} ${data?.message || ''} | ${message}`, error);

  return Promise.reject(error);
};
export const initReqWithJwtToken = () => {
  const jwtToken: string | null = token.getToken(ACCESS_TOKEN_KEY);
  return jwtToken == null
    ? {}
    : {
        headers: {
          Authorization: `Token ${jwtToken}`,
        },
      };
};
export const sendRequestWithParams = async (endpoint: string, reqSpecs: any) => {
  const resp = await sendRequest(
    'realworld_java21_springboot3',
    `/api${endpoint}`,
    { ...reqSpecs },
    () => {},
    () => {},
    ['127.0.0.1:3300'],
  );
  return {
    data: resp,
  };
};
export default apiClient;
