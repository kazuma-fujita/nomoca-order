import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { ErrorAlert } from 'components/atoms/alerts/error-alert';
import Form from 'components/atoms/form';
import { BaseSyntheticEvent, ReactElement } from 'react';

type Props = {
  dialogTitle: string;
  submitButtonLabel: string;
  startIcon: ReactElement;
  on: boolean;
  formId: string;
  isLoading: boolean;
  error: Error | null;
  submitHandler: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  cancelHandler: () => void;
  children: ReactElement;
};

export const InputDialog: React.FC<Props> = ({
  dialogTitle,
  submitButtonLabel,
  startIcon,
  on,
  formId,
  error,
  isLoading,
  submitHandler,
  cancelHandler,
  children,
}) => {
  return (
    <Dialog open={on}>
      <Box display='flex' justifyContent='center' alignItems='center' mt={4}>
        <Box width='80%'>
          <Box display='flex' justifyContent='center' mb={4}>
            <Typography variant='h5'>{dialogTitle}</Typography>
          </Box>
          {error && <ErrorAlert>{error}</ErrorAlert>}
          {/* 注文画面のform二重送信を回避する為、formのid属性とsubmit buttonのform属性に同じidを設定する。かつ、submit buttonをformタグの外に出す */}
          <Form id={formId} onSubmit={submitHandler}>
            {children}
          </Form>
          <Box display='flex' justifyContent='space-around' mt={4} mb={4}>
            <LoadingButton onClick={cancelHandler} loadingIndicator='Loading...' loading={isLoading}>
              キャンセル
            </LoadingButton>
            <LoadingButton
              type='submit'
              variant='contained'
              loading={isLoading}
              loadingPosition='start'
              startIcon={startIcon}
              form={formId}
            >
              {submitButtonLabel}
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};
