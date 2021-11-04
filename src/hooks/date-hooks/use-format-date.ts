import { format, parseISO } from 'date-fns';
import { useCallback } from 'react';
import { DateFormat } from 'constants/date-format';

export const useFormatDate = () => {
  const formatDate = useCallback((dateString: string) => format(parseISO(dateString), DateFormat.Date), []);
  return { formatDate };
};
