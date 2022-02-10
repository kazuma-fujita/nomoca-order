import React from 'react';
import { Alert, Chip } from '@mui/material';
import { DeliveryStatus, DeliveryType } from 'API';
import { getDeliveryTypeLabel } from 'functions/orders/get-delivery-type-label';

type Props = {
  type: DeliveryType;
};

export const DeliveryTypeChip = ({ type }: Props) => {
  const label = getDeliveryTypeLabel(type);
  if (type === DeliveryType.regular) {
    return <Chip label={label} color='info' variant='outlined' size='small' />;
  }
  if (type === DeliveryType.express) {
    return <Chip label={label} color='success' size='small' />;
  }
  return <></>;
};
