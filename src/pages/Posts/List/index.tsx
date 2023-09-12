import React from 'react';
import Layout from '@/components/base/Layout';
import Input from '@/components/base/Input';
import Tabs from '@/components/base/Tabs';
import { TourPostType } from '@/models/TourPost/TourPostType';
import TourList from './components/TourList';

const tabs = [
  {
    title: 'Tìm tour',
    content: <TourList postType={TourPostType.SELL_PASSENGER} />,
  },
  {
    title: 'Tìm khách',
    content: <TourList postType={TourPostType.BUY_PASSENGER} />,
  },
];

export default function PostList() {
  return (
    <Layout>
      <div className="mx-8 pt-32">
        <div className="grid grid-cols-12 gap-6">
          <div className="card sticky top-32 col-span-3 h-fit">
            <h6 className="font-bold mb-6">Lọc bài đăng</h6>
            <form>
              <label className="block mb-2 text-sm text-secondary dark:text-white" htmlFor="title">
                Tiêu
                đề
              </label>
              <Input />

              <label className="block mb-2 text-sm text-secondary dark:text-white" htmlFor="title">
                Điểm
                đến
              </label>
              <Input />

              <label className="block mb-2 text-sm text-secondary dark:text-white" htmlFor="title">
                Ngày khởi
                hành
              </label>
              <Input />
            </form>
          </div>
          <div className="col-span-9 h-fit bg-white dark:bg-[#283046] dark:text-white">
            <Tabs
              tabs={tabs}
              divider={false}
              sticky
              stickyClassName="pt-6 top-32 bg-white dark:bg-[#283046]"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
