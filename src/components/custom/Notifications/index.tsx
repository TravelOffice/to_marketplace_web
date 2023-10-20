import React, {
  useCallback, useMemo, useRef,
} from 'react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import { useOnClickOutside } from 'usehooks-ts';
import '@/styles/extended/notifications.css';
import { useNavigate } from 'react-router-dom';
import { FiMoreVertical, FiX } from 'react-icons/fi';
import ReactPortal from '@/components/base/ReactPortal';
import {
  useMarkAllNotificationsAsRead,
  useMarkNotificationAsRead,
  useNotifications,
} from '@/hooks/notification';
import NoNotifications from '@/components/custom/Notifications/NoNotifications';
import NotificationsError from '@/components/custom/Notifications/NotificationsError';
import NotificationList from '@/components/custom/Notifications/NotificationList';
import { Notification } from '@/models/Notification';

export interface NotificationsProps {
  isOpen: boolean,
  toggle: () => void,
}

export default function Notifications(props: NotificationsProps) {
  const { isOpen, toggle } = props;
  const nodeRef = useRef(null);
  const optionsRef = useRef(null);
  const navigate = useNavigate();
  const [openOptions, setOpenOptions] = React.useState(false);

  const {
    data, isError, refetch, fetchNextPage,
    isFetched, isFetchingNextPage, hasNextPage,
  } = useNotifications();

  const notifications = useMemo(() => {
    if (!data) return [];
    const { pages } = data;
    const notificationPages = pages.map((page) => page.data);
    return notificationPages.flat();
  }, [data]);

  const markAllAsReadMutation = useMarkAllNotificationsAsRead();
  const markAsReadMutation = useMarkNotificationAsRead();

  useOnClickOutside(nodeRef, () => {
    if (isOpen) {
      toggle();
    }
  });

  useOnClickOutside(optionsRef, () => {
    if (openOptions) {
      setOpenOptions(false);
    }
  });

  const onNotificationClick = useCallback((notification: Notification) => {
    toggle();
    markAsReadMutation.mutate(notification.data.id);
    navigate(notification.data.href);
  }, [toggle]);

  const onMarkAllAsRead = useCallback(() => {
    toggle();
    const newestNotification = notifications[0];
    if (!newestNotification) return;
    const { createdAt } = newestNotification;
    markAllAsReadMutation.mutate(createdAt);
  }, [notifications, toggle]);

  const renderContent = useCallback(() => {
    if (isError) return <NotificationsError onRetry={refetch} />;
    if (notifications.length === 0) return <NoNotifications />;
    return (
      <NotificationList
        notifications={notifications}
        onNotificationClick={onNotificationClick}
        canLoadMore={!!hasNextPage && !isFetchingNextPage && isFetched && notifications.length > 0}
        onLoadMore={fetchNextPage}
        loadingMore={isFetchingNextPage}
      />
    );
  }, [
    notifications, hasNextPage, isFetchingNextPage,
    isFetched, isError, onNotificationClick,
    fetchNextPage, refetch,
  ]);

  return (
    <ReactPortal wrapperId="notifications">
      <CSSTransition
        in={isOpen}
        timeout={1000}
        unmountOnExit
        classNames="notifications"
        nodeRef={nodeRef}
      >
        <div className={classNames('fixed inset-0 z-50', { 'bg-gray-500 bg-opacity-75': isOpen })}>
          <div className="w-[30rem] flex flex-col absolute top-0 right-0 bottom-0 z-50 bg-white dark:bg-dark dark:text-white py-6" ref={nodeRef} onClick={() => {}}>
            <div className="absolute top-6 right-6 flex gap-2">
              <button type="button" className="relative" onClick={() => setOpenOptions(!openOptions)}>
                <FiMoreVertical className="w-5 h-5 text-gray-400 hover:text-gray-500 dark:text-white dark:hover:text-gray-300" />
                {
                  openOptions && (
                    <div ref={optionsRef} className="absolute top-full border right-0 w-48 py-2 mt-1 bg-white rounded-md shadow-xl dark:bg-dark z-[52] text-left">
                      <button
                        type="button"
                        className="block text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-white dark:hover:bg-dark-100 dark:hover:text-white"
                        onClick={onMarkAllAsRead}
                      >
                        Đánh dấu tất cả là đã đọc
                      </button>
                      <button
                        type="button"
                        className="block text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-white dark:hover:bg-dark-100 dark:hover:text-white"
                      >
                        Cài đặt thông báo
                      </button>
                    </div>
                  )
                }
              </button>

              <button type="button" onClick={toggle}>
                <FiX className="w-6 h-6 text-gray-400 hover:text-gray-500 dark:text-white dark:hover:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" />
              </button>
            </div>
            <h6 className="mx-4 font-semibold text-lg">Thông báo</h6>
            <div className="relative">
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white to-transparent dark:from-dark dark:to-transparent z-[51]" />
            </div>
            <div className="overflow-auto flex-1 relative overscroll-contain">
              <div className="w-full h-4" />
              {renderContent()}
            </div>
            <div className="relative">
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent dark:from-dark dark:to-transparent z-[51] flex justify-center items-center" />
            </div>
          </div>
        </div>
      </CSSTransition>
    </ReactPortal>
  );
}
