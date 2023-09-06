import React from 'react';
import RatingBar from '@/components/base/RatingBar';
import RatingListModal from '@/pages/Posts/Detail/components/RatingListModal';
import { PostRating } from '@/models/TourPost/PostRating';

export interface RatingCardProps {
  readonly ratings: PostRating[],
  readonly ratingAverage: number,
}

export default function RatingCard(props: RatingCardProps) {
  const {
    ratings,
    ratingAverage,
  } = props;
  const [showRatingListModal, setShowRatingListModal] = React.useState(false);
  return (
    <div className="card px-5 py-5 mb-10">
      <div className="flex justify-between items-center mb-5">
        <h5 className="font-bold">
          Đánh giá (
          {ratingAverage}
          {' '}
          trên 5)
        </h5>
        <button
          type="button"
          className="underline text-sm"
          onClick={() => setShowRatingListModal(true)}
        >
          Xem tất cả
        </button>
      </div>
      <div className="flex justify-center mb-8">
        <RatingBar rating={ratingAverage} showText={false} starClassname="w-10 h-10" />
      </div>
      <h6 className="font-medium">Chi tiết</h6>
      <div className="flex flex-col gap-2">
        {
          [...Array(5)
            .keys()].reverse()
            .map((index) => (
              <div key={index} className="flex items-center text-sm">
                <RatingBar rating={index + 1} showText={false} starClassname="w-4 h-4" />
                <button
                  type="button"
                  className="ms-3 underline"
                >
                  (
                  {ratings?.filter((rating) => rating.star === index + 1).length}
                  {' '}
                  đánh
                  giá)
                </button>
              </div>
            ))
        }
      </div>
      <RatingListModal
        ratings={ratings}
        isOpen={showRatingListModal}
        toggle={() => setShowRatingListModal(!showRatingListModal)}
      />
    </div>
  );
}
