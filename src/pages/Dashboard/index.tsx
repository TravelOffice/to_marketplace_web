import React from 'react';
import { BsFilePost } from 'react-icons/bs';
import { LiaHandshake } from 'react-icons/lia';
import { GoOrganization } from 'react-icons/go';
import Layout from '@/components/base/Layout';
import socialUpdate from '@/assets/images/illustrator/social-update.svg';
import LeadListCard from '@/pages/Dashboard/components/LeadListCard.tsx';
import TourListCard from '@/pages/Dashboard/components/TourListCard.tsx';
import TopCommission from '@/pages/Dashboard/components/TopCommission.tsx';

export default function Dashboard() {
  return (
    <Layout>
      <div className="mx-8 pt-32">
        <div className="grid grid-cols-4 gap-8">
          <div className="col-span-2 card shadow-lg rounded relative">
            <img src={socialUpdate} alt="" className="absolute top-0 right-0 h-full bottom-0 py-8" />
            <h3 className="leading-6 font-medium text-gray-900">Chào ngày mới 🎉 John!</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Chúc bạn ngày mới vui vẻ</p>
            <div className="mt-5">
              <p>
                <span className="text-primary font-semibold text-2xl">100</span>
                {' '}
                bài viết ngày hôm nay
              </p>
            </div>
            <button type="button" className="mt-3 px-5 py-2 bg-primary text-white font-semibold rounded">
              Khám phá ngay
            </button>
          </div>
          <div className="col-span-2 card shadow-lg rounded relative">
            <h3 className="font-medium">Hôm nay có</h3>
            <div className="flex justify-between h-full">
              <div className="flex items-center">
                <GoOrganization className="text-4xl text-sky-600" />
                <div className="flex flex-col ms-3">
                  <p className="text-2xl font-semibold">100+</p>
                  <p className="text-sm text-gray-500">Công ty</p>
                </div>
              </div>
              <div className="flex items-center">
                <BsFilePost className="text-4xl text-primary" />
                <div className="flex flex-col ms-3">
                  <p className="text-2xl font-semibold">1000+</p>
                  <p className="text-sm text-gray-500">Bài viết</p>
                </div>
              </div>
              <div className="flex items-center">
                <LiaHandshake className="text-4xl text-green-600" />
                <div className="flex flex-col ms-3">
                  <p className="text-2xl font-semibold">1000+</p>
                  <p className="text-sm text-gray-500">Chốt đơn</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-8 my-8">
          <TourListCard />
          <LeadListCard />
        </div>
        <TopCommission />
      </div>
    </Layout>
  );
}
