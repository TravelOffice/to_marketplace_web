import React from 'react';
import RatingBar from '@/components/base/RatingBar';
import RatingListModal from '@/pages/Posts/Detail/components/RatingListModal';

export default function RatingCard() {
  const [showRatingListModal, setShowRatingListModal] = React.useState(false);
  return (
    <div className="card px-5 py-5 mb-10">
      <div className="flex justify-between items-center mb-5">
        <h5 className="font-bold">Đánh giá (4.5 trên 5)</h5>
        <button
          type="button"
          className="underline text-sm"
          onClick={() => setShowRatingListModal(true)}
        >
          Xem tất cả
        </button>
      </div>
      <div className="flex justify-center mb-8">
        <RatingBar rating={4.5} showText={false} starClassname="w-10 h-10" />
      </div>
      <h6 className="font-medium">Chi tiết</h6>
      <div className="flex flex-col gap-2">
        <div className="flex items-center text-sm">
          <RatingBar rating={5} showText={false} starClassname="w-4 h-4" />
          <button type="button" className="ms-3 underline">(15 đánh giá)</button>
        </div>
        <div className="flex items-center text-sm">
          <RatingBar rating={4} showText={false} starClassname="w-4 h-4" />
          <button type="button" className="ms-3 underline">(4 đánh giá)</button>
        </div>
        <div className="flex items-center text-sm">
          <RatingBar rating={3} showText={false} starClassname="w-4 h-4" />
          <button type="button" className="ms-3 underline">(4 đánh giá)</button>
        </div>
        <div className="flex items-center text-sm">
          <RatingBar rating={2} showText={false} starClassname="w-4 h-4" />
          <button type="button" className="ms-3 underline">(4 đánh giá)</button>
        </div>
        <div className="flex items-center text-sm">
          <RatingBar rating={1} showText={false} starClassname="w-4 h-4" />
          <button type="button" className="ms-3 underline">(0 đánh giá)</button>
        </div>
      </div>
      <RatingListModal
        isOpen={showRatingListModal}
        toggle={() => setShowRatingListModal(!showRatingListModal)}
      />
    </div>
  );
}
