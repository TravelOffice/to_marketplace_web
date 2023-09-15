import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  useInfiniteQuery,
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
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
import { PresignedUrl, PresignedUrlType } from '@/models/PresignedUrl';

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

export function usePosts(postType?: TourPostType) {
  return useInfiniteQuery({
    queryKey: ['posts', postType],
    queryFn: async ({
      signal,
      pageParam,
    }) => marketplaceApi.get<PaginationPayload<TourPost>>(
      '/posts',
      {
        queryParams: {
          postType,
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

async function uploadImage(file: File, type: PresignedUrlType) {
  // Get pre-signed url by calling api
  const response = await marketplaceApi.get<PresignedUrl>('/presigned-url', {
    queryParams: {
      type,
    },
  });
  const {
    url,
  } = response;

  // Upload to given url
  await marketplaceApi.put(url, file, {
    headers: {
      'Content-Type': file.type,
    },
  });
  return response;
}

export const useCreatePostMutation = () => {
  const navigate = useNavigate();
  return useMutation(
    {
      mutationFn: async (post: CreatePostFormData) => {
        const {
          image,
          ...rest
        } = post;
        const presignedUrl = await uploadImage(image, PresignedUrlType.POST_THUMBNAIL);
        const {
          url,
          cdn,
        } = presignedUrl;
        return marketplaceApi.post<TourPost>('/posts', {
          ...rest,
          thumbnail: {
            url,
            cdn,
          },
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
    queryFn: () => marketplaceApi.get<TourPost[]>('/trending-posts'),
    onSuccess: (topCommissionPosts) => {
      // Set default top 10 commission posts
      queryClient.setQueryData(['topCommissionPosts', 10], topCommissionPosts);
    },
    onError: () => {
      toast.error(SOMETHING_WRONG);
    },
  });
}
