import { Grid } from '@mui/material';
import { CreateStaffButton } from 'components/organisms/staffs/create-staff/create-staff-button';
import { ReactElement } from 'react';
import { StaffListContextProvider } from 'stores/use-staff-list';

type Props = {
  listComponent: ReactElement;
};

export const StaffTemplate = ({ listComponent }: Props) => {
  return (
    <StaffListContextProvider filterWithActiveStaff={false}>
      <Grid container spacing={2} direction='column'>
        <Grid item>
          <Grid container justifyContent='flex-end'>
            <CreateStaffButton />
          </Grid>
        </Grid>
        <Grid item>{listComponent}</Grid>
      </Grid>
    </StaffListContextProvider>
  );
};
