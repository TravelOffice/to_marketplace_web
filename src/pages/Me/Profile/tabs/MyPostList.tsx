import React from 'react';
import { Link } from 'react-router-dom';
import { numberArrayOf } from '@/utils/arrays';
import { Post } from '@/models/Post';
import PostList from '@/components/custom/PostList';

const myPosts: Post[] = numberArrayOf(10).map((i) => ({
  id: i.toString(),
}));

export default function MyPostList() {
  return (
    <PostList
      posts={myPosts}
      renderAction={(post) => (
        <Link to={`/posts/${post.id}`}>
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
