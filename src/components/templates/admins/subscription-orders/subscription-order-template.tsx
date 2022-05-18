import { Box } from '@mui/material';
import { ExportSubscriptionOrderCSVButton } from 'components/organisms/admins/subscription-orders/export-subscription-order-csv-button';
import { SubscriptionOrderList } from 'components/organisms/admins/subscription-orders/subscription-order-list';
import { useAdminSubscriptionOrderList } from 'hooks/subscription-orders/use-fetch-subscription-order-list';

export const SubscriptionOrderTemplate = () => {
  const fetchReturn = useAdminSubscriptionOrderList();
  return (
    <>
      <Box width='auto' display='flex' justifyContent='flex-start' mb={4}>
        <Box width='34em' display='flex' justifyContent='space-between'>
          <ExportSubscriptionOrderCSVButton orders={fetchReturn.data} />
        </Box>
      </Box>
      <SubscriptionOrderList {...fetchReturn} />
    </>
  );
};
