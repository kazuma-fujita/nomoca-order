import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { OrderType } from 'API';
import { CompleteOrder } from 'components/organisms/orders/complete-order';
import { useOrderFormParam } from 'stores/use-order-form-param';
import BallotIcon from '@mui/icons-material/Ballot';

export const CompleteOrderTemplate = () => {
  const { orderType } = useOrderFormParam();
  return orderType === OrderType.singleOrder ? (
    <CompleteOrder caption='ご注文ありがとうございます' buttonLabel='注文履歴を見る' buttonStartIcon={<BallotIcon />} />
  ) : (
    <CompleteOrder
      caption='定期便の申し込みありがとうございます'
      buttonLabel='Topへ戻る'
      buttonStartIcon={<ArrowForwardIosIcon />}
    />
  );
};
