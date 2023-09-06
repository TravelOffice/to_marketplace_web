import React, { useEffect, useState } from 'react';
import { LiaHandshake } from 'react-icons/lia';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { FiArrowRight } from 'react-icons/fi';
import {
  BsBell, BsBookmark, BsFillBellFill, BsFillBookmarkCheckFill,
} from 'react-icons/bs';
import { toast } from 'react-toastify';
import RatingBar from '@/components/base/RatingBar';
import { TourPost } from '@/models/TourPost/TourPost';
import { useDateDuration } from '@/utils/common';
import { useMarketplaceUser } from '@/hooks/marketplaceUser';
import logo from '@/assets/images/logo/horizontal-logo.svg';
import {
  useCreateBookmarkPostMutation,
  useDeleteBookmarkPostMutation,
  useFollowPostMutation,
  useUnfollowPostMutation,
} from '@/hooks/post';
import { SOMETHING_WRONG } from '@/utils/constants';

export interface PostListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  post: TourPost,
  renderAction: (post: TourPost) => React.ReactNode,
}

export default function PostListItem(props: PostListItemProps) {
  const {
    renderAction,
    post,
    ...rest
  } = props;
  const { data: author } = useMarketplaceUser(post?.authorId!, !!post);
  const [isBookmarked, setBookmark] = useState(false);
  const [isFollowed, setFollow] = useState(false);

  useEffect(() => {
    if (post?.isBookmarked !== undefined) {
      setBookmark(post.isBookmarked);
    }
    if (post?.isFollowed !== undefined) {
      setFollow(post.isFollowed);
    }
  }, [post]);

  const createBookmarkPostMutation = useCreateBookmarkPostMutation({
    onSuccess: () => {
      setBookmark(true);
    },
    onError: () => {
      toast.error(SOMETHING_WRONG);
    },
  });
  const deleteBookmarkPostMutation = useDeleteBookmarkPostMutation({
    onSuccess: () => {
      setBookmark(false);
    },
    onError: () => {
      toast.error(SOMETHING_WRONG);
    },
  });
  const followPostMutation = useFollowPostMutation({
    onSuccess: () => {
      setFollow(true);
    },
    onError: () => {
      toast.error(SOMETHING_WRONG);
    },
  });
  const unfollowPostMutation = useUnfollowPostMutation({
    onSuccess: () => {
      setFollow(false);
    },
    onError: () => {
      toast.error(SOMETHING_WRONG);
    },
  });

  return (
    <div
      className="bg-white dark:bg-[#283046] flex w-full py-4 px-6 border-b last:border-b-0 dark:border-gray-700"
      {...rest}
    >
      <div className="h-full w-48">
        <img src={logo} alt="" className="rounded-lg w-48 h-48 mb-2" />
        {renderAction(post)}
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
          {' '}
          <span className="text-gray-400 text-xs italic">
            {useDateDuration(post?.createdAt!)}
          </span>
        </span>
        <div className="mb-2">
          {
            post?.ratingAverage! > 0 && (
              <RatingBar rating={post?.ratingAverage!} />
            )
          }
        </div>
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
          {isBookmarked ? (
            <div className="flex items-center gap-2 dark:text-white">
              <BsFillBookmarkCheckFill className="w-5 h-5 text-sky-500" />
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  deleteBookmarkPostMutation.mutate(post?.code);
                }}
              >
                Bỏ đánh dấu
              </a>
            </div>
          ) : (
            <div className="flex items-center gap-2 dark:text-white">
              <BsBookmark className="w-5 h-5 text-sky-500" />
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  createBookmarkPostMutation.mutate(post?.code);
                }}
              >
                Đánh dấu
              </a>
            </div>
          )}
          {isFollowed ? (
            <div className="flex items-center gap-2 dark:text-white">
              <BsFillBellFill className="w-5 h-5 text-sky-500" />
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  unfollowPostMutation.mutate(post?.code);
                }}
              >
                Bỏ theo dõi
              </a>
            </div>
          ) : (
            <div className="flex items-center gap-2 dark:text-white">
              <BsBell className="w-5 h-5 text-sky-500" />
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  followPostMutation.mutate(post?.code);
                }}
              >
                Theo dõi
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
