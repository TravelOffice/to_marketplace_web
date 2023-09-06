import React, { useCallback, useEffect, useMemo } from 'react';
import Select from 'react-select';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { useAllUsers } from '@/hooks/organization';
import Spinner from '@/components/base/Spinner';
import { User } from '@/models/User/User';
import { useAddUsersMutation } from '@/hooks/marketplaceUser';
import { useCurrentUser } from '@/hooks/auth';
import { SOMETHING_WRONG } from '@/utils/constants';

export interface OnboardingAddUsersProps {
  onNext: () => void,
}

const roleOptions = [
  { value: 'ADMIN', label: 'Quản trị viên' },
  { value: 'SALE', label: 'Nhân viên' },
];

type UserRoles = {
  [key: string]: string, // username: role
};

export default function OnboardingAddUsers(props: OnboardingAddUsersProps) {
  const { onNext } = props;
  const currentUser = useCurrentUser();

  const { data: allUsers = [], isLoading } = useAllUsers();
  const [selectedUsers, setSelectedUsers] = React.useState<User[]>([]);
  const [query, setQuery] = React.useState('');
  const [userRoles, setUserRoles] = React.useState<UserRoles>({});

  const isAllSelected = useMemo(
    () => allUsers.length === selectedUsers.length,
    [allUsers, selectedUsers],
  );

  useEffect(() => {
    if (allUsers.length === 0) return;
    const newUserRoles: UserRoles = {};
    allUsers.forEach((user) => {
      newUserRoles[user.username] = 'SALE';
    });
    setUserRoles(newUserRoles);
  }, [allUsers]);

  const selectAll = useCallback(() => {
    if (isAllSelected) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(allUsers);
    }
  }, [allUsers, isAllSelected]);

  const onToggleSelect = useCallback((user: User) => {
    if (selectedUsers.includes(user)) {
      setSelectedUsers(selectedUsers.filter((u) => u !== user));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  }, [selectedUsers]);

  const filteredUsers = useMemo(() => {
    if (!query) return allUsers;
    return allUsers.filter((user) => `${user.lastName} ${user.firstName}`.toLowerCase().includes(query.toLowerCase()));
  }, [allUsers, query]);

  const addUsersMutation = useAddUsersMutation({
    onSuccess: () => {
      onNext();
    },
    onError: () => {
      toast.error(SOMETHING_WRONG);
    },
  });

  const handleOnAddUsers = useCallback(() => {
    addUsersMutation.mutate({
      users: selectedUsers.map((user) => ({
        ...user,
        tenant: currentUser?.organization,
        roles: [userRoles[user.username]],
      })),
    });
  }, [selectedUsers]);

  return (
    <div className="bg-white max-w-3xl mx-auto max-h-3/4 mt-10 p-6 rounded-lg shadow-lg dark:bg-[#283046] dark:text-white">
      <h5 className="font-bold text-lg mb-6">Thêm thành viên</h5>
      <div className="flex items-center gap-4 py-4 pe-5 border-b dark:border-b-gray-700 justify-between">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => selectAll()}>
          <input checked={isAllSelected} type="checkbox" className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded " title="Chọn" />
          <span>Chọn tất cả</span>
        </div>
        <div>
          <input
            placeholder="Tìm kiếm"
            className="px-5 py-2 border rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none dark:bg-[#283046] dark:text-white dark:border-gray-700"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="max-h-[50vh] overflow-y-auto">
        {
          isLoading && (
            <div className="text-center">
              <Spinner />
            </div>
          )
        }
        {
          filteredUsers.map((user) => (
            <div key={user.username} className="flex items-center gap-4 py-4 pe-5 border-b dark:border-b-gray-700">
              <input
                type="checkbox"
                className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded"
                checked={selectedUsers.includes(user)}
                onChange={() => onToggleSelect(user)}
              />
              <img
                src={user.avatar || `https://ui-avatars.com/api/?name=${user.firstName}&background=random&length=1&rounded=true`}
                alt=""
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <h6 className="font-semibold">
                  {user.lastName}
                  {' '}
                  {user.firstName}
                </h6>
                <p className="text-sm text-secondary">{user.email}</p>
              </div>
              <Select
                options={roleOptions}
                defaultValue={roleOptions[1]}
                classNamePrefix="react-select"
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary25: 'rgba(253,146,34,0.05)',
                    primary: '#FD9222',
                  },
                })}
                classNames={{
                  control: (state) => (state.isFocused ? 'border-primary ring-1 ring-primary dark:bg-dark' : 'border-gray-300 dark:bg-black'),
                  option: (state) => (state.isFocused ? 'bg-primary text-white' : ''),
                  menu: () => 'bg-white dark:bg-dark',
                }}
                onChange={(option) => {
                  setUserRoles({
                    ...userRoles,
                    [user.username]: option?.value || 'member',
                  });
                }}
              />
            </div>
          ))
        }
      </div>
      <div className="flex justify-end mt-10">
        <button
          type="submit"
          onClick={onNext}
          className="text-sm text-secondary hover:text-primary cursor-pointer"
        >
          Bỏ qua
        </button>
        <button
          onClick={handleOnAddUsers}
          type="submit"
          className={classNames('px-5 py-2 rounded ms-4', selectedUsers.length === 0 ? 'bg-gray-200 text-gray-400 dark:bg-gray-500' : 'bg-primary text-white')}
          disabled={selectedUsers.length === 0}
        >
          Thêm
          {' '}
          {selectedUsers.length}
          {' '}
          thành viên
        </button>
      </div>
    </div>
  );
}
