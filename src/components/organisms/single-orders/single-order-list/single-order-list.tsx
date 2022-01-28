import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Collapse, IconButton, TableCell, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Order } from 'API';
import { StyledSecondaryTableRow } from 'components/atoms/tables/styled-secondary-table-row';
import { StyledTableCell } from 'components/atoms/tables/styled-table-cell';
import { CommonTableContainer } from 'components/molecules/common-table-container';
import { DeleteSingleOrderButton } from 'components/organisms/single-orders/delete-single-order-button';
import { UpdateSingleOrderButton } from 'components/organisms/single-orders/update-single-order-button';
import { formatDateHourMinute } from 'functions/dates/format-date-hour-minute';
import { generateFormattedNextDeliveryYearMonth } from 'functions/delivery-dates/generate-next-delivery-year-month';
import { FetchResponse } from 'hooks/swr/use-fetch';
import React, { useMemo } from 'react';
import { useToggle } from 'react-use';
import { useNowDate } from 'stores/use-now-date';
import { TableHeader } from 'types/table-header';

const header: TableHeader[] = [
  {
    label: '',
    minWidth: 40,
  },
  {
    label: '担当者',
    minWidth: 160,
  },
  {
    label: '配送開始月',
    minWidth: 160,
  },
  {
    label: '配送頻度',
    minWidth: 160,
  },
  {
    label: '次回配送予定月',
    minWidth: 160,
  },
  {
    label: '作成日時',
    minWidth: 160,
  },
  {
    label: '更新日時',
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

const productHeader: TableHeader[] = [
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

export const SingleOrderList = (props: FetchResponse<Order[]>) => {
  const { data } = props;
  const { now } = useNowDate();
  return (
    <CommonTableContainer {...props} tableHeaders={header} emptyListDescription='現在定期便の商品はありません'>
      {data && data.map((item: Order) => <Row key={item.id} item={item} now={now} />)}
    </CommonTableContainer>
  );
};

type Props = {
  item: Order;
  now: Date;
};

const Row = ({ item, now }: Props) => {
  const [on, toggle] = useToggle(false);
  const formattedNextDeliveryDate = useMemo(
    () =>
      generateFormattedNextDeliveryYearMonth(
        item.deliveryStartYear!,
        item.deliveryStartMonth!,
        item.deliveryInterval!,
        now.getFullYear(),
        now.getMonth() + 1,
      ),
    [item.deliveryInterval, item.deliveryStartMonth, item.deliveryStartYear, now],
  );
  return (
    <React.Fragment key={item.id}>
      <TableRow>
        <TableCell align='center'>
          <IconButton aria-label='expand row' onClick={toggle}>
            {on ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <StyledTableCell align='center'>{item.staff.name}</StyledTableCell>
        <StyledTableCell align='center'>{`${item.deliveryStartYear}/${item.deliveryStartMonth}月`}</StyledTableCell>
        <StyledTableCell align='center'>{`${item.deliveryInterval}ヶ月`}</StyledTableCell>
        <StyledTableCell align='center'>{formattedNextDeliveryDate}</StyledTableCell>
        <StyledTableCell align='center'>{formatDateHourMinute(item.createdAt)}</StyledTableCell>
        <StyledTableCell align='center'>{formatDateHourMinute(item.updatedAt)}</StyledTableCell>
        {item.products && (
          <>
            <StyledTableCell align='center'>
              <UpdateSingleOrderButton id={item.id} products={item.products} staffID={item.staff.id} />
            </StyledTableCell>
            <StyledTableCell align='center'>
              <DeleteSingleOrderButton id={item.id} products={item.products} />
            </StyledTableCell>
          </>
        )}
      </TableRow>
      <StyledSecondaryTableRow>
        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={header.length}>
          <Collapse in={on} timeout='auto' unmountOnExit>
            <Box pt={2} pb={4}>
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
                            <StyledTableCell align='right'>
                              {relation.product.unitPrice.toLocaleString()}
                            </StyledTableCell>
                          </TableRow>
                        ),
                    )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledSecondaryTableRow>
    </React.Fragment>
  );
};
