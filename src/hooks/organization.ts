import { toast } from 'react-toastify';
import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import marketplaceApi from '@/services/marketplaceApi';
import { DELETE_SUCCESS, SOMETHING_WRONG, UPDATE_SUCCESS } from '@/utils/constants';
import {
  CreateOrganizationFormData,
  CreateOrganizationPayload,
  Organization,
} from '@/models/Organization/Organization';
import { MarketplaceUser } from '@/models/MarketplaceUser/MarketplaceUser';
import { useAuth } from '@/hooks/auth';
import backendApi from '@/services/backendApi';
import { User } from '@/models/User/User';
import { OrgStatistic } from '@/models/Organization/OrgStatistic';

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

export function useAcceptTermStatus(): 'checking' | 'yes' | 'no' {
  const { currentUser } = useAuth();
  const [firstFetch, setFirstFetch] = useState(false);
  const {
    data: organization,
    isFetched,
  } = useOrganizationByCurrentUser(currentUser);
  useEffect(() => {
    if (isFetched && !firstFetch) {
      setFirstFetch(true);
    }
  }, [isFetched, firstFetch]);
  return useMemo(() => {
    if (!firstFetch) return 'checking';
    return organization ? 'yes' : 'no';
  }, [organization, firstFetch]);
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
      // TODO: Upload logo
      const {
        profilePictureFile,
        ...rest
      } = formData;
      const createOrganizationPayload: CreateOrganizationPayload = {
        ...rest,
        profilePicture: 'https://picsum.photos/300/300',
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
