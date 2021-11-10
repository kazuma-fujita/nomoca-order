import AddBoxIcon from '@mui/icons-material/AddBox';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { Product, Staff, SubscriptionOrder } from 'API';
import { ErrorAlert } from 'components/atoms/error-alert';
import Form from 'components/atoms/form';
import { BaseSyntheticEvent, ReactElement } from 'react';
import { Controller, UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';

type Props = {
  label: string;
  startIcon: ReactElement;
  on: boolean;
  isLoading: boolean;
  error: Error | null;
  submitHandler: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  cancelHandler: () => void;
  useFormReturn: UseFormReturn<SubscriptionOrder, object>;
  useFieldArrayReturn: UseFieldArrayReturn;
  productList: Product[] | undefined;
  staffList: Staff[] | undefined;
  staffID?: string;
};

type ProductErrorField = {
  productID: { message: string };
};

export const InputSubscriptionOrderDialog = (props: Props) => {
  return (
    <Dialog open={props.on} fullWidth={true}>
      <Form onSubmit={props.submitHandler}>
        <DialogTitle>定期便を{props.label}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>担当者名を追加する</DialogContentText> */}
          {props.error && <ErrorAlert>{props.error}</ErrorAlert>}
          {props.useFieldArrayReturn.fields.map((item, index) => (
            <Box mt={2} mb={2} key={item.id} sx={{ display: 'flex' }}>
              <Controller
                name={`products.items.${index}.productID`}
                control={props.useFormReturn.control}
                // defaultValue={props.staffList && props.staffList[0].id}
                // defaultValue={item.id ?? ''}
                defaultValue={''}
                rules={{ required: '商品を選択してください' }}
                render={({ field, formState: { errors } }) => (
                  <TextField
                    select
                    fullWidth
                    label='商品'
                    error={Boolean(
                      errors.products &&
                        'items' in errors.products &&
                        (errors.products.items as ProductErrorField[])[index]
                    )}
                    helperText={
                      errors.products &&
                      'items' in errors.products &&
                      (errors.products.items as ProductErrorField[])[index] &&
                      (errors.products.items as ProductErrorField[])[index].productID.message
                    }
                    {...field}
                  >
                    {props.productList &&
                      props.productList.map((product) => (
                        <MenuItem key={product.id} value={product.id}>
                          {product.name}
                        </MenuItem>
                      ))}
                  </TextField>
                )}
              />
              {index !== 0 && (
                <IconButton onClick={() => props.useFieldArrayReturn.remove(index)}>
                  <DisabledByDefaultIcon />
                </IconButton>
              )}
              <IconButton onClick={() => props.useFieldArrayReturn.append({ productID: '' })}>
                <AddBoxIcon />
              </IconButton>
            </Box>
          ))}
          <Box mt={2} mb={2}>
            <Controller
              name='staffID'
              control={props.useFormReturn.control}
              // defaultValue={props.staffID ?? ''}
              defaultValue={''}
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
