import LoadingButton from '@mui/lab/LoadingButton';
import { Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ErrorAlert } from 'components/atoms/alerts/error-alert';
import Form from 'components/atoms/form';
import { BaseSyntheticEvent, ReactElement } from 'react';

type Props = {
  dialogTitle: string;
  submitButtonLabel: string;
  startIcon: ReactElement;
  on: boolean;
  isLoading: boolean;
  error: Error | null;
  submitHandler: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  cancelHandler: () => void;
  children: ReactElement;
};

export const InputDialog: React.FC<Props> = (props: Props) => {
  return (
    <Dialog open={props.on}>
      <Form onSubmit={props.submitHandler}>
        <DialogTitle>{props.dialogTitle}</DialogTitle>
        <DialogContent>
          {props.error && <ErrorAlert>{props.error}</ErrorAlert>}
          <Box mt={2} mb={2}>
            {props.children}
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
            {props.submitButtonLabel}
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
};
