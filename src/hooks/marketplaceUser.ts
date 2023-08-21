import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import authorizedRequest from '@/services/authorizedRequest';
import { CREATE_SUCCESS, SOMETHING_WRONG, UPDATE_SUCCESS } from '@/utils/constants';
import { MarketplaceUser } from '@/models/MarketplaceUser/MarketplaceUser';

export function useMarketplaceUsers() {
  return useQuery(
    ['marketplace_users'],
    ({ signal }) => authorizedRequest.get('/users', {
      signal,
    }),
  );
}

export function useMarketplaceUser(userId: string) {
  return useQuery(
    ['marketplace_user', userId],
    ({ signal }) => authorizedRequest.get(`/users/${userId}`, {
      signal,
    }),
  );
}

export function useCreateMarketplaceUser(marketplaceUser: MarketplaceUser) {
  return useMutation(
    () => authorizedRequest.post('/users=', marketplaceUser),
    {
      onSuccess: () => {
        // Show success toast
        toast.success(CREATE_SUCCESS);
      },
      onError: () => {
        toast.error(SOMETHING_WRONG);
      },
    },
  );
}

export function useUpdateProfile(marketplaceUser: MarketplaceUser) {
  return useMutation(
    () => authorizedRequest.put('me', marketplaceUser),
    {
      onSuccess: () => {
        // Show success toast
        toast.success(UPDATE_SUCCESS);
      },
      onError: () => {
        toast.error(SOMETHING_WRONG);
      },
    },
  );
}

export function useEnableMarketplaceUser(userId: string, enable: boolean) {
  return useMutation(
    () => authorizedRequest.put('enable-user', {
      userId,
      enable,
    }),
    {
      onSuccess: () => {
        // Show success toast
        toast.success(UPDATE_SUCCESS);
      },
      onError: () => {
        toast.error(SOMETHING_WRONG);
      },
    },
  );
}
