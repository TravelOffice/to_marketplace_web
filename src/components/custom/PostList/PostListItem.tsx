import React from 'react';
import { Link } from 'react-router-dom';
import { LiaBell, LiaBookmarkSolid, LiaHandshake } from 'react-icons/lia';
import moment from 'moment';
import RatingBar from '@/components/base/RatingBar';
import { TourPost } from '@/models/TourPost/TourPost';

export interface PostListItemProps {
  post: TourPost,
  renderAction: (post: TourPost) => React.ReactNode,
}

export default function PostListItem(props: PostListItemProps) {
  const {
    post,
    renderAction,
  } = props;
  return (
    <div className="flex px-6 py-4 border-b last:border-b-0">
      <div className="h-full">
        <img src="https://picsum.photos/200/300" alt="" className="rounded-lg w-48 h-48 mb-2" />
        {renderAction(post)}
      </div>
      <div className="flex flex-col flex-1 text-left ps-5">
        <Link to={`/posts/${post.code}`} className="font-bold text-lg mb-1">{post.name}</Link>
        <RatingBar rating={3.5} />
        <p className="flex-1 text-sm text-gray-500 mb-2 text-justify">
          {post.description}
          {' '}
          <a href="/" className="text-blue-600">Xem thêm</a>
        </p>
        <div className="text-sm mb-1">
          <span className="text-gray-500">Điểm đến: </span>
          <span className="font-bold">{post.endingLocation}</span>
        </div>
        <div className="text-sm">
          <span className="text-gray-500">Ngày khởi hành: </span>
          <span className="font-bold">
            {moment(post.departureDate)
              .format(('DD/MM/YYYY'))}
          </span>
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
