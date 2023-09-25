import React from 'react';
import { Offer, OfferStatus } from '@/models/TourPost/Offer';
import CancelOfferModal from '@/pages/Posts/Detail/components/CancelOfferModal';
import SentOfferCard from '@/pages/Posts/Detail/components/SentOfferCard';
import UpdateOfferModal from '@/pages/Posts/Detail/components/UpdateOfferModal';
import FilterSentOfferButtons from '@/components/custom/FilterSentOfferButtons';

export interface OfferListCardProps {
  offers: Offer[],
  refetch: () => void,
  filteringOfferStatus: OfferStatus,
  setFilteringOfferStatus: React.Dispatch<React.SetStateAction<OfferStatus>>,
}

export default function SentOfferListCard(props: OfferListCardProps) {
  const {
    offers,
    refetch,
    filteringOfferStatus,
    setFilteringOfferStatus,
  } = props;
  const [updateOffer, setUpdateOffer] = React.useState<Offer>();
  const [cancelOffer, setCancelOffer] = React.useState<Offer>();

  return (
    <div className="card px-5 py-5 mb-10">
      <h5 className="font-bold mb-5">
        Yêu cầu đã gửi (
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
      <FilterSentOfferButtons
        filteringOfferStatus={filteringOfferStatus}
        setFilteringOfferStatus={setFilteringOfferStatus}
      />
      <div>
        {
          offers?.sort((a, b) => b.commission - a.commission)
            .map((offer) => (
              <SentOfferCard
                key={offer.code}
                offer={offer}
                updateOffer={() => setUpdateOffer(offer)}
                cancelOffer={() => setCancelOffer(offer)}
              />
            ))
        }
      </div>
      <UpdateOfferModal
        offer={updateOffer!}
        isOpen={!!updateOffer}
        toggle={() => setUpdateOffer(undefined)}
      />

      <CancelOfferModal
        offer={cancelOffer!}
        isOpen={!!cancelOffer}
        toggle={() => setCancelOffer(undefined)}
      />
    </div>
  );
}
