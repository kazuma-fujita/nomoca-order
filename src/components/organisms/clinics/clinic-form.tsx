import { Box, Grid } from '@mui/material';
import { Clinic } from 'API';
import { AddressTextField } from 'components/molecules/text-fields/address-text-field';
import { BuildingTextField } from 'components/molecules/text-fields/building-text-field';
import { CityTextField } from 'components/molecules/text-fields/city-text-field';
import { ClinicNameTextField } from 'components/molecules/text-fields/clinic-name-text-field';
import { PostalCodeTextField } from 'components/molecules/text-fields/postal-code-text-field';
import { StateTextField } from 'components/molecules/text-fields/state-text-field';
import { UseFormReturn } from 'react-hook-form';
import { PhoneNumberTextField } from 'components/molecules/text-fields/phone-number-text-field';

type Props = UseFormReturn<Clinic> & {
  isLoading: boolean;
  handleOnChangePostalCode: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
};

export const ClinicForm = ({ isLoading, handleOnChangePostalCode, ...formReturn }: Props) => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <ClinicNameTextField {...formReturn} disabled={isLoading} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <PostalCodeTextField {...formReturn} handleOnChange={handleOnChangePostalCode} disabled={isLoading} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <StateTextField {...formReturn} disabled={isLoading} />
        </Grid>
        <Grid item xs={12} sm={12}>
          <CityTextField {...formReturn} disabled={isLoading} />
        </Grid>
        <Grid item xs={12} sm={12}>
          <AddressTextField {...formReturn} disabled={isLoading} />
        </Grid>
        <Grid item xs={12} sm={12}>
          <BuildingTextField {...formReturn} disabled={isLoading} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <PhoneNumberTextField {...formReturn} disabled={isLoading} />
        </Grid>
      </Grid>
      <Box m={4} />
    </>
  );
};
