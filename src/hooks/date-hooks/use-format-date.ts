import { format, parseISO } from 'date-fns';
import { useCallback } from 'react';

export const useFormatDate = () => {
  const formatDate = useCallback((dateString: string) => format(parseISO(dateString), 'yyyy/MM/dd'), []);
  return { formatDate };
};
