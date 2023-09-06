import React, { useMemo } from 'react';
import { useReceivedOfferOfOrganization } from '@/hooks/offer';
import { Offer } from '@/models/TourPost/Offer';
import OrganizationOfferCard from '@/pages/Me/Organization/components/OrganizationOfferCard';

export default function ReceivedOfferListOfOrg() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useReceivedOfferOfOrganization();

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
