import { TableCell } from '@mui/material';
import { SubscriptionOrder } from 'API';
import { CommonTableContainer } from 'components/molecules/common-table-container';
import { CommonTableRow } from 'components/molecules/common-table-row';
import { ClinicDetailButton } from 'components/organisms/clinics/clinic-detail-button';
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
    label: '医院名',
    minWidth: 160,
  },
  {
    label: '電話番号',
    minWidth: 80,
  },
  {
    label: '配送先',
    minWidth: 80,
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
      <TableCell align='center'>{item.clinic.name}</TableCell>
      <TableCell align='center'>{item.clinic.phoneNumber}</TableCell>
      <TableCell align='center'>
        <ClinicDetailButton staffName={`${item.staff.lastName}  ${item.staff.firstName}`} clinic={item.clinic} />
      </TableCell>
      <TableCell align='center'>{`${item.deliveryStartYear}/${item.deliveryStartMonth}月`}</TableCell>
      <TableCell align='center'>{`${item.deliveryInterval}ヶ月`}</TableCell>
      <TableCell align='center'>{formattedNextDeliveryDate}</TableCell>
      <TableCell align='center'>{formatDateHourMinute(item.createdAt)}</TableCell>
    </CommonTableRow>
  );
};
