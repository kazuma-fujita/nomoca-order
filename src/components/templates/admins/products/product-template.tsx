import { Grid } from '@mui/material';
import { Product } from 'API';
import { CreateProductButton } from 'components/organisms/products/create-product-button';
import { ProductList } from 'components/organisms/products/product-list';
import { FetchResponse } from 'hooks/swr/use-fetch';

export const ProductTemplate = (props: FetchResponse<Product[]>) => {
  return (
    <Grid container spacing={2} direction='column'>
      <Grid item>
        <Grid container justifyContent='flex-end'>
          <CreateProductButton />
        </Grid>
      </Grid>
      <Grid item>
        <ProductList {...props} />
      </Grid>
    </Grid>
  );
};
