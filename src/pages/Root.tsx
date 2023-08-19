import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/base/Sidebar';
import Navbar from '@/components/base/Navbar';

export default function Root() {
  return (
    <div className="bg-gray-100">
      <Sidebar />
      <Navbar />
      <div className="relative">
        <Outlet />
      </div>
    </div>
  );
}
