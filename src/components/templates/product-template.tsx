import { Grid } from '@mui/material';
import { Main } from 'components/molecules/main';
import { CreateProductButton } from 'components/organisms/products/create-product-button';
import { ProductList } from 'components/organisms/products/product-list';

export const ProductTemplate = () => {
  return (
    <Main>
      <Grid container spacing={2} direction='column'>
        <Grid item>
          <Grid container justifyContent='flex-end'>
            <CreateProductButton />
          </Grid>
        </Grid>
        <Grid item>
          <ProductList />
        </Grid>
      </Grid>
    </Main>
  );
};
