import { Box } from '@mui/material';
import { useFetchClinic } from 'hooks/clinics/use-fetch-clinic';
import { Clinic } from 'API';

type Props = {
  clinic?: Clinic;
};

export const ClinicDetail = ({ clinic }: Props) => {
  const { data } = useFetchClinic();
  const result = clinic ?? data;
  return (
    <Box sx={{ typography: 'body2' }}>
      {result ? (
        <>
          {result.name} <br />
          {`〒  ${result.postalCode}`} <br />
          {`${result.state}${result.city}${result.address}  ${result.building ?? ''}`} <br />
          {`電話番号  ${result.phoneNumber}`}
        </>
      ) : (
        '配送先を作成してください'
      )}
    </Box>
  );
};
