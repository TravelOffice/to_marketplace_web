import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import authorizedRequest, { PaginationPayload } from '@/services/authorizedRequest';
import {
  CREATE_SUCCESS, DELETE_SUCCESS, SOMETHING_WRONG, UPDATE_SUCCESS,
} from '@/utils/constants';
import { TourPost } from '@/models/TourPost/TourPost';

export function useMyPosts() {
  return useQuery(
    ['my_posts'],
    ({ signal }) => authorizedRequest.get<PaginationPayload<TourPost>>('/me/posts', {
      signal,
    }),
  );
}

export function usePosts() {
  return useQuery(
    ['posts'],
    async ({ signal }) => authorizedRequest.get<PaginationPayload<TourPost>>('/posts', {
      signal,
    }),
  );
}

export function usePostsByOrganization(organization: string) {
  return useQuery(
    ['posts_oby_organization', organization],
    ({ signal }) => authorizedRequest.get<PaginationPayload<TourPost>>('/posts', {
      signal,
      queryParams: { organization },
    }),
  );
}

export function usePostsByAuthor(author: string) {
  return useQuery(
    ['posts_by_author', author],
    async ({ signal }) => authorizedRequest.get <PaginationPayload<TourPost>>('/posts', {
      signal,
      queryParams: { author },
    }),
  );
}

export function usePost(id: string) {
  return useQuery(
    ['posts', id],
    ({ signal }) => authorizedRequest.get<TourPost>(`/posts/${id}`, {
      signal,
    }),
  );
}

export function useCreatePost(post: TourPost) {
  return useMutation(
    () => authorizedRequest.post<TourPost>('/post', post),
    {
      onSuccess: () => {
        // Show success toast
        toast.success(CREATE_SUCCESS);
        // Go to edit tour post page
      },
      onError: () => {
        toast.error(SOMETHING_WRONG);
      },
    },
  );
}

export function useUpdatePost(post: TourPost) {
  const navigate = useNavigate();
  return useMutation(
    () => authorizedRequest.put(`/posts/${post.code}`, post),
    {
      onSuccess: () => {
        // Show success toast
        toast.success(UPDATE_SUCCESS);
        // Go to edit tour post page
        navigate('/posts/:postId');
      },
      onError: () => {
        toast.error(SOMETHING_WRONG);
      },
    },
  );
}

export function useBookmarkedPosts() {
  return useQuery(
    ['bookmarked_posts'],
    ({ signal }) => authorizedRequest.get('/me/bookmarked-posts', {
      signal,
    }),
  );
}

export function useFollowedPosts() {
  return useQuery(
    ['bookmarked_posts'],
    ({ signal }) => authorizedRequest.get('/me/followed-posts', {
      signal,
    }),
  );
}

export function useCreateBookmark(tourPostId: string) {
  return useMutation(
    () => authorizedRequest.post(`/posts/${tourPostId}/bookmark`),
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

export function useDeleteBookmark(tourPostId: string) {
  return useMutation(
    () => authorizedRequest.delete(`/posts/${tourPostId}/bookmark`),
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

export function useFollowPost(tourPostId: string) {
  return useMutation(
    () => authorizedRequest.post(`/posts/${tourPostId}/follow`),
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

export function useUnfollowPost(tourPostId: string) {
  return useMutation(
    () => authorizedRequest.delete(`/posts/${tourPostId}/follow`),
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
