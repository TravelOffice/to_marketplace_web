import React from 'react';
import { Link } from 'react-router-dom';
import PostList from '@/components/custom/PostList';
import { Post } from '@/models/Post';
import { numberArrayOf } from '@/utils/arrays';

const organizationPosts: Post[] = numberArrayOf(10).map((i) => ({
  id: i.toString(),
}));

export default function OrganizationPostList() {
  return (
    <PostList
      posts={organizationPosts}
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
