import React from 'react';
import { TourPost } from '@/models/TourPost/TourPost';
import MakeOfferModal from '@/components/custom/MakeOfferModal';
import { useCurrentUser } from '@/hooks/auth';
import PostList from '@/components/custom/PostList';
import { usePosts } from '@/hooks/post';
import { TourPostType } from '@/models/TourPost/TourPostType';

interface TourPostProps {
  postType: TourPostType,
}

export default function TourList(props: TourPostProps) {
  const { postType } = props;
  const currentUser = useCurrentUser();
  const [selectedPost, setSelectedPost] = React.useState<TourPost>();
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
        queryResult={usePosts(postType)}
        renderAction={renderAction}
      />
      <MakeOfferModal
        isOpen={!!selectedPost}
        tourPostId={selectedPost?.code!}
        toggle={() => setSelectedPost(undefined)}
      />
    </>
  );
}
