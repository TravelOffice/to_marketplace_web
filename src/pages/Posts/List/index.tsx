import React from 'react';
import Layout from '@/components/Layout';
import Input from '@/components/Input';
import Tabs from '@/components/Tabs';
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
      <div className="container mx-auto pt-24">
        <div className="grid grid-cols-12">
          <div className="col-span-3 border-r-[1px] pe-6">
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
          <div className="col-span-9 ps-6">
            <Tabs tabs={tabs} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
