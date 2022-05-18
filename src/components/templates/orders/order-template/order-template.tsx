import { StepperContainer } from 'components/molecules/stepper-container';
import { FormScreenType } from 'constants/form-screen-query';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { CompleteOrderTemplate } from '../complete-order-template/complete-order-template';
import { ConfirmOrderTemplate } from '../confirm-order-template/confirm-order-template';
import { OrderFormTemplate } from '../order-form-template/order-form-template';
import { OrderListTemplate } from '../order-list-template/order-list-template';
import { useOrderFormParam } from 'stores/use-order-form-param';
import { OrderType } from 'API';

export const OrderTemplate = () => {
  const { orderType } = useOrderFormParam();
  const router = useRouter();
  const steps =
    orderType === OrderType.singleOrder
      ? ['注文を入力する', '注文内容を確認する', '注文完了']
      : ['定期便注文を入力する', '注文内容を確認する', '申し込み完了'];

  switch (router.query.screen) {
    case undefined:
      return <OrderListTemplate />;
    case FormScreenType.input:
      return (
        <StepperContainer steps={steps} activeStep={0}>
          <OrderFormTemplate />
        </StepperContainer>
      );
    case FormScreenType.confirm:
      return (
        <StepperContainer steps={steps} activeStep={1}>
          <ConfirmOrderTemplate />
        </StepperContainer>
      );
    case FormScreenType.complete:
      return (
        <StepperContainer steps={steps} activeStep={2}>
          <CompleteOrderTemplate />
        </StepperContainer>
      );
    default:
      return <Error statusCode={404} />;
  }
};
