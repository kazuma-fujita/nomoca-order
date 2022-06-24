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
    <Box sx={{ typography: 'body2' }} data-cy='clinic-detail'>
      {result ? (
        <>
          <div>{result.name} </div>
          <div>{`〒  ${result.postalCode}`} </div>
          <div>{`${result.state}${result.city}${result.address}  ${result.building ?? ''}`} </div>
          <div>{`電話番号  ${result.phoneNumber}`}</div>
        </>
      ) : (
        '配送先を作成してください'
      )}
    </Box>
  );
};
