import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import authorizedRequest from '@/services/authorizedRequest';
import {
  CREATE_SUCCESS, DELETE_SUCCESS, SOMETHING_WRONG, UPDATE_SUCCESS,
} from '@/utils/constants';
import { Organization } from '@/models/Organization/Organization';

export function useOrganizations() {
  return useQuery(
    ['organizations'],
    ({ signal }) => authorizedRequest.get('/organizations', {
      signal,
    }),
  );
}

export function useOrganization(organizationId: string) {
  return useQuery(
    ['organization', organizationId],
    ({ signal }) => authorizedRequest.get(`/organizations/${organizationId}`, {
      signal,
    }),
  );
}

export function useCreateOrganization(organization: Organization) {
  return useMutation(
    () => authorizedRequest.post('/organizations', organization),
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

export function useUpdateOrganization(organization: Organization) {
  return useMutation(
    () => authorizedRequest.post(`/organizations/${organization.name}`, organization),
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
    () => authorizedRequest.post(`/organizations/${organizationId}`),
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
