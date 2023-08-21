import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/base/Sidebar';
import Navbar from '@/components/base/Navbar';
import { useAuth } from '@/hooks/auth';
import { useMe } from '@/hooks/marketplaceUser';

export default function Root() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <div />;
  }
  useMe();
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
