import { format, parseISO } from 'date-fns';
import { useCallback } from 'react';

export const useFormatDateHourMinute = () => {
  const formatDateHourMinute = useCallback(
    (dateString: string) => format(parseISO(dateString), 'yyyy/MM/dd HH:mm'),
    []
  );
  return { formatDateHourMinute };
};
