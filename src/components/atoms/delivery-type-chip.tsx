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
    case DeliveryType.subscription:
      return <Chip label='定期便' color='warning' variant='outlined' size='small' />;
    default:
      return <></>;
  }
};
