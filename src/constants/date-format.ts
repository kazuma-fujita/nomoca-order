export const DateFormat = {
  date: 'yyyy/MM/dd',
  dateHourMinute: 'yyyy/MM/dd HH:mm',
  simpleDate: 'yyyy-MM-dd',
  simpleDateHourMinute: 'yyyy-MM-dd_HHmm',
} as const;

export type DateFormat = typeof DateFormat[keyof typeof DateFormat];
