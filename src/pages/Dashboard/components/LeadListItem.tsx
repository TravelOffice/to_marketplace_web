import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CreatePostProps } from '@/pages/Posts/Create';
import { Lead } from '@/models/Tour/Lead';
import { useLinkedTargetInfo } from '@/hooks/post';

export interface LeadListItemProps {
  lead: Lead,
}

export default function LeadListItem(props: LeadListItemProps) {
  const navigate = useNavigate();
  const { lead } = props;
  const {
    code,
    name,
    type,
    tourTemplateName,
    description,
    desiredTour,
  } = lead;
  const { data } = useLinkedTargetInfo(encodeURIComponent(`LEAD#${code}`));

  const onCreatePost = () => navigate('/posts/create', {
    state: {
      name: lead.name,
      linkedToTargetCode: lead.code,
      linkedToTargetType: 'LEAD',
      type: 'SELL_PASSENGER',
      description: lead.description,
      maximumPaxToTrade: lead.numberOfAdultPassengers + lead.numberOfChildrenPassengers,
    } as CreatePostProps,
  });

  return (
    <tr key={`lead-${code}`} className="py-3 border-b dark:border-b-gray-700">
      <td className="text-left text-sm py-3 ps-5">{code}</td>
      <td className="text-left text-sm">{name}</td>
      <td className="text-left text-sm">{type}</td>
      <td className="text-left text-sm">{tourTemplateName || desiredTour}</td>
      <td className="text-left text-sm">{description}</td>
      <td className="pe-5 flex">
        {
          data?.isAvailable ? (
            <a
              className="w-full text-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 border-primary border-[1px] px-5 py-2 bg-white my-2 rounded text-primary"
              href={`/posts/${data.postId}`}
              target="_blank"
              rel="noreferrer"
            >
              Đi tới bài viết
            </a>
          ) : (
            <button
              type="button"
              className="w-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300  px-5 py-2 bg-primary my-2 rounded text-white"
              onClick={() => onCreatePost()}
            >
              Tạo
              bài viết
            </button>
          )
        }
      </td>
    </tr>
  );
}
