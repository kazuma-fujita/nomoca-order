import { OrderType } from 'API';
import { ProductListContextProvider } from 'stores/use-product-list';
import { ProductTemplate } from './product-template';

export const SubscriptionOrderProductTemplate = () => {
  return (
    <ProductListContextProvider orderType={OrderType.subscriptionOrder} isFilterByActiveProduct={false}>
      <ProductTemplate />
    </ProductListContextProvider>
  );
};
