import { format, parseISO } from 'date-fns';
import { DateFormat } from 'constants/date-format';

export const formatDate = (dateString: string) => format(parseISO(dateString), DateFormat.Date);
