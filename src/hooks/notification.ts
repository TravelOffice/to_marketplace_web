import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from 'zustand';
import {
  InfiniteData, useInfiniteQuery, useMutation, useQueryClient,
} from '@tanstack/react-query';
import { useCallback } from 'react';
import backendApi from '@/services/backendApi';
import { Notification } from '@/models/Notification';
import { PaginationPayload } from '@/services/BaseApi';

export interface NotificationState {
  unreadCount: number,
  setUnreadCount: (count: number) => void,
  increaseUnreadCount: () => void,
  decreaseUnreadCount: () => void,
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      unreadCount: 0,
      setUnreadCount: (count: number) => set(() => ({ unreadCount: count })),
      increaseUnreadCount: () => set((state) => ({ unreadCount: state.unreadCount + 1 })),
      decreaseUnreadCount: () => set((state) => ({ unreadCount: state.unreadCount - 1 })),
    }),
    {
      name: 'notification-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const useNotifications = () => {
  const { setUnreadCount } = useNotificationStore();
  return useInfiniteQuery(
    ['notifications'],
    async (context) => {
      const result = await backendApi.get<PaginationPayload<Notification>>('/me/notifications', {
        queryParams: {
          appType: 'MARKETPLACE',
          nextToken: context.pageParam,
        },
      });
      const { data } = result;
      setUnreadCount(data.filter((notification) => notification.data.read === 'unread').length);
      return result;
    },
    {
      refetchOnMount: true,
      getNextPageParam: (lastPage) => {
        const nextToken = lastPage.paging.cursors.before;
        // Stop fetching when nextToken is empty
        if (nextToken === '') return undefined;
        return nextToken;
      },
    },
  );
};

export const useOnNewNotification = () => {
  const queryClient = useQueryClient();
  return useCallback(() => {
    queryClient.invalidateQueries(['notifications']).then();
  }, [queryClient]);
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  const { decreaseUnreadCount } = useNotificationStore();
  return useMutation({
    mutationFn: async (notificationId: string) => {
      await backendApi.put('/me/notifications/mark-as-read', {
        appType: 'MARKETPLACE',
        notificationId,
      });
    },
    onMutate: (notificationId) => {
      decreaseUnreadCount();

      // Set notification as read
      queryClient.setQueryData<InfiniteData<PaginationPayload<Notification>>>(
        ['notifications'],
        (oldData) => {
          if (!oldData) return oldData;
          return ({
            ...oldData,
            pages: oldData?.pages.map((page) => ({
              ...page,
              data: page.data.map((notification) => {
                if (notification.data.id === notificationId) {
                  return {
                    ...notification,
                    data: {
                      ...notification.data,
                      read: 'read',
                    },
                  };
                }
                return notification;
              }),
            })),
          });
        },
      );
    },
  });
};

export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();
  const { setUnreadCount } = useNotificationStore();

  return useMutation({
    mutationFn: async (lastNotificationCreatedAt: number) => {
      await backendApi.put('/me/notifications/mark-all-read', {
        appType: 'MARKETPLACE',
        markedTime: lastNotificationCreatedAt,
      });
    },
    onMutate: () => {
      setUnreadCount(0); // Set unread count to 0
      // Set all notifications as read
      queryClient.setQueryData<InfiniteData<PaginationPayload<Notification>>>(
        ['notifications'],
        (oldData) => {
          if (!oldData) return oldData;
          return ({
            ...oldData,
            pages: oldData?.pages.map((page) => ({
              ...page,
              data: page.data.map((notification) => ({
                ...notification,
                data: {
                  ...notification.data,
                  read: 'read',
                },
              })),
            })),
          });
        },
      );
    },
  });
};
