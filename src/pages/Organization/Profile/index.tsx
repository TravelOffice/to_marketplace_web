import React from 'react';
import Tabs from '@/components/base/Tabs';
import Layout from '@/components/base/Layout';
import OrganizationPostList from '@/pages/Organization/Profile/tabs/OrganizationPostList';
import OrganizationProfileHeader
  from '@/pages/Organization/Profile/components/OrganizationProfileHeader';

const tabs = [
  {
    title: 'Bài đăng',
    content: <OrganizationPostList />,
  },
  {
    title: 'Đánh giá',
    content: <p>Comming soon</p>,
  },
];

export default function OrganizationProfile() {
  return (
    <Layout>
      <div className="mx-8 pt-32 mt-1">
        <OrganizationProfileHeader />
        <div className="mt-10 bg-white rounded dark:bg-[#283046] dark:text-white">
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
