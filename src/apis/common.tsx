import { ACCESS_TOKEN } from '@constants/storageKeys';
import { getAsyncStorage } from '@utils/utils';

export const getAccessToken = async () => {
  return await getAsyncStorage(ACCESS_TOKEN);
};

type CommonResponse<T> = {
  common: {
    status: string;
    message: string;
  };
  data: T;
};
