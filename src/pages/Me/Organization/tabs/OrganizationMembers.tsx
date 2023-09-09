import React from 'react';
import Select from 'react-select';
import { useMarketplaceUsers } from '@/hooks/marketplaceUser';
import Spinner from '@/components/base/Spinner';
import MemberCard from '@/pages/Me/Organization/components/MemberCard';
import AddMemberModal from '@/pages/Me/Organization/components/AddMemberModal';

const roleOptions = [
  { value: 'ALL', label: 'Tất cả' },
  { value: 'ADMIN', label: 'Quản trị viên' },
  { value: 'SALE', label: 'Nhân viên' },
];

export default function OrganizationMembers() {
  const { data: allUsers = [], isLoading } = useMarketplaceUsers();
  const [query, setQuery] = React.useState('');
  const [selectedRole, setSelectedRole] = React.useState(roleOptions[0].value);
  const [showAddMemberModal, setShowAddMemberModal] = React.useState(false);

  const filteredUsers = React.useMemo(() => allUsers.filter((user) => {
    if (query) {
      return `${user.name}`.toLowerCase().includes(query.toLowerCase());
    }
    if (selectedRole !== 'ALL') {
      return user.roles.includes(selectedRole);
    }
    return true;
  }), [allUsers, query, selectedRole]);

  if (isLoading) {
    return (
      <div className="flex justify-center p-6">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="flex flex-col p-4 gap-4">
      <div className="w-full flex gap-4 justify-end">
        <input
          placeholder="Tìm kiếm"
          className="px-5 py-2 w-96 border rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none dark:bg-[#283046] dark:text-white dark:border-gray-700"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Select
          className="w-48"
          options={roleOptions}
          defaultValue={roleOptions[0]}
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
          isClearable={false}
          value={roleOptions.find((role) => role.value === selectedRole)}
          onChange={(option) => setSelectedRole(option!.value)}
        />
        <button
          type="button"
          className="bg-primary px-5 py-2 text-white rounded"
          onClick={() => setShowAddMemberModal(true)}
        >
          Thêm thành viên
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-5">
        {filteredUsers.map((member) => (
          <MemberCard user={member} key={member.username} />
        ))}
      </div>
      <AddMemberModal
        isOpen={showAddMemberModal}
        toggle={() => setShowAddMemberModal(!showAddMemberModal)}
      />
    </div>
  );
}
