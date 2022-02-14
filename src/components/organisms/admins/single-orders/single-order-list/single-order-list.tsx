import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Checkbox, Collapse, IconButton, TableCell } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import { DeliveryStatusChip } from 'components/atoms/delivery-status-chip';
import { DeliveryTypeChip } from 'components/atoms/delivery-type-chip';
import { StyledSecondaryTableRow } from 'components/atoms/tables/styled-secondary-table-row';
import { StyledTableCell } from 'components/atoms/tables/styled-table-cell';
import { CommonTableContainer } from 'components/molecules/common-table-container';
import { ReceiptTable } from 'components/molecules/receipt-table';
import { formatDateHourMinute } from 'functions/dates/format-date-hour-minute';
import { addDeliveryFeeAndExpressObjectToProductList } from 'functions/orders/add-delivery-fee-and-express-object-to-product-list';
import { ExtendedOrder } from 'hooks/orders/use-fetch-order-list';
import { FetchResponse } from 'hooks/swr/use-fetch';
import React, { useState } from 'react';
import { useToggle } from 'react-use';
import { TableHeader } from 'types/table-header';
import { useCallback } from 'react';

const header: TableHeader[] = [
  {
    label: '',
    minWidth: 40,
  },
  {
    label: '発送状況',
    minWidth: 160,
  },
  {
    label: '商品',
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
    label: '担当者',
    minWidth: 160,
  },
];

export const SingleOrderList = (props: FetchResponse<ExtendedOrder[]>) => {
  const { data } = props;
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isSelectedAll, setIsSelectedAll] = useToggle(false);
  const handleAllSelectItem = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!data) return;
    const isChecked = event.target.checked;
    const newIDs = isChecked ? data!.map((item) => item.id) : [];
    setSelectedItems(newIDs);
    setIsSelectedAll(isChecked);
  };

  return (
    <CommonTableContainer
      {...props}
      tableHeaders={header}
      emptyListDescription='現在注文の商品はありません'
      selectAllCheckbox={
        <Checkbox
          color='primary'
          indeterminate={selectedItems.length > 0 ? (data ? selectedItems.length !== data!.length : false) : false}
          checked={isSelectedAll}
          onChange={handleAllSelectItem}
        />
      }
    >
      {data &&
        data.map((item: ExtendedOrder) => (
          <Row
            key={item.id}
            item={item}
            selectedItems={selectedItems}
            orderItemsLength={data.length}
            setSelectedItems={setSelectedItems}
            setIsSelectedAll={setIsSelectedAll}
          />
        ))}
    </CommonTableContainer>
  );
};

type RowProps = {
  item: ExtendedOrder;
  selectedItems: string[];
  orderItemsLength: number;
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
  setIsSelectedAll: (nextValue?: any) => void;
};

const Row = ({ item, selectedItems, orderItemsLength, setSelectedItems, setIsSelectedAll }: RowProps) => {
  const [on, toggle] = useToggle(false);
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = event.target.checked;
      const newIDs = isChecked ? [...selectedItems, item.id] : selectedItems.filter((id) => id !== item.id);
      setSelectedItems(newIDs);
      if (!isChecked && newIDs.length === 0) {
        setIsSelectedAll(false);
      } else if (isChecked && newIDs.length === orderItemsLength) {
        setIsSelectedAll(true);
      }
    },
    [item.id, orderItemsLength, selectedItems, setIsSelectedAll, setSelectedItems],
  );
  return (
    <React.Fragment key={item.id}>
      <TableRow>
        <TableCell padding='checkbox' align='center'>
          <Checkbox color='primary' checked={selectedItems.includes(item.id)} onChange={handleChange} />
        </TableCell>
        <TableCell align='center'>
          <DeliveryStatusChip status={item.deliveryStatus!} />
        </TableCell>
        <TableCell align='center'>
          <IconButton aria-label='expand row' onClick={toggle}>
            {on ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align='center'>{formatDateHourMinute(item.createdAt)}</TableCell>
        <TableCell align='center'>
          <DeliveryTypeChip type={item.deliveryType!} />
        </TableCell>
        <TableCell align='center'>{item.staff.name}</TableCell>
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
