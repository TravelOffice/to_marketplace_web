import React from 'react';
import { ToastContainer } from 'react-toastify';
import TourListItem from '@/pages/Posts/List/components/TourListItem';
import { TourPost } from '@/models/TourPost/TourPost';
import { usePosts } from '@/hooks/post';
import MakeOfferModal from '@/components/custom/MakeOfferModal';

export default function TourList() {
  const { data: tourPosts } = usePosts();
  const [selectedTour, setSelectedTour] = React.useState<TourPost>();
  return (
    <div>
      {tourPosts && tourPosts.data && tourPosts?.data.map((tour: TourPost) => (
        <TourListItem
          key={tour.code}
          onMakeOffer={() => setSelectedTour(tour)}
          post={tour}
        />
      ))}
      <MakeOfferModal
        isOpen={!!selectedTour}
        tourPostId={selectedTour?.code!}
        toggle={() => setSelectedTour(undefined)}
      />
      <ToastContainer />
    </div>
  );
}
