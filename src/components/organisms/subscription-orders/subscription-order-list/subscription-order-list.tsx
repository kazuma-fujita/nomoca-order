import { TableCell } from '@mui/material';
import { SubscriptionOrder } from 'API';
import { CommonTableContainer } from 'components/molecules/common-table-container';
import { CommonTableRow } from 'components/molecules/common-table-row';
import { UpsertOrderButton } from 'components/organisms/orders/upsert-order-button';
import { DeleteSubscriptionOrderButton } from 'components/organisms/subscription-orders/delete-subscription-order-button';
import { formatDateHourMinute } from 'functions/dates/format-date-hour-minute';
import {
  ExtendedOrder,
  useFetchSubscriptionOrderList,
} from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { TableHeader } from 'types/table-header';

const header: TableHeader[] = [
  {
    label: '商品',
    minWidth: 40,
  },
  {
    label: '配送開始月',
    minWidth: 80,
  },
  {
    label: '配送頻度',
    minWidth: 80,
  },
  {
    label: '次回配送予定月',
    minWidth: 80,
  },
  {
    label: '申し込み日時',
    minWidth: 80,
  },
  {
    label: '更新日時',
    minWidth: 80,
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

export const SubscriptionOrderList = () => {
  const fetchReturn = useFetchSubscriptionOrderList();
  return (
    <CommonTableContainer {...fetchReturn} tableHeaders={header} emptyListDescription='現在定期便の商品はありません'>
      {fetchReturn.data && fetchReturn.data.map((item) => <Row key={item.id} item={item} />)}
    </CommonTableContainer>
  );
};

type RowProps = {
  item: ExtendedOrder<SubscriptionOrder>;
};

const Row = ({ item }: RowProps) => {
  return (
    <CommonTableRow colSpan={header.length} products={item.normalizedProducts}>
      <TableCell align='center'>{`${item.deliveryStartYear}/${item.deliveryStartMonth}月`}</TableCell>
      <TableCell align='center'>{`${item.deliveryInterval}ヶ月`}</TableCell>
      <TableCell align='center'>{`${item.nextDeliveryYear}/${item.nextDeliveryMonth}月`}</TableCell>
      <TableCell align='center'>{formatDateHourMinute(item.createdAt)}</TableCell>
      <TableCell align='center'>{formatDateHourMinute(item.updatedAt)}</TableCell>
      {item.products && (
        <>
          <TableCell align='center'>
            <UpsertOrderButton id={item.id} products={item.normalizedProducts} staffID={item.staff.id} />
          </TableCell>
          <TableCell align='center'>
            <DeleteSubscriptionOrderButton item={item} />
          </TableCell>
        </>
      )}
    </CommonTableRow>
  );
};
