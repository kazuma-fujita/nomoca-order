import { Chip } from '@mui/material';
import { DeliveryType } from 'API';

type Props = {
  deliveryType: DeliveryType;
};

export const DeliveryTypeChip = ({ deliveryType }: Props) => {
  switch (deliveryType) {
    case DeliveryType.regular:
      return <Chip label='通常配送' color='info' variant='outlined' size='small' />;
    case DeliveryType.express:
      return <Chip label='速達配送' color='success' size='small' />;
    default:
      return <></>;
  }
};
