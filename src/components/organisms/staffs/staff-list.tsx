import FormatLineSpacingIcon from '@mui/icons-material/FormatLineSpacing';
import { CircularProgress, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ErrorAlert } from 'components/atoms/error-alert';
import { EmptyTableBody } from 'components/atoms/tables/empty-table-body';
import { StyledTableCell } from 'components/atoms/tables/styled-table-cell';
import { StyledTableRow } from 'components/atoms/tables/styled-table-row';
import { useFormatDateHourMinute } from 'hooks/date-hooks/use-format-date-hour-minute';
import { useUpdateAllStaff } from 'hooks/staffs/use-update-all-staff';
import { useCallback } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import { useStaffList } from 'stores/use-staff-list';
import { ActivateStaffButton } from './activate-staff-button';
import { UpdateStaffButton } from './update-staff-button';

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
    label: 'プルダウン表示順',
    minWidth: 80,
  },
];

export const StaffList = () => {
  const { data, error } = useStaffList();
  const { formatDateHourMinute } = useFormatDateHourMinute();
  const { updateAllStaff } = useUpdateAllStaff();

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
                {(!data || data.length == 0) && (
                  <EmptyTableBody headerLength={header.length}>
                    {!data ? <CircularProgress /> : '担当者を追加してください'}
                  </EmptyTableBody>
                )}
                {data &&
                  data.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided) => (
                        <StyledTableRow key={item.id} ref={provided.innerRef} {...provided.draggableProps}>
                          <StyledTableCell>{item.name}</StyledTableCell>
                          <StyledTableCell>{formatDateHourMinute(item.updatedAt)}</StyledTableCell>
                          <StyledTableCell align='center'>
                            <UpdateStaffButton id={item.id} name={item.name} disabled={item.disabled} />
                          </StyledTableCell>
                          <StyledTableCell align='center'>
                            <ActivateStaffButton id={item.id} name={item.name} disabled={item.disabled} />
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
