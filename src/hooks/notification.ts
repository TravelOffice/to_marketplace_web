import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from 'zustand';

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
