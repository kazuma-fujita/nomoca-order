import { Box } from '@mui/material';
import { SubscriptionOrder } from 'API';
import { ExportSubscriptionOrderCSVButton } from 'components/organisms/admins/subscription-orders/export-subscription-order-csv-button';
import { SubscriptionOrderList } from 'components/organisms/admins/subscription-orders/subscription-order-list';
import { ExtendedOrder } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { FetchResponse } from 'hooks/swr/use-fetch';

export const SubscriptionOrderTemplate = (props: FetchResponse<ExtendedOrder<SubscriptionOrder>[]>) => {
  return (
    <>
      <Box width='auto' display='flex' justifyContent='flex-start' mb={4}>
        <Box width='34em' display='flex' justifyContent='space-between'>
          <ExportSubscriptionOrderCSVButton updateOrderIDs={[]} />
        </Box>
      </Box>
      <SubscriptionOrderList {...props} />
    </>
  );
};
