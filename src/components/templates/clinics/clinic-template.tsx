import { Box, Chip, Divider } from '@mui/material';
import { ClinicDetail } from 'components/organisms/clinics/clinic-detail';

export const ClinicTemplate = () => {
  return (
    <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' mt={8}>
      <Divider textAlign='left'>
        <Chip label='配送先' />
      </Divider>
      <Box mt={4} ml={4}>
        <ClinicDetail />
      </Box>
    </Box>
  );
};
