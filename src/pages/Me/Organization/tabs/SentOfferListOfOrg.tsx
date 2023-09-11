import OfferSkeleton from '@/components/custom/Skeleton/OfferSkeleton';
import { useSentOfferOfOrganization } from '@/hooks/offer';
import { Offer } from '@/models/TourPost/Offer';
import OrganizationOfferCard from '@/pages/Me/Organization/components/OrganizationOfferCard';
import { numberArrayOf } from '@/utils/arrays';
import React, { useMemo } from 'react';

export default function SentOfferListOfOrg() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useSentOfferOfOrganization();

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
      <div>{isFetching && !isFetchingNextPage ? 'Đang tải...' : null}</div>
    </>
  );
}
