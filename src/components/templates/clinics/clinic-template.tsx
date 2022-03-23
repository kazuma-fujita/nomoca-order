import { Box } from '@mui/material';
import { ClinicDetail } from 'components/organisms/clinics/clinic-detail';

export const ClinicTemplate = () => {
  return (
    <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' mt={8}>
      <ClinicDetail />
    </Box>
  );
};
