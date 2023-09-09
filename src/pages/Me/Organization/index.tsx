import React from 'react';
import Tabs from '@/components/base/Tabs';
import Layout from '@/components/base/Layout';
import OrganizationPostList from '@/pages/Me/Organization/tabs/OrganizationPostList';
import { useOrganizationByCurrentUser, useOrganizationStatistic } from '@/hooks/organization';
import { useCurrentUser } from '@/hooks/auth';
import ReceivedOfferListOfOrg from '@/pages/Me/Organization/tabs/ReceivedOfferListOfOrg';
import SentOfferListOfOrg from '@/pages/Me/Organization/tabs/SentOfferListOfOrg';
import OrganizationMembers from '@/pages/Me/Organization/tabs/OrganizationMembers';

const tabs = [
  {
    title: 'Bài đăng',
    content: <OrganizationPostList />,
  },
  {
    title: 'Yêu cầu nhận được',
    content: <ReceivedOfferListOfOrg />,
  },
  {
    title: 'Yêu cầu gửi đi',
    content: <SentOfferListOfOrg />,
  },
  {
    title: 'Thành viên',
    content: <OrganizationMembers />,
  },
];
export default function MyOrganization() {
  const currentUser = useCurrentUser();
  const { data } = useOrganizationByCurrentUser(currentUser);
  const { data: statistic } = useOrganizationStatistic(data?.name!, !!data);
  return (
    <Layout>
      <div className="mx-8 pt-32 mt-1">
        <div className="card flex items-center shadow-2xl rounded px-5 py-5 mb-10">
          <img
            src="https://picsum.photos/800/800"
            alt=""
            className="w-32 h-32 rounded-full mx-auto"
          />
          <div className="flex-1 mx-5">
            <h5 className="font-semibold text-lg mb-2">{data?.name}</h5>
            <p className="text-sm">
              {data?.website}
            </p>
          </div>
          <div className="flex items-center gap-5">
            <div
              className="card flex justify-center cursor-pointer w-32 shadow-2xl text-center hover:shadow-xl aspect-square z-10"
            >
              <div className="my-auto">
                <span className="font-semibold text-2xl tracking-wider">
                  {
                    statistic?.totalPosts
                  }
                </span>
                <p className="mt-2">Posts</p>
              </div>
            </div>

            <div
              className="card flex justify-center cursor-pointer w-32 shadow-2xl text-center hover:shadow-xl aspect-square z-10"
            >
              <div className="my-auto">
                <span
                  className="font-semibold text-2xl tracking-wider"
                >
                  {statistic?.totalOffers}
                </span>
                <p className="mt-2">Offers</p>
              </div>
            </div>

            <div
              className="card flex justify-center cursor-pointer w-32 shadow-2xl text-center hover:shadow-xl aspect-square z-10"
            >
              <div className="my-auto">
                <span className="font-semibold text-2xl tracking-wider">
                  {
                    statistic?.totalSuccessOffers
                  }
                </span>
                <p className="mt-2">Success</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 bg-white rounded dark:bg-[#283046] dark:text-white">
          <Tabs
            tabs={tabs}
            sticky
            divider={false}
            itemClassName="w-fit"
            stickyClassName="top-32 bg-white rounded-t dark:bg-[#283046] z-20"
          />
        </div>
      </div>
    </Layout>
  );
}
