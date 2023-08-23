import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  CREATE_SUCCESS, DELETE_SUCCESS, SOMETHING_WRONG, UPDATE_SUCCESS,
} from '@/utils/constants';
import { PostRating } from '@/models/TourPost/PostRating';
import marketplaceApi from '@/services/marketplaceApi';

export function usePostRatings(tourPostId: string, organization: string, enabled?: boolean) {
  return useQuery({
    queryKey: ['ratings_of_post', tourPostId],
    queryFn: ({ signal }) => marketplaceApi.get(`/posts/${tourPostId}/ratings`, {
      signal,
      queryParams: { organization },
    }),
    enabled,
  });
}

export function useCreateRating(tourPostId: string, rating: PostRating) {
  return useMutation(
    () => marketplaceApi.post(`/posts/${tourPostId}/ratings`, rating),
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

export function useRating(tourPostId: string, ratingId: string) {
  return useQuery(
    ['rating', ratingId],
    ({ signal }) => marketplaceApi.get(`/posts/${tourPostId}/ratings/${ratingId}}`, {
      signal,
    }),
  );
}

export function useOrganizationRatings(organizationId: string) {
  return useQuery(
    ['ratings_of_org', organizationId],
    ({ signal }) => marketplaceApi.get(`/organizations/${organizationId}/ratings`, {
      signal,
    }),
  );
}

export function useUpdateRating(tourPostId: string, rating: PostRating) {
  return useMutation(
    () => marketplaceApi.put(`/posts/${tourPostId}/ratings/${rating.code}`, rating),
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

export function useDeleteRating(tourPostId: string, ratingId: string) {
  return useMutation(
    () => marketplaceApi.delete(`/posts/${tourPostId}/ratings/${ratingId}`),
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
