import React from 'react';
import NavbarNotification from '@/components/Navbar/NavbarNotification';
import ProfileDropdown from '@/components/Navbar/ProfileDropdown';
import NavLink from '@/components/Navbar/NavLink';
import logo from '@/assets/react.svg';

export default function Navbar() {
  return (
    <nav className="bg-white px-0 mx-0 py-2 shadow">
      <div className="mx-auto max-w-6xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <img src={logo} alt="" />
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="hidden sm:block sm:ml-6 pe-3">
              <div className="flex space-x-4">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/about">Tours</NavLink>
                <NavLink href="/about">Leads</NavLink>
                <NavLink href="/about">Create a post</NavLink>
              </div>
            </div>
            <NavbarNotification />
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </nav>
  );
}
