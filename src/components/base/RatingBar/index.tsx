import React from 'react';
import { FaStar, FaStarHalf } from 'react-icons/fa';
import classNames from 'classnames';
import { numberArrayOf } from '@/utils/arrays';

export interface RatingBarProps {
  readonly rating: number,
  readonly showText?: boolean,
  readonly starClassname?: string,
}

export default function RatingBar(props: RatingBarProps) {
  const { rating, showText = true, starClassname } = props;
  const correctRating = Math.min(Math.max(rating, 0), 5);
  const fullStars = Math.floor(correctRating);
  const hasHalfStar = correctRating - fullStars >= 0.5;

  return (
    <div className="flex items-center space-x-1 mb-2">
      {
        numberArrayOf(fullStars).map((i) => (
          <FaStar className={classNames('fill-primary', starClassname)} key={i} />
        ))
      }
      {
        hasHalfStar && (
          <FaStarHalf className={classNames('fill-primary', starClassname)} />
        )
      }
      {
        showText && (
          <p className="ms-3 text-xs font-medium text-gray-500 dark:text-gray-400">
            {rating}
            {' '}
            out of 5
          </p>
        )
      }
    </div>
  );
}
