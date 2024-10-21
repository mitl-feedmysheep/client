import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { SIGN_IN_PATH } from '../apiPath';
import { postAPI } from '../common';

export type SignInResponse = {
  accessToken: string;
  refreshToken: string;
};

const signIn = async (email: string, password: string) => {
  return await postAPI<SignInResponse>(SIGN_IN_PATH, { email, password });
};

export const signInMutation = (
  email: string,
  password: string,
): UseMutationResult<SignInResponse> => {
  return useMutation<SignInResponse>({
    mutationFn: signIn(email, password),
  });
};
