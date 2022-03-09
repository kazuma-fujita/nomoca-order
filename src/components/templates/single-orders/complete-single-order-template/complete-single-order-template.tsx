import BallotIcon from '@mui/icons-material/Ballot';
import { CompleteOrder } from 'components/organisms/orders/complete-order';

export const CompleteSingleOrderTemplate = () => (
  <CompleteOrder caption='ご注文ありがとうございます' buttonLabel='注文履歴を見る' buttonStartIcon={<BallotIcon />} />
);
