import React, { useMemo, useState } from 'react';
import { Offer, OfferStatus } from '@/models/TourPost/Offer';
import MyOfferCard from '@/pages/Me/Profile/components/MyOfferCard';
import { useMySentOffers } from '@/hooks/offer';
import OfferSkeleton from '@/components/custom/Skeleton/OfferSkeleton';
import { numberArrayOf } from '@/utils/arrays';
import FilterSentOfferButtons from '@/components/custom/FilterSentOfferButtons';

const generateLoadMoreButton = (hasNextPage?: boolean) => {
  if (hasNextPage) return 'Tải thêm';
  return '';
};

export default function MySentOfferList() {
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
  } = useMySentOffers(filteringOfferStatus);
  const sentOffers = useMemo(() => {
    let offers: Offer[] = [];
    data?.pages.forEach((page) => {
      offers = offers.concat(page.data);
    });
    return offers;
  }, [data]);

  return (
    <>
      <div className="px-6 py-5">
        <FilterSentOfferButtons
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
                sentOffers?.map((offer) => (
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
