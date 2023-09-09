import { toast } from 'react-toastify';
import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';
import {
  DELETE_SUCCESS, SOMETHING_WRONG,
} from '@/utils/constants';
import { CreatePostRatingFormData, PostRating, UpdatePostRatingFormData } from '@/models/TourPost/PostRating';
import marketplaceApi from '@/services/marketplaceApi';

export function usePostRatings(tourPostId: string, organization: string, enabled?: boolean) {
  return useQuery({
    queryKey: ['ratings_of_post', tourPostId],
    queryFn: ({ signal }) => marketplaceApi.get<PostRating[]>(`/posts/${tourPostId}/ratings`, {
      signal,
      queryParams: { organization },
    }),
    enabled,
  });
}

export function useCreateRating(
  tourPostId: string,
  options?: UseMutationOptions<PostRating, unknown, CreatePostRatingFormData>,
) {
  return useMutation(
    (formData: CreatePostRatingFormData) => marketplaceApi.post<PostRating>(`/posts/${tourPostId}/ratings`, formData),
    options,
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

export function useUpdateRating(
  tourPostId: string,
  ratingCode: string,
  options?: UseMutationOptions<PostRating, unknown, UpdatePostRatingFormData>,
) {
  return useMutation(
    (formData: UpdatePostRatingFormData) => marketplaceApi.put<PostRating>(`/posts/${tourPostId}/ratings/${ratingCode}`, formData),
    options,
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
