import React from 'react';
import { FiHome, FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import logo from '@/assets/images/logo/horizontal-logo.svg';
import SidebarItem from '@/components/base/Sidebar/SidebarItem';

export default function Sidebar() {
  return (
    <div className="fixed top-0 left-0 z-20 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 shadow-lg">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <Link to="/" className="flex">
          <img src={logo} alt="" className="w-full" />
        </Link>
        <ul className="space-y-2 mt-10 font-medium">
          <SidebarItem path="/">
            <FiHome className="transition group-hover:translate-x-2" />
            <span className="ms-5">Dashboard</span>
          </SidebarItem>
          <SidebarItem path="/posts">
            <FiShoppingCart className="transition group-hover:translate-x-2" />
            <span className="ms-5">Marketplace</span>
          </SidebarItem>
        </ul>
      </div>
    </div>
  );
}
