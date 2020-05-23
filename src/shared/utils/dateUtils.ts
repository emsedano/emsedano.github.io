import moment from 'moment';

export function monthYear(date: Date) {
  return moment(date).format('MMM, YYYY');
}

export function dateRanges(joinToken = '-', ...dates: Date[]) {
  return dates
    .filter(Boolean)
    .map(date => monthYear(date))
    .join(joinToken);
}
