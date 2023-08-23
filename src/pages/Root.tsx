import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import moment from 'moment';
import Sidebar from '@/components/base/Sidebar';
import Navbar from '@/components/base/Navbar';
import { useAuth } from '@/hooks/auth';
import { MarketplaceUser } from '@/models/MarketplaceUser/MarketplaceUser';
import 'moment/dist/locale/vi';
import { useAcceptTermStatus } from '@/hooks/organization';
import marketplaceApi from '@/services/marketplaceApi';

export default function Root() {
  const {
    isLoggedIn,
    setCurrentUser,
  } = useAuth();
  const acceptTerm = useAcceptTermStatus();

  useEffect(() => {
    const abortController = new AbortController();
    marketplaceApi
      .get<MarketplaceUser>('/me', { signal: abortController.signal })
      .then((data) => {
        setCurrentUser(data);
        moment.locale('vi');
      });
    return () => {

    };
  }, [isLoggedIn, setCurrentUser]);

  if (!isLoggedIn) {
    return <div />;
  }

  if (acceptTerm === 'no') {
    return <Navigate to="/onboarding/term-of-conditions" />;
  }

  if (acceptTerm === 'checking') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-[#161d31]">
      <Sidebar />
      <Navbar />
      <div className="relative">
        <Outlet />
      </div>
    </div>
  );
}
