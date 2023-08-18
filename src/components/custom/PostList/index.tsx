import React from 'react';
import { Post } from '@/models/Post';
import PostListItem from './PostListItem';

export interface PostListProps {
  posts: Post[],
  renderAction: (post: Post) => React.ReactNode,
}

export default function PostList(props: PostListProps) {
  const { posts, renderAction } = props;
  return (
    <div>
      {posts.map((post) => (
        <PostListItem post={post} key={post.id} renderAction={renderAction} />
      ))}
    </div>
  );
}
