import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CREATE_SUCCESS, SOMETHING_WRONG, UPDATE_SUCCESS } from '@/utils/constants';
import { MarketplaceUser } from '@/models/MarketplaceUser/MarketplaceUser';
import marketplaceApi from '@/services/marketplaceApi';

export function useMarketplaceUsers() {
  return useQuery(
    ['marketplace_users'],
    ({ signal }) => marketplaceApi.get('/users', {
      signal,
    }),
  );
}

export function useMarketplaceUser(userId: string, enabled?: boolean) {
  return useQuery(
    {
      queryKey: ['marketplace_user', userId],
      queryFn: ({ signal }) => marketplaceApi.get<MarketplaceUser>(`/users/${encodeURIComponent(userId)}`, {
        signal,
      }),
      enabled,
    },
  );
}

export function useCreateMarketplaceUser(marketplaceUser: MarketplaceUser) {
  return useMutation(
    () => marketplaceApi.post('/users=', marketplaceUser),
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
    () => marketplaceApi.put('me', marketplaceUser),
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
    () => marketplaceApi.put('enable-user', {
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
