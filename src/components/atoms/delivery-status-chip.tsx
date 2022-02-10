import React from 'react';
import { Alert, Chip } from '@mui/material';
import { DeliveryStatus } from 'API';

type Props = {
  status: DeliveryStatus;
};

export const DeliveryStatusChip = ({ status }: Props) => {
  if (status === DeliveryStatus.ordered) {
    return <Chip label='未発送' color='primary' variant='outlined' size='small' />;
  }
  if (status === DeliveryStatus.delivered) {
    return <Chip label='発送済' color='primary' size='small' />;
  }
  if (status === DeliveryStatus.canceled) {
    return <Chip label='注文キャンセル' size='small' />;
  }
  return <></>;
};
