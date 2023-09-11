import OfferSkeleton from '@/components/custom/Skeleton/OfferSkeleton';
import { useMySentOffers } from '@/hooks/offer.ts';
import { Offer } from '@/models/TourPost/Offer.ts';
import MyOfferCard from '@/pages/Me/Profile/components/MyOfferCard.tsx';
import { numberArrayOf } from '@/utils/arrays';
import React, { useMemo } from 'react';

export default function MySentOfferList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useMySentOffers();

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
