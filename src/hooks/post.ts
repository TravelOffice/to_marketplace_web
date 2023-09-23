import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  useInfiniteQuery,
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import {
  CREATE_SUCCESS,
  NUMBER_ITEM_PER_PAGE,
  SOMETHING_WRONG,
  UPDATE_SUCCESS,
} from '@/utils/constants';
import { CreatePostFormData, EditPostFormData, TourPost } from '@/models/TourPost/TourPost';
import marketplaceApi from '@/services/marketplaceApi';
import { PaginationPayload } from '@/services/BaseApi';
import { FollowedTourPost } from '@/models/TourPost/FollowedTourPost';
import { BookmarkedTourPost } from '@/models/TourPost/BookmarkedTourPost';
import { TourPostType } from '@/models/TourPost/TourPostType';
import { PresignedUrlType } from '@/models/PresignedUrl';
import { uploadImage } from '@/utils/common';
import { TourPostStatus } from '@/models/TourPost/TourPostStatus';

export function useMyPosts(status?: TourPostStatus) {
  return useInfiniteQuery({
    queryKey: ['my_posts', status],
    queryFn: async ({
      signal,
      pageParam,
    }) => marketplaceApi.get<PaginationPayload<TourPost>>(
      '/me/posts',
      {
        queryParams: {
          status,
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

export interface UsePostsParams {
  postType?: TourPostType,
  status?: TourPostStatus,
  endingLocation?: string,
  departureDate?: string,
}

export function usePosts(params: UsePostsParams) {
  const {
    postType,
    status,
    endingLocation,
    departureDate,
  } = params;
  return useInfiniteQuery({
    queryKey: ['posts', postType, status, endingLocation, departureDate],
    queryFn: async ({
      signal,
      pageParam,
    }) => marketplaceApi.get<PaginationPayload<TourPost>>(
      '/posts',
      {
        queryParams: {
          status,
          postType,
          endingLocation,
          departureDate,
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

export function usePostsByOrganization(
  organization: string,
  enabled: boolean,
  status?: TourPostStatus,
) {
  return useInfiniteQuery({
    queryKey: ['posts_oby_organization', organization, status],
    queryFn: async ({
      signal,
      pageParam,
    }) => marketplaceApi.get<PaginationPayload<TourPost>>(
      '/posts',
      {
        queryParams: {
          organization,
          status,
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

export function usePostsByAuthor(author: string, status?: TourPostStatus) {
  return useInfiniteQuery({
    queryKey: ['posts_by_author', author],
    queryFn: async ({
      signal,
      pageParam,
    }) => marketplaceApi.get<PaginationPayload<TourPost>>(
      '/posts',
      {
        queryParams: {
          status,
          nextToken: pageParam,
          limit: NUMBER_ITEM_PER_PAGE,
          author,
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

export function usePost(id: string) {
  return useQuery(
    ['posts', id],
    ({ signal }) => marketplaceApi.get<TourPost>(`/posts/${id}`, {
      signal,
    }),
  );
}

export const useCreatePostMutation = () => {
  const navigate = useNavigate();
  return useMutation(
    {
      mutationFn: async (post: CreatePostFormData) => {
        const {
          thumbnails,
          ...rest
        } = post;
        let thumbnailUrl: string | undefined;
        if (thumbnails && thumbnails.length > 0) {
          const uploadedUrl = await uploadImage(
            thumbnails[0],
            0.8,
            PresignedUrlType.POST_THUMBNAIL,
          );
          const { cdn } = uploadedUrl;
          thumbnailUrl = cdn;
        }
        return marketplaceApi.post<TourPost>('/posts', {
          ...rest,
          thumbnail: thumbnailUrl,
        });
      },
      onSuccess: (newPost) => {
        toast.success(CREATE_SUCCESS);
        navigate(`/posts/${newPost.code}`);
      },
      onError: () => {
        toast.error(SOMETHING_WRONG);
      },
    },
  );
};

export const useUpdatePostMutation = (postId: string) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: async (post: EditPostFormData) => marketplaceApi.put<TourPost>(`/posts/${postId}`, post),
      onSuccess: (newPost: TourPost) => {
        toast.success(UPDATE_SUCCESS);
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

export function useUpdatePostThumbnailMutation(
  postId: string,
  options: UseMutationOptions<TourPost, Error, string>,
) {
  return useMutation(
    (image: string) => marketplaceApi.put<TourPost>(`/posts/${postId}`, { thumbnail: encodeURI(image) }),
    options,
  );
}

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

export function useTopCommissionPosts() {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ['topCommissionPosts', 'TOP10'],
    queryFn: () => marketplaceApi.get<TourPost[]>('/trending-posts'),
    onSuccess: (topCommissionPosts) => {
      // Set default top 10 commission posts
      queryClient.setQueryData(['topCommissionPosts', 'TOP10'], topCommissionPosts);
    },
    onError: () => {
      toast.error(SOMETHING_WRONG);
    },
  });
}

export interface FilteringPostState {
  filteringEndingLocation?: string,
  filteringDepartureDate?: string,
  setFilteringEndingLocation: (endingLocation?: string) => void;
  setFilteringDepartureDate: (departureDate?: string) => void;
}

export const useFilteringPostStore = create<FilteringPostState>()(
  persist(
    (set) => ({
      filteringEndingLocation: undefined,
      filteringDepartureDate: undefined,
      setFilteringEndingLocation: (
        endingLocation?,
      ) => set({ filteringEndingLocation: endingLocation }),
      setFilteringDepartureDate: (departureDate?) => set({ filteringDepartureDate: departureDate }),

    }),
    {
      name: 'filtering-posts-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
