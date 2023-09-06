import React from 'react';
import OfferListCard from '@/pages/Posts/Detail/components/OfferListCard';
import { useMyReceivedOffers } from '@/hooks/offer';

export default function MyReceivedOfferList() {
  const {
    data,
    refetch,
  } = useMyReceivedOffers();
  return (
    <OfferListCard
      offers={data ?? []}
      refetch={refetch}
    />
  );
}
