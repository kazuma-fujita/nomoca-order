import { Box } from '@mui/material';
import { ErrorAlert } from 'components/atoms/alerts/error-alert';
import { SuccessAlert } from 'components/atoms/alerts/success-alert';
import { ExportSubscriptionOrderCSVButton } from 'components/organisms/admins/subscription-orders/export-subscription-order-csv-button';
import { SubscriptionOrderList } from 'components/organisms/admins/subscription-orders/subscription-order-list';
import { useExportSubscriptionOrderCSVAndCreateOrderHistory } from 'hooks/admins/subscription-orders/use-export-subscription-order-csv-and-create-order-history';
import { useFetchSubscriptionOrderList } from 'hooks/subscription-orders/use-fetch-subscription-order-list';

export const SubscriptionOrderTemplate = () => {
  const fetchReturn = useFetchSubscriptionOrderList();
  const objects = useExportSubscriptionOrderCSVAndCreateOrderHistory();
  const { successMessage, error, ...rest } = objects;
  return (
    <>
      <Box width='auto' display='flex' justifyContent='flex-start' mb={4}>
        <Box width='34em' display='flex' justifyContent='space-between'>
          <ExportSubscriptionOrderCSVButton orders={fetchReturn.data} {...rest} />
        </Box>
      </Box>
      {error && <ErrorAlert>{error}</ErrorAlert>}
      {successMessage && <SuccessAlert>{successMessage}</SuccessAlert>}
      <SubscriptionOrderList {...fetchReturn} />
    </>
  );
};
