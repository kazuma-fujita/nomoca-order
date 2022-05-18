import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';

export const StyledSecondaryTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.grey[50],
  },
}));
