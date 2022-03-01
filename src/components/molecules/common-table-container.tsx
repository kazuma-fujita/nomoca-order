import { CircularProgress, TableCell, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ErrorAlert } from 'components/atoms/alerts/error-alert';
import { EmptyTableBody } from 'components/atoms/tables/empty-table-body';
import { StyledTableCell } from 'components/atoms/tables/styled-table-cell';
import React, { ReactNode } from 'react';
import { TableHeader } from 'types/table-header';

type Props = {
  error: Error | null;
  isLoading: boolean;
  isEmptyList: boolean;
  tableHeaders: TableHeader[];
  emptyListDescription: string;
  selectAllCheckbox?: ReactNode | null;
};

export const CommonTableContainer: React.FC<Props> = ({
  error,
  isLoading,
  isEmptyList,
  tableHeaders,
  emptyListDescription,
  selectAllCheckbox,
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
                {index === 1 && selectAllCheckbox ? (
                  selectAllCheckbox
                ) : (
                  <Typography variant='body2' fontWeight='bold'>
                    {item.label}
                  </Typography>
                )}
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
