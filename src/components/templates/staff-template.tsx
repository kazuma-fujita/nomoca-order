import { StaffList } from 'components/organisms/staffs/staff-list';
import { CreateStaffButton } from 'components/organisms/staffs/create-staff-button';
import { Main } from 'components/molecules/main';

export const StaffTemplate = () => {
  return (
    <Main>
      <CreateStaffButton />
      <StaffList />
    </Main>
  );
};
