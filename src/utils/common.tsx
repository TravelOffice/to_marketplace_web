import moment from 'moment';

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
