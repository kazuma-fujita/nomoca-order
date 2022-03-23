import { Box, Chip, Divider } from '@mui/material';
import { ErrorAlert } from 'components/atoms/alerts/error-alert';
import { useFetchClinic } from 'hooks/clinics/use-fetch-clinic';
import { UpsertClinicButton } from './upsert-clinic-button';

type Props = {
  isHiddenUpsertButton?: boolean;
};

export const ClinicDetail = ({ isHiddenUpsertButton }: Props) => {
  const { data, error } = useFetchClinic();
  return (
    <>
      <Divider textAlign='left'>
        <Chip label='配送先' />
      </Divider>
      <Box mt={4} ml={4}>
        {error ||
          (!data && (
            <>
              {error && <ErrorAlert>{error}</ErrorAlert>}
              {!data && <UpsertClinicButton />}
            </>
          ))}
        {data && (
          <Box display='flex' alignItems='center'>
            <Box sx={{ typography: 'body2' }}>
              {data.name} <br />
              {`〒  ${data.postalCode}`} <br />
              {`${data.state}${data.city}${data.address}  ${data.building ?? ''}`} <br />
              {`電話番号  ${data.phoneNumber}`}
            </Box>
            <Box ml={4} />
            {!isHiddenUpsertButton && <UpsertClinicButton />}
          </Box>
        )}
      </Box>
    </>
  );
};
