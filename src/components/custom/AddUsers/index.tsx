import React, { useCallback, useEffect, useMemo } from 'react';
import Select from 'react-select';
import Spinner from '@/components/base/Spinner';
import { User } from '@/models/User/User';
import { UserWithRoles } from '@/models/MarketplaceUser/MarketplaceUser';
import { useCurrentUser } from '@/hooks/auth';

export interface AddUsersProps {
  allUsers: User[],
  isLoading: boolean,
  onUsersChanged: (users: UserWithRoles[]) => void,
}

const roleOptions = [
  { value: 'ADMIN', label: 'Quản trị viên' },
  { value: 'SALE', label: 'Nhân viên' },
];

type UserRoles = {
  [key: string]: string, // username: role
};

export default function AddUsers(props: AddUsersProps) {
  const { allUsers, isLoading, onUsersChanged } = props;
  const currentUser = useCurrentUser();
  const [query, setQuery] = React.useState('');
  const [selectedUsers, setSelectedUsers] = React.useState<User[]>([]);
  const [userRoles, setUserRoles] = React.useState<UserRoles>({});

  useEffect(() => {
    if (allUsers.length === 0) return;
    const newUserRoles: UserRoles = {};
    allUsers.forEach((user) => {
      newUserRoles[user.username] = 'SALE';
    });
    setUserRoles(newUserRoles);
  }, [allUsers]);

  useEffect(() => {
    onUsersChanged(selectedUsers.map((user) => ({
      ...user,
      tenant: currentUser?.organization,
      roles: [userRoles[user.username]],
    })));
  }, [userRoles, selectedUsers, currentUser]);

  const isAllSelected = useMemo(
    () => allUsers.length === selectedUsers.length,
    [allUsers, selectedUsers],
  );

  const filteredUsers = useMemo(() => {
    if (!query) return allUsers;
    return allUsers.filter((user) => `${user.lastName} ${user.firstName}`.toLowerCase().includes(query.toLowerCase()));
  }, [allUsers, query]);

  const onToggleSelect = useCallback((user: User) => {
    if (selectedUsers.includes(user)) {
      setSelectedUsers(selectedUsers.filter((u) => u !== user));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  }, [selectedUsers]);

  const selectAll = useCallback(() => {
    if (isAllSelected) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(allUsers);
    }
  }, [allUsers, isAllSelected]);

  return (
    <div>
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
    </div>
  );
}
