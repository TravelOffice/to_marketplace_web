import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '@/assets/react.svg';

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
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
          <img className="h-8 w-8 rounded-full" src={logo} alt="" />
        </button>
      </div>
      {
        isOpen && (
          <div
            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            <Link to="/me/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">My Profile</Link>
            <Link to="/me/organization" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">My Organization</Link>
            <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</a>
            <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</a>
          </div>
        )
      }
    </div>
  );
}
