import React from 'react';

export interface NotificationsErrorProps {
  onRetry: () => void,
}

export default function NotificationsError(props: NotificationsErrorProps) {
  const { onRetry } = props;
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h3 className="text-gray-400 dark:text-gray-500 text-lg font-medium mt-4">Đã có lỗi xảy ra</h3>
      <button type="button" onClick={onRetry}>
        <h3 className="text-gray-400 dark:text-gray-500 text-lg font-medium mt-4">Thử lại</h3>
      </button>
    </div>
  );
}
