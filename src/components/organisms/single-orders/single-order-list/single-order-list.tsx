import { TableCell } from '@mui/material';
import { Order } from 'API';
import { DeliveryStatusChip } from 'components/atoms/delivery-status-chip';
import { DeliveryTypeChip } from 'components/atoms/delivery-type-chip';
import { CommonTableContainer } from 'components/molecules/common-table-container';
import { CommonTableRow } from 'components/molecules/common-table-row';
import { CancelSingleOrderButton } from 'components/organisms/single-orders/cancel-single-order-button';
import { formatDateHourMinute } from 'functions/dates/format-date-hour-minute';
import { useFetchSingleOrderList } from 'hooks/orders/use-fetch-single-order-list';
import { ExtendedOrder } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import React from 'react';
import { TableHeader } from 'types/table-header';

const header: TableHeader[] = [
  {
    label: '商品',
    minWidth: 40,
  },
  {
    label: '注文日時',
    minWidth: 80,
  },
  {
    label: '配送方法',
    minWidth: 80,
  },
  {
    label: '発送状況',
    minWidth: 80,
  },
  {
    label: '発送日時',
    minWidth: 80,
  },
  {
    label: '',
    minWidth: 80,
  },
];

export const SingleOrderList = () => {
  const fetchReturn = useFetchSingleOrderList();
  return (
    <CommonTableContainer {...fetchReturn} tableHeaders={header} emptyListDescription='現在注文の商品はありません'>
      {fetchReturn.data && fetchReturn.data.map((item: ExtendedOrder<Order>) => <Row key={item.id} item={item} />)}
    </CommonTableContainer>
  );
};

type RowProps = {
  item: ExtendedOrder<Order>;
};

const Row = ({ item }: RowProps) => {
  return (
    <CommonTableRow colSpan={header.length} products={item.normalizedProducts}>
      <TableCell align='center'>{formatDateHourMinute(item.createdAt)}</TableCell>
      <TableCell align='center'>
        <DeliveryTypeChip deliveryType={item.deliveryType} />
      </TableCell>
      <TableCell align='center'>
        <DeliveryStatusChip status={item.deliveryStatus} />
      </TableCell>
      <TableCell align='center'>{item.deliveredAt ? formatDateHourMinute(item.deliveredAt) : '-'}</TableCell>
      {item.products && (
        <TableCell align='center'>
          <CancelSingleOrderButton item={item} />
        </TableCell>
      )}
    </CommonTableRow>
  );
};
