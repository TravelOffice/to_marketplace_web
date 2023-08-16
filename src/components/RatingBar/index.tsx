import React from 'react';
import { FaStar, FaStarHalf } from 'react-icons/fa';
import { numberArrayOf } from '@/utils/arrays.tsx';

export interface RatingBarProps {
  readonly rating: number,
}

export default function RatingBar(props: RatingBarProps) {
  const { rating } = props;
  const correctRating = Math.min(Math.max(rating, 0), 5);
  const fullStars = Math.floor(correctRating);
  const hasHalfStar = correctRating - fullStars >= 0.5;

  return (
    <div className="flex items-center space-x-1 mb-2">
      {
        numberArrayOf(fullStars).map((i) => (
          <FaStar className="fill-primary" key={i} />
        ))
      }
      {
        hasHalfStar && (
          <FaStarHalf className="fill-primary" />
        )
      }
      <p className="ms-3 text-xs font-medium text-gray-500 dark:text-gray-400">
        {rating}
        {' '}
        out of 5
      </p>
    </div>
  );
}
