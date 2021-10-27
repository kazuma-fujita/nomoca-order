import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';
import { SubscriptionOrder, Staff } from 'API';
import { ErrorAlert } from 'components/atoms/error-alert';
import Form from 'components/atoms/form';
import { BaseSyntheticEvent, ReactElement } from 'react';
import {
  Box,
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Controller, UseFormReturn } from 'react-hook-form';

type Props = {
  label: string;
  startIcon: ReactElement;
  on: boolean;
  isLoading: boolean;
  error: Error | null;
  submitHandler: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  cancelHandler: () => void;
  useFormReturn: UseFormReturn<SubscriptionOrder, object>;
  staffList: Staff[] | undefined;
  staffID?: string;
};

export const InputSubscriptionOrderDialog = (props: Props) => {
  return (
    <Dialog open={props.on}>
      <Form onSubmit={props.submitHandler}>
        <DialogTitle>定期便を{props.label}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>担当者名を追加する</DialogContentText> */}
          {props.error && <ErrorAlert>{props.error}</ErrorAlert>}
          <Box mt={2} mb={2}>
            <Controller
              name='staffID'
              control={props.useFormReturn.control}
              // defaultValue={props.staffList && props.staffList[0].id}
              defaultValue={props.staffID ?? ''}
              rules={{ required: '担当者を選択してください' }}
              render={({ field, formState: { errors } }) => (
                <TextField
                  select
                  fullWidth
                  label='担当者'
                  error={Boolean(errors.staffID)}
                  helperText={errors.staffID && errors.staffID.message}
                  {...field}
                >
                  {props.staffList &&
                    props.staffList.map((staff) => (
                      <MenuItem key={staff.id} value={staff.id}>
                        {staff.name}
                      </MenuItem>
                    ))}
                </TextField>
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <LoadingButton onClick={props.cancelHandler} loadingIndicator='Loading...' loading={props.isLoading}>
            キャンセル
          </LoadingButton>
          <LoadingButton
            type='submit'
            variant='contained'
            loading={props.isLoading}
            loadingPosition='start'
            startIcon={props.startIcon}
          >
            {props.label}
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
};
