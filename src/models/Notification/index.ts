export const notificationModels = [
  'POST',
  'OFFER',
  'OTHER',
] as const;

export type NotificationModel = typeof notificationModels[number];

export interface Notification {
  notification: {
    title: string,
    body: string,
  },
  data: {
    id: string,
    href: string,
    read: 'read' | 'unread',
    type: NotificationModel,
    image: string,
  },
  createdAt: number,
  updatedAt: number,
}
