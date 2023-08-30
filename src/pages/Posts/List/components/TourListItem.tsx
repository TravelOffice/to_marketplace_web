import React from 'react';
import { LiaBell, LiaBookmarkSolid, LiaHandshake } from 'react-icons/lia';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { FiArrowRight } from 'react-icons/fi';
import RatingBar from '@/components/base/RatingBar';
import { TourPost } from '@/models/TourPost/TourPost';
import { useCurrentUser } from '@/hooks/auth';
import { useDateDuration } from '@/utils/common.tsx';
import { useMarketplaceUser } from '@/hooks/marketplaceUser.ts';

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
  const { data: author } = useMarketplaceUser(post?.authorId!, !!post);
  const onEditPost = () => {
    navigate(`/posts/${post?.code}`);
  };
  return (
    <div
      className="bg-white dark:bg-[#283046] flex w-full py-4 px-6 border-b last:border-b-0 dark:border-gray-700"
      {...rest}
    >
      <div className="h-full w-48">
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
      <div className="flex flex-col flex-1 text-left ps-5 break-words overflow-hidden">
        <Link to={`/posts/${post.code}`} className="font-bold text-lg">{post.name}</Link>
        <span className="text-sm font-light text-secondary dark:text-white mb-2">
          <Link
            to={`/users/${author?.id}`}
            className="font-semibold text-primary"
          >
            {author?.name}
          </Link>
          ,
          {' '}
          <span className="font-semibold">
            {useDateDuration(post?.createdAt!)}
            {' '}
            trước
          </span>
        </span>
        {
          post?.ratingAverage! > 0 && (
            <RatingBar rating={post?.ratingAverage!} />
          )
        }
        <p
          className="flex-1 text-sm text-gray-500 mb-2 text-justify dark:text-white whitespace-pre-wrap"
        >
          <span className="text-ellipsis line-clamp-[13]">
            {post.description}
          </span>
          <Link to={`/posts/${post.code}`} className="text-primary flex items-center">
            Xem chi tiết
            {' '}
            <FiArrowRight />
          </Link>
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
              Bookmark
            </span>
          </div>
          <div className="flex items-center gap-2 dark:text-white">
            <LiaBell className="w-6 h-6 text-sky-500" />
            <span>
              Theo dõi
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
