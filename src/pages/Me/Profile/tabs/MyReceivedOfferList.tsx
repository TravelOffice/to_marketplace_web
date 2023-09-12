import React, { useMemo, useState } from 'react';
import { Offer, OfferStatus } from '@/models/TourPost/Offer';
import MyOfferCard from '@/pages/Me/Profile/components/MyOfferCard';
import FilterOfferButtons from '@/components/custom/FilterOfferButtons';
import { useMyReceivedOffers } from '@/hooks/offer';
import OfferSkeleton from '@/components/custom/Skeleton/OfferSkeleton';
import { numberArrayOf } from '@/utils/arrays';

const generateLoadMoreButton = (isFetching: boolean, hasNextPage?: boolean) => {
  if (isFetching) return 'Tải thêm...';
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
      <div className="px-5 py-5">
        <FilterOfferButtons
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
                  generateLoadMoreButton(isFetching, hasNextPage)
                }
              </button>
            </div>
            <div>{isFetching && !isFetchingNextPage ? 'Đang tải...' : null}</div>
          </>
        )
      }
    </>
  );
}
