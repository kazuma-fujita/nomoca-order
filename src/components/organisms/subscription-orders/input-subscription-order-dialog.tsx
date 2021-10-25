import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { SubscriptionOrder } from 'API';
import { ErrorAlert } from 'components/atoms/error-alert';
import Form from 'components/atoms/form';
import { BaseSyntheticEvent, ReactElement } from 'react';
import { UseFormReturn } from 'react-hook-form';

type Props = {
  label: string;
  startIcon: ReactElement;
  on: boolean;
  isLoading: boolean;
  error: Error | null;
  submitHandler: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  cancelHandler: () => void;
  useFormReturn: UseFormReturn<SubscriptionOrder, object>;
};

export const InputSubscriptionOrderDialog = (props: Props) => {
  return (
    <Dialog open={props.on}>
      <Form onSubmit={props.submitHandler}>
        <DialogTitle>定期便を{props.label}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>担当者名を追加する</DialogContentText> */}
          {props.error && <ErrorAlert>{props.error}</ErrorAlert>}
          {/* <Box mt={2} mb={2}>
            <SubscriptionOrderNameTextField {...props.useFormReturn} disabled={props.isLoading} />
          </Box> */}
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
