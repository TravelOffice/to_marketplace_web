import React, { useCallback } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { MarketplaceUser } from '@/models/MarketplaceUser/MarketplaceUser';
import { useEnableMarketplaceUser, useUpdateMarketplaceUserRole } from '@/hooks/marketplaceUser';
import Spinner from '@/components/base/Spinner';
import { useCurrentUser } from '@/hooks/auth';
import { SOMETHING_WRONG, UPDATE_SUCCESS } from '@/utils/constants';

export interface MemberCardProps {
  user: MarketplaceUser,
}

const roleLabels: Record<string, string> = {
  ADMIN: 'Quản trị viên',
  SALE: 'Nhân viên',
};

export default function MemberCard(props: MemberCardProps) {
  const { user } = props;
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [selectedRole, setSelectedRole] = React.useState(user.roles[0]);
  const [enabled, setEnabled] = React.useState(user.enabled);
  const currentUser = useCurrentUser();

  const queryClient = useQueryClient();

  const updateMarketplaceUserRoleMutation = useUpdateMarketplaceUserRole(user.username);

  // TODO: Temporary fix for enable user by concatenating organization name
  const enableUserMutation = useEnableMarketplaceUser(`${currentUser?.organization}#${user.username}`);

  const handleSelectRole = useCallback((role: string) => {
    setSelectedRole(role);
    setShowDropdown(false);
    updateMarketplaceUserRoleMutation.mutate(role);
  }, []);

  const toggleDropdown = useCallback(() => {
    if (updateMarketplaceUserRoleMutation.isLoading) return;
    setShowDropdown(!showDropdown);
  }, [showDropdown, updateMarketplaceUserRoleMutation.isLoading]);

  const handleToggleEnabled = useCallback(() => {
    setEnabled((prev) => !prev);
    enableUserMutation.mutate(!user.enabled, {
      onSuccess: () => {
        toast.success(UPDATE_SUCCESS);
        queryClient.invalidateQueries(['marketplace_users']).then();
      },
      onError: () => {
        toast.error(SOMETHING_WRONG);
      },
    });
  }, []);

  return (
    <div key={user.username} className="flex items-center gap-4 bg-white shadow-lg rounded px-6 py-4 cursor-pointer group/item hover:shadow dark:bg-dark">
      <img src={user.avatar || `https://picsum.photos/seed/${user.createdAt}/800/800`} alt="" className="w-12 h-12 rounded-full" />
      <div className="flex-1">
        <h5 className="font-medium">
          {user.name}
        </h5>
        <div
          className="text-sm text-secondary flex items-center gap-1 relative"
          onClick={toggleDropdown}
        >
          {roleLabels[selectedRole] || 'Khác'}
          {' '}
          <FiChevronDown />
          {
            updateMarketplaceUserRoleMutation.isLoading && <Spinner className="w-3 h-3" />
          }
          {
            showDropdown && (
              <div
                className="absolute z-30 border -translate-x-4 top-full left-0 w-full bg-white shadow-lg rounded mt-2 py-2"
              >
                <div
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b"
                  onClick={() => handleSelectRole('ADMIN')}
                >
                  Quản trị viên
                </div>
                <div
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectRole('SALE')}
                >
                  Nhân viên
                </div>
              </div>
            )
          }
        </div>
      </div>
      {
        enableUserMutation.isLoading && <Spinner className="w-3 h-3" />
      }
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" checked={enabled} className="sr-only peer" onChange={handleToggleEnabled} />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary" />
      </label>
    </div>
  );
}
