import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@tanstack/react-query';
import authorizedRequest from '@/services/authorizedRequest';
import {
  CREATE_SUCCESS, DELETE_SUCCESS, SOMETHING_WRONG, UPDATE_SUCCESS,
} from '@/utils/constants';
import { OrgFeedback } from '@/models/Organization/OrgFeedback';

export function useOrganizationFeedback(organizationId: string) {
  return useQuery(
    ['feedback_of_org'],
    ({ signal }) => authorizedRequest.get(`/organizations/${organizationId}/feedback`, {
      signal,
    }),
  );
}

export function useCreateFeedback(organizationId: string, feedback: OrgFeedback) {
  return useMutation(
    () => authorizedRequest.post(`/organizations/${organizationId}/feedback`, feedback),
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

export function useFeedback(organizationId: string, feedbackId: string) {
  return useQuery(
    ['feedback'],
    ({ signal }) => authorizedRequest.get(`/organizations/${organizationId}/feedback/${feedbackId}}`, {
      signal,
    }),
  );
}

export function useUpdateFeedback(organizationId: string, feedback: OrgFeedback) {
  return useMutation(
    () => authorizedRequest.put(`/organizations/${organizationId}/feedback/${feedback.code}`, feedback),
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

export function useDeleteFeedback(organizationId: string, feedbackId: string) {
  return useMutation(
    () => authorizedRequest.delete(`/organizations/${organizationId}/feedback/${feedbackId}`),
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
