import React, { useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import Tabs from '@/components/base/Tabs';
import Layout from '@/components/base/Layout';
import OrganizationPostList from '@/pages/Me/Organization/tabs/OrganizationPostList';
import {
  useOrganizationByCurrentUser,
  useOrganizationStatistic,
  useUpdateOrgProfilePictureMutation,
} from '@/hooks/organization';
import { useCurrentUser } from '@/hooks/auth';
import OrganizationMembers from '@/pages/Me/Organization/tabs/OrganizationMembers';
import ReceivedOfferListOfOrganization
  from '@/pages/Me/Organization/tabs/ReceivedOfferListOfOrganization';
import SentOfferListOfOrganization from '@/pages/Me/Organization/tabs/SentOfferListOfOrganization';
import EditableAvatar from '@/components/custom/EditableAvatar';
import { extractFileExtension } from '@/utils/common';
import { ROLES, SOMETHING_WRONG, UPDATE_SUCCESS } from '@/utils/constants';
import { PresignedUrlType } from '@/models/PresignedUrl';
import { hasAnyRole, hasRole } from '@/utils/auth';

const tabs = [
  {
    title: 'Bài đăng',
    content: <OrganizationPostList />,
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
  const { data: organization } = useOrganizationByCurrentUser(currentUser);
  const { data: statistic } = useOrganizationStatistic(currentUser?.organization!, !!currentUser);
  // Mutation to update organization profile picture
  const updateProfileMutation = useUpdateOrgProfilePictureMutation(organization?.code!, {
    onSuccess: () => {
      toast.success(UPDATE_SUCCESS);
    },
    onError: () => {
      toast.error(SOMETHING_WRONG);
    },
  });

  const renderedTabs = useMemo(() => tabs.filter((tab) => {
    if (!tab.requiredRoles) return true;
    if (!currentUser) return false;
    return hasAnyRole(currentUser, tab.requiredRoles);
  }), [currentUser]);

  // Handle avatar changed
  const onProfilePictureChange = useCallback((image: string) => {
    updateProfileMutation.mutate(image);
  }, []);

  return (
    <Layout>
      <div className="mx-8 pt-32 mt-1">
        <div className="card flex items-center shadow-2xl rounded px-5 py-5 mb-10">
          {
            organization?.profilePicture ? (
              <EditableAvatar
                defaultAvatar={organization.profilePicture}
                presignedUrlType={PresignedUrlType.ORG_PROFILE_PICTURE}
                onAvatarUploaded={onProfilePictureChange}
                generateFilename={(file) => `profile_${organization.code}-${Date.now()}.${extractFileExtension(file)}`}
                editable={currentUser && hasRole(currentUser, ROLES.ADMIN)}
              />
            ) : null
          }
          <div className="flex-1 mx-5">
            <h5 className="font-semibold text-lg mb-2">{organization?.name}</h5>
            <p className="text-sm">
              {organization?.website}
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
