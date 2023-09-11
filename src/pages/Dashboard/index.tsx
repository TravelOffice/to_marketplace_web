import React from 'react';
import Layout from '@/components/base/Layout';
import socialUpdate from '@/assets/images/illustrator/social-update.svg';
import LeadListCard from '@/pages/Dashboard/components/LeadListCard';
import TourListCard from '@/pages/Dashboard/components/TourListCard';
import TopCommission from '@/pages/Dashboard/components/TopCommission';
import MarketplaceStatisticCard from './components/MarketplaceStatisticCard';
import { Link } from 'react-router-dom';
import { useCurrentOrganizationStatistic } from '@/hooks/statistic';
import { useCurrentUser } from '@/hooks/auth';

export default function Dashboard() {
  const orgStatistic = useCurrentOrganizationStatistic();
  const currentUser = useCurrentUser();
  return (
    <Layout>
      <div className="mx-8 pt-32">
        <div className="grid grid-cols-4 gap-8">
          <div
            className={`col-span-2 card shadow-lg rounded relative ${orgStatistic ? '' : 'animate-pulse'}`}
          >
            <img src={socialUpdate} alt="" className="absolute top-0 right-0 h-full bottom-0 py-8" />
            <h3 className="leading-6 font-medium text-gray-900 dark:text-white">
              Chào ngày mới 🎉 {currentUser?.organization.toUpperCase()}!
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Chúc bạn ngày mới vui vẻ</p>
            {
              orgStatistic ? (
                <div>
                  <div className="mt-5">
                    <p>
                      <span className="text-primary font-semibold text-2xl">{orgStatistic.totalPosts}</span>
                      {' '}
                      bài viết đã đăng
                    </p>
                  </div>
                  <Link to={'/posts'} >
                    <button type="button" className="mt-3 px-5 py-2 bg-primary text-white font-semibold rounded">
                      Khám phá ngay
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="mt-5">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-56 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded dark:bg-gray-700 w-48 mb-2"></div>
                </div>
              )
            }
          </div>
          <MarketplaceStatisticCard />
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
