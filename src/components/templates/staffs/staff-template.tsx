import { Grid } from '@mui/material';
import { StaffList } from 'components/organisms/staffs/staff-list/staff-list';
import { UpsertStaffButton } from 'components/organisms/staffs/upsert-staff-button';

export const StaffTemplate = () => {
  return (
    <Grid container spacing={2} direction='column'>
      <Grid item>
        <Grid container justifyContent='flex-end'>
          <UpsertStaffButton />
        </Grid>
      </Grid>
      <Grid item>
        <StaffList />
      </Grid>
    </Grid>
  );
};
