import FormatLineSpacingIcon from '@mui/icons-material/FormatLineSpacing';
import { CircularProgress, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ErrorAlert } from 'components/atoms/error-alert';
import { useFormatDateHourMinute } from 'hooks/date-hooks/use-format-date-hour-minute';
import { useUpdateAllProduct } from 'hooks/products/use-update-all-product';
import { useCallback } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import { useProductList } from 'stores/use-product-list';
import { ActivateProductButton } from './activate-product-button';
import { UpdateProductButton } from './update-product-button';

const header = [
  {
    label: '担当者名',
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
    label: '表示順',
    minWidth: 80,
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.text.secondary,
  },
  // [`&.${tableCellClasses.body}`]: {
  //   fontSize: 14,
  // },
}));

const EmptyTableBody: React.FC = ({ children }) => {
  return (
    <StyledTableRow>
      <StyledTableCell colSpan={header.length} align='center'>
        {children}
      </StyledTableCell>
    </StyledTableRow>
  );
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.grey[50],
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const ProductList = () => {
  const { data, error } = useProductList();
  const { formatDateHourMinute } = useFormatDateHourMinute();
  const { updateAllProduct } = useUpdateAllProduct();
  const handleOnDragEnd = useCallback((result: DropResult, provided: ResponderProvided) => {
    console.log('result:', result);
    if (result.destination) {
      updateAllProduct({ sourceIndex: result.source.index, destinationIndex: result.destination.index });
    }
  }, []);
  if (error) return <ErrorAlert>{error}</ErrorAlert>;
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
          <Droppable droppableId='products'>
            {(provided) => (
              <TableBody className='products' {...provided.droppableProps} ref={provided.innerRef}>
                {!data ? (
                  <EmptyTableBody>
                    <CircularProgress />
                  </EmptyTableBody>
                ) : data.length == 0 ? (
                  <EmptyTableBody>担当者を追加してください</EmptyTableBody>
                ) : (
                  data.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided) => (
                        <StyledTableRow
                          key={item.id}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          // {...provided.dragHandleProps}
                        >
                          <StyledTableCell>{item.name}</StyledTableCell>
                          <StyledTableCell>{formatDateHourMinute(item.updatedAt)}</StyledTableCell>
                          <StyledTableCell align='center'>
                            <UpdateProductButton id={item.id} name={item.name} disabled={item.disabled} />
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
                  ))
                )}
                {provided.placeholder}
              </TableBody>
            )}
          </Droppable>
        </Table>
      </TableContainer>
    </DragDropContext>
  );
};
