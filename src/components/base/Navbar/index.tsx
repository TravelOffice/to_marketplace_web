import React from 'react';
import { FiBookmark } from 'react-icons/fi';
import NavbarNotification from '@/components/base/Navbar/NavbarNotification';
import ProfileDropdown from '@/components/base/Navbar/ProfileDropdown';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-64 right-0 z-20 bg-gray-100">
      <div className="flex justify-between items-center mx-8 mt-5 mb-10 px-4 py-3.5 rounded-lg bg-white shadow-lg z-20">
        <div className="flex items-center gap-2">
          <NavbarNotification />
          <FiBookmark className="h-6 w-6 text-gray-400 cursor-pointer" />
        </div>
        <div className="flex items-center">
          <div className="flex flex-col items-end me-5">
            <h6 className="text-gray-800 font-semibold">Hi, John Doe</h6>
            <p className="text-gray-600 text-sm">Welcome back to Dashboard</p>
          </div>
          <ProfileDropdown />
        </div>
      </div>
    </nav>
  );
}
