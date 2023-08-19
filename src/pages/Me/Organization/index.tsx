import React from 'react';
import Tabs from '@/components/base/Tabs';
import Layout from '@/components/base/Layout';
import OrganizationPostList from '@/pages/Me/Organization/tabs/OrganizationPostList';
import OrganizationDealList from '@/pages/Me/Organization/tabs/OrganizationDealList';

const tabs = [
  {
    title: 'Posts',
    content: <OrganizationPostList />,
  },
  {
    title: 'Deals',
    content: <OrganizationDealList />,
  },
  {
    title: 'Analytics',
    content: <div>Analytics</div>,
  },
  {
    title: 'Members',
    content: <div>Members</div>,
  },
];
export default function MyOrganization() {
  return (
    <Layout>
      <div className="mx-8 pt-32">
        <div className="flex items-center shadow-2xl rounded px-5 py-5 mb-10 bg-white">
          <img
            src="https://picsum.photos/800/800"
            alt=""
            className="w-32 h-32 rounded-full mx-auto"
          />
          <div className="flex-1 mx-5">
            <h5 className="font-semibold text-lg mb-2">PYS Travel</h5>
            <p className="text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex justify-center cursor-pointer w-32 shadow-2xl text-center hover:shadow-xl aspect-square bg-white z-10 rounded-lg">
              <div className="my-auto">
                <span className="font-semibold text-2xl tracking-wider">10</span>
                <p className="mt-2">Sales</p>
              </div>
            </div>

            <div className="flex justify-center cursor-pointer w-32 shadow-2xl text-center hover:shadow-xl aspect-square bg-white z-10 rounded-lg">
              <div className="my-auto">
                <span className="font-semibold text-2xl tracking-wider">10</span>
                <p className="mt-2">Posts</p>
              </div>
            </div>

            <div className="flex justify-center cursor-pointer w-32 shadow-2xl text-center hover:shadow-xl aspect-square bg-white z-10 rounded-lg">
              <div className="my-auto">
                <span className="font-semibold text-2xl tracking-wider">10</span>
                <p className="mt-2">Deals</p>
              </div>
            </div>

            <div className="flex justify-center cursor-pointer w-32 shadow-2xl text-center hover:shadow-xl aspect-square bg-white z-10 rounded-lg">
              <div className="my-auto">
                <span className="font-semibold text-2xl tracking-wider">10</span>
                <p className="mt-2">Followers</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 bg-white rounded">
          <Tabs tabs={tabs} sticky divider={false} itemClassName="w-fit" stickyClassName="top-32 bg-white rounded-t" />
        </div>
      </div>
    </Layout>
  );
}
