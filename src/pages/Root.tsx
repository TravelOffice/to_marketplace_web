import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/base/Sidebar';
import Navbar from '@/components/base/Navbar';
import { useAuth } from '@/hooks/auth';

export default function Root() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <div />;
  }
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
