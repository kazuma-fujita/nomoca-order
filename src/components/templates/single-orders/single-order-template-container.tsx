import { useFetchOrderList } from 'hooks/orders/use-fetch-order-list';
import { SingleOrderTemplate } from './single-order-template';

export const SingleOrderTemplateContainer = () => {
  const fetchReturn = useFetchOrderList();

  return <SingleOrderTemplate {...fetchReturn} />;
};
