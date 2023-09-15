import React from 'react';
import { FiHome, FiShare2, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { BsBuildings } from 'react-icons/bs';
import logo from '@/assets/images/logo/logo.svg';
import SidebarItem from '@/components/base/Sidebar/SidebarItem';
import { useLayoutStore } from '@/hooks/layout';

export default function Sidebar() {
  const [
    isSidebarOpen,
    toggleSidebar,
  ] = useLayoutStore((state) => [state.isSidebarOpen, state.toggleSidebar]);
  return (
    <div
      className={classNames(
        'fixed top-0 left-0 z-30 h-screen transition-all -translate-x-full sm:translate-x-0 shadow-lg hover:w-64 group/sidebar ease-out dark:bg-[#283046] dark:text-[#dcdcdc]',
        isSidebarOpen ? 'w-64' : 'w-20',
      )}
    >
      <div
        className="h-full px-3.5 py-5 overflow-y-auto whitespace-nowrap bg-gray-50 dark:bg-gray-800"
      >
        <div className="flex items-center">
          <Link to="/" className="flex w-full items-center ms-2">
            <img src={logo} alt="" className="w-10 h-10" />
            <h2 className={classNames(
              'ms-2 text-xl font-semibold group-hover/sidebar:inline',
              isSidebarOpen ? 'inline' : 'hidden',
            )}
            >
              Travel Office
            </h2>
          </Link>
          <button
            type="button"
            className={classNames(isSidebarOpen ? 'block' : 'hidden', 'group-hover/sidebar:block')}
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              data-tour="toggle-icon"
              className="text-primary toggle-icon d-none d-xl-block"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
        </div>
        <ul className="space-y-2 mt-6 font-medium">
          <SidebarItem path="/">
            <div className="w-5 h-5">
              <FiHome className="transition w-5 h-5" />
            </div>
            <span
              className={classNames('flex-1 ms-5 text-sm group-hover/sidebar:block', isSidebarOpen ? 'block' : 'hidden')}
            >
              Trang chủ
            </span>
          </SidebarItem>
          <SidebarItem path="/posts">
            <div className="w-5 h-5">
              <FiShare2 className="transition w-5 h-5" />
            </div>
            <div
              className={classNames('flex-1 text-sm ms-5 group-hover/sidebar:block', isSidebarOpen ? 'block' : 'hidden')}
            >
              Travel
              Connect
            </div>
          </SidebarItem>
          <SidebarItem path="/me/profile">
            <div className="w-5 h-5">
              <FiUser className="transition w-5 h-5" />
            </div>
            <div
              className={classNames('flex-1 text-sm ms-5 group-hover/sidebar:block', isSidebarOpen ? 'block' : 'hidden')}
            >
              Thông tin cá nhân
            </div>
          </SidebarItem>
          <SidebarItem path="/me/organization">
            <div className="w-5 h-5">
              <BsBuildings className="transition w-5 h-5" />
            </div>
            <div
              className={classNames('flex-1 text-sm ms-5 group-hover/sidebar:block', isSidebarOpen ? 'block' : 'hidden')}
            >
              Thông tin công ty
            </div>
          </SidebarItem>
        </ul>
      </div>
    </div>
  );
}
