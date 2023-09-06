import React from 'react';
import AcceptOfferModal from '@/pages/Posts/Detail/components/AcceptOfferModal';
import RejectOfferModal from '@/pages/Posts/Detail/components/RejectOfferModal';
import { Offer } from '@/models/TourPost/Offer';
import OfferCard from '@/pages/Posts/Detail/components/OfferCard';

export interface OfferListCardProps {
  offers: Offer[],
  refetch: () => void,
}

export default function OfferListCard(props: OfferListCardProps) {
  const {
    offers,
    refetch,
  } = props;
  const [acceptOffer, setAcceptOffer] = React.useState<Offer>();
  const [rejectOffer, setRejectOffer] = React.useState<Offer>();

  return (
    <div className="card px-5 py-5 mb-10">
      <h5 className="font-bold mb-5">
        Danh sách yêu cầu (
        {offers?.length}
        )
        {' '}
        <button
          type="button"
          className="underline text-sm font-normal text-primary"
          onClick={refetch}
        >
          Làm mới
        </button>
      </h5>
      <div>
        {
          offers?.sort((a, b) => b.commission - a.commission)
            .map((offer) => (
              <OfferCard
                offer={offer}
                acceptOffer={() => setAcceptOffer(offer)}
                rejectOffer={() => setRejectOffer(offer)}
              />
            ))
        }
      </div>
      <AcceptOfferModal
        offer={acceptOffer!}
        isOpen={!!acceptOffer}
        toggle={() => setAcceptOffer(undefined)}
      />

      <RejectOfferModal
        offer={rejectOffer!}
        isOpen={!!rejectOffer}
        toggle={() => setRejectOffer(undefined)}
      />
    </div>
  );
}
