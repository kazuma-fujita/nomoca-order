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
import { addDeliveryFeeAndExpressObjectToProductList } from 'functions/orders/add-delivery-fee-and-express-object-to-product-list';
import { getDeliveryTypeLabel } from 'functions/orders/get-delivery-type-label';
import { ExtendedOrder } from 'hooks/orders/use-fetch-order-list';
import { FetchResponse } from 'hooks/swr/use-fetch';
import React from 'react';
import { useToggle } from 'react-use';
import { TableHeader } from 'types/table-header';

const header: TableHeader[] = [
  {
    label: '',
    minWidth: 40,
  },
  {
    label: '注文日時',
    minWidth: 160,
  },
  {
    label: '配送方法',
    minWidth: 160,
  },
  {
    label: '注文状況',
    minWidth: 160,
  },
  {
    label: '担当者',
    minWidth: 160,
  },
  {
    label: '注文内容変更',
    minWidth: 80,
  },
  {
    label: '注文キャンセル',
    minWidth: 80,
  },
];

export const SingleOrderList = (props: FetchResponse<ExtendedOrder[]>) => {
  const { data } = props;
  return (
    <CommonTableContainer {...props} tableHeaders={header} emptyListDescription='現在注文の商品はありません'>
      {data && data.map((item: ExtendedOrder) => <Row key={item.id} item={item} />)}
    </CommonTableContainer>
  );
};

type RowProps = {
  item: ExtendedOrder;
};

const Row = ({ item }: RowProps) => {
  const [on, toggle] = useToggle(false);
  return (
    <React.Fragment key={item.id}>
      <TableRow>
        <TableCell align='center'>
          <IconButton aria-label='expand row' onClick={toggle}>
            {on ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <StyledTableCell align='center'>{formatDateHourMinute(item.createdAt)}</StyledTableCell>
        <StyledTableCell align='center'>{getDeliveryTypeLabel(item.deliveryType!)}</StyledTableCell>
        <StyledTableCell align='center'>{`発送前`}</StyledTableCell>
        <StyledTableCell align='center'>{item.staff.name}</StyledTableCell>
        {item.products && (
          <>
            <StyledTableCell align='center'>
              <UpdateSingleOrderButton
                id={item.id}
                products={item.normalizedProducts}
                deliveryType={item.deliveryType!}
                staffID={item.staff.id}
              />
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
              <ReceiptTable
                products={addDeliveryFeeAndExpressObjectToProductList(item.normalizedProducts, item.deliveryType!)}
              />
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledSecondaryTableRow>
    </React.Fragment>
  );
};
