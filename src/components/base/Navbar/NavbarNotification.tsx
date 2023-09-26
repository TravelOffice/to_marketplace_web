import React from 'react';
import { FiBell } from 'react-icons/fi';
import { useNotificationStore } from '@/hooks/notification';

export default function NavbarNotification() {
  const unreadCount = useNotificationStore((state) => state.unreadCount);
  return (
    <button
      type="button"
      className="relative rounded-full p-1 text-gray-400 focus:outline-none"
    >
      {
        unreadCount > 0 && (
          <span className="absolute top-0 left-4 text-xs text-white h-5 px-2 rounded-full flex items-center justify-center bg-red-400">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )
      }
      <span className="sr-only">View notifications</span>
      <FiBell className="h-8 w-8 text-gray-400 dark:text-white" />
    </button>
  );
}
