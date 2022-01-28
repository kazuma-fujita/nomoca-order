import { CircularProgress, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { SubscriptionOrder, Order } from 'API';
import { ErrorAlert } from 'components/atoms/alerts/error-alert';
import { EmptyTableBody } from 'components/atoms/tables/empty-table-body';
import { StyledTableCell } from 'components/atoms/tables/styled-table-cell';
import { FetchResponse } from 'hooks/swr/use-fetch';
import React from 'react';
import { TableHeader } from 'types/table-header';

// type Props = FetchResponse<SubscriptionOrder[]> & {
//   tableHeaders: TableHeader[];
//   emptyListDescription: string;
// };

type Props = {
  error: Error | null;
  isLoading: boolean;
  isEmptyList: boolean;
  tableHeaders: TableHeader[];
  emptyListDescription: string;
};

export const CommonTableContainer: React.FC<Props> = ({
  error,
  isLoading,
  isEmptyList,
  tableHeaders,
  emptyListDescription,
  children,
}) => {
  if (error) return <ErrorAlert>{error}</ErrorAlert>;
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {tableHeaders.map((item, index) => (
              <StyledTableCell key={index} align='center' sx={{ minWidth: item.minWidth }}>
                <Typography variant='body2' fontWeight='bold'>
                  {item.label}
                </Typography>
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading && (
            <EmptyTableBody colSpan={tableHeaders.length}>
              <CircularProgress aria-label='Now loading' />
            </EmptyTableBody>
          )}
          {isEmptyList && <EmptyTableBody colSpan={tableHeaders.length}>{emptyListDescription}</EmptyTableBody>}
          {children}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
