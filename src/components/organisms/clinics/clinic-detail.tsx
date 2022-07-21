import { Box } from '@mui/material';
import { useFetchClinic } from 'hooks/clinics/use-fetch-clinic';
import { Clinic } from 'API';

type Props = {
  clinic?: Clinic;
  staffName?: string;
};

export const ClinicDetail = ({ clinic, staffName }: Props) => {
  const { data } = useFetchClinic();
  const result = clinic ?? data;
  return (
    <Box sx={{ typography: 'body2' }} data-testid='clinic-detail'>
      {result ? (
        <>
          <div>{result.name} </div>
          <div>{`〒  ${result.postalCode}`} </div>
          <div>{`${result.state}${result.city}${result.address}  ${result.building ?? ''}`} </div>
          <div>{`電話番号  ${result.phoneNumber}`}</div>
          {staffName && <div>発注担当者 {staffName}</div>}
        </>
      ) : (
        '配送先を作成してください'
      )}
    </Box>
  );
};
