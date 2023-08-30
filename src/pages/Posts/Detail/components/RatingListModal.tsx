import React from 'react';
import classNames from 'classnames';
import Modal, { ModalProps } from '@/components/base/Modal';
import ModalHeader from '@/components/base/Modal/ModalHeader';
import ModalBody from '@/components/base/Modal/ModalBody';
import RatingBar from '@/components/base/RatingBar';

export interface RatingListModalProps extends ModalProps {
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

const ratings = Array.from({ length: 5 }).map((_, i) => ({
  id: i,
  name: 'Nguyễn Văn A',
  avatar: 'https://picsum.photos/600/600',
  rating: Math.ceil(Math.random() * 5),
  content: 'Skem',
  createdAt: '1 ngày trước',
}));

export default function RatingListModal(props: RatingListModalProps) {
  const [ratingFilter, setRatingFilter] = React.useState<RatingFilterType>('all');
  const filteredRatings = React.useMemo(() => {
    if (ratingFilter === 'all') {
      return ratings;
    }
    return ratings.filter((rating) => Math.round(rating.rating) === Number(ratingFilter));
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
            {filteredRatings.length}
          </span>
          {' '}
          kết quả
        </div>
        <div className="flex flex-col gap-5">
          {
            filteredRatings.map((rating) => (
              <div key={rating.id} className="flex gap-5">
                <img
                  src={rating.avatar}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h5 className="font-medium mb-1">
                    {rating.name}
                    {' '}
                    <span className="text-sm italic text-gray-400">
                      {rating.createdAt}
                    </span>
                  </h5>
                  <RatingBar rating={rating.rating} showText={false} starClassname="w-4 h-4" />
                  <p className="text-sm mt-2">{rating.content}</p>
                </div>
              </div>
            ))
          }
        </div>
      </ModalBody>
    </Modal>
  );
}
