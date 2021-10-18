import { StaffList } from 'components/organisms/staffs/staff-list';
import { CreateStaffDialog } from 'components/organisms/staffs/create-staff-dialog';
import { Main } from 'components/molecules/main';

export const StaffTemplate = () => {
  return (
    <Main>
      <CreateStaffDialog />
      <StaffList />
    </Main>
  );
};
