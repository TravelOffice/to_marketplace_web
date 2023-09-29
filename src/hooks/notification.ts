import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from 'zustand';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { MessagePayload } from 'firebase/messaging';
import backendApi from '@/services/backendApi';
import { Notification, NotificationModel } from '@/models/Notification';
import { PaginationPayload } from '@/services/BaseApi';

export interface NotificationState {
  unreadCount: number,
  setUnreadCount: (count: number) => void,
  increaseUnreadCount: () => void,
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      unreadCount: 0,
      setUnreadCount: (count: number) => set(() => ({ unreadCount: count })),
      increaseUnreadCount: () => set((state) => ({ unreadCount: state.unreadCount + 1 })),
    }),
    {
      name: 'notification-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const useNotifications = () => {
  const { setUnreadCount } = useNotificationStore();
  return useQuery(
    ['notifications'],
    async () => {
      const { data } = await backendApi.get<PaginationPayload<Notification>>('/me/notifications?appType=MARKETPLACE');
      setUnreadCount(data.filter((notification) => notification.data.read === 'unread').length);
      return data;
    },
    {
      refetchOnMount: true,
    },
  );
};

export const useOnNewNotification = () => {
  const queryClient = useQueryClient();
  const { increaseUnreadCount } = useNotificationStore();
  return useCallback((messagePayload: MessagePayload) => {
    const notification: Notification = {
      notification: {
        title: messagePayload.notification?.title ?? '',
        body: messagePayload.notification?.body ?? '',
      },
      data: {
        href: messagePayload.data?.href ?? '',
        id: messagePayload.data?.id ?? '',
        read: 'unread',
        type: (messagePayload.data?.type ?? 'OTHER') as NotificationModel,
      },
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    queryClient.setQueryData<Notification[]>(
      ['notifications'],
      (oldData) => [notification, ...oldData ?? []],
    );
    increaseUnreadCount();
  }, [queryClient]);
};
