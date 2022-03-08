import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { CompleteOrder } from 'components/organisms/orders/complete-order';

export const CompleteSubscriptionOrderTemplate = () => (
  <CompleteOrder
    caption='定期便の申し込みありがとうございます'
    buttonLabel='Topへ戻る'
    buttonStartIcon={<ArrowForwardIosIcon />}
  />
);
