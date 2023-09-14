import { toast } from 'react-toastify';
import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';
import { CREATE_SUCCESS, SOMETHING_WRONG, UPDATE_SUCCESS } from '@/utils/constants';
import {
  CreateMultipleUsersPayload,
  MarketplaceUser,
  UpdateProfileFormData,
} from '@/models/MarketplaceUser/MarketplaceUser';
import marketplaceApi from '@/services/marketplaceApi';
import { removeEmptyFields } from '@/utils/common';

export function useMarketplaceUsers() {
  return useQuery(
    ['marketplace_users'],
    ({ signal }) => marketplaceApi.get<MarketplaceUser[]>('/users', {
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

export function useUpdateMarketplaceUser(
  id: string,
  options?: UseMutationOptions<MarketplaceUser, Error, Partial<MarketplaceUser>>,
) {
  return useMutation(
    (data: Partial<MarketplaceUser>) => marketplaceApi.put<MarketplaceUser>(`/users/${id}`, data),
    options,
  );
}

export function useUpdateMarketplaceUserRole(
  id: string,
  options?: UseMutationOptions<MarketplaceUser, Error, string>,
) {
  return useMutation(
    (role: string) => marketplaceApi.put<MarketplaceUser>(`/users/${id}`, { roles: [role] }),
    options,
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

export function useEnableMarketplaceUser(
  userId: string,
  options?: UseMutationOptions<void, Error, boolean>,
) {
  return useMutation(
    async (enable: boolean) => {
      await marketplaceApi.put('/enable-user', {
        userId,
        enable,
      });
    },
    options,
  );
}

export function useAddUsersMutation(
  options: UseMutationOptions<void, Error, CreateMultipleUsersPayload>,
) {
  return useMutation(
    async (payload: CreateMultipleUsersPayload) => {
      await marketplaceApi.post('/users', payload);
    },
    options,
  );
}

export function useUpdateProfileMutation(
  options: UseMutationOptions<MarketplaceUser, Error, UpdateProfileFormData>,
) {
  return useMutation(
    (payload: UpdateProfileFormData) => marketplaceApi.put<MarketplaceUser>('/me', removeEmptyFields(payload)),
    options,
  );
}

export function useUpdateUserAvatarMutation(
  options: UseMutationOptions<MarketplaceUser, Error, string>,
) {
  return useMutation(
    (avatar: string) => marketplaceApi.put<MarketplaceUser>('/me', { avatar: encodeURI(avatar) }),
    options,
  );
}
