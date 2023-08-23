import React from 'react';
import { LiaBell, LiaBookmarkSolid, LiaHandshake } from 'react-icons/lia';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import RatingBar from '@/components/base/RatingBar';
import { TourPost } from '@/models/TourPost/TourPost';
import { useCurrentUser } from '@/hooks/auth';

export interface TourListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  post: TourPost,
  onMakeOffer: () => void,
}

export default function TourListItem(props: TourListItemProps) {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const {
    onMakeOffer,
    post,
    ...rest
  } = props;
  const onEditPost = () => {
    navigate(`/posts/${post?.code}`);
  };
  return (
    <div
      className="bg-white dark:bg-[#283046] flex w-full py-4 px-6 border-b last:border-b-0 dark:border-gray-700"
      {...rest}
    >
      <div className="h-full">
        <img src="https://picsum.photos/200/300" alt="" className="rounded-lg w-48 h-48 mb-2" />
        {
          currentUser?.id === post.authorId ? (
            <button
              type="button"
              className="text-white bg-primary w-full rounded-lg font-medium text-sm px-5 py-2.5"
              onClick={onEditPost}
            >
              Cập nhật
            </button>
          ) : (
            <button
              type="button"
              className="text-white bg-primary w-full rounded-lg font-medium text-sm px-5 py-2.5"
              onClick={onMakeOffer}
            >
              Tạo yêu cầu
            </button>
          )
        }
      </div>
      <div className="flex flex-col flex-1 text-left ps-5">
        <Link to={`/posts/${post.code}`} className="font-bold text-lg mb-1">{post.name}</Link>
        {
          post?.ratingAverage! > 0 && (
            <RatingBar rating={post?.ratingAverage!} />
          )
        }
        <p
          className="flex-1 text-sm text-gray-500 mb-2 text-justify dark:text-white whitespace-pre-wrap"
        >
          {post.description}
          {' '}
          <Link to={`/posts/${post.code}`} className="text-blue-600">Xem thêm</Link>
        </p>
        <div className="text-sm mb-1">
          <span className="text-gray-500 dark:text-white">Điểm đến: </span>
          <span className="font-bold">{post.endingLocation}</span>
        </div>
        <div className="text-sm">
          <span className="text-gray-500 dark:text-white">Ngày khởi hành: </span>
          <span className="font-bold">
            {moment(post.departureDate)
              .format('DD/MM/YYYY')}
          </span>
        </div>
        <div className="flex justify-between items-center mt-4 text-sm text-secondary">
          <div className="flex items-center gap-2 dark:text-white">
            <LiaHandshake className="w-6 h-6 text-primary" />
            <span>
              <strong className="font-bold text-black dark:text-white">{post.totalOffers}</strong>
              {' '}
              Yêu cầu
            </span>
          </div>
          <div className="flex items-center gap-2 dark:text-white">
            <LiaBookmarkSolid className="w-6 h-6 text-sky-500" />
            <span>
              <strong className="font-bold text-black dark:text-white">4</strong>
              {' '}
              bookmarks
            </span>
          </div>
          <div className="flex items-center gap-2 dark:text-white">
            <LiaBell className="w-6 h-6 text-sky-500" />
            <span>
              <strong className="font-bold text-black dark:text-white">4</strong>
              {' '}
              followers
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
