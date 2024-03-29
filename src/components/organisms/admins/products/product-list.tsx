import FormatLineSpacingIcon from '@mui/icons-material/FormatLineSpacing';
import { CircularProgress, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ErrorAlert } from 'components/atoms/alerts/error-alert';
import { EmptyTableBody } from 'components/atoms/tables/empty-table-body';
import { StyledTableCell } from 'components/atoms/tables/styled-table-cell';
import { StyledTableRow } from 'components/atoms/tables/styled-table-row';
import { UpsertProductButton } from 'components/organisms/admins/products/upsert-product-button';
import { formatDateHourMinute } from 'functions/dates/format-date-hour-minute';
import { useFetchProductList } from 'hooks/products/use-fetch-product-list';
import { useUpdateAllProduct } from 'hooks/products/use-update-all-product';
import { useCallback } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

const header = [
  {
    label: '商品名',
    minWidth: 160,
  },
  {
    label: '仕入れ値(税抜)',
    minWidth: 80,
  },
  {
    label: '単価(税抜)',
    minWidth: 80,
  },
  {
    label: 'CSV出力',
    minWidth: 40,
  },
  {
    label: 'Bカート配送グループ',
    minWidth: 40,
  },
  {
    label: 'BカートセットID',
    minWidth: 40,
  },
  {
    label: 'Bカート別配送経路',
    minWidth: 40,
  },
  {
    label: '無効',
    minWidth: 40,
  },
  {
    label: 'プルダウン表示順',
    minWidth: 80,
  },
  {
    label: '更新日時',
    minWidth: 80,
  },
  {
    label: '編集',
    minWidth: 160,
  },
];

export const ProductList = () => {
  const { data, error, isLoading, isEmptyList } = useFetchProductList();
  const { updateAllProduct, error: updateAllError } = useUpdateAllProduct();

  const handleOnDragEnd = useCallback(
    // (result: DropResult, provided: ResponderProvided) => {
    (result: DropResult) => {
      if (result.destination) {
        updateAllProduct({ sourceIndex: result.source.index, destinationIndex: result.destination.index });
      }
    },
    [updateAllProduct],
  );

  const droppableId = 'products';
  if (error) return <ErrorAlert>{error}</ErrorAlert>;
  if (updateAllError) return <ErrorAlert>{updateAllError}</ErrorAlert>;
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <TableContainer component={Paper}>
        <Table aria-label='products table'>
          <TableHead>
            <TableRow>
              {header.map((item, index) => (
                <StyledTableCell key={index} align='center' sx={{ minWidth: item.minWidth }}>
                  <Typography variant='body2' fontWeight='bold'>
                    {item.label}
                  </Typography>
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <Droppable droppableId={droppableId}>
            {(provided) => (
              <TableBody className={droppableId} {...provided.droppableProps} ref={provided.innerRef}>
                {isLoading && (
                  <EmptyTableBody colSpan={header.length}>
                    <CircularProgress aria-label='Now loading' />
                  </EmptyTableBody>
                )}
                {isEmptyList && <EmptyTableBody colSpan={header.length}>商品を追加してください</EmptyTableBody>}
                {data &&
                  data.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided) => (
                        <StyledTableRow key={item.id} ref={provided.innerRef} {...provided.draggableProps}>
                          <StyledTableCell>{item.name}</StyledTableCell>
                          <StyledTableCell>{item.purchasePrice.toLocaleString()}</StyledTableCell>
                          <StyledTableCell>{item.unitPrice.toLocaleString()}</StyledTableCell>
                          <StyledTableCell align='center'>{item.isExportCSV ? '◯' : '-'}</StyledTableCell>
                          <StyledTableCell>{item.bCartDeliveryGroupId}</StyledTableCell>
                          <StyledTableCell>{item.bCartSetId}</StyledTableCell>
                          <StyledTableCell align='center'>
                            {item.isBCartSeparateDeliveryRoute ? '◯' : '-'}
                          </StyledTableCell>
                          <StyledTableCell align='center'>{item.disabled ? '◯' : '-'}</StyledTableCell>
                          <StyledTableCell align='center' {...provided.dragHandleProps}>
                            <FormatLineSpacingIcon />
                          </StyledTableCell>
                          <StyledTableCell align='center'>{formatDateHourMinute(item.updatedAt)}</StyledTableCell>
                          <StyledTableCell align='center'>
                            <UpsertProductButton product={item} />
                          </StyledTableCell>
                        </StyledTableRow>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </TableBody>
            )}
          </Droppable>
        </Table>
      </TableContainer>
    </DragDropContext>
  );
};
