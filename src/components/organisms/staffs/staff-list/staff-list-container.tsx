import { useUpdateAllStaff } from 'hooks/staffs/use-update-all-staff';
import { useCallback } from 'react';
import { DropResult, ResponderProvided } from 'react-beautiful-dnd';
import { useStaffList } from 'stores/use-staff-list';
import { StaffList } from './staff-list';

export const StaffListContainer = () => {
  const { data, error } = useStaffList();
  const { updateAllStaff } = useUpdateAllStaff();

  const handleOnDragEnd = useCallback(
    (result: DropResult, provided: ResponderProvided) => {
      if (result.destination) {
        updateAllStaff({ sourceIndex: result.source.index, destinationIndex: result.destination.index });
      }
    },
    [updateAllStaff],
  );

  return <StaffList data={data} error={error} handleOnDragEnd={handleOnDragEnd} />;
};
