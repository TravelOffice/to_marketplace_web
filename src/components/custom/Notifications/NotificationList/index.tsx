import React, { ReactNode } from 'react';
import moment from 'moment';
import { BsFilePost } from 'react-icons/bs';
import { LiaHandshake } from 'react-icons/lia';
import { AiFillInfoCircle } from 'react-icons/ai';
import { Notification, NotificationModel } from '@/models/Notification';

export interface NotificationListProps {
  notifications: Notification[],
  onNotificationClick: (notification: Notification) => void,
}

const notificationIcons: Record<NotificationModel | 'OTHER', ReactNode> = {
  POST: <BsFilePost className="text-4xl text-primary" />,
  OFFER: <LiaHandshake className="text-4xl text-green-600" />,
  OTHER: <AiFillInfoCircle className="text-4xl text-primary" />,
};

export default function NotificationList(props: NotificationListProps) {
  const { notifications, onNotificationClick } = props;
  return (
    <>
      {
        notifications.map((notification) => (
          <div key={notification.data.id} className="flex items-center p-4 border-b border-b-gray-100 cursor-pointer gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center">
              {notificationIcons[notification.data.type] || notificationIcons.OTHER}
            </div>
            <div className="w-full" onClick={() => onNotificationClick(notification)}>
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{notification.notification.title}</h3>
                <span className="text-xs text-gray-400 ml-2">{moment(notification.createdAt).fromNow()}</span>
              </div>
              <p className="text-sm text-gray-500">{notification.notification.body}</p>
            </div>
          </div>
        ))
      }
    </>
  );
}
