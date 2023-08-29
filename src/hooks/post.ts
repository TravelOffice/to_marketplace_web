import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import {
  CREATE_SUCCESS,
  DELETE_SUCCESS,
  NUMBER_ITEM_PER_PAGE,
  SOMETHING_WRONG,
  UPDATE_SUCCESS,
} from '@/utils/constants';
import { TourPost } from '@/models/TourPost/TourPost';
import marketplaceApi from '@/services/marketplaceApi';
import { PaginationPayload } from '@/services/BaseApi';

export function useMyPosts() {
  return useQuery(
    ['my_posts'],
    ({ signal }) => marketplaceApi.get<PaginationPayload<TourPost>>('/me/posts', {
      signal,
    }),
  );
}

export function usePosts() {
  return useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: async ({
      signal,
      pageParam,
    }) => marketplaceApi.get<PaginationPayload<TourPost>>(
      '/posts',
      {
        queryParams: {
          nextToken: pageParam,
          limit: NUMBER_ITEM_PER_PAGE,
        },
        signal,
      },
    ),
    getNextPageParam: (lastPage) => {
      const nextToken = lastPage.paging.cursors.before;
      if (nextToken === '') return undefined;
      return nextToken;
    },
  });
}

export function usePostsByOrganization(organization: string) {
  return useQuery(
    ['posts_oby_organization', organization],
    ({ signal }) => marketplaceApi.get<PaginationPayload<TourPost>>('/posts', {
      signal,
      queryParams: { organization },
    }),
  );
}

export function usePostsByAuthor(author: string) {
  return useQuery(
    ['posts_by_author', author],
    async ({ signal }) => marketplaceApi.get <PaginationPayload<TourPost>>('/posts', {
      signal,
      queryParams: { author },
    }),
  );
}

export function usePost(id: string) {
  return useQuery(
    ['posts', id],
    ({ signal }) => marketplaceApi.get<TourPost>(`/posts/${id}`, {
      signal,
    }),
  );
}

export function useCreatePost(post: TourPost) {
  return useMutation(
    () => marketplaceApi.post<TourPost>('/post', post),
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
    () => marketplaceApi.put(`/posts/${post.code}`, post),
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
    ({ signal }) => marketplaceApi.get('/me/bookmarked-posts', {
      signal,
    }),
  );
}

export function useFollowedPosts() {
  return useQuery(
    ['bookmarked_posts'],
    ({ signal }) => marketplaceApi.get('/me/followed-posts', {
      signal,
    }),
  );
}

export function useCreateBookmark(tourPostId: string) {
  return useMutation(
    () => marketplaceApi.post(`/posts/${tourPostId}/bookmark`),
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
    () => marketplaceApi.delete(`/posts/${tourPostId}/bookmark`),
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
    () => marketplaceApi.post(`/posts/${tourPostId}/follow`),
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
    () => marketplaceApi.delete(`/posts/${tourPostId}/follow`),
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
