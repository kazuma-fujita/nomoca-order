import { CircularProgress, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ErrorAlert } from 'components/atoms/error-alert';
import { EmptyTableBody } from 'components/atoms/tables/empty-table-body';
import { StyledTableCell } from 'components/atoms/tables/styled-table-cell';
import { useFormatDate } from 'hooks/date-hooks/use-format-date';
import { useFormatDateHourMinute } from 'hooks/date-hooks/use-format-date-hour-minute';
import { useFetchSubscriptionOrderList } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { DeleteSubscriptionOrderButton } from './delete-subscription-order-button';
import { UpdateSubscriptionOrderButton } from './update-subscription-order-button';
import { StyledTableRow } from 'components/atoms/tables/styled-table-row';

const header = [
  {
    label: '担当者',
    minWidth: 160,
  },
  {
    label: '定期便開始日',
    minWidth: 160,
  },
  {
    label: '更新日時',
    minWidth: 160,
  },
  {
    label: '編集',
    minWidth: 80,
  },
  {
    label: '定期便解約',
    minWidth: 80,
  },
];

export const SubscriptionOrderList = () => {
  const { error, data } = useFetchSubscriptionOrderList();
  const { formatDate } = useFormatDate();
  const { formatDateHourMinute } = useFormatDateHourMinute();

  if (error) return <ErrorAlert>{error}</ErrorAlert>;
  return (
    <TableContainer component={Paper}>
      <Table aria-label='subscription order table'>
        <TableHead>
          <TableRow>
            {header.map((item, index) => (
              <StyledTableCell key={index} align='center' sx={{ minWidth: item.minWidth }}>
                <Typography variant='body2' fontWeight='bold'>
                  {item.label}
                </Typography>
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(!data || data.length == 0) && (
            <EmptyTableBody headerLength={header.length}>
              {!data ? <CircularProgress /> : '在定期便はありません'}
            </EmptyTableBody>
          )}
          {data &&
            data.map((item) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell>{item.staff.name}</StyledTableCell>
                <StyledTableCell>{formatDate(item.createdAt)}</StyledTableCell>
                <StyledTableCell>{formatDateHourMinute(item.updatedAt)}</StyledTableCell>
                <StyledTableCell align='center'>
                  <UpdateSubscriptionOrderButton id={item.id} staffID={item.staff.id} />
                </StyledTableCell>
                <StyledTableCell align='center'>
                  <DeleteSubscriptionOrderButton id={item.id} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
