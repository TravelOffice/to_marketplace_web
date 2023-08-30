import React from 'react';
import classNames from 'classnames';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
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
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-1">
      {
        numberArrayOf(fullStars).map((i) => (
          <BsStarFill className={classNames('fill-primary', starClassname)} key={i} />
        ))
      }
      {
        hasHalfStar && (
          <BsStarHalf className={classNames('fill-primary', starClassname)} />
        )
      }
      {
        numberArrayOf(emptyStars).map((i) => (
          <BsStar className={classNames('fill-gray-300', starClassname)} key={i} />
        ))
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
