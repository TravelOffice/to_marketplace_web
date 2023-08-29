import React from 'react';
import TourListItem from '@/pages/Posts/List/components/TourListItem';
import { TourPost } from '@/models/TourPost/TourPost';
import { usePosts } from '@/hooks/post';
import MakeOfferModal from '@/components/custom/MakeOfferModal';

export default function TourList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = usePosts();

  const generateLoadMoreButton = () => {
    if (isFetching) return 'Tải thêm...';
    if (hasNextPage) return 'Tải thêm';
    return '';
  };

  const [selectedTour, setSelectedTour] = React.useState<TourPost>();

  return status === 'loading' ? (
    <p>Đang tải...</p>
  ) : (
    <>
      {data?.pages.map((page) => page.data.map((tour) => (
        <TourListItem
          key={tour.code}
          onMakeOffer={() => setSelectedTour(tour)}
          post={tour}
        />
      )))}
      <div className="text-center">
        <button
          type="button"
          className="text-center"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {
            generateLoadMoreButton()
          }
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Đang tải...' : null}</div>
      <MakeOfferModal
        isOpen={!!selectedTour}
        tourPostId={selectedTour?.code!}
        toggle={() => setSelectedTour(undefined)}
      />
    </>
  );
}
