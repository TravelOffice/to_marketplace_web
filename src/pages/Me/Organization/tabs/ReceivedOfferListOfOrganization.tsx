import React, { useMemo, useState } from 'react';
import { Offer, OfferStatus } from '@/models/TourPost/Offer';
import OrganizationOfferCard from '@/pages/Me/Organization/components/OrganizationOfferCard';
import { useReceivedOfferOfOrganization } from '@/hooks/offer';
import OfferSkeleton from '@/components/custom/Skeleton/OfferSkeleton';
import { numberArrayOf } from '@/utils/arrays';
import FilterReceivedOfferButtons from '@/components/custom/FilterReceivedOfferButtons';

export default function ReceivedOfferListOfOrganization() {
  const [filteringOfferStatus, setFilteringOfferStatus] = useState(OfferStatus.IN_PROCESS);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useReceivedOfferOfOrganization(filteringOfferStatus);

  const generateLoadMoreButton = () => {
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

  return (
    <>
      <div className="px-5 py-5">
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
                  <OrganizationOfferCard
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
