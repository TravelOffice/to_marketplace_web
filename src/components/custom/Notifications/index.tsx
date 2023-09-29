import React, { useCallback, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import { useOnClickOutside } from 'usehooks-ts';
import '@/styles/extended/notifications.css';
import { useNavigate } from 'react-router-dom';
import ReactPortal from '@/components/base/ReactPortal';
import { useNotifications } from '@/hooks/notification';
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
  const navigate = useNavigate();

  const { data: notifications = [], isError, refetch } = useNotifications();

  useOnClickOutside(nodeRef, () => {
    if (isOpen) {
      toggle();
    }
  });

  const onNotificationClick = useCallback((notification: Notification) => {
    toggle();
    navigate(notification.data.href);
  }, [toggle]);

  const renderContent = useCallback(() => {
    if (isError) return <NotificationsError onRetry={refetch} />;
    if (notifications.length === 0) return <NoNotifications />;
    return (
      <NotificationList
        notifications={notifications}
        onNotificationClick={onNotificationClick}
      />
    );
  }, [notifications]);

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
            <button type="button" onClick={toggle}>
              <svg className="w-6 h-6 text-gray-400 hover:text-gray-500 dark:text-white dark:hover:text-gray-300 absolute top-6 right-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h6 className="mx-4 font-semibold text-lg">Thông báo</h6>
            <div className="relative">
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white to-transparent dark:from-dark dark:to-transparent z-[51]" />
            </div>
            <div className="overflow-auto flex-1 relative overscroll-contain">
              <div className="w-full h-4" />
              {renderContent()}
            </div>
          </div>
        </div>
      </CSSTransition>
    </ReactPortal>
  );
}
