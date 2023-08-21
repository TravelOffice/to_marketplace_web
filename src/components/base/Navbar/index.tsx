import React from 'react';
import { FiBookmark } from 'react-icons/fi';
import classNames from 'classnames';
import NavbarNotification from '@/components/base/Navbar/NavbarNotification';
import ProfileDropdown from '@/components/base/Navbar/ProfileDropdown';
import { useLayoutStore } from '@/hooks/layout';
import { useAuth } from '@/hooks/auth';

export default function Navbar() {
  const isSidebarOpen = useLayoutStore((state) => state.isSidebarOpen);
  const { currentUser } = useAuth();
  return (
    <nav
      className={classNames('fixed top-0 right-0 z-20 bg-gray-100 transition-all', isSidebarOpen ? 'left-64' : 'left-20')}
    >
      <div
        className="flex justify-between items-center mx-8 mt-5 mb-10 px-4 py-3.5 rounded-lg bg-white shadow-lg z-20"
      >
        <div className="flex items-center gap-2">
          <NavbarNotification />
          <FiBookmark className="h-6 w-6 text-gray-400 cursor-pointer" />
        </div>
        <div className="flex items-center">
          <div className="flex flex-col items-end me-5">
            <h6 className="text-gray-800 font-semibold">{currentUser?.name}</h6>
            <p className="text-gray-600 text-sm">{currentUser?.username}</p>
          </div>
          <ProfileDropdown />
        </div>
      </div>
    </nav>
  );
}
