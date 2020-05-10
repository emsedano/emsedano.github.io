const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function getMonth(month: number) {
  return month >= 0 && month <= 11 ? monthNames[month] : '';
}
