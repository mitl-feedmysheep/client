import { ACCESS_TOKEN, REFRESH_TOKEN } from '@constants/storageKeys';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { setAsyncStorage } from '@utils/utils';
import { SIGN_IN_PATH } from '../apiPath';
import { postAPI } from '../common';

/**
 * @description 리프레시토큰으로 엑세스토큰을 재발급 받습니다.
 */

type reissueAccessTokenRequest = {
  refreshToken: string;
};

type reissueAccessTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

const reissueAccessTokenCall = async (
  reissueAccessTokenRequest: reissueAccessTokenRequest,
) => {
  const { refreshToken } = reissueAccessTokenRequest;

  return await postAPI<reissueAccessTokenResponse>(SIGN_IN_PATH, {
    refreshToken,
  });
};

export const useReissueAccessTokenMutation = (): UseMutationResult<
  reissueAccessTokenResponse,
  Error,
  reissueAccessTokenRequest
> => {
  return useMutation({
    mutationFn: (request: reissueAccessTokenRequest) =>
      reissueAccessTokenCall(request),
    onSuccess: async data => {
      const { accessToken, refreshToken } = data;

      // 정책: reissue시 accessToken, refreshToken 재발급 (무한 로그인)
      await setAsyncStorage(ACCESS_TOKEN, accessToken);
      await setAsyncStorage(REFRESH_TOKEN, refreshToken);
    },
  });
};
