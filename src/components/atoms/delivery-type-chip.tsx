import React from 'react';
import { Alert, Chip } from '@mui/material';
import { DeliveryStatus, DeliveryType } from 'API';
import { getDeliveryTypeLabel } from 'functions/orders/get-delivery-type-label';

type Props = {
  deliveryType: DeliveryType;
};

export const DeliveryTypeChip = ({ deliveryType }: Props) => {
  const label = getDeliveryTypeLabel(deliveryType);
  switch (deliveryType) {
    case DeliveryType.regular:
      return <Chip label={label} color='info' variant='outlined' size='small' />;
    case DeliveryType.express:
      return <Chip label={label} color='success' size='small' />;
    case DeliveryType.subscription:
      return <Chip label={label} color='warning' variant='outlined' size='small' />;
    default:
      return <></>;
  }
};
