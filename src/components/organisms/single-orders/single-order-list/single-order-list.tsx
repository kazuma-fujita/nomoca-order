import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Collapse, IconButton, TableCell } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import { StyledSecondaryTableRow } from 'components/atoms/tables/styled-secondary-table-row';
import { StyledTableCell } from 'components/atoms/tables/styled-table-cell';
import { CommonTableContainer } from 'components/molecules/common-table-container';
import { ReceiptTable } from 'components/molecules/receipt-table';
import { DeleteSingleOrderButton } from 'components/organisms/single-orders/delete-single-order-button';
import { UpdateSingleOrderButton } from 'components/organisms/single-orders/update-single-order-button';
import { formatDateHourMinute } from 'functions/dates/format-date-hour-minute';
import { generateFormattedNextDeliveryYearMonth } from 'functions/delivery-dates/generate-next-delivery-year-month';
import { ExtendedOrder } from 'hooks/orders/use-fetch-order-list';
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

export const SingleOrderList = (props: FetchResponse<ExtendedOrder[]>) => {
  const { data } = props;
  const { now } = useNowDate();
  return (
    <CommonTableContainer {...props} tableHeaders={header} emptyListDescription='現在注文の商品はありません'>
      {data && data.map((item: ExtendedOrder) => <Row key={item.id} item={item} now={now} />)}
    </CommonTableContainer>
  );
};

type RowProps = {
  item: ExtendedOrder;
  now: Date;
};

const Row = ({ item, now }: RowProps) => {
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
              <UpdateSingleOrderButton id={item.id} products={item.normalizedProducts} staffID={item.staff.id} />
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
            <Box pb={4}>
              <ReceiptTable products={item.normalizedProducts} />
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledSecondaryTableRow>
    </React.Fragment>
  );
};
