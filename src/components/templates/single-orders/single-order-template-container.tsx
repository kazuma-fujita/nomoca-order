import { SingleOrderListContainer } from 'components/organisms/single-orders/single-order-list/single-order-list-container';
import { SingleOrderTemplate } from './single-order-template';

export const SingleOrderTemplateContainer = () => <SingleOrderTemplate listComponent={<SingleOrderListContainer />} />;
