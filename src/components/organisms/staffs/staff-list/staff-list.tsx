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
import { formatDateHourMinute } from 'functions/dates/format-date-hour-minute';
import { useUpdateAllStaff } from 'hooks/staffs/use-update-all-staff';
import { useCallback } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import { useFetchStaffList } from 'hooks/staffs/use-fetch-staff-list';
import { UpsertStaffButton } from '../upsert-staff-button';

const header = [
  {
    label: '発注担当者名',
    minWidth: 160,
  },
  {
    label: '無効',
    minWidth: 80,
  },
  {
    label: 'プルダウン表示順',
    minWidth: 80,
  },
  {
    label: '更新日時',
    minWidth: 160,
  },
  {
    label: '編集',
    minWidth: 80,
  },
];

export const StaffList = () => {
  const { data, error, isLoading, isEmptyList } = useFetchStaffList();
  const { updateAllStaff, error: updateAllError } = useUpdateAllStaff();

  const handleOnDragEnd = useCallback(
    (result: DropResult, provided: ResponderProvided) => {
      if (result.destination) {
        updateAllStaff({ sourceIndex: result.source.index, destinationIndex: result.destination.index });
      }
    },
    [updateAllStaff],
  );

  const droppableId = 'staffs';
  if (error) return <ErrorAlert>{error}</ErrorAlert>;
  if (updateAllError) return <ErrorAlert>{updateAllError}</ErrorAlert>;
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <TableContainer component={Paper}>
        <Table aria-label='staffs table'>
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
                {isEmptyList && <EmptyTableBody colSpan={header.length}>発注担当者を追加してください</EmptyTableBody>}
                {data &&
                  data.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided) => (
                        <StyledTableRow key={item.id} ref={provided.innerRef} {...provided.draggableProps}>
                          <StyledTableCell>{`${item.lastName}  ${item.firstName}`}</StyledTableCell>
                          <StyledTableCell align='center'>{item.disabled ? '◯' : '-'}</StyledTableCell>
                          <StyledTableCell align='center' {...provided.dragHandleProps}>
                            <FormatLineSpacingIcon />
                          </StyledTableCell>
                          <StyledTableCell align='center'>{formatDateHourMinute(item.updatedAt)}</StyledTableCell>
                          <StyledTableCell align='center'>
                            <UpsertStaffButton staff={item} />
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
