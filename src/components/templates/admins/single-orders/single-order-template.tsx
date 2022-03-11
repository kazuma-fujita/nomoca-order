import { Box } from '@mui/material';
import { ExportSingleOrderCSVButton } from 'components/organisms/admins/single-orders/export-single-order-csv-button';
import { SingleOrderList } from 'components/organisms/admins/single-orders/single-order-list';
import { UpdateSingleOrderStatusButton } from 'components/organisms/admins/single-orders/update-single-order-status-button';
import React, { useState } from 'react';

export const SingleOrderTemplate = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  return (
    <>
      <Box width='auto' display='flex' justifyContent='flex-start' mb={4}>
        <Box width='34em' display='flex' justifyContent='space-between'>
          <ExportSingleOrderCSVButton exportOrderIDs={selectedItems} />
          <UpdateSingleOrderStatusButton updateOrderIDs={selectedItems} />
        </Box>
      </Box>
      <SingleOrderList selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
    </>
  );
};
