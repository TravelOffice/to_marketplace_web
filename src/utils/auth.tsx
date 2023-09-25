import { useAuthStore } from '@/hooks/auth';

// eslint-disable-next-line import/prefer-default-export
export function getAccessToken() {
  return useAuthStore.getState().accessToken;
}
