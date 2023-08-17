import React from 'react';
import { LiaBell, LiaBookmarkSolid, LiaHandshake } from 'react-icons/lia';
import { Link } from 'react-router-dom';
import RatingBar from '@/components/RatingBar';
import { Post } from '@/models/Post';

export interface TourListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  post: Post,
  onMakeOffer: () => void,
}

export default function TourListItem(props: TourListItemProps) {
  const { onMakeOffer, post, ...rest } = props;
  return (
    <div className="bg-white flex w-full pt-4 pb-4 border-b" {...rest}>
      <div className="h-full">
        <img src="https://picsum.photos/200/300" alt="" className="rounded-lg w-48 h-48 mb-2" />
        <button
          type="button"
          className="text-white bg-primary w-full rounded-lg font-medium text-sm px-5 py-2.5"
          onClick={onMakeOffer}
        >
          Make offer
        </button>
      </div>
      <div className="flex flex-col flex-1 text-left ps-5">
        <Link to={`/posts/${post.id}`} className="font-bold text-lg mb-1">Paris, France</Link>
        <RatingBar rating={3.5} />
        <p className="flex-1 text-sm text-gray-500 mb-2 text-justify">
          Lorem Ipsum is simply dummy text of the printing
          and typesetting industry. Lorem Ipsum has been the
          industry standard dummy text ever since the 1500s, when
          an unknown printer took a galley of type and scrambled
          it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
          {' '}
          <a href="/" className="text-blue-600">Read more</a>
        </p>
        <div className="text-sm mb-1">
          <span className="text-gray-500">Start date: </span>
          <span className="font-bold">12/12/2021</span>
        </div>
        <div className="text-sm">
          <span className="text-gray-500">Start date: </span>
          <span className="font-bold">12/12/2021</span>
        </div>
        <div className="flex justify-between items-center mt-4 text-sm text-secondary">
          <div className="flex items-center gap-2">
            <LiaHandshake className="w-6 h-6 text-primary" />
            <span>
              <strong className="font-bold text-black">10</strong>
              {' '}
              offers
            </span>
          </div>
          <div className="flex items-center gap-2">
            <LiaBookmarkSolid className="w-6 h-6 text-sky-500" />
            <span>
              <strong className="font-bold text-black">4</strong>
              {' '}
              bookmarks
            </span>
          </div>
          <div className="flex items-center gap-2">
            <LiaBell className="w-6 h-6 text-sky-500" />
            <span>
              <strong className="font-bold text-black">4</strong>
              {' '}
              followers
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
