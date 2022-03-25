import { Box } from '@mui/material';
import { useFetchClinic } from 'hooks/clinics/use-fetch-clinic';

export const ClinicDetail = () => {
  const { data } = useFetchClinic();
  return (
    <Box sx={{ typography: 'body2' }}>
      {data ? (
        <>
          {data.name} <br />
          {`〒  ${data.postalCode}`} <br />
          {`${data.state}${data.city}${data.address}  ${data.building ?? ''}`} <br />
          {`電話番号  ${data.phoneNumber}`}
        </>
      ) : (
        '配送先を作成してください'
      )}
    </Box>
  );
};
