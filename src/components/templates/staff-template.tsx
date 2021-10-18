import { StaffList } from 'components/organisms/staffs/staff-list';
import { CreateStaffDialog } from 'components/organisms/staffs/create-staff-dialog';
import { MainContainer } from '../molecules/main-container';

export const StaffTemplate = () => {
  return (
    <>
      <MainContainer>
        <CreateStaffDialog />
        <StaffList />
      </MainContainer>
    </>
  );
};
