import React, { useMemo } from 'react';
import Tabs from '@/components/base/Tabs';
import Layout from '@/components/base/Layout';
import MyOrganizationPostList from '@/pages/Me/Organization/tabs/MyOrganizationPostList';
import OrganizationMembers from '@/pages/Me/Organization/tabs/OrganizationMembers';
import ReceivedOfferListOfOrganization
  from '@/pages/Me/Organization/tabs/ReceivedOfferListOfOrganization';
import SentOfferListOfOrganization from '@/pages/Me/Organization/tabs/SentOfferListOfOrganization';
import { ROLES } from '@/utils/constants';
import { hasAnyRole } from '@/utils/auth';
import MyOrganizationProfileHeader
  from '@/pages/Me/Organization/components/MyOrganizationProfileHeader';
import { useCurrentUser } from '@/hooks/auth';

const tabs = [
  {
    title: 'Bài đăng',
    content: <MyOrganizationPostList />,
  },
  {
    title: 'Yêu cầu nhận được',
    content: <ReceivedOfferListOfOrganization />,
  },
  {
    title: 'Yêu cầu gửi đi',
    content: <SentOfferListOfOrganization />,
  },
  {
    title: 'Thành viên',
    content: <OrganizationMembers />,
    requiredRoles: [ROLES.ADMIN],
  },
];

export default function MyOrganization() {
  const currentUser = useCurrentUser();

  const renderedTabs = useMemo(() => tabs.filter((tab) => {
    if (!tab.requiredRoles) return true;
    if (!currentUser) return false;
    return hasAnyRole(currentUser, tab.requiredRoles);
  }), [currentUser]);

  return (
    <Layout>
      <div className="mx-8 pt-32 mt-1">
        <MyOrganizationProfileHeader />
        <div className="mt-10 bg-white rounded dark:bg-[#283046] dark:text-white">
          <Tabs
            tabs={renderedTabs}
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
