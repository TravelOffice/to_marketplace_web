import React from 'react';
import AcceptOfferModal from '@/pages/Posts/Detail/components/AcceptOfferModal';
import RejectOfferModal from '@/pages/Posts/Detail/components/RejectOfferModal';
import { Offer, OfferStatus } from '@/models/TourPost/Offer';
import OfferCard from '@/pages/Posts/Detail/components/OfferCard';
import FilterOfferButtons from '@/components/custom/FilterOfferButtons';

export interface OfferListCardProps {
  offers: Offer[],
  refetch: () => void,
  filteringOfferStatus: OfferStatus,
  setFilteringOfferStatus: React.Dispatch<React.SetStateAction<OfferStatus>>,
}

export default function OfferListCard(props: OfferListCardProps) {
  const {
    offers,
    refetch,
    filteringOfferStatus,
    setFilteringOfferStatus,
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
      <FilterOfferButtons
        filteringOfferStatus={filteringOfferStatus}
        setFilteringOfferStatus={setFilteringOfferStatus}
      />
      <div>
        {
          offers?.sort((a, b) => b.commission - a.commission)
            .map((offer) => (
              <OfferCard
                key={offer.code}
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
