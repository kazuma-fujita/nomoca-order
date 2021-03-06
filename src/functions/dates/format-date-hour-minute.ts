import { format, parseISO } from 'date-fns';
import { DateFormat } from 'constants/date-format';

export const formatDateHourMinute = (dateString: string) => format(parseISO(dateString), DateFormat.dateHourMinute);
export const formatSimpleDateHourMinute = (dateString: string) =>
  format(parseISO(dateString), DateFormat.simpleDateHourMinute);
