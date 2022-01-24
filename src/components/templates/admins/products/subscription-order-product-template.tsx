import { ProductType } from 'API';
import { ProductListContextProvider } from 'stores/use-product-list';
import { ProductTemplate } from './product-template';

export const SubscriptionOrderProductTemplate = () => {
  return (
    <ProductListContextProvider productType={ProductType.subscriptionOrder} filterWithActiveProduct={false}>
      <ProductTemplate />
    </ProductListContextProvider>
  );
};
