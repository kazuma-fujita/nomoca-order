import { SubscriptionOrder } from 'API';
import { StyledTableCell } from 'components/atoms/tables/styled-table-cell';
import { CommonTableContainer } from 'components/molecules/common-table-container';
import { CommonTableRow } from 'components/molecules/common-table-row';
import { formatDateHourMinute } from 'functions/dates/format-date-hour-minute';
import { generateFormattedNextDeliveryYearMonth } from 'functions/delivery-dates/generate-next-delivery-year-month';
import { ExtendedOrder } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { FetchResponse } from 'hooks/swr/use-fetch';
import React, { useMemo } from 'react';
import { useNowDate } from 'stores/use-now-date';
import { TableHeader } from 'types/table-header';

const header: TableHeader[] = [
  {
    label: '商品',
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
];

export const SubscriptionOrderList = (props: FetchResponse<ExtendedOrder<SubscriptionOrder>[]>) => {
  const { data } = props;
  const { now } = useNowDate();
  return (
    <CommonTableContainer {...props} tableHeaders={header} emptyListDescription='現在定期便の商品はありません'>
      {data && data.map((item) => <Row key={item.id} item={item} now={now} />)}
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
      <StyledTableCell align='center'>渋谷クリニック</StyledTableCell>
      <StyledTableCell align='center'>09012345678</StyledTableCell>
      <StyledTableCell align='center'>{item.staff.name}</StyledTableCell>
      <StyledTableCell align='center'>{`${item.deliveryStartYear}/${item.deliveryStartMonth}月`}</StyledTableCell>
      <StyledTableCell align='center'>{`${item.deliveryInterval}ヶ月`}</StyledTableCell>
      <StyledTableCell align='center'>{formattedNextDeliveryDate}</StyledTableCell>
      <StyledTableCell align='center'>{formatDateHourMinute(item.createdAt)}</StyledTableCell>
      <StyledTableCell align='center'>{formatDateHourMinute(item.updatedAt)}</StyledTableCell>
    </CommonTableRow>
  );
};