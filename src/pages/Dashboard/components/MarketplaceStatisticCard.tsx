import React from 'react';
import { BsFilePost } from 'react-icons/bs';
import { GoOrganization } from 'react-icons/go';
import { LiaHandshake } from 'react-icons/lia';
import { useStatistic } from '@/hooks/statistic';

export default function MarketplaceStatisticCard() {
  const { data: marketplaceStatistic } = useStatistic();
  return marketplaceStatistic
    ? (
      <div className="col-span-2 card shadow-lg rounded relative">
        <h3 className="font-medium">Travel Connect</h3>
        <div className="flex justify-between h-full">
          <div className="flex items-center">
            <GoOrganization className="text-4xl text-sky-600" />
            <div className="flex flex-col ms-3">
              <p className="text-2xl font-semibold">
                {marketplaceStatistic.totalOrganizations}
                +
              </p>
              <p className="text-sm text-gray-500">Công ty</p>
            </div>
          </div>
          <div className="flex items-center">
            <BsFilePost className="text-4xl text-primary" />
            <div className="flex flex-col ms-3">
              <p className="text-2xl font-semibold">
                {marketplaceStatistic.totalPosts}
                +
              </p>
              <p className="text-sm text-gray-500">Bài ghép tour</p>
            </div>
          </div>
          <div className="flex items-center">
            <LiaHandshake className="text-4xl text-green-600" />
            <div className="flex flex-col ms-3">
              <p className="text-2xl font-semibold">
                {marketplaceStatistic.totalOffers}
                +
              </p>
              <p className="text-sm text-gray-500">Yêu cầu ghép tour</p>
            </div>
          </div>
        </div>
      </div>
    )
    : (
      <div role="status" className="col-span-2 card shadow-lg rounded relative animate-pulse">
        <h3 className="font-medium">Travel Connect</h3>
        <div className="flex justify-between h-full">
          <div className="flex items-center">
            <GoOrganization className="text-4xl text-sky-600" />
            <div className="flex flex-col ms-3">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
            </div>
          </div>
          <div className="flex items-center">
            <BsFilePost className="text-4xl text-primary" />
            <div className="flex flex-col ms-3">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
            </div>
          </div>
          <div className="flex items-center">
            <LiaHandshake className="text-4xl text-green-600" />
            <div className="flex flex-col ms-3">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
            </div>
          </div>
        </div>
      </div>
    );
}
