import { toast } from 'react-toastify';
import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';
import marketplaceApi from '@/services/marketplaceApi';
import { DELETE_SUCCESS, SOMETHING_WRONG } from '@/utils/constants';
import {
  CreateOrganizationFormData,
  CreateOrganizationPayload,
  Organization,
  UpdateOrganizationFormData,
} from '@/models/Organization/Organization';
import backendApi from '@/services/backendApi';
import { User } from '@/models/User/User';
import { OrgStatistic } from '@/models/Organization/OrgStatistic';
import { uploadImage } from '@/utils/common';
import { PresignedUrlType } from '@/models/PresignedUrl';

export function useOrganizations() {
  return useQuery(
    ['organizations'],
    ({ signal }) => marketplaceApi.get<Organization[]>('/organizations', {
      signal,
    }),
  );
}

export function useOrganization(organizationId: string, enabled: boolean) {
  return useQuery(
    {
      queryKey: ['organization', organizationId],
      queryFn: ({ signal }) => marketplaceApi.get<Organization>(
        `/organizations/${organizationId}`,
        {
          signal,
        },
      ),
      enabled,
    },
  );
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

export function useUpdateOrganization(
  code: string,
  options: UseMutationOptions<Organization, Error, UpdateOrganizationFormData>,
) {
  return useMutation(
    async (organization: UpdateOrganizationFormData) => marketplaceApi.put<Organization>(`/organizations/${code}`, organization),
    options,
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
    ['organizations_statistic', organizationId],
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
