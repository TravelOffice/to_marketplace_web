import React, { ReactNode, useEffect, useRef } from 'react';
import moment from 'moment';
import { BsFilePost } from 'react-icons/bs';
import { LiaHandshake } from 'react-icons/lia';
import { BiNotification } from 'react-icons/bi';
import { useIntersectionObserver } from 'usehooks-ts';
import classNames from 'classnames';
import { Notification, NotificationModel } from '@/models/Notification';
import Spinner from '@/components/base/Spinner';

export interface NotificationListProps {
  canLoadMore: boolean,
  notifications: Notification[],
  onNotificationClick: (notification: Notification) => void,
  onLoadMore?: () => void,
  loadingMore: boolean,
}

const notificationIcons: Record<NotificationModel | 'OTHER', ReactNode> = {
  POST: <BsFilePost className="text-4xl text-primary" />,
  OFFER: <LiaHandshake className="text-4xl text-green-600" />,
  OTHER: <BiNotification className="text-4xl text-blue-500" />,
};

export default function NotificationList(props: NotificationListProps) {
  const {
    notifications, onNotificationClick,
    canLoadMore, onLoadMore, loadingMore,
  } = props;
  const loadMoreRef = useRef(null);

  const loadMoreEntry = useIntersectionObserver(loadMoreRef, { threshold: 0.5 });
  useEffect(() => {
    if (loadMoreEntry?.isIntersecting && canLoadMore) {
      onLoadMore?.();
    }
  }, [loadMoreEntry?.isIntersecting]);

  return (
    <>
      {
        notifications.map((notification) => (
          <div
            key={notification.data.id}
            className={classNames('flex items-center p-4 border-b border-b-gray-100 cursor-pointer gap-4', { 'bg-sky-50': notification.data.read === 'unread' })}
          >
            <div className="w-12 h-12 flex items-center justify-center">
              {notificationIcons[notification.data.type] || notificationIcons.OTHER}
            </div>
            <div className="w-full" onClick={() => onNotificationClick(notification)}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{notification.notification.title}</h3>
                </div>
                <span className="text-xs text-gray-400 ml-2">{moment(notification.createdAt).fromNow()}</span>
              </div>
              <p className="text-sm text-gray-500">{notification.notification.body}</p>
            </div>
          </div>
        ))
      }
      {
        loadingMore && (
          <div className="flex items-center justify-center py-2">
            <Spinner className="w-6 h-6" />
          </div>
        )
      }
      {
        canLoadMore && (
          <div ref={loadMoreRef} />
        )
      }
    </>
  );
}
