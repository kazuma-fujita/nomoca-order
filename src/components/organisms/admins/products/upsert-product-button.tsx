import { Add, Edit } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { Product } from 'API';
import { InputDialog } from 'components/atoms/dialogs/input-dialog';
import { DisabledCheckbox } from 'components/molecules/checkboxes/disabled-checkbox';
import { ExportCSVCheckbox } from 'components/molecules/checkboxes/export-csv-checkbox';
import { ProductNameTextField } from 'components/molecules/text-fields/product-name-text-field';
import { ProductUnitPriceTextField } from 'components/molecules/text-fields/product-unit-price-text-field';
import { useUpsertProductButton } from 'hooks/products/use-upsert-button';

type Props = {
  product?: Product;
};

export const UpsertProductButton = ({ product }: Props) => {
  const { useFormReturn, submitButtonLabel, dialogTitle, on, toggle, isLoading, error, submitHandler, cancelHandler } =
    useUpsertProductButton(product);
  const startIcon = product ? <Edit /> : <Add />;
  return (
    <>
      <Button onClick={toggle} variant='outlined' startIcon={startIcon}>
        {dialogTitle}
      </Button>
      <InputDialog
        dialogTitle={dialogTitle}
        submitButtonLabel={submitButtonLabel}
        startIcon={startIcon}
        on={on}
        isLoading={isLoading}
        error={error}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
      >
        <>
          <ProductNameTextField {...useFormReturn} disabled={isLoading} />
          <ProductUnitPriceTextField {...useFormReturn} disabled={isLoading} />
          <ExportCSVCheckbox
            {...useFormReturn}
            isExportCSV={product ? product.isExportCSV : false}
            disabled={isLoading}
          />
          <DisabledCheckbox {...useFormReturn} isDisabled={product ? product.disabled : false} disabled={isLoading} />
        </>
      </InputDialog>
    </>
  );
};
