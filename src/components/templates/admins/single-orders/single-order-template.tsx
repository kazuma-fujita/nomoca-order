import { Box } from '@mui/material';
import React, { useState } from 'react';
import { Order } from 'API';
import { ExportSingleOrderCSVButton } from 'components/organisms/admins/single-orders/export-single-order-csv-button';
import { SingleOrderList } from 'components/organisms/admins/single-orders/single-order-list';
import { ExtendedOrder } from 'hooks/subscription-orders/use-fetch-subscription-order-list';

export const SingleOrderTemplate = () => {
  const [selectedItems, setSelectedItems] = useState<ExtendedOrder<Order>[]>([]);

  return (
    <>
      <Box width='auto' display='flex' justifyContent='flex-start' mb={4}>
        <Box width='34em' display='flex' justifyContent='space-between'>
          <ExportSingleOrderCSVButton orders={selectedItems} />
        </Box>
      </Box>
      <SingleOrderList selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
    </>
  );
};
