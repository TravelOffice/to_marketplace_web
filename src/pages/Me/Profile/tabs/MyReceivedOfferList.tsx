import React, { useMemo, useState } from 'react';
import { Offer, OfferStatus } from '@/models/TourPost/Offer';
import MyOfferCard from '@/pages/Me/Profile/components/MyOfferCard';
import { useMyReceivedOffers } from '@/hooks/offer';
import OfferSkeleton from '@/components/custom/Skeleton/OfferSkeleton';
import { numberArrayOf } from '@/utils/arrays';
import FilterReceivedOfferButtons from '@/components/custom/FilterReceivedOfferButtons';

const generateLoadMoreButton = (hasNextPage?: boolean) => {
  if (hasNextPage) return 'Tải thêm';
  return '';
};

export default function MyReceivedOfferList() {
  const [
    filteringOfferStatus,
    setFilteringOfferStatus,
  ] = useState(OfferStatus.IN_PROCESS);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useMyReceivedOffers(filteringOfferStatus);
  const receivedOffers = useMemo(() => {
    let offers: Offer[] = [];
    data?.pages.forEach((page) => {
      offers = offers.concat(page.data);
    });
    return offers;
  }, [data]);

  return (
    <>
      <div className="px-6 py-5">
        <FilterReceivedOfferButtons
          filteringOfferStatus={filteringOfferStatus}
          setFilteringOfferStatus={setFilteringOfferStatus}
        />
      </div>
      {
        status === 'loading' ? (
          numberArrayOf(3)
            .map((index) => (
              <OfferSkeleton key={index} />
            ))
        ) : (
          <>
            <div>
              {
                receivedOffers?.map((offer) => (
                  <MyOfferCard
                    key={offer.code}
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
                  generateLoadMoreButton(hasNextPage)
                }
              </button>
            </div>
            <div>
              {isFetching ? (
                numberArrayOf(3)
                  .map((index) => (
                    <OfferSkeleton key={index} />
                  ))
              ) : null}
            </div>
          </>
        )
      }
    </>
  );
}
