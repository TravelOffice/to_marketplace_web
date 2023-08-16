import React from 'react';
import TourListItem from '@/pages/Posts/List/components/TourListItem';
import { numberArrayOf } from '@/utils/arrays';
import { Post } from '@/models/Post';
import MakeOfferModal from '@/pages/Posts/List/components/MakeOfferModal';

export interface TourListProps {

}

const tours = numberArrayOf(10).map((i) => ({ id: i.toString() })) as Post[];

export default function TourList() {
  const [selectedTour, setSelectedTour] = React.useState<Post>();
  return (
    <div>
      {
        tours.map((tour) => (
          <TourListItem
            key={tour.id}
            onMakeOffer={() => setSelectedTour(tour)}
          />
        ))
      }
      <MakeOfferModal isOpen={!!selectedTour} toggle={() => setSelectedTour(undefined)} />
    </div>
  );
}
