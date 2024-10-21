import { API_STATUS, LOGGABLE } from '@constants/enum';
import { ACCESS_TOKEN } from '@constants/storageKeys';
import { isEmpty } from '@fxts/core';
import { getAsyncStorage } from '@utils/utils';
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { BASE_URL } from './apiPath';

export const getAccessToken = async () => {
  return await getAsyncStorage(ACCESS_TOKEN);
};

type CommonResponse<T> = {
  common: {
    status: API_STATUS;
    message: string;
  };
  data: T;
};

const printAPILog = (type: LOGGABLE, message: any) => {
  const loggable = ['local', 'development'];
  const { method, url } = message;

  if (loggable.includes(process.env.NODE_ENV as string)) {
    switch (type) {
      case LOGGABLE.REQUEST:
        console.log(`🛫 [API - REQUEST] ${method?.toUpperCase()} ${url}`);
        break;
      case LOGGABLE.RESPONSE:
        const { common } = message;

        if (common.status === API_STATUS.SUCCESS) {
          console.log(`🛬 [API - RESPONSE] ${method?.toUpperCase()} ${url}`);
        } else if (common.status === API_STATUS.FAIL) {
          const { message: errorMessage } = common;
          console.log(
            `🚨 [API - 🙋‍♂️ ERROR] ${method?.toUpperCase()} ${url} --> ${errorMessage}`,
          );
        }
        break;
      case LOGGABLE.ERROR:
        const { status, message: errorMessage } = message;
        console.log(
          `🚨 [API - ERROR] ${method?.toUpperCase()} ${url} | ${status} : ${errorMessage}`,
        );
        break;
      default:
        break;
    }
  }
};

const onRequest = async (
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {
  const { method, url } = config;

  printAPILog(LOGGABLE.REQUEST, { method, url });

  const accessToken = await getAsyncStorage(ACCESS_TOKEN);

  // TODO: accessToken 만료시, refreshToken을 통해 재발급하는 로직 추가
  if (isEmpty(accessToken)) {
  }

  config.headers['fms-token'] = accessToken;

  return config;
};

const onResponse = (res: AxiosResponse): AxiosResponse => {
  const { method, url } = res.config;
  const { common } = res.data.data;

  printAPILog(LOGGABLE.RESPONSE, { method, url, common });

  return res;
};

const onError = (error: AxiosError | Error): Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    const { method, url } = error.config as InternalAxiosRequestConfig;
    if (error.response) {
      const { status, message } = error.response.data;
      printAPILog(LOGGABLE.ERROR, { method, url, status, message });
    }
  }

  return Promise.reject(error);
};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
axiosInstance.interceptors.request.use(onRequest);
axiosInstance.interceptors.response.use(onResponse, onError);

export const getAPI = async <T,>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<CommonResponse<T>>> => {
  const response = await axiosInstance.get(url, config);
  return response.data;
};

export const postAPI = async <T,>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<CommonResponse<T>>> => {
  const response = await axiosInstance.post(url, data, config);
  return response.data;
};
