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
import { ActivateProductButton } from 'components/organisms/products/activate-product-button';
import { UpdateProductButton } from 'components/organisms/products/update-product-button';
import { formatDateHourMinute } from 'functions/dates/format-date-hour-minute';
import { useUpdateAllProduct } from 'hooks/products/use-update-all-product';
import { useCallback } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import { useProductList } from 'stores/use-product-list';

const header = [
  {
    label: '商品名',
    minWidth: 160,
  },
  {
    label: '単価',
    minWidth: 160,
  },
  {
    label: '更新日時',
    minWidth: 160,
  },
  {
    label: '編集',
    minWidth: 80,
  },
  {
    label: 'プルダウン表示',
    minWidth: 80,
  },
  {
    label: 'プルダウン表示順',
    minWidth: 80,
  },
];

export const ProductList = () => {
  const { data, error, isLoading, isEmptyList } = useProductList();
  const { updateAllProduct, error: updateError } = useUpdateAllProduct();

  const handleOnDragEnd = useCallback(
    (result: DropResult, provided: ResponderProvided) => {
      if (result.destination) {
        updateAllProduct({ sourceIndex: result.source.index, destinationIndex: result.destination.index });
      }
    },
    [updateAllProduct],
  );

  const droppableId = 'products';
  if (error) return <ErrorAlert>{error}</ErrorAlert>;
  if (updateError) return <ErrorAlert>{updateError}</ErrorAlert>;
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
                          <StyledTableCell>{item.unitPrice.toLocaleString()}</StyledTableCell>
                          <StyledTableCell>{formatDateHourMinute(item.updatedAt)}</StyledTableCell>
                          <StyledTableCell align='center'>
                            <UpdateProductButton
                              id={item.id}
                              name={item.name}
                              unitPrice={item.unitPrice}
                              disabled={item.disabled}
                            />
                          </StyledTableCell>
                          <StyledTableCell align='center'>
                            <ActivateProductButton id={item.id} name={item.name} disabled={item.disabled} />
                          </StyledTableCell>
                          <StyledTableCell align='center' {...provided.dragHandleProps}>
                            <FormatLineSpacingIcon />
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
