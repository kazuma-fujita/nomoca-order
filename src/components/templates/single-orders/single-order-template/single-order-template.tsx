import { StepperContainer } from 'components/molecules/stepper-container';
import { FormScreenType } from 'constants/form-screen-query';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { ConfirmSingleOrderTemplate } from '../confirm-single-order-template/confirm-single-order-template';
import { SingleOrderFormTemplate } from '../single-order-form-template/single-order-form-template';
import { SingleOrderListTemplate } from '../single-order-list-template/single-order-list-template';

const steps = ['注文を入力する', '注文内容を確認する', '申し込み完了'];

export const SingleOrderTemplate = () => {
  const router = useRouter();
  switch (router.query.screen) {
    case undefined:
      return <SingleOrderListTemplate />;
    case FormScreenType.input:
      return (
        <StepperContainer steps={steps} activeStep={0}>
          <SingleOrderFormTemplate />
        </StepperContainer>
      );
    case FormScreenType.confirm:
      return (
        <StepperContainer steps={steps} activeStep={1}>
          <ConfirmSingleOrderTemplate />
        </StepperContainer>
      );
    case FormScreenType.complete:
      return (
        <StepperContainer steps={steps} activeStep={2}>
          <ConfirmSingleOrderTemplate />
        </StepperContainer>
      );
    default:
      return <Error statusCode={404} />;
  }
};
