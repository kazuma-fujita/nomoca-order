import { StepperContainer } from 'components/molecules/stepper-container';
import { SubscriptionOrderList } from 'components/organisms/subscription-orders/subscription-order-list/subscription-order-list';
import { ConfirmSubscriptionOrderTemplate } from 'components/templates/subscription-orders/confirm-subscription-order-template/confirm-subscription-order-template';
import { SubscriptionOrderFormTemplate } from 'components/templates/subscription-orders/subscription-order-form-template/subscription-order-form-template';
import { FormScreenType } from 'constants/form-screen-query';
import Error from 'next/error';
import { useRouter } from 'next/router';

const steps = ['定期便注文を入力する', '注文内容を確認する', '申し込み完了'];

export const SubscriptionOrderTemplate = () => {
  const router = useRouter();
  switch (router.query.screen) {
    case undefined:
      return <SubscriptionOrderList />;
    case FormScreenType.input:
      return (
        <StepperContainer steps={steps} activeStep={0}>
          <SubscriptionOrderFormTemplate />
        </StepperContainer>
      );
    case FormScreenType.confirm:
      return (
        <StepperContainer steps={steps} activeStep={1}>
          <ConfirmSubscriptionOrderTemplate />
        </StepperContainer>
      );
    case FormScreenType.complete:
      return (
        <StepperContainer steps={steps} activeStep={2}>
          <ConfirmSubscriptionOrderTemplate />
        </StepperContainer>
      );
    default:
      return <Error statusCode={404} />;
  }
};
