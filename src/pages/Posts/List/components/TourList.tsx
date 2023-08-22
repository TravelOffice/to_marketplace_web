import React from 'react';
import TourListItem from '@/pages/Posts/List/components/TourListItem';
import MakeOfferModal from '@/components/custom/MakeOfferModal';
import { TourPost } from '@/models/TourPost/TourPost';
import { usePosts } from '@/hooks/post';

export default function TourList() {
  const [selectedTour, setSelectedTour] = React.useState<TourPost>();
  const { data: tourPosts } = usePosts();
  return (
    <div>
      {
        tourPosts?.data.map((tour: TourPost) => (
          <TourListItem
            key={tour.code}
            onMakeOffer={() => setSelectedTour(tour)}
            post={tour}
          />
        ))
      }
      <MakeOfferModal isOpen={!!selectedTour} toggle={() => setSelectedTour(undefined)} />
    </div>
  );
}
