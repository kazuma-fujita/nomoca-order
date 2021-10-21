import { StaffList } from 'components/organisms/staffs/staff-list';
import { CreateStaffButton } from 'components/organisms/staffs/create-staff-button';
import { Main } from 'components/molecules/main';
import { Grid, Box } from '@mui/material';
import { Header } from 'components/molecules/header';

export const StaffTemplate = () => {
  return (
    <Main>
      <Grid container spacing={2} direction='column'>
        <Grid item>
          <Grid container justifyContent='flex-end'>
            <CreateStaffButton />
          </Grid>
        </Grid>
        <Grid item>
          <StaffList />
        </Grid>
      </Grid>
    </Main>
  );
};
