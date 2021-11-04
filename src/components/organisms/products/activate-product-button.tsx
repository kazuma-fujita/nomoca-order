import { Switch } from '@mui/material';
import { useUpdateProduct } from 'hooks/products/use-update-product';
import { useCallback } from 'react';
import { useToggle } from 'react-use';
import { ActivateDialog } from 'components/atoms/dialogs/activate-dialog';

type Props = {
  id: string;
  name: string;
  disabled: boolean;
};

export const ActivateProductButton = (props: Props) => {
  const { updateProduct, isLoading, error, resetState } = useUpdateProduct();
  const [on, toggle] = useToggle(false);
  const submitHandler = useCallback(async () => {
    await updateProduct({ id: props.id, disabled: !props.disabled });
    if (!error) {
      cancelHandler();
    }
  }, [props.disabled]);
  const cancelHandler = useCallback(() => {
    resetState();
    toggle();
  }, []);
  return (
    <>
      <Switch checked={!props.disabled} onClick={toggle} inputProps={{ 'aria-label': 'activate-switch' }} />
      <ActivateDialog
        dialogTitle='商品'
        name={props.name}
        on={on}
        isLoading={isLoading}
        error={error}
        disabled={props.disabled}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
      />
    </>
  );
};
