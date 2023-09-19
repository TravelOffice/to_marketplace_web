import React from 'react';
import Tabs, { Tab } from '@/components/base/Tabs';
import TourListCard from './TourListCard';
import LeadListCard from './LeadListCard';

const tabs: Tab[] = [
  {
    title: 'ĐĂNG BÀI TÌM TOUR',
    content: <LeadListCard />,
  },
  {
    title: 'ĐĂNG BÀI TÌM KHÁCH',
    // TODO: Add in next PR
    content: <TourListCard />,
  },
];

export default function SharedToursForPosting() {
  return (
    <div className="bg-white dark:bg-[#283046] dark:text-white">
      <Tabs
        tabs={tabs}
        sticky
        divider={false}
        itemClassName="w-fit"
        stickyClassName="top-32 bg-white rounded-t dark:bg-[#283046]"
      />
    </div>
  );
}
