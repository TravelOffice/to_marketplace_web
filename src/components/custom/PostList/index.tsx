import React, { useMemo } from 'react';
import { UseInfiniteQueryResult } from '@tanstack/react-query';
import { TourPost } from '@/models/TourPost/TourPost';
import { PaginationPayload } from '@/services/BaseApi';
import { numberArrayOf } from '@/utils/arrays';
import PostListItem from './PostListItem';
import TourPostSkeleton from '../Skeleton/TourPostSkeleton';

export interface PostListProps {
  queryResult: UseInfiniteQueryResult<PaginationPayload<TourPost>>
  renderAction: (post: TourPost) => React.ReactNode,
}

export default function PostList(props: PostListProps) {
  const {
    renderAction,
    queryResult,
  } = props;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = queryResult;

  const generateLoadMoreButton = () => {
    if (isFetching) return 'Tải thêm...';
    if (hasNextPage) return 'Tải thêm';
    return '';
  };

  const tourPosts = useMemo(() => {
    let posts: TourPost[] = [];
    data?.pages.forEach((page) => {
      posts = posts.concat(page.data);
    });
    return posts;
  }, [data]);

  return status === 'loading' ? (
    numberArrayOf(5).map((index) => (
      <TourPostSkeleton key={index} />
    ))
  ) : (
    <>
      <div>
        {tourPosts.map((post) => (
          <PostListItem
            post={post}
            key={post.code}
            renderAction={renderAction}
          />
        ))}
      </div>
      <div className="text-center">
        <button
          type="button"
          className="text-center"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {
            generateLoadMoreButton()
          }
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Đang tải...' : null}</div>
    </>
  );
}
