import { Add, Edit } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { Product, Staff } from 'API';
import { InputDialog } from 'components/molecules/dialogs/input-dialog';
import { DisabledCheckbox } from 'components/molecules/checkboxes/disabled-checkbox';
import { ExportCSVCheckbox } from 'components/molecules/checkboxes/export-csv-checkbox';
import { ProductNameTextField } from 'components/molecules/text-fields/product-name-text-field';
import { ProductUnitPriceTextField } from 'components/molecules/text-fields/product-unit-price-text-field';
import { useUpsertProductForm } from 'hooks/products/use-upsert-product-form';
import { UseFormReturn } from 'react-hook-form';
import { Box } from '@mui/material';
import { ProductPurchasePriceTextField } from 'components/molecules/text-fields/product-purchase-price-text-field';
import { BCartDeliveryGroupIdTextField } from 'components/molecules/text-fields/b-cart-delivery-group-id-text-field';
import { BCartSetIdTextField } from 'components/molecules/text-fields/b-cart-set-id-text-field';
import { BCartSeparateDeliveryRouteCheckbox } from 'components/molecules/checkboxes/b-cart-separate-delivery-route-checkbox';

type Props = {
  product?: Product;
};

export const UpsertProductButton = ({ product }: Props) => {
  const { useFormReturn, submitButtonLabel, dialogTitle, on, toggle, isLoading, error, submitHandler, cancelHandler } =
    useUpsertProductForm(product);
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
        formId='product-form'
        isLoading={isLoading}
        error={error}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
      >
        <>
          <ProductNameTextField {...useFormReturn} disabled={isLoading} />
          <Box mb={2} />
          <ProductPurchasePriceTextField {...useFormReturn} disabled={isLoading} />
          <Box mb={2} />
          <ProductUnitPriceTextField {...useFormReturn} disabled={isLoading} />
          <Box mb={2} />
          <ExportCSVCheckbox
            {...useFormReturn}
            isExportCSV={product ? product.isExportCSV : false}
            disabled={isLoading}
          />
          <BCartDeliveryGroupIdTextField {...useFormReturn} disabled={isLoading} />
          <Box mb={2} />
          <BCartSetIdTextField {...useFormReturn} disabled={isLoading} />
          <BCartSeparateDeliveryRouteCheckbox
            {...useFormReturn}
            isBCartSeparateDeliveryRoute={
              product && product.isBCartSeparateDeliveryRoute ? product.isBCartSeparateDeliveryRoute : false
            }
            disabled={isLoading}
          />
          <DisabledCheckbox
            {...(useFormReturn as UseFormReturn<Staff | Product, object>)}
            helperTextLabel={'商品'}
            isDisabled={product ? product.disabled : false}
            disabled={isLoading}
          />
        </>
      </InputDialog>
    </>
  );
};
