import moment from 'moment';

export const useDateDuration = (data: string | number) => {
  const momentOne = moment();
  const momentTwo = moment(data);
  return moment
    .duration(momentOne.diff(momentTwo))
    .humanize();
};

export const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US').format(amount);
