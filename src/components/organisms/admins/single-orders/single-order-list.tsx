import { Checkbox, TableCell } from '@mui/material';
import { Order } from 'API';
import { DeliveryStatusChip } from 'components/atoms/delivery-status-chip';
import { DeliveryTypeChip } from 'components/atoms/delivery-type-chip';
import { CommonTableContainer } from 'components/molecules/common-table-container';
import { CommonTableRow } from 'components/molecules/common-table-row';
import { ClinicDetailButton } from 'components/organisms/clinics/clinic-detail-button';
import { formatDateHourMinute } from 'functions/dates/format-date-hour-minute';
import { useFetchSingleOrderList } from 'hooks/orders/use-fetch-single-order-list';
import { ExtendedOrder } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import React, { useCallback } from 'react';
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
    label: '注文日時',
    minWidth: 80,
  },
  {
    label: '配送方法',
    minWidth: 80,
  },
  {
    label: '発送状況',
    minWidth: 80,
  },
  {
    label: '発送日時',
    minWidth: 80,
  },
];

type Props = {
  selectedItems: ExtendedOrder<Order>[];
  setSelectedItems: React.Dispatch<React.SetStateAction<ExtendedOrder<Order>[]>>;
};

export const SingleOrderList = ({ selectedItems, setSelectedItems }: Props) => {
  const fetchReturn = useFetchSingleOrderList();
  const { data } = fetchReturn;
  // 注文全件選択/解除チェックボックス クリックハンドラー
  const handleAllSelectItem = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!data) return;
      const isChecked = event.target.checked;
      if (isChecked) {
        // 全件チェックされたら注文全件行にチェックを入れる
        setSelectedItems(data);
      } else {
        // 全件チェックが外されたら注文全件行のチェックを外す
        setSelectedItems([]);
      }
    },
    [data, setSelectedItems],
  );

  return (
    <CommonTableContainer
      {...fetchReturn}
      tableHeaders={header}
      emptyListDescription='現在注文の商品はありません'
      selectAllCheckbox={
        // 注文全件選択/解除チェックボックス
        <Checkbox
          color='primary'
          indeterminate={selectedItems.length > 0 ? (data ? selectedItems.length !== data.length : false) : false}
          checked={selectedItems.length > 0}
          onChange={handleAllSelectItem}
        />
      }
    >
      {data &&
        data.map((item) => (
          <Row key={item.id} rowItem={item} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
        ))}
    </CommonTableContainer>
  );
};

type RowProps = {
  rowItem: ExtendedOrder<Order>;
  selectedItems: ExtendedOrder<Order>[];
  setSelectedItems: React.Dispatch<React.SetStateAction<ExtendedOrder<Order>[]>>;
};

const Row = ({ rowItem, selectedItems, setSelectedItems }: RowProps) => {
  // 注文各行のチェックボックス クリックハンドラー
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = event.target.checked;
      // チェックされたら注文選択配列に追加。チェックが外されたら配列から除外
      const newItems = isChecked ? [...selectedItems, rowItem] : selectedItems.filter((item) => item.id !== rowItem.id);
      setSelectedItems(newItems);
    },
    [rowItem, selectedItems, setSelectedItems],
  );

  return (
    <CommonTableRow colSpan={header.length} products={rowItem.normalizedProducts}>
      <TableCell padding='checkbox' align='center'>
        <Checkbox
          color='primary'
          checked={selectedItems.some((item) => item.id === rowItem.id)}
          onChange={handleChange}
        />
      </TableCell>
      <TableCell align='center'>{rowItem.clinic.name}</TableCell>
      <TableCell align='center'>{rowItem.clinic.phoneNumber}</TableCell>
      <TableCell align='center'>
        <ClinicDetailButton
          staffName={`${rowItem.staff.lastName}  ${rowItem.staff.firstName}`}
          clinic={rowItem.clinic}
        />
      </TableCell>
      <TableCell align='center'>{formatDateHourMinute(rowItem.createdAt)}</TableCell>
      <TableCell align='center'>
        <DeliveryTypeChip deliveryType={rowItem.deliveryType} />
      </TableCell>
      <TableCell align='center'>
        <DeliveryStatusChip status={rowItem.deliveryStatus} />
      </TableCell>
      <TableCell align='center'>{rowItem.deliveredAt ? formatDateHourMinute(rowItem.deliveredAt) : '-'}</TableCell>
    </CommonTableRow>
  );
};
