import React, { useMemo } from 'react';
import classNames from 'classnames';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { numberArrayOf } from '@/utils/arrays';

export interface RatingBarProps {
  readonly rating: number,
  readonly showText?: boolean,
  readonly starClassname?: string,
  readonly editable?: boolean,
  readonly onChange?: (rating: number) => void,
}

export default function RatingBar(props: RatingBarProps) {
  const {
    rating,
    showText = true,
    starClassname,
    editable = false,
    onChange,
  } = props;
  const [hoverRating, setHoverRating] = React.useState(0);
  const [hover, setHover] = React.useState(false);
  const displayRating = useMemo(() => {
    if (editable && hover) return hoverRating;
    return rating;
  }, [hoverRating, hover, rating]);

  const correctRating = Math.min(Math.max(displayRating, 0), 5);
  const fullStars = Math.floor(correctRating);
  const hasHalfStar = correctRating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div
      className="flex items-center space-x-1"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {
        numberArrayOf(fullStars).map((i) => (
          <BsStarFill
            className={classNames('fill-primary', starClassname, editable && 'cursor-pointer')}
            key={i}
            onMouseEnter={() => editable && setHoverRating(i + 1)}
            onClick={() => editable && onChange?.(i + 1)}
          />
        ))
      }
      {
        hasHalfStar && (
          <BsStarHalf
            className={classNames('fill-primary', starClassname, editable && 'cursor-pointer')}
            onMouseEnter={() => editable && setHoverRating(fullStars + 1)}
            onClick={() => editable && onChange?.(fullStars + 1)}
          />
        )
      }
      {
        numberArrayOf(emptyStars).map((i) => (
          <BsStar
            className={classNames('fill-gray-300', starClassname, editable && 'cursor-pointer')}
            key={i}
            onMouseEnter={() => editable && setHoverRating(fullStars + 1 + i)}
            onClick={() => editable && onChange?.(fullStars + 1 + i)}
          />
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
