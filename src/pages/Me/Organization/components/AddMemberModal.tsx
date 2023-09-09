import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import Modal, { ModalProps } from '@/components/base/Modal';
import ModalHeader from '@/components/base/Modal/ModalHeader';
import ModalBody from '@/components/base/Modal/ModalBody';
import AddUsers from '@/components/custom/AddUsers';
import { useAllUsers } from '@/hooks/organization';
import { useAddUsersMutation, useMarketplaceUsers } from '@/hooks/marketplaceUser';
import { UserWithRoles } from '@/models/MarketplaceUser/MarketplaceUser';
import ModalFooter from '@/components/base/Modal/ModalFooter';
import { SOMETHING_WRONG } from '@/utils/constants';
import Spinner from '@/components/base/Spinner';

export default function AddMemberModal(props: ModalProps) {
  const { toggle } = props;
  const queryClient = useQueryClient();
  const [selectedUsers, setSelectedUsers] = React.useState<UserWithRoles[]>([]);
  const { data: allUsers = [], isLoading } = useAllUsers();
  const { data: currentMembers } = useMarketplaceUsers();
  const currentMemberUsernames = useMemo(() => {
    if (!currentMembers) return [];
    return currentMembers.map((member) => member.username);
  }, [currentMembers]);
  const users = useMemo(
    () => {
      if (!currentMembers) return [];
      return allUsers.filter((user) => !currentMemberUsernames.includes(user.username));
    },
    [allUsers, currentMembers],
  );

  const { mutate, isLoading: isCreating } = useAddUsersMutation({
    onSuccess: () => {
      toast.success('Thêm thành viên thành công');
      toggle();
      setSelectedUsers([]);
      queryClient.invalidateQueries(['marketplace_users']).then();
    },
    onError: () => {
      toast.error(SOMETHING_WRONG);
    },
  });

  const handleOnAddUsers = useCallback(() => {
    mutate({ users: selectedUsers });
  }, [selectedUsers]);

  return (
    <Modal {...props}>
      <ModalHeader>Thêm thành viên</ModalHeader>
      <ModalBody>
        <AddUsers
          allUsers={users}
          isLoading={isLoading}
          onUsersChanged={setSelectedUsers}
        />
      </ModalBody>
      <ModalFooter>
        <button
          type="submit"
          onClick={toggle}
          className="text-sm text-secondary hover:text-primary cursor-pointer"
          disabled={isCreating}
        >
          Huỷ
        </button>
        <button
          onClick={handleOnAddUsers}
          type="submit"
          className={classNames('px-5 py-2 rounded ms-4', selectedUsers.length === 0 ? 'bg-gray-200 text-gray-400 dark:bg-gray-500' : 'bg-primary text-white')}
          disabled={selectedUsers.length === 0 || isCreating}
        >
          {
            isCreating && <Spinner className="w-4 h-4 me-2 text-white" />
          }
          Thêm
          {' '}
          {selectedUsers.length}
          {' '}
          thành viên
        </button>
      </ModalFooter>
    </Modal>
  );
}
