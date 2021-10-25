import { useFetchSubscriptionOrderList } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { ErrorAlert } from 'components/atoms/error-alert';
import { UpdateSubscriptionOrderButton } from './update-subscription-order-button';
import { DeleteSubscriptionOrderButton } from './delete-subscription-order-button';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CircularProgress, Typography } from '@mui/material';

const header = [
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.text.secondary,
  },
  // [`&.${tableCellClasses.body}`]: {
  //   fontSize: 14,
  // },
}));

const EmptyTableBody: React.FC = ({ children }) => {
  return (
    <StyledTableRow>
      <StyledTableCell colSpan={header.length} align='center'>
        {children}
      </StyledTableCell>
    </StyledTableRow>
  );
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.grey[50],
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const SubscriptionOrderList = () => {
  const { error, data } = useFetchSubscriptionOrderList();
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
          {!data ? (
            <EmptyTableBody>
              <CircularProgress />
            </EmptyTableBody>
          ) : data.length == 0 ? (
            <EmptyTableBody>定期便を追加してください</EmptyTableBody>
          ) : (
            data.map((item) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell>{item.createdAt}</StyledTableCell>
                <StyledTableCell>{item.updatedAt}</StyledTableCell>
                <StyledTableCell align='center'>
                  <UpdateSubscriptionOrderButton id={item.id} />
                </StyledTableCell>
                <StyledTableCell align='center'>
                  <DeleteSubscriptionOrderButton id={item.id} />
                </StyledTableCell>
              </StyledTableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
