import { Grid } from '@mui/material';
import { ProductList } from 'components/organisms/admins/products/product-list';
import { UpsertProductButton } from 'components/organisms/admins/products/upsert-product-button';

export const ProductTemplate = () => {
  return (
    <Grid container spacing={2} direction='column'>
      <Grid item>
        <Grid container justifyContent='flex-end'>
          <UpsertProductButton />
        </Grid>
      </Grid>
      <Grid item>
        <ProductList />
      </Grid>
    </Grid>
  );
};
