import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Collapse, IconButton, TableCell, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { SubscriptionOrder } from 'API';
import { StyledSecondaryTableRow } from 'components/atoms/tables/styled-secondary-table-row';
import { StyledTableCell } from 'components/atoms/tables/styled-table-cell';
import { CommonTableContainer } from 'components/molecules/common-table-container';
import { DeleteSubscriptionOrderButton } from 'components/organisms/subscription-orders/delete-subscription-order-button';
import { UpdateSubscriptionOrderButton } from 'components/organisms/subscription-orders/update-subscription-order-button';
import { formatDate } from 'functions/dates/format-date';
import { formatDateHourMinute } from 'functions/dates/format-date-hour-minute';
import { AdminSubscriptionOrderResponse } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { FetchResponse } from 'hooks/swr/use-fetch';
import React from 'react';
import { useToggle } from 'react-use';
import { TableHeader } from 'types/table-header';
import { generateNextDeliveryMonth } from 'functions/delivery-dates/generate-next-delivery-months';

const header: TableHeader[] = [
  {
    label: '',
    minWidth: 40,
  },
  {
    label: '施設名',
    minWidth: 160,
  },
  {
    label: '電話番号',
    minWidth: 160,
  },
  {
    label: '担当者',
    minWidth: 160,
  },
  {
    label: '定期便開始月',
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

type Props = FetchResponse<SubscriptionOrder[]> & {};

type RowProps = {
  item: SubscriptionOrder;
};

const Row = ({ item }: RowProps) => {
  const [on, toggle] = useToggle(false);
  const now = new Date();
  return (
    <React.Fragment key={item.id}>
      <TableRow>
        <TableCell align='center'>
          <IconButton aria-label='expand row' onClick={toggle}>
            {on ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <StyledTableCell align='center'>渋谷クリニック</StyledTableCell>
        <StyledTableCell align='center'>09012345678</StyledTableCell>
        <StyledTableCell align='center'>{item.staff.name}</StyledTableCell>
        <StyledTableCell align='center'>{`${item.deliveryStartYear}/${item.deliveryStartMonth}月`}</StyledTableCell>
        <StyledTableCell align='center'>{`${item.deliveryInterval}ヶ月`}</StyledTableCell>
        <StyledTableCell align='center'>
          {generateNextDeliveryMonth(
            item.deliveryStartMonth,
            item.deliveryInterval,
            now.getFullYear(),
            now.getMonth() + 1,
          )}
        </StyledTableCell>
        <StyledTableCell align='center'>{formatDateHourMinute(item.createdAt)}</StyledTableCell>
        <StyledTableCell align='center'>{formatDateHourMinute(item.updatedAt)}</StyledTableCell>
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
                            <StyledTableCell align='right'>{relation.product.name}</StyledTableCell>
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

export const SubscriptionOrderList = (props: Props) => {
  const { data } = props;
  return (
    <CommonTableContainer {...props} tableHeaders={header} emptyListDescription='現在定期便の商品はありません'>
      {data && data.map((item: SubscriptionOrder) => <Row key={item.id} item={item} />)}
    </CommonTableContainer>
  );
};
