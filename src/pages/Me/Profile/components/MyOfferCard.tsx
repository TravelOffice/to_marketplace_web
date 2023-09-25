import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Offer } from '@/models/TourPost/Offer';
import { formatCurrency, generateUserAvatar, useDateDuration } from '@/utils/common';
import { useMarketplaceUser } from '@/hooks/marketplaceUser';
import { useCurrentUser } from '@/hooks/auth';

export interface OfferCardProps {
  offer: Offer,
}

export default function MyOfferCard(props: OfferCardProps) {
  const navigate = useNavigate();
  const {
    offer,
  } = props;
  const currentUser = useCurrentUser();
  const { data: author } = useMarketplaceUser(offer.authorId, !!offer);
  return (
    <div key={offer.code} className="border-b last:border-0 flex py-4 px-6 gap-5">
      <img
        src={generateUserAvatar(author)}
        alt=""
        className="w-14 h-14 rounded-full"
      />
      <div className="flex-1">
        <div>
          <Link
            to={currentUser?.id === offer.authorId ? '/me/profile' : `/users/${encodeURIComponent(offer.authorId!)}`}
            className="font-semibold"
          >
            {author?.name}
          </Link>
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
      </div>
      <div className="h-fit flex flex-col gap-2">
        <div className="text-primary font-bold text-2xl text-center">
          {formatCurrency(offer.commission)}
          {' '}
          <span className="text-sm">đ</span>
        </div>
        <button
          type="button"
          className="w-full px-10 py-2 bg-primary text-white rounded"
          onClick={() => navigate(`/posts/${offer.tourPostId}`)}
        >
          Chi tiết bài đăng
        </button>
      </div>
    </div>
  );
}
