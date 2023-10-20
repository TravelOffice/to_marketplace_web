import React, { useCallback, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
import { MessagePayload } from 'firebase/messaging';
import Sidebar from '@/components/base/Sidebar';
import Navbar from '@/components/base/Navbar';
import { useAuth, useRegisterDeviceToken } from '@/hooks/auth';
import { MarketplaceUser } from '@/models/MarketplaceUser/MarketplaceUser';
import 'moment/dist/locale/vi';
import marketplaceApi from '@/services/marketplaceApi';
import { useOnboardingStatus } from '@/hooks/onboarding';
import { onNewMessage } from '@/firebase';
import Notification from '@/components/base/Notification';
import { useOnNewNotification } from '@/hooks/notification';

const channel = new BroadcastChannel('notifications');

export default function Root() {
  const {
    isLoggedIn,
    setCurrentUser,
  } = useAuth();

  const onNewNotification = useOnNewNotification();

  const onboardingStatus = useOnboardingStatus();

  const handleOnNewMessage = useCallback((payload: MessagePayload) => {
    const { data, notification } = payload;
    if (!data) return;
    toast.info(<Notification
      title={notification?.title || 'Bạn nhận được thông báo mới'}
      message={notification?.body || 'Kiểm tra ngay'}
    />);
    onNewNotification();
  }, []);

  useEffect(() => {
    onNewMessage((payload) => {
      handleOnNewMessage(payload);
    });
  }, []);

  useEffect(() => {
    const listener = (event: MessageEvent) => {
      const payload = event.data;
      handleOnNewMessage(payload);
    };
    channel.addEventListener('message', listener);
    return () => {
      channel.removeEventListener('message', listener);
    };
  }, []);

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

  useRegisterDeviceToken();

  // Render nothing if not logged in
  if (!isLoggedIn) {
    return <div />;
  }

  // Render loading screen
  if (onboardingStatus === 'checking') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
      </div>
    );
  }

  // Navigate to onboarding if not completed yet or skipped
  if (onboardingStatus !== 'skip_checking' && onboardingStatus !== 'completed') {
    return <Navigate to="/onboarding/term-of-conditions" />;
  }

  // Render the app
  return (
    <div className="bg-gray-100 dark:bg-[#161d31]">
      <Sidebar />
      <Navbar />
      <div className="relative min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}
