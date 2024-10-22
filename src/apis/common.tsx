import { API_STATUS, LOGGABLE } from '@constants/enum';
import { ACCESS_TOKEN, FMS_TOKEN, REFRESH_TOKEN } from '@constants/storageKeys';
import { getAsyncStorage, setAsyncStorage } from '@utils/utils';
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { BASE_URL } from './apiPath';
import { useReissueAccessTokenMutation } from './mutations/reissueAccessToken';

type CommonResponse<T> = {
  common: {
    status: API_STATUS;
    message: string;
  };
  data: T;
};

const printAPILog = async (type: LOGGABLE, message: any): Promise<void> => {
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
        } else if (
          common.status === API_STATUS.FAIL ||
          common.status === API_STATUS.INVALID_TOKEN
        ) {
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

  await printAPILog(LOGGABLE.REQUEST, { method, url });

  const accessToken = await getAsyncStorage(ACCESS_TOKEN);

  config.headers[FMS_TOKEN] = accessToken;

  return config;
};

const onResponse = async (res: AxiosResponse): Promise<AxiosResponse> => {
  const originalRequest = res.config;
  const { method, url } = originalRequest;
  const { common } = res.data.data;

  await printAPILog(LOGGABLE.RESPONSE, { method, url, common });

  /** 토큰 재발급 및 재요청 */
  if (common.status === API_STATUS.INVALID_TOKEN) {
    const refreshToken = await getAsyncStorage(REFRESH_TOKEN);

    useReissueAccessTokenMutation().mutate(
      {
        refreshToken: refreshToken as string,
      },
      {
        onSuccess: async data => {
          const { accessToken, refreshToken } = data;

          await setAsyncStorage(ACCESS_TOKEN, accessToken);
          await setAsyncStorage(REFRESH_TOKEN, refreshToken);

          // 이거 해줘야 하나? 위에서 onRequest 때 안 걸리려나?
          originalRequest.headers[FMS_TOKEN] = accessToken;
        },
        onError: error => {
          // TODO: 토스트 + 로그인 화면으로 보내기
          console.error('토큰 재발급 실패', error);
        },
      },
    );

    return axiosInstance(originalRequest);
  }

  return res;
};

const onError = async (error: AxiosError | Error): Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    const { method, url } = error.config as InternalAxiosRequestConfig;
    if (error.response) {
      const { status, message } = error.response.data;
      await printAPILog(LOGGABLE.ERROR, { method, url, status, message });
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
): Promise<T> => {
  const response = await axiosInstance.get<CommonResponse<T>>(url, config);
  return response.data.data;
};

export const postAPI = async <T,>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await axiosInstance.post<CommonResponse<T>>(
    url,
    data,
    config,
  );
  return response.data.data;
};

export const putAPI = async <T,>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await axiosInstance.put<CommonResponse<T>>(
    url,
    data,
    config,
  );
  return response.data.data;
};

export const deleteAPI = async <T,>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await axiosInstance.delete<CommonResponse<T>>(url, config);
  return response.data.data;
};
