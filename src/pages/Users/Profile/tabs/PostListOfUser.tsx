import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostList from '@/components/custom/PostList';
import { usePostsByAuthor } from '@/hooks/post';
import { TourPost } from '@/models/TourPost/TourPost';

export default function PostListOfUser() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const renderAction = (post: TourPost) => (
    <button
      type="button"
      className="text-white bg-primary w-full rounded-lg font-medium text-sm px-5 py-2.5"
      onClick={() => navigate(`/posts/${post?.code}`)}
    >
      Chi tiết
    </button>
  );

  return (
    <PostList
      queryResult={usePostsByAuthor(decodeURI(userId!))}
      renderAction={renderAction}
    />
  );
}
