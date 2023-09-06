import React from 'react';
import { PostComment } from '@/models/TourPost/PostComment';
import { useMarketplaceUser } from '@/hooks/marketplaceUser';
import { generateUserAvatar, useDateDuration } from '@/utils/common';

export interface CommentProps {
  comment: PostComment,
}

export default function Comment(props: CommentProps) {
  const { comment } = props;
  const { data: author } = useMarketplaceUser(comment.authorId);
  return (
    <div className="flex mb-5">
      <div className="flex-shrink-0">
        <img
          src={generateUserAvatar(author)}
          alt=""
          className="w-10 h-10 rounded-full"
        />
      </div>
      <div className="flex-1 ms-5">
        <div className="mb-2">
          <h6 className="font-bold">{author?.name}</h6>
          <span className="text-gray-400 text-xs italic">
            {useDateDuration(comment.createdAt)}
          </span>
        </div>
        <p className="text-sm text-secondary dark:text-white">
          {comment.description}
        </p>
      </div>
    </div>
  );
}
