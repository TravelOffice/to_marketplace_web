import React from 'react';
import { TourPost } from '@/models/TourPost/TourPost';
import MakeOfferModal from '@/components/custom/MakeOfferModal';
import { useCurrentUser } from '@/hooks/auth';
import PostList from '@/components/custom/PostList';
import { useFilteringPostStore, usePosts } from '@/hooks/post';
import { TourPostType } from '@/models/TourPost/TourPostType';
import { TourPostStatus } from '@/models/TourPost/TourPostStatus';

interface TourPostProps {
  postType: TourPostType,
}

export default function TourList(props: TourPostProps) {
  const { postType } = props;
  const currentUser = useCurrentUser();
  const [selectedPost, setSelectedPost] = React.useState<TourPost>();
  const {
    filteringEndingLocation,
    filteringDepartureDate,
  } = useFilteringPostStore();
  const renderAction = (post: TourPost) => {
    if (currentUser?.organization !== post.organization) {
      return (
        <button
          type="button"
          className="text-white bg-primary w-full rounded-lg font-medium text-sm px-5 py-2.5"
          onClick={() => setSelectedPost(post)}
        >
          Tạo yêu cầu
        </button>
      );
    }
    return null;
  };

  return (
    <>
      <PostList
        queryResult={usePosts({
          postType,
          status: TourPostStatus.IN_PROCESS,
          endingLocation: filteringEndingLocation,
          departureDate: filteringDepartureDate,
        })}
        renderAction={renderAction}
      />
      <MakeOfferModal
        isOpen={!!selectedPost}
        post={selectedPost!}
        toggle={() => setSelectedPost(undefined)}
      />
    </>
  );
}
