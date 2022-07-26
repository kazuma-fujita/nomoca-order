import { Box } from '@mui/material';
import React, { useState } from 'react';
import { Order } from 'API';
import { ExportSingleOrderCSVButton } from 'components/organisms/admins/single-orders/export-single-order-csv-button';
import { SingleOrderList } from 'components/organisms/admins/single-orders/single-order-list';
import { ExtendedOrder } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { SingleOrderSearchForm } from 'components/organisms/admins/single-orders/search-form/single-order-search-form';

export const SingleOrderTemplate = () => {
  const [selectedItems, setSelectedItems] = useState<ExtendedOrder<Order>[]>([]);

  return (
    <>
      <Box width='auto' display='flex' justifyContent='flex-start' mb={4}>
        <ExportSingleOrderCSVButton orders={selectedItems} />
      </Box>
      <Box width='auto' display='flex' justifyContent='center' mb={4}>
        <SingleOrderSearchForm />
      </Box>
      <SingleOrderList selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
    </>
  );
};
