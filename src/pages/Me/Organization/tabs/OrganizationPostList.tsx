import React from 'react';
import { useNavigate } from 'react-router-dom';
import PostList from '@/components/custom/PostList';
import { usePostsByOrganization } from '@/hooks/post';
import { useCurrentUser } from '@/hooks/auth';
import { TourPost } from '@/models/TourPost/TourPost';

export default function OrganizationPostList() {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const renderAction = (post: TourPost) => (
    <button
      type="button"
      className="text-white bg-primary w-full rounded-lg font-medium text-sm px-5 py-2.5"
      onClick={() => navigate(`/posts/${post?.code}`)}
      disabled={currentUser?.organization === post.organization}
    >
      Chi tiết
    </button>
  );

  return (
    <PostList
      queryResult={usePostsByOrganization(currentUser?.organization!, !!currentUser)}
      renderAction={renderAction}
    />
  );
}
