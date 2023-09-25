import React from 'react';
import { Link } from 'react-router-dom';
import RatingBar from '@/components/base/RatingBar';
import { PostRating } from '@/models/TourPost/PostRating';
import { generateUserAvatar, useDateDuration } from '@/utils/common';
import { useMarketplaceUser } from '@/hooks/marketplaceUser';

export interface RatingListItemProps {
  readonly rating: PostRating,
}

export default function RatingListItem(props: RatingListItemProps) {
  const {
    rating,
  } = props;
  const { data: author } = useMarketplaceUser(rating.authorId, !!rating);
  return (
    <div key={rating.code} className="flex gap-5">
      <img
        src={generateUserAvatar(author)}
        alt=""
        className="w-10 h-10 rounded-full"
      />
      <div>
        <h5 className="font-medium mb-1">
          <Link
            to={`/users/${encodeURIComponent(author?.id!)}`}
            className="font-semibold"
          >
            {author?.name}
          </Link>
          {' '}
          {' '}
          <span className="text-sm italic text-gray-400">
            {useDateDuration(rating.createdAt)}
          </span>
        </h5>
        <RatingBar rating={rating.star} showText={false} starClassname="w-4 h-4" />
        <p className="text-sm mt-2">{rating.description}</p>
      </div>
    </div>
  );
}
