import { Add, Edit } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Typography } from '@mui/material';
import { ErrorAlert } from 'components/atoms/alerts/error-alert';
import Form from 'components/atoms/form';
import { ClinicNameTextField } from 'components/molecules/text-fields/clinic-name-text-field';
import { ClinicDetail } from 'components/organisms/clinics/clinic-detail';
import { ClinicForm } from 'components/organisms/clinics/clinic-form';
import { useClinicForm } from 'hooks/clinics/use-clinic-form';

export const ClinicTemplate = () => {
  return (
    <Box display='flex' justifyContent='center' alignItems='center' mt={8}>
      {/* <Box width='40%'> */}
      {/* <Box display='flex' justifyContent='center' mb={8}>
        <Typography variant='h4'>配送先</Typography>
      </Box> */}
      {/* <Box display='flex' justifyContent='center' mb={8}> */}
      <ClinicDetail />
      {/* </Box> */}
      {/* </Box> */}
    </Box>
  );
};

// export const ClinicTemplate = () => {
//   const {
//     formReturn,
//     submitButtonLabel,
//     dialogTitle,
//     data,
//     isLoading,
//     error,
//     submitHandler,
//     handleOnChangePostalCode,
//   } = useClinicForm();
//   const startIcon = data ? <Edit /> : <Add />;
//   return (
//     <Box display='flex' justifyContent='center' alignItems='center' mt={8}>
//       <Box width='40%'>
//         <Box display='flex' justifyContent='center' mb={8}>
//           <Typography variant='h4'>{dialogTitle}</Typography>
//         </Box>
//         {error && <ErrorAlert>{error}</ErrorAlert>}
//         <Form onSubmit={submitHandler}>
//           <ClinicForm isLoading={isLoading} handleOnChangePostalCode={handleOnChangePostalCode} {...formReturn} />
//           <Box display='flex' justifyContent='center' mt={4}>
//             <LoadingButton
//               type='submit'
//               variant='contained'
//               loading={isLoading}
//               loadingPosition='start'
//               startIcon={startIcon}
//             >
//               {submitButtonLabel}
//             </LoadingButton>
//           </Box>
//         </Form>
//       </Box>
//     </Box>
//   );
// };
