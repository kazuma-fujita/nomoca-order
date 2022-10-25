import { TableCell } from '@mui/material';
import { SubscriptionOrderHistory } from 'API';
import { CommonTableContainer } from 'components/molecules/common-table-container';
import { CommonTableRow } from 'components/molecules/common-table-row';
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
    label: '発送日時',
    minWidth: 80,
  },
];

export const SubscriptionOrderHistoryList = () => {
  const fetchReturn = useFetchSubscriptionOrderHistoryList();
  return (
    <CommonTableContainer
      {...fetchReturn}
      tableHeaders={header}
      emptyListDescription='現在発送済みの定期便商品はありません'
    >
      {fetchReturn.data && fetchReturn.data.map((item) => <Row key={item.id} item={item} />)}
    </CommonTableContainer>
  );
};

type RowProps = {
  item: ExtendedOrder<SubscriptionOrderHistory>;
};

const Row = ({ item }: RowProps) => {
  return (
    <CommonTableRow colSpan={header.length} products={item.normalizedProducts} isProductsRowOpen={true}>
      <TableCell align='center'>{formatDateHourMinute(item.deliveredAt)}</TableCell>
    </CommonTableRow>
  );
};
