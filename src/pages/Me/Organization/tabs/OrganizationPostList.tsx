import React from 'react';
import { Link } from 'react-router-dom';
import PostList from '@/components/custom/PostList';
import { usePostsByOrganization } from '@/hooks/post';
import { useCurrentUser } from '@/hooks/auth';

export default function OrganizationPostList() {
  const currentUser = useCurrentUser();
  const { data: tourPosts } = usePostsByOrganization(currentUser?.organization ?? '');
  return (
    <PostList
      posts={tourPosts?.data || []}
      renderAction={(post) => (
        <Link to={`/posts/${post.code}`}>
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
