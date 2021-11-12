import { CircularProgress, Typography, Box } from '@mui/material';
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
import TableCell from '@mui/material/TableCell';
import React from 'react';

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
    label: '担当者',
    minWidth: 160,
  },
  {
    label: '注文内容変更',
    minWidth: 80,
  },
  {
    label: '定期便解約',
    minWidth: 80,
  },
];

const productHeader = [
  {
    label: '商品名',
    minWidth: 160,
  },
  {
    label: '数量',
    minWidth: 80,
  },
  {
    label: '金額',
    minWidth: 160,
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
              {!data ? <CircularProgress /> : '現在定期便はありません'}
            </EmptyTableBody>
          )}
          {data &&
            data.map((item) => (
              <React.Fragment key={item.id}>
                <StyledTableRow>
                  <StyledTableCell align='center'>{formatDate(item.createdAt)}</StyledTableCell>
                  <StyledTableCell align='center'>{formatDateHourMinute(item.updatedAt)}</StyledTableCell>
                  <StyledTableCell>{item.staff.name}</StyledTableCell>
                  {item.products && (
                    <>
                      <StyledTableCell align='center'>
                        <UpdateSubscriptionOrderButton id={item.id} products={item.products} staffID={item.staff.id} />
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        <DeleteSubscriptionOrderButton id={item.id} products={item.products} />
                      </StyledTableCell>
                    </>
                  )}
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Box sx={{ margin: 2 }}>
                      <Table size='small' aria-label='purchases'>
                        <TableHead>
                          <TableRow>
                            {productHeader.map((item, index) => (
                              <StyledTableCell key={index} align='center' sx={{ minWidth: item.minWidth }}>
                                <Typography variant='body2' fontWeight='bold'>
                                  {item.label}
                                </Typography>
                              </StyledTableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {item.products &&
                            item.products.items &&
                            item.products.items.map(
                              (relation, index) =>
                                relation && (
                                  <StyledTableRow key={`${index}-${relation.product.id}`}>
                                    <StyledTableCell>{relation.product.name}</StyledTableCell>
                                    <StyledTableCell align='center'>{relation.product.name}</StyledTableCell>
                                    <StyledTableCell align='right'>{relation.product.name}</StyledTableCell>
                                  </StyledTableRow>
                                ),
                            )}
                        </TableBody>
                      </Table>
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              </React.Fragment>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
