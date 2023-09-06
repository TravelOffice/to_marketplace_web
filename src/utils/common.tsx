import moment from 'moment';
import { MarketplaceUser } from '@/models/MarketplaceUser/MarketplaceUser';

export const useDateDuration = (data: string | number) => {
  const momentOne = moment();
  const momentTwo = moment(data);
  return `${moment
    .duration(momentOne.diff(momentTwo))
    .humanize()} trước`;
};

export const formatCurrency = (amount: number) => {
  if (amount) {
    return new Intl.NumberFormat('en-US').format(amount);
  }
  return 0;
};

export const generateUserAvatar = (user?: MarketplaceUser) => {
  if (!user) return 'https://ui-avatars.com/api/?name=&background=random&length=1&rounded=true';
  if (user.avatar) return user.avatar;
  return `https://ui-avatars.com/api/?name=${user.username}&background=random&length=1&rounded=true`;
};
