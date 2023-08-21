import React from 'react';
import { TourPost } from '@/models/TourPost/TourPost';
import PostListItem from './PostListItem';

export interface PostListProps {
  posts: TourPost[],
  renderAction: (post: TourPost) => React.ReactNode,
}

export default function PostList(props: PostListProps) {
  const {
    posts,
    renderAction,
  } = props;
  return (
    <div>
      {posts.map((post) => (
        <PostListItem post={post} key={post.code} renderAction={renderAction} />
      ))}
    </div>
  );
}
