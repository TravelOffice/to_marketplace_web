import React from 'react';
import { Link } from 'react-router-dom';
import PostList from '@/components/custom/PostList';
import { useMyPosts } from '@/hooks/post';

export default function MyPostList() {
  const { data: tourPosts } = useMyPosts();
  return (
    <PostList
      posts={tourPosts?.data}
      renderAction={(post) => (
        <Link to={`/posts/${post.code}`}>
          <button
            type="button"
            className="text-white bg-primary w-full rounded-lg font-medium text-sm px-5 py-2.5"
          >
            Edit
          </button>
        </Link>
      )}
    />
  );
}
