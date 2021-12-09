import { StaffList } from 'components/organisms/staffs/staff-list/staff-list';
import { CreateStaffButton } from 'components/organisms/staffs/create-staff/create-staff-button';
import { Main } from 'components/molecules/main';
import { Grid } from '@mui/material';
import { StaffListContainer } from 'components/organisms/staffs/staff-list/staff-list-container';
import { StaffListContextProvider } from 'stores/use-staff-list';

export const StaffTemplate = () => {
  return (
    <StaffListContextProvider filterWithActiveStaff={false}>
      {/* <Main> */}
      <Grid container spacing={2} direction='column'>
        <Grid item>
          <Grid container justifyContent='flex-end'>
            <CreateStaffButton />
          </Grid>
        </Grid>
        <Grid item>
          <StaffListContainer />
        </Grid>
      </Grid>
      {/* </Main> */}
    </StaffListContextProvider>
  );
};
