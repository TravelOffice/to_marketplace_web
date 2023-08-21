import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/base/Layout';
import Tabs, { Tab } from '@/components/base/Tabs';
import MyPostList from '@/pages/Me/Profile/tabs/MyPostList';

const tabs: Tab[] = [
  {
    title: 'My posts',
    content: <MyPostList />,
  },
  {
    title: 'My received offers',
    content: <div>Offers</div>,
  },
];

export default function Profile() {
  return (
    <Layout>
      <div className="mx-8 pt-32">
        <div
          className="flex items-center card rounded-lg px-5 py-5 mb-10 shadow-2xl"
        >
          <img
            src="https://picsum.photos/800/800"
            alt=""
            className="w-32 h-32 rounded-full mx-auto"
          />
          <div className="flex-1 mx-5">
            <h5 className="font-semibold text-lg mb-2">Nguyen Tuan Anh</h5>
            <Link to="/me/organization" className="italic text-secondary mb-4">PYS Travel</Link>
            <p className="text-sm mt-4">
              Lorem Ipsum is simply dummy text of the printing and
              typesetting industry
            </p>
          </div>
          <div className="flex items-center gap-5">
            <div
              className="card flex justify-center cursor-pointer w-32 shadow-2xl text-center hover:shadow-xl aspect-square z-10"
            >
              <div className="my-auto">
                <span className="font-semibold text-2xl tracking-wider">10</span>
                <p className="mt-2">Posts</p>
              </div>
            </div>

            <div
              className="card flex justify-center cursor-pointer w-32 shadow-2xl text-center hover:shadow-xl aspect-square z-10"
            >
              <div className="my-auto">
                <span className="font-semibold text-2xl tracking-wider">10</span>
                <p className="mt-2">Deals</p>
              </div>
            </div>

            <div
              className="card flex justify-center cursor-pointer w-32 shadow-2xl text-center hover:shadow-xl aspect-square z-10"
            >
              <div className="my-auto">
                <span className="font-semibold text-2xl tracking-wider">10</span>
                <p className="mt-2">Followers</p>
              </div>
            </div>
          </div>
        </div>

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
