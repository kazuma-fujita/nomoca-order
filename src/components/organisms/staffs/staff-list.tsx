import { useFetchStaffList } from 'hooks/staffs/use-fetch-staff-list';
import { ErrorAlert } from 'components/atoms/error-alert';
import { UpdateStaffButton } from './update-staff-button';
import { DeleteStaffButton } from './delete-staff-button';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CircularProgress } from '@mui/material';

const header = [
  {
    label: '担当者名',
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
    label: '削除',
    minWidth: 80,
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.black,
  },
  // [`&.${tableCellClasses.body}`]: {
  //   fontSize: 14,
  // },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const StaffList = () => {
  const { error, data } = useFetchStaffList();
  if (error) return <ErrorAlert>{error}</ErrorAlert>;
  if (!data) return <CircularProgress />;
  if (data.length === 0) return <p>担当者を追加してください</p>;
  return (
    // <TableContainer component={Paper} sx={{ maxWidth: 640 }}>
    <TableContainer component={Paper}>
      <Table aria-label='staffs table'>
        <TableHead>
          <TableRow>
            {header.map((item, index) => (
              <StyledTableCell key={index} align='center' sx={{ minWidth: item.minWidth }}>
                {/* <StyledTableCell key={index} align='center'> */}
                {item.label}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <StyledTableRow key={item.id}>
              <StyledTableCell>{item.name}</StyledTableCell>
              <StyledTableCell>{item.updatedAt}</StyledTableCell>
              <StyledTableCell align='center'>
                <UpdateStaffButton id={item.id} name={item.name} />
              </StyledTableCell>
              <StyledTableCell align='center'>
                <DeleteStaffButton id={item.id} name={item.name} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
