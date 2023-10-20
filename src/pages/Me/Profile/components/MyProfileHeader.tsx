import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit3, FiPhone } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { extractFileExtension, generateUserAvatar } from '@/utils/common';
import { useCurrentUser, useUpdateCurrentUser } from '@/hooks/auth';
import UpdateProfileModal from '@/pages/Me/Profile/components/UpdateProfileModal';
import { useOrganization } from '@/hooks/organization';
import { useUpdateUserAvatarMutation } from '@/hooks/marketplaceUser';
import { UPDATE_AVATAR_ERROR, UPDATE_AVATAR_SUCCESS } from '@/utils/constants';
import EditableAvatar from '@/components/custom/EditableAvatar';
import { PresignedUrlType } from '@/models/PresignedUrl';

export default function MyProfileHeader() {
  const [showModal, setShowModal] = useState(false);
  const currentUser = useCurrentUser();
  const { data: organization } = useOrganization(currentUser?.organization!, !!currentUser);
  const updateCurrentUser = useUpdateCurrentUser();

  // Mutation to update user avatar
  const updateAvatarMutation = useUpdateUserAvatarMutation({
    onSuccess: (data) => {
      toast.success(UPDATE_AVATAR_SUCCESS);
      updateCurrentUser({ avatar: data.avatar });
    },
    onError: () => {
      toast.error(UPDATE_AVATAR_ERROR);
    },
  });

  // Handle avatar changed
  const onAvatarChanged = useCallback((avatar: string) => {
    updateAvatarMutation.mutate(avatar);
  }, []);

  return (
    <div
      className="flex items-center card rounded-lg px-5 py-5 mb-10 shadow-2xl"
    >
      <EditableAvatar
        defaultAvatar={generateUserAvatar(currentUser)}
        presignedUrlType={PresignedUrlType.USER_AVATAR}
        onAvatarUploaded={onAvatarChanged}
        generateFilename={(file) => `avatar_${currentUser?.username}-${Date.now()}.${extractFileExtension(file)}`}
      />
      <div className="flex-1 mx-5">
        <div className="flex">
          <h5 className="font-semibold text-lg mb-2">{currentUser?.name}</h5>
          <button
            type="button"
            className="text-primary rounded px-2 py-1 text-sm font-semibold flex gap-3"
            onClick={() => setShowModal(true)}
          >
            <FiEdit3 className="w-5 h-5" />
          </button>
        </div>
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
      {
        !!currentUser && (
          <UpdateProfileModal
            isOpen={showModal}
            toggle={() => setShowModal(!showModal)}
          />
        )
      }
    </div>
  );
}
