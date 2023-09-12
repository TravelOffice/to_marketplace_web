import React from 'react';
import classNames from 'classnames';
import Modal, { ModalProps } from '@/components/base/Modal';
import ModalHeader from '@/components/base/Modal/ModalHeader';
import ModalBody from '@/components/base/Modal/ModalBody';
import { PostRating } from '@/models/TourPost/PostRating';
import RatingListItem from '@/pages/Posts/Detail/components/RatingListItem';

export interface RatingListModalProps extends ModalProps {
  readonly ratings: PostRating[],
}

const ratingTypes = [
  'all',
  '5',
  '4',
  '3',
  '2',
  '1',
] as const;

type RatingFilterType = typeof ratingTypes[number];

const ratingTypeLabels: Record<RatingFilterType, string> = {
  all: 'Tất cả',
  1: '1 sao',
  2: '2 sao',
  3: '3 sao',
  4: '4 sao',
  5: '5 sao',
};

export default function RatingListModal(props: RatingListModalProps) {
  const { ratings } = props;
  const [ratingFilter, setRatingFilter] = React.useState<RatingFilterType>('all');
  const filteredRatings = React.useMemo(() => {
    if (ratingFilter === 'all') {
      return ratings;
    }
    return ratings?.filter((rating) => Math.round(rating.star) === Number(ratingFilter));
  }, [ratingFilter]);
  return (
    <Modal {...props} size="2xl">
      <ModalHeader>
        <h5 className="font-bold">Danh sách đánh giá</h5>
      </ModalHeader>
      <ModalBody>
        <div className="flex gap-2 mb-5">
          {
            ratingTypes.map((type) => (
              <button
                key={type}
                type="button"
                className={classNames(
                  'px-5 py-2 rounded text-sm font-medium border',
                  ratingFilter === type ? 'border-primary text-primary' : 'text-gray-400 border-gray-300',
                )}
                onClick={() => setRatingFilter(type)}
              >
                {ratingTypeLabels[type]}
              </button>
            ))
          }
        </div>
        <div className="mb-3">
          Tìm thấy
          {' '}
          <span className="font-medium text-primary">
            {filteredRatings?.length}
          </span>
          {' '}
          kết quả
        </div>
        <div className="flex flex-col gap-5">
          {
            filteredRatings?.sort((a, b) => b.createdAt - a.createdAt)
              .map((rating) => (
                <RatingListItem key={rating.code} rating={rating} />
              ))
          }
        </div>
      </ModalBody>
    </Modal>
  );
}
