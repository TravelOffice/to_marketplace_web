import { toast } from 'react-toastify';
import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';
import marketplaceApi from '@/services/marketplaceApi';
import { DELETE_SUCCESS, SOMETHING_WRONG, UPDATE_SUCCESS } from '@/utils/constants';
import {
  CreateOrganizationFormData,
  CreateOrganizationPayload,
  Organization,
} from '@/models/Organization/Organization';
import { MarketplaceUser } from '@/models/MarketplaceUser/MarketplaceUser';
import backendApi from '@/services/backendApi';
import { User } from '@/models/User/User';
import { OrgStatistic } from '@/models/Organization/OrgStatistic';
import { uploadImage } from '@/utils/common';
import { PresignedUrlType } from '@/models/PresignedUrl.ts';

export function useOrganizations() {
  return useQuery(
    ['organizations'],
    ({ signal }) => marketplaceApi.get('/organizations', {
      signal,
    }),
  );
}

export function useOrganization(organizationId: string) {
  return useQuery(
    ['organization', organizationId],
    ({ signal }) => marketplaceApi.get(`/organizations/${organizationId}`, {
      signal,
    }),
  );
}

export function useOrganizationByCurrentUser(currentUser: MarketplaceUser | undefined) {
  return useQuery({
    queryKey: ['organization', currentUser?.organization],
    queryFn: ({ signal }) => marketplaceApi.get<Organization>(`/organizations/${currentUser?.organization}`, { signal }),
    enabled: !!currentUser,
  });
}

export function useAllUsers() {
  return useQuery({
    queryKey: ['allUsers'],
    queryFn: ({ signal }) => backendApi.get<User[]>('/users', { signal }),
  });
}

export function useCreateOrganization(
  options: UseMutationOptions<Organization, Error, CreateOrganizationFormData>,
) {
  return useMutation(
    async (formData: CreateOrganizationFormData) => {
      const {
        profilePictureFiles,
        ...rest
      } = formData;

      let profilePictureUrl: string | undefined;
      if (profilePictureFiles && profilePictureFiles.length > 0) {
        const uploadedUrl = await uploadImage(
          profilePictureFiles[0],
          0.8,
          PresignedUrlType.ORG_PROFILE_PICTURE,
        );
        const { cdn } = uploadedUrl;
        profilePictureUrl = cdn;
      }

      const createOrganizationPayload: CreateOrganizationPayload = {
        ...rest,
        profilePicture: profilePictureUrl,
      };
      return marketplaceApi.post<Organization>('/organizations', createOrganizationPayload);
    },
    options,
  );
}

export function useUpdateOrganization(organization: Organization) {
  return useMutation(
    () => marketplaceApi.post(`/organizations/${organization.name}`, organization),
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

export function useDeleteOrganization(organizationId: string) {
  return useMutation(
    () => marketplaceApi.post(`/organizations/${organizationId}`),
    {
      onSuccess: () => {
        // Show success toast
        toast.success(DELETE_SUCCESS);
      },
      onError: () => {
        toast.error(SOMETHING_WRONG);
      },
    },
  );
}

export function useOrganizationStatistic(organizationId: string, enabled: boolean) {
  return useQuery(
    ['organizations_statistic'],
    ({ signal }) => marketplaceApi.get<OrgStatistic>(`/organizations/${organizationId}/statistic`, {
      signal,
    }),
    {
      enabled,
    },
  );
}

export function useAcceptTermsMutation(
  options: UseMutationOptions<unknown, Error, string>,
) {
  return useMutation(
    async (termsVersion: string) => marketplaceApi.post('/onboarding/accept-terms', { version: termsVersion }),
    options,
  );
}

export function useUpdateOrgProfilePictureMutation(
  organizationName: string,
  options: UseMutationOptions<Organization, Error, string>,
) {
  return useMutation(
    (image: string) => marketplaceApi.put<Organization>(`/organizations/${organizationName}`, { profilePicture: encodeURI(image) }),
    options,
  );
}
