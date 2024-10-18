import { ACCESS_TOKEN } from '@constants/storageKeys';
import { isEmpty } from '@fxts/core';
import { getAsyncStorage } from '@utils/utils';
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { SIGN_IN_PATH } from './apiPath';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8020',
  headers: {
    'Content-Type': 'application/json',
  },
});

const onRequest = async (
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {
  const { method, url } = config;

  // TODO: DEV환경일 때만 console.log를 찍도록 향후 수정
  console.log(`🛫 [API - REQUEST] ${method?.toUpperCase()} ${url}`);

  const accessToken = await getAsyncStorage(ACCESS_TOKEN);

  // TODO: accessToken 만료시, refreshToken을 통해 재발급하는 로직 추가
  if (isEmpty(accessToken)) {
  }

  config.headers['fms-token'] = await getAsyncStorage(ACCESS_TOKEN);

  return config;
};

const onResponse = (res: AxiosResponse): AxiosResponse => {
  const { status } = res;
  const { method, url } = res.config;

  // TODO: DEV환경일 때만 console.log를 찍도록 향후 수정
  if (status < 400) {
    console.log(`🛬 [API - RESPONSE] ${method?.toUpperCase()} ${url}`);
  } else if (status >= 400 && status < 500) {
    console.log(
      `🚨 [API - 🙋‍♂️ CLIENT ERROR] ${method?.toUpperCase()} ${url} --> ${message}`,
    );
  } else {
    console.log(
      `🚨 [API - 👨‍💻 SERVER ERROR] ${method?.toUpperCase()} ${url} --> ${message}`,
    );
  }

  return res;
};

const onError = (error: AxiosError | Error): Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    const { method, url } = error.config as InternalAxiosRequestConfig;
    if (error.response) {
      error.
    }

  }

  if (status >= 400 && status < 500) {
    console.log(
      `🚨 [API - 🙋‍♂️ CLIENT ERROR] ${method?.toUpperCase()} ${url} --> ${message}`,
    );
  } else {
    console.log(
      `🚨 [API - 👨‍💻 SERVER ERROR] ${method?.toUpperCase()} ${url} --> ${message}`,
    );
  }
};

export const signIn = async (email: string, password: string) => {
  return await axios.post(SIGN_IN_PATH, {
    email,
    password,
  });

  return formatted(result);
};
