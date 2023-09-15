import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore, useCurrentUser } from '@/hooks/auth';
import { generateUserAvatar } from '@/utils/common';

export default function ProfileDropdown() {
  const currentUser = useCurrentUser();
  const [isOpen, setIsOpen] = useState(false);
  const logOut = useAuthStore((state) => state.logOut);
  const handleLogOut = useCallback(() => {
    logOut();
    window.location.href = `${import.meta.env.VITE_SSO}/sign-out?redirect_uri=${window.location.origin}`;
  }, [logOut]);
  return (
    <div className="ml-3 relative">
      <div>
        <button
          type="button"
          className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          id="user-menu"
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Open user menu</span>
          <img src={generateUserAvatar(currentUser)} alt="" className="w-10 h-10 rounded-full" />
        </button>
      </div>
      {
        isOpen && (
          <div
            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white text-gray-700 ring-1 ring-black ring-opacity-5 dark:bg-dark dark:text-white"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            <Link
              to="/me/profile"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              role="menuitem"
            >
              Thông tin Cá nhân
            </Link>
            <Link
              to="/me/organization"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              role="menuitem"
            >
              Thông tin Công ty
            </Link>
            <a
              href="/"
              className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              role="menuitem"
            >
              Cài đặt
            </a>
            <button
              className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
              role="menuitem"
              type="button"
              onClick={handleLogOut}
            >
              Đăng xuất
            </button>
          </div>
        )
      }
    </div>
  );
}
