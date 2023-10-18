import React from 'react';
import { FiBookmark, FiMenu } from 'react-icons/fi';
import classNames from 'classnames';
import NavbarNotification from '@/components/base/Navbar/NavbarNotification';
import ProfileDropdown from '@/components/base/Navbar/ProfileDropdown';
import { useLayoutStore } from '@/hooks/layout';
import { useCurrentUser } from '@/hooks/auth';

export default function Navbar() {
  const { isSidebarOpen, toggleSidebar } = useLayoutStore(
    (state) => ({ isSidebarOpen: state.isSidebarOpen, toggleSidebar: state.toggleSidebar }),
  );
  const currentUser = useCurrentUser();
  return (
    <nav
      className={classNames('fixed w-full top-0 left-0 z-20 transition-all sm:w-[unset] sm:right-0 bg-gray-100 dark:bg-[#161d31]', isSidebarOpen ? 'sm:left-64' : 'sm:left-20')}
    >
      <div
        className="flex justify-between items-center px-4 py-3.5 bg-white shadow-lg z-20 dark:bg-[#283046] sm:mx-8 sm:mt-5 sm:mb-10 sm:rounded-lg"
      >
        <div className="flex items-center gap-2">
          <button type="button" className="w-[22px] h-[22px] hover:text-[#DF9222] md:hidden" onClick={toggleSidebar}>
            <FiMenu className="w-full h-full text-gray-400" />
          </button>
          <NavbarNotification />
          <FiBookmark className="w-6 h-6 text-gray-400 cursor-pointer dark:text-white" />
        </div>
        <div className="flex items-center">
          <div className="flex flex-col items-end me-5">
            <h6 className="font-semibold text-gray-800 dark:text-white">{currentUser?.name}</h6>
            <p className="text-sm text-gray-600 dark:text-white">{currentUser?.alias}</p>
          </div>
          <ProfileDropdown />
        </div>
      </div>
    </nav>
  );
}
