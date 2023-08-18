import React from 'react';
import { Link } from 'react-router-dom';
import { numberArrayOf } from '@/utils/arrays';
import { Post } from '@/models/Post';
import PostList from '@/components/custom/PostList';

const myDeals: Post[] = numberArrayOf(10).map((i) => ({
  id: i.toString(),
}));

export default function MyDealList() {
  return (
    <PostList
      posts={myDeals}
      renderAction={(post) => (
        <Link to={`/posts/${post.id}`}>
          <button
            type="button"
            className="text-white bg-primary w-full rounded-lg font-medium text-sm px-5 py-2.5"
          >
            View
          </button>
        </Link>
      )}
    />
  );
}
