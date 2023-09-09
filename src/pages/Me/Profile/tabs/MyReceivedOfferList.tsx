import React, { useMemo } from 'react';
import OfferSkeleton from '@/components/custom/Skeleton/OfferSkeleton';
import { useMyReceivedOffers } from '@/hooks/offer';
import { Offer } from '@/models/TourPost/Offer';
import MyOfferCard from '@/pages/Me/Profile/components/MyOfferCard';
import { numberArrayOf } from '@/utils/arrays';

export default function MyReceivedOfferList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useMyReceivedOffers();

  const generateLoadMoreButton = () => {
    if (isFetching) return 'Tải thêm...';
    if (hasNextPage) return 'Tải thêm';
    return '';
  };

  const receivedOffers = useMemo(() => {
    let offers: Offer[] = [];
    data?.pages.forEach((page) => {
      offers = offers.concat(page.data);
    });
    return offers;
  }, [data]);

  return status === 'loading' ? (
    numberArrayOf(10).map((index) => (
      <OfferSkeleton key={index} />
    ))
  ) : (
    <>
      <div>
        {
          receivedOffers?.map((offer) => (
            <MyOfferCard
              offer={offer}
            />
          ))
        }
      </div>
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
    </>
  );
}
