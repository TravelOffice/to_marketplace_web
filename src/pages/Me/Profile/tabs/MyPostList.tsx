import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostList from '@/components/custom/PostList';
import { useMyPosts } from '@/hooks/post';
import { TourPost } from '@/models/TourPost/TourPost';
import { TourPostStatus } from '@/models/TourPost/TourPostStatus';
import FilterPostButtons from '@/components/custom/FilterPostButtons';

export default function MyPostList() {
  const navigate = useNavigate();
  const [
    filteringStatus,
    setFilteringStatus,
  ] = useState(TourPostStatus.IN_PROCESS);
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
    <>
      <div className="px-6 py-4">
        <FilterPostButtons
          filteringStatus={filteringStatus}
          setFilteringStatus={setFilteringStatus}
        />
      </div>
      <PostList
        queryResult={useMyPosts(filteringStatus)}
        renderAction={renderAction}
      />
    </>
  );
}
