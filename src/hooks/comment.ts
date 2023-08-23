import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DELETE_SUCCESS, SOMETHING_WRONG, UPDATE_SUCCESS } from '@/utils/constants';
import { CreateCommentFormData, PostComment } from '@/models/TourPost/PostComment';
import { PaginationParams, PaginationPayload } from '@/services/BaseApi';
import marketplaceApi from '@/services/marketplaceApi';

export function useComments(tourPostId: string, paginationParams?: PaginationParams) {
  return useQuery(
    ['comments', tourPostId],
    ({ signal }) => marketplaceApi.get<PaginationPayload<PostComment>>(`/posts/${tourPostId}/comments`, {
      signal,
      queryParams: paginationParams,
    }),
  );
}

export const useCreateCommentMutation = (tourPostId: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: (comment: CreateCommentFormData) => marketplaceApi.post<PostComment>(`/posts/${tourPostId}/comments`, comment),
      onSuccess: (newComment) => {
        queryClient.setQueryData(['comments', tourPostId], (input: PaginationPayload<PostComment> | undefined) => ({
          ...input,
          data: [newComment].concat(input?.data ?? []),
        } as PaginationPayload<PostComment>));
      },
      onError: () => {
        toast.error(SOMETHING_WRONG);
      },
    },
  );
};

export function useComment(tourPostId: string, commentId: string) {
  return useQuery(
    ['comment', commentId],
    ({ signal }) => marketplaceApi.get(`/posts/${tourPostId}/comments/${commentId}}`, {
      signal,
    }),
  );
}

export function useUpdateComment(tourPostId: string, comment: PostComment) {
  return useMutation(
    () => marketplaceApi.put(`/posts/${tourPostId}/comments/${comment.code}`, comment),
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

export function useDeleteComment(tourPostId: string, commentId: string) {
  return useMutation(
    () => marketplaceApi.delete(`/posts/${tourPostId}/comments/${commentId}`),
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
