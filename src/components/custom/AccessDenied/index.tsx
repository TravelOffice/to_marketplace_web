import React from 'react';
import accessDeniedImage from '@/assets/images/illustrator/access-denied.svg';

export default function AccessDenied() {
  return (
    <div className="mx-8 pt-32 rounded bg-white dark:bg-dark">
      <div className="h-[calc(100vh-168px)] flex flex-col items-center justify-center">
        <img src={accessDeniedImage} alt="" className="w-64 mb-5" />
        <p className="text-gray-700 dark:text-gray-300 text-center w-2/3">
          <span className="font-semibold text-2xl pb-5">Oops!</span>
          <br />
          Bạn không được phép truy cập chức năng này.
          Vui lòng liên hệ quản trị viên để được hỗ trợ thêm.
        </p>
      </div>
    </div>
  );
}
