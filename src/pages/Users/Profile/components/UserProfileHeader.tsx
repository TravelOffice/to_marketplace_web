import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiPhone } from 'react-icons/fi';
import { useOrganizationByCurrentUser } from '@/hooks/organization';
import { useMarketplaceUser } from '@/hooks/marketplaceUser';
import { generateUserAvatar } from '@/utils/common';

export default function UserProfileHeader() {
  const { userId } = useParams();
  const { data: currentUser } = useMarketplaceUser(decodeURI(userId!), !!userId);
  const { data: organization } = useOrganizationByCurrentUser(currentUser);

  return (
    <div
      className="flex items-center card rounded-lg px-5 py-5 mb-10 shadow-2xl"
    >
      <img
        src={generateUserAvatar(currentUser)}
        alt=""
        className="w-32 h-32 rounded-full mx-auto object-cover"
      />
      <div className="flex-1 mx-5">
        <h5 className="font-semibold text-lg mb-2">{currentUser?.name}</h5>
        <Link
          to="/me/organization"
          className="text-secondary mb-2 hover:underline hover:text-primary dark:text-white transition-colors"
        >
          {organization?.name}
        </Link>
        <p className="text-sm mt-2">
          {currentUser?.description}
        </p>
        <div className="flex items-center italic text-sm">
          <FiPhone className="mr-1" />
          {currentUser?.phoneNumber}
        </div>
      </div>
    </div>
  );
}
