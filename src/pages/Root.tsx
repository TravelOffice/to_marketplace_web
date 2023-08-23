import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import moment from 'moment';
import Sidebar from '@/components/base/Sidebar';
import Navbar from '@/components/base/Navbar';
import { useAuth } from '@/hooks/auth';
import authorizedRequest from '@/services/authorizedRequest';
import { MarketplaceUser } from '@/models/MarketplaceUser/MarketplaceUser';
import 'moment/dist/locale/vi';

export default function Root() {
  const {
    isLoggedIn,
    setCurrentUser,
  } = useAuth();

  if (!isLoggedIn) {
    return <div />;
  }

  useEffect(() => {
    const abortController = new AbortController();
    authorizedRequest
      .get<MarketplaceUser>('/me', { signal: abortController.signal })
      .then((data) => {
        setCurrentUser(data);
        moment.locale('vi');
      });
    return () => {

    };
  }, [isLoggedIn, setCurrentUser]);
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
