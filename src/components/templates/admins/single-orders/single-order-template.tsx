import { Box } from '@mui/material';
import React, { useState } from 'react';
import { Order } from 'API';
import { ExportSingleOrderCSVButton } from 'components/organisms/admins/single-orders/export-single-order-csv-button';
import { SingleOrderList } from 'components/organisms/admins/single-orders/single-order-list';
import { ExtendedOrder } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { SingleOrderSearchForm } from 'components/organisms/admins/single-orders/search-form/single-order-search-form';
import { useExportSingleOrderCSVAndUpdateDeliveryStatus } from 'hooks/admins/single-orders/use-export-single-order-csv-and-update-delivery-status';
import { ErrorAlert } from 'components/atoms/alerts/error-alert';
import { SuccessAlert } from 'components/atoms/alerts/success-alert';

export const SingleOrderTemplate = () => {
  const [selectedItems, setSelectedItems] = useState<ExtendedOrder<Order>[]>([]);
  const objects = useExportSingleOrderCSVAndUpdateDeliveryStatus();
  const { successMessage, error, ...rest } = objects;

  return (
    <>
      <Box width='auto' display='flex' justifyContent='flex-start' mb={4}>
        <ExportSingleOrderCSVButton selectedItems={selectedItems} setSelectedItems={setSelectedItems} {...rest} />
      </Box>
      <Box width='auto' display='flex' justifyContent='center' mb={4}>
        <SingleOrderSearchForm setSelectedItems={setSelectedItems} />
      </Box>
      {error && <ErrorAlert>{error}</ErrorAlert>}
      {successMessage && <SuccessAlert>{successMessage}</SuccessAlert>}
      <SingleOrderList selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
    </>
  );
};
