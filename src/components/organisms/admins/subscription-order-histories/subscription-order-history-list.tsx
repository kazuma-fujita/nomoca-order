import { TableCell } from '@mui/material';
import { SubscriptionOrderHistory } from 'API';
import { CommonTableContainer } from 'components/molecules/common-table-container';
import { CommonTableRow } from 'components/molecules/common-table-row';
import { ClinicDetailButton } from 'components/organisms/clinics/clinic-detail-button';
import { formatDateHourMinute } from 'functions/dates/format-date-hour-minute';
import { useFetchSubscriptionOrderHistoryList } from 'hooks/subscription-order-histories/use-fetch-subscription-order-history-list';
import { ExtendedOrder } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
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
    label: '発送日時',
    minWidth: 80,
  },
];

export const SubscriptionOrderHistoryList = () => {
  const fetchReturn = useFetchSubscriptionOrderHistoryList();
  const { data } = fetchReturn;

  return (
    <CommonTableContainer
      {...fetchReturn}
      tableHeaders={header}
      emptyListDescription='現在発送済みの定期便商品はありません'
    >
      {data && data.map((item) => <Row key={item.id} rowItem={item} />)}
    </CommonTableContainer>
  );
};

type RowProps = {
  rowItem: ExtendedOrder<SubscriptionOrderHistory>;
};

const Row = ({ rowItem }: RowProps) => {
  return (
    <CommonTableRow colSpan={header.length} products={rowItem.normalizedProducts}>
      <TableCell align='center'>{rowItem.clinic.name}</TableCell>
      <TableCell align='center'>{rowItem.clinic.phoneNumber}</TableCell>
      <TableCell align='center'>
        <ClinicDetailButton
          staffName={`${rowItem.staff.lastName}  ${rowItem.staff.firstName}`}
          clinic={rowItem.clinic}
        />
      </TableCell>
      <TableCell align='center'>{formatDateHourMinute(rowItem.deliveredAt)}</TableCell>
    </CommonTableRow>
  );
};
