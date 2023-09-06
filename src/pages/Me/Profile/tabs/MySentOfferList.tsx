import React, { useMemo } from 'react';
import { useMySentOffers } from '@/hooks/offer.ts';
import { Offer } from '@/models/TourPost/Offer.ts';
import MyOfferCard from '@/pages/Me/Profile/components/MyOfferCard.tsx';

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
    <p>Đang tải...</p>
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
