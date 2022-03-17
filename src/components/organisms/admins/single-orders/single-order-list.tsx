import { Checkbox, TableCell } from '@mui/material';
import { Order } from 'API';
import { DeliveryStatusChip } from 'components/atoms/delivery-status-chip';
import { DeliveryTypeChip } from 'components/atoms/delivery-type-chip';
import { CommonTableContainer } from 'components/molecules/common-table-container';
import { CommonTableRow } from 'components/molecules/common-table-row';
import { formatDateHourMinute } from 'functions/dates/format-date-hour-minute';
import { useFetchOrderList } from 'hooks/orders/use-fetch-order-list';
import { ExtendedOrder } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import React, { useCallback } from 'react';
import { useToggle } from 'react-use';
import { TableHeader } from 'types/table-header';

const header: TableHeader[] = [
  {
    label: '商品',
    minWidth: 40,
  },
  {
    label: '',
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
    label: '注文日時',
    minWidth: 160,
  },
  {
    label: '配送方法',
    minWidth: 160,
  },
  {
    label: '発送状況',
    minWidth: 160,
  },
  {
    label: '発送日時',
    minWidth: 160,
  },
  {
    label: '担当者',
    minWidth: 160,
  },
];

type Props = {
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
};

export const SingleOrderList = ({ selectedItems, setSelectedItems }: Props) => {
  const fetchReturn = useFetchOrderList();
  const { data } = fetchReturn;
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
      {...fetchReturn}
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
        data.map((item) => (
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
  item: ExtendedOrder<Order>;
  selectedItems: string[];
  orderItemsLength: number;
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
  setIsSelectedAll: (nextValue?: any) => void;
};

const Row = ({ item, selectedItems, orderItemsLength, setSelectedItems, setIsSelectedAll }: RowProps) => {
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
    <CommonTableRow key={item.id} colSpan={header.length} products={item.normalizedProducts}>
      <TableCell padding='checkbox' align='center'>
        <Checkbox color='primary' checked={selectedItems.includes(item.id)} onChange={handleChange} />
      </TableCell>
      <TableCell align='center'>渋谷クリニック</TableCell>
      <TableCell align='center'>09012345678</TableCell>
      <TableCell align='center'>{formatDateHourMinute(item.createdAt)}</TableCell>
      <TableCell align='center'>
        <DeliveryTypeChip deliveryType={item.deliveryType!} />
      </TableCell>
      <TableCell align='center'>
        <DeliveryStatusChip status={item.deliveryStatus!} />
      </TableCell>
      <TableCell align='center'>{item.deliveredAt ? formatDateHourMinute(item.deliveredAt!) : '-'}</TableCell>
      <TableCell align='center'>{`${item.staff.lastName}  ${item.staff.firstName}`}</TableCell>
    </CommonTableRow>
  );
};
