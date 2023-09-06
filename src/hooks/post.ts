import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  useInfiniteQuery,
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { CREATE_SUCCESS, NUMBER_ITEM_PER_PAGE, SOMETHING_WRONG } from '@/utils/constants';
import { EditPostFormData, TourPost } from '@/models/TourPost/TourPost';
import marketplaceApi from '@/services/marketplaceApi';
import { PaginationPayload } from '@/services/BaseApi';
import { FollowedTourPost } from '@/models/TourPost/FollowedTourPost';
import { BookmarkedTourPost } from '@/models/TourPost/BookmarkedTourPost';

export function useMyPosts() {
  return useInfiniteQuery({
    queryKey: ['my_posts'],
    queryFn: async ({
      signal,
      pageParam,
    }) => marketplaceApi.get<PaginationPayload<TourPost>>(
      '/me/posts',
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

export function usePostsByOrganization(organization: string, enabled: boolean) {
  return useInfiniteQuery({
    queryKey: ['posts_oby_organization', organization],
    queryFn: async ({
      signal,
      pageParam,
    }) => marketplaceApi.get<PaginationPayload<TourPost>>(
      '/posts',
      {
        queryParams: {
          organization,
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
    enabled,
  });
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

export const useUpdatePostMutation = (postId: string) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: (post: EditPostFormData) => marketplaceApi.put<TourPost>(`/posts/${postId}`, post),
      onSuccess: (newPost) => {
        queryClient.setQueryData(['posts', postId], (input: TourPost | undefined) => ({
          ...input,
          ...newPost,
        }));
        navigate(`/posts/${postId}`);
      },
      onError: () => {
        toast.error(SOMETHING_WRONG);
      },
    },
  );
};

export function useMyBookmarkedPosts() {
  return useInfiniteQuery({
    queryKey: ['bookmarked_posts'],
    queryFn: async ({
      signal,
      pageParam,
    }) => marketplaceApi.get<PaginationPayload<TourPost>>(
      '/me/bookmarked-posts',
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

export function useMyFollowPosts() {
  return useInfiniteQuery({
    queryKey: ['follow_posts'],
    queryFn: async ({
      signal,
      pageParam,
    }) => marketplaceApi.get<PaginationPayload<TourPost>>(
      '/me/followed-posts',
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

export function useCreateBookmarkPostMutation(
  options: UseMutationOptions<BookmarkedTourPost, Error, string>,
) {
  return useMutation(
    (tourPostId: string) => marketplaceApi.post<BookmarkedTourPost>(`/posts/${tourPostId}/bookmark`),
    options,
  );
}

export function useDeleteBookmarkPostMutation(
  options: UseMutationOptions<BookmarkedTourPost, Error, string>,
) {
  return useMutation(
    (tourPostId: string) => marketplaceApi.delete<BookmarkedTourPost>(`/posts/${tourPostId}/bookmark`),
    options,
  );
}

export function useFollowPostMutation(
  options: UseMutationOptions<FollowedTourPost, Error, string>,
) {
  return useMutation(
    (tourPostId: string) => marketplaceApi.post<FollowedTourPost>(`/posts/${tourPostId}/follow`),
    options,
  );
}

export function useUnfollowPostMutation(
  options: UseMutationOptions<FollowedTourPost, Error, string>,
) {
  return useMutation(
    (tourPostId: string) => marketplaceApi.delete<FollowedTourPost>(`/posts/${tourPostId}/follow`),
    options,
  );
}
