import { Add, Edit } from '@mui/icons-material';
import { Box, Chip, CircularProgress, Divider, Typography } from '@mui/material';
import { ErrorAlert } from 'components/atoms/alerts/error-alert';
import { useFetchClinic } from 'hooks/clinics/use-fetch-clinic';

export const ClinicDetail = () => {
  const { data, isLoading, error, isEmptyList } = useFetchClinic();
  const startIcon = data ? <Edit /> : <Add />;
  return (
    <>
      <Divider textAlign='left'>
        <Chip label='配送先' />
      </Divider>
      {error && <ErrorAlert>{error}</ErrorAlert>}
      {isLoading && <CircularProgress aria-label='Now loading' />}
      {isEmptyList && <Typography variant='body1'>{'配送先を作成してください'}</Typography>}
      {data && (
        <Box mt={2} mb={8} ml={4}>
          <Typography variant='body1'>{data.name}</Typography>
          <Typography variant='body1'>{`〒  ${data.postalCode}`}</Typography>
          <Typography variant='body1'>{`${data.state}${data.city}${data.address}  ${data.building ?? ''}`}</Typography>
          <Typography variant='body1'>{`電話番号  ${data.phoneNumber}`}</Typography>
        </Box>
      )}
    </>
  );
};
