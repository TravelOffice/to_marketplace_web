import React from 'react';
import Select from 'react-select';
import { numberArrayOf } from '@/utils/arrays';

export interface OnboardingAddUsersProps {
  onNext: () => void,
  onBack: () => void,
}

const roleOptions = [
  { value: 'admin', label: 'Quản trị viên' },
  { value: 'member', label: 'Nhân viên' },
];

export default function OnboardingAddUsers(props: OnboardingAddUsersProps) {
  const { onNext, onBack } = props;
  return (
    <div className="bg-white max-w-3xl mx-auto max-h-3/4 mt-10 p-6 rounded-lg shadow-lg dark:bg-[#283046] dark:text-white">
      <h5 className="font-bold text-lg mb-6">Thêm thành viên</h5>
      <div className="max-h-[50vh] overflow-y-auto">
        {
          numberArrayOf(10).map((i) => (
            <div key={i} className="flex items-center gap-4 py-4 pe-5 border-b">
              <input type="checkbox" />
              <img
                src="https://picsum.photos/800/800"
                alt=""
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <h6 className="font-semibold">John Doe</h6>
                <p className="text-sm text-secondary">john.doe@example.com</p>
              </div>
              <Select
                options={roleOptions}
                defaultValue={roleOptions[1]}
              />
            </div>
          ))
        }
      </div>
      <div className="flex justify-end mt-10">
        <button onClick={onBack} type="submit" className="bg-gray-400 text-white px-10 py-2 rounded-lg">Quay lại</button>
        <button onClick={onNext} type="submit" className="bg-primary text-white px-10 py-2 rounded-lg ms-4">Hoàn thành</button>
      </div>
    </div>
  );
}
