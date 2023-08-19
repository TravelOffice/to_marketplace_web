import React from 'react';
import Layout from '@/components/base/Layout';
import Input from '@/components/base/Input';
import Tabs from '@/components/base/Tabs';
import TourList from '@/pages/Posts/List/components/TourList';

const tabs = [
  {
    title: 'Find tours',
    content: <TourList />,
  },
  {
    title: 'Find leads',
    content: <div>Leads</div>,
  },
];
export default function PostList() {
  return (
    <Layout>
      <div className="mx-8 pt-32">
        <div className="grid grid-cols-12 gap-6">
          <div className="sticky top-32 col-span-3 bg-white p-6 h-fit rounded">
            <h6 className="font-bold mb-6">Filter</h6>
            <form>
              <label className="block mb-2 text-sm text-secondary" htmlFor="title">Title</label>
              <Input />

              <label className="block mb-2 text-sm text-secondary" htmlFor="title">Destination</label>
              <Input />

              <label className="block mb-2 text-sm text-secondary" htmlFor="title">Start date</label>
              <Input />
            </form>
          </div>
          <div className="col-span-9 bg-white px-6 pb-6 h-fit rounded">
            <Tabs tabs={tabs} divider={false} sticky stickyClassName="pt-6 top-32 bg-white" />
          </div>
        </div>
      </div>
    </Layout>
  );
}
