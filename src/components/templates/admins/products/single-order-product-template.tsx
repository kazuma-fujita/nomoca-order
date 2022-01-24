import { ProductType } from 'API';
import { ProductListContextProvider } from 'stores/use-product-list';
import { ProductTemplate } from './product-template';

export const SingleOrderProductTemplate = () => {
  return (
    <ProductListContextProvider productType={ProductType.singleOrder} filterWithActiveProduct={false}>
      <ProductTemplate />
    </ProductListContextProvider>
  );
};
