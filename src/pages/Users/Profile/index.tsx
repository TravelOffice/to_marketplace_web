import React from 'react';
import Layout from '@/components/base/Layout';
import Tabs, { Tab } from '@/components/base/Tabs';
import PostListOfUser from '@/pages/Users/Profile/tabs/PostListOfUser';
import UserProfileHeader from '@/pages/Users/Profile/components/UserProfileHeader';

const tabs: Tab[] = [
  {
    title: 'Bài đăng',
    content: <PostListOfUser />,
  },
];

export default function Profile() {
  return (
    <Layout>
      <div className="mx-8 pt-32">
        <UserProfileHeader />
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
