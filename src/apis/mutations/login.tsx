import { ACCESS_TOKEN, REFRESH_TOKEN } from '@constants/storageKeys';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { setAsyncStorage } from '@utils/utils';
import { SIGN_IN_PATH } from '../apiPath';
import { postAPI } from '../common';

export type SignInRequest = {
  email: string;
  password: string;
};

export type SignInResponse = {
  accessToken: string;
  refreshToken: string;
};

const signInCall = async (signInRequest: SignInRequest) => {
  const { email, password } = signInRequest;

  return await postAPI<SignInResponse>(SIGN_IN_PATH, { email, password });
};

export const useSignInMutation = (): UseMutationResult<
  SignInResponse,
  Error,
  SignInRequest
> => {
  return useMutation({
    mutationFn: (request: SignInRequest) => signInCall(request),
    onSuccess: async data => {
      const { accessToken, refreshToken } = data;

      // 로그인 완료시, accessToken, refreshToken을 AsyncStorage에 저장
      await setAsyncStorage(ACCESS_TOKEN, accessToken);
      await setAsyncStorage(REFRESH_TOKEN, refreshToken);
    },
  });
};
