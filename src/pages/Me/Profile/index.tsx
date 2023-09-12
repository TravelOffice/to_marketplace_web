import React from 'react';
import Layout from '@/components/base/Layout';
import Tabs, { Tab } from '@/components/base/Tabs';
import MyPostList from '@/pages/Me/Profile/tabs/MyPostList';
import MyBookmarkedPostList from '@/pages/Me/Profile/tabs/MyBookmarkedPostList';
import MyFollowPostList from '@/pages/Me/Profile/tabs/MyFollowPostList';
import MyReceivedOfferList from '@/pages/Me/Profile/tabs/MyReceivedOfferList';
import ProfileHeader from '@/pages/Me/Profile/components/ProfileHeader';
import MySentOfferList from './tabs/MySentOfferList';

const tabs: Tab[] = [
  {
    title: 'Bài đăng của tôi',
    content: <MyPostList />,
  },
  {
    title: 'Bài đăng đã ghim',
    content: <MyBookmarkedPostList />,
  },
  {
    title: 'Bài đăng đang theo dõi',
    content: <MyFollowPostList />,
  },
  {
    title: 'Yêu cầu nhận được',
    content: <MyReceivedOfferList />,
  },
  {
    title: 'Yêu cầu gửi đi',
    content: <MySentOfferList />,
  },
];

export default function Profile() {
  return (
    <Layout>
      <div className="mx-8 pt-32">
        <ProfileHeader />
        <div className="bg-white dark:bg-[#283046] dark:text-white mt-10">
          <Tabs
            tabs={tabs}
            sticky
            divider={false}
            itemClassName="w-fit"
            stickyClassName="top-32 bg-white rounded-t dark:bg-[#283046]"
          />
        </div>
      </div>
    </Layout>
  );
}
