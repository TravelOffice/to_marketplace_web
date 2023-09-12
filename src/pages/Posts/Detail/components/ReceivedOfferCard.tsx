import React from 'react';
import { Offer } from '@/models/TourPost/Offer';
import { formatCurrency, generateUserAvatar, useDateDuration } from '@/utils/common';
import { useMarketplaceUser } from '@/hooks/marketplaceUser';

interface OfferCardProps {
  offer: Offer,
  acceptOffer: (offer: Offer) => void,
  rejectOffer: (offer: Offer) => void,
}

export default function ReceivedOfferCard(props: OfferCardProps) {
  const {
    offer,
    acceptOffer,
    rejectOffer,
  } = props;
  const { data: author } = useMarketplaceUser(offer.authorId, !!offer);
  return (
    <div key={offer.code} className="border-b last:border-0 flex py-5 gap-5">
      <img
        src={generateUserAvatar(author)}
        alt=""
        className="w-14 h-14 rounded-full"
      />
      <div className="flex-1">
        <div>
          <h5 className="font-semibold text-lg">
            {author?.name}
          </h5>
        </div>
        <div className="text-sm italic">
          {useDateDuration(offer.createdAt)}
        </div>
        <div>
          <span>
            Chiết khấu:
            {' '}
            <span className="font-medium">
              {formatCurrency(offer.commission)}
              {' '}
              VND
            </span>
          </span>
        </div>
        <div>
          <span>
            Số lượng khách:
            {' '}
            <span
              className="font-medium"
            >
              {offer.totalPax > 0 ? offer?.totalPax : 'Không giới hạn'}
            </span>
          </span>
        </div>
        <div>
          <span>
            Giá/khách:
            {' '}
            <span className="font-medium">
              {formatCurrency(offer.pricePerPax)}
              {' '}
              VND
            </span>
          </span>
        </div>
        {
          offer.description ? (
            <div>
              <span>
                Ghi chú thêm:
                {' '}
                <span>
                  {offer.description}
                </span>
              </span>
            </div>
          ) : null
        }
        {
          offer.offerStatus === 'REJECTED' ? (
            <p>
              Lý do từ chối:
              {' '}
              <span className="text-red-700">{offer.rejectReason}</span>
            </p>
          ) : null
        }
        {
          offer.offerStatus === 'CANCELLED' ? (
            <p>
              Lý do hủy:
              {' '}
              <span className="text-red-700">{offer.cancelReason}</span>
            </p>
          ) : null
        }
      </div>
      <div className="h-fit flex flex-col gap-2">
        <div className="text-primary font-bold text-2xl text-center">
          {formatCurrency(offer.commission)}
          {' '}
          <span className="text-sm">đ</span>
        </div>
        {
          offer.offerStatus === 'IN_PROCESS' ? (
            <>
              <button
                type="button"
                className="w-full px-10 py-2 bg-primary text-white rounded"
                onClick={() => acceptOffer(offer)}
              >
                Chấp nhận
              </button>
              <button
                type="button"
                className="w-full px-10 py-2 border border-red-700 text-red-700 rounded me-3 dark:text-gray-200 dark:border-gray-200"
                onClick={() => rejectOffer(offer)}
              >
                Từ chối
              </button>
            </>
          ) : null
        }
      </div>
    </div>
  );
}
