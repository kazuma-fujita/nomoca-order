import { OrderType } from 'API';
import { ProductListContextProvider } from 'stores/use-product-list';
import { ProductTemplate } from './product-template';

export const SingleOrderProductTemplate = () => {
  return (
    <ProductListContextProvider orderType={OrderType.singleOrder} filterWithActiveProduct={false}>
      <ProductTemplate />
    </ProductListContextProvider>
  );
};
