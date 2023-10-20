import React from 'react';
import { Link } from 'react-router-dom';
import { IoNotificationsOutline } from 'react-icons/io5';
import socialUpdate from '@/assets/images/illustrator/social-update.svg';
import Layout from '@/components/base/Layout';
import { useCurrentUser } from '@/hooks/auth';
import { useCurrentOrganizationStatistic } from '@/hooks/statistic';
import TopCommission from '@/pages/Dashboard/components/TopCommission';
import { requestPermission } from '@/firebase';
import MarketplaceStatisticCard from './components/MarketplaceStatisticCard';
import SharedToursForPosting from './components/SharedToursForPosting';

export default function Dashboard() {
  const orgStatistic = useCurrentOrganizationStatistic();
  const currentUser = useCurrentUser();
  const [
    showAlertNotificationPermission,
    setShowAlertNotificationPermission,
  ] = React.useState(Notification.permission === 'default');

  const handleOnCloseAlertNotificationPermission = React.useCallback(() => {
    setShowAlertNotificationPermission(false);
    requestPermission();
  }, [setShowAlertNotificationPermission]);

  return (
    <Layout>
      <div className="mx-8 pt-32 gap-8">
        {
          showAlertNotificationPermission && (
            <div className="flex items-center px-6 py-3 bg-primary rounded mb-4 text-white text-sm">
              <IoNotificationsOutline className="h-6 w-6 me-4" />
              <span className="flex-1">
                Để nhận thông báo về các bài viết mới nhất, hãy bật thông báo
                trên trình duyệt của bạn
              </span>
              <button
                type="button"
                className="me-3 hover:underline"
                onClick={handleOnCloseAlertNotificationPermission}
              >
                Đồng ý
              </button>
            </div>
          )
        }

        <div className="grid grid-cols-4 gap-8">
          <div
            className={`col-span-2 card shadow-lg rounded relative ${orgStatistic ? '' : 'animate-pulse'}`}
          >
            <img src={socialUpdate} alt="" className="absolute top-0 right-0 h-full bottom-0 py-8" />
            <h3 className="leading-6 font-medium text-gray-900 dark:text-white">
              Chào ngày mới 🎉
              {' '}
              {currentUser?.organization.toUpperCase()}
              !
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Chúc bạn ngày mới vui vẻ</p>
            {
              orgStatistic ? (
                <div>
                  <div className="mt-5">
                    <p>
                      <span
                        className="text-primary font-semibold text-2xl"
                      >
                        {orgStatistic.totalPosts}
                      </span>
                      {' '}
                      bài viết đã đăng
                    </p>
                  </div>
                  <Link to="/posts">
                    <button
                      type="button"
                      className="mt-3 px-5 py-2 bg-primary text-white font-semibold rounded"
                    >
                      Khám phá ngay
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="mt-5">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-56 mb-2" />
                  <div className="h-8 bg-gray-200 rounded dark:bg-gray-700 w-48 mb-2" />
                </div>
              )
            }
          </div>
          <MarketplaceStatisticCard />
        </div>
        <div className="flex flex-col my-8 gap-8">
          <SharedToursForPosting />
          <TopCommission />
        </div>
      </div>
    </Layout>
  );
}
