import { format, parseISO } from 'date-fns';
import { useCallback } from 'react';
import { DateFormat } from 'constants/date-format';

export const useFormatDateHourMinute = () => {
  const formatDateHourMinute = useCallback(
    (dateString: string) => format(parseISO(dateString), DateFormat.DateHourMinute),
    []
  );
  return { formatDateHourMinute };
};
