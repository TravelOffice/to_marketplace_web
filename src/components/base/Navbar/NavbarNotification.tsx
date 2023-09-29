import React from 'react';
import { FiBell } from 'react-icons/fi';
import { NotificationState, useNotificationStore } from '@/hooks/notification';
import Notifications from '@/components/custom/Notifications';

export default function NavbarNotification() {
  const unreadCount = useNotificationStore((state: NotificationState) => state.unreadCount);
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <button
        type="button"
        className="relative rounded-full text-gray-400 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {
          unreadCount > 0 && (
            <span className="absolute -top-2.5 left-2 text-xs text-white h-5 min-w-[20px] px-1 rounded-full flex items-center justify-center bg-red-400">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )
        }
        <span className="sr-only">View notifications</span>
        <FiBell className="h-6 w-6 text-gray-400 dark:text-white" />
      </button>
      <Notifications
        isOpen={isOpen}
        toggle={() => setIsOpen(!isOpen)}
      />
    </>
  );
}
