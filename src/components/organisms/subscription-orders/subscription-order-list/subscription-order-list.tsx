import { Box, CircularProgress, Collapse, IconButton, TableCell, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { SubscriptionOrder } from 'API';
import { ErrorAlert } from 'components/atoms/alerts/error-alert';
import { EmptyTableBody } from 'components/atoms/tables/empty-table-body';
import { StyledTableCell } from 'components/atoms/tables/styled-table-cell';
import { StyledTableRow } from 'components/atoms/tables/styled-table-row';
import { formatDate } from 'functions/dates/format-date';
import { formatDateHourMinute } from 'functions/dates/format-date-hour-minute';
import { FetchResponse } from 'hooks/swr/use-fetch';
import React from 'react';
import { DeleteSubscriptionOrderButton } from 'components/organisms/subscription-orders/delete-subscription-order-button';
import { UpdateSubscriptionOrderButton } from 'components/organisms/subscription-orders/update-subscription-order-button';
import { StyledSecondaryTableRow } from 'components/atoms/tables/styled-secondary-table-row';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const header = [
  {
    label: '',
    minWidth: 0,
  },
  {
    label: '定期便申し込み日',
    minWidth: 160,
  },
  {
    label: '定期便開始月',
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

type Props = FetchResponse<SubscriptionOrder[]> & {
  on: boolean;
  toggle: (nextValue?: any) => void;
};

export const SubscriptionOrderList = ({ data, error, isLoading, isListEmpty, on, toggle }: Props) => {
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
          {isLoading && (
            <EmptyTableBody colSpan={header.length}>
              <CircularProgress aria-label='Now loading' />
            </EmptyTableBody>
          )}
          {isListEmpty && <EmptyTableBody colSpan={header.length}>現在定期便の商品はありません</EmptyTableBody>}
          {data &&
            data.map((item) => (
              <React.Fragment key={item.id}>
                <TableRow>
                  <TableCell>
                    <IconButton aria-label='expand row' onClick={toggle}>
                      {on ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  </TableCell>
                  <StyledTableCell align='center'>{formatDate(item.createdAt)}</StyledTableCell>
                  <StyledTableCell align='center'>{`${item.deliveryStartYear}/${item.deliveryStartMonth}`}</StyledTableCell>
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
                </TableRow>
                <StyledSecondaryTableRow>
                  <StyledTableCell style={{ paddingBottom: 16, paddingTop: 8 }} colSpan={header.length}>
                    <Collapse in={on} timeout='auto' unmountOnExit>
                      <Table size='small' aria-label='purchases'>
                        <TableHead>
                          <TableRow>
                            {productHeader.map((item, index) => (
                              <TableCell key={index} align='center' sx={{ minWidth: item.minWidth }}>
                                <Typography variant='body2' fontWeight='bold' color='text.secondary'>
                                  {item.label}
                                </Typography>
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {item.products &&
                            item.products.items &&
                            item.products.items.map(
                              (relation, index) =>
                                relation && (
                                  <TableRow key={`${index}-${relation.product.id}`}>
                                    <StyledTableCell>{relation.product.name}</StyledTableCell>
                                    <StyledTableCell align='center'>{relation.quantity}</StyledTableCell>
                                    <StyledTableCell align='right'>{relation.product.name}</StyledTableCell>
                                  </TableRow>
                                ),
                            )}
                        </TableBody>
                      </Table>
                    </Collapse>
                  </StyledTableCell>
                </StyledSecondaryTableRow>
              </React.Fragment>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
