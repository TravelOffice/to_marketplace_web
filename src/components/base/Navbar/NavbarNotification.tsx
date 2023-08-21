import React from 'react';
import { FiBell } from 'react-icons/fi';

export default function NavbarNotification() {
  return (
    <button
      type="button"
      className="relative rounded-full p-1 text-gray-400 focus:outline-none"
    >
      <span className="absolute -inset-1.5" />
      <span className="sr-only">View notifications</span>
      <FiBell className="h-6 w-6 text-gray-400 dark:text-white" />
    </button>
  );
}
