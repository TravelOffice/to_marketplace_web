import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import authorizedRequest from '@/services/authorizedRequest';
import {
  CREATE_SUCCESS, DELETE_SUCCESS, SOMETHING_WRONG, UPDATE_SUCCESS,
} from '@/utils/constants';
import { PostComment } from '@/models/TourPost/PostComment';

export function useComments(tourPostId: string) {
  return useQuery(
    ['comments', tourPostId],
    ({ signal }) => authorizedRequest.get(`/posts/${tourPostId}/comments`, {
      signal,
    }),
  );
}

export function useCreateComment(tourPostId: string, comment: PostComment) {
  return useMutation(
    () => authorizedRequest.post(`/posts/${tourPostId}/comments`, comment),
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

export function useComment(tourPostId: string, commentId: string) {
  return useQuery(
    ['comment', commentId],
    ({ signal }) => authorizedRequest.get(`/posts/${tourPostId}/comments/${commentId}}`, {
      signal,
    }),
  );
}

export function useUpdateComment(tourPostId: string, comment: PostComment) {
  return useMutation(
    () => authorizedRequest.put(`/posts/${tourPostId}/comments/${comment.code}`, comment),
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
    () => authorizedRequest.delete(`/posts/${tourPostId}/comments/${commentId}`),
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
