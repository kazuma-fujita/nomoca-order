import { TableCell } from '@mui/material';
import { SubscriptionOrder } from 'API';
import { CommonTableContainer } from 'components/molecules/common-table-container';
import { CommonTableRow } from 'components/molecules/common-table-row';
import { DeleteSubscriptionOrderButton } from 'components/organisms/subscription-orders/delete-subscription-order-button';
import { UpdateSubscriptionOrderButton } from 'components/organisms/subscription-orders/update-subscription-order-button';
import { formatDateHourMinute } from 'functions/dates/format-date-hour-minute';
import { generateFormattedNextDeliveryYearMonth } from 'functions/delivery-dates/generate-next-delivery-year-month';
import {
  ExtendedOrder,
  useFetchSubscriptionOrderList,
} from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import React, { useMemo } from 'react';
import { useNowDate } from 'stores/use-now-date';
import { TableHeader } from 'types/table-header';

const header: TableHeader[] = [
  {
    label: '商品',
    minWidth: 40,
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
    label: '申し込み日時',
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

export const SubscriptionOrderList = () => {
  const fetchReturn = useFetchSubscriptionOrderList();
  const { now } = useNowDate();
  return (
    <CommonTableContainer {...fetchReturn} tableHeaders={header} emptyListDescription='現在定期便の商品はありません'>
      {fetchReturn.data && fetchReturn.data.map((item) => <Row key={item.id} item={item} now={now} />)}
    </CommonTableContainer>
  );
};

type RowProps = {
  item: ExtendedOrder<SubscriptionOrder>;
  now: Date;
};

const Row = ({ item, now }: RowProps) => {
  const formattedNextDeliveryDate = useMemo(
    () =>
      generateFormattedNextDeliveryYearMonth(
        item.deliveryStartYear,
        item.deliveryStartMonth,
        item.deliveryInterval,
        now.getFullYear(),
        now.getMonth() + 1,
      ),
    [item.deliveryInterval, item.deliveryStartMonth, item.deliveryStartYear, now],
  );
  return (
    <CommonTableRow key={item.id} colSpan={header.length} products={item.normalizedProducts}>
      <TableCell align='center'>{`${item.deliveryStartYear}/${item.deliveryStartMonth}月`}</TableCell>
      <TableCell align='center'>{`${item.deliveryInterval}ヶ月`}</TableCell>
      <TableCell align='center'>{formattedNextDeliveryDate}</TableCell>
      <TableCell align='center'>{formatDateHourMinute(item.createdAt)}</TableCell>
      <TableCell align='center'>{formatDateHourMinute(item.updatedAt)}</TableCell>
      {item.products && (
        <>
          <TableCell align='center'>
            <UpdateSubscriptionOrderButton id={item.id} products={item.normalizedProducts} staffID={item.staff.id} />
          </TableCell>
          <TableCell align='center'>
            <DeleteSubscriptionOrderButton id={item.id} products={item.products} />
          </TableCell>
        </>
      )}
    </CommonTableRow>
  );
};
