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
import { useEffect } from 'react';

export const OrderTemplate = () => {
  // 以下各画面遷移時に shallow=true を指定すると画面リロードが走らず、SPAの挙動となる
  // router.push('/order?screen=input, undefined, { shallow: true });
  // router.push時に遷移後の screen=name を指定し、useRouterで変更後のクエリを取得、コンポーネントを切り替える
  const router = useRouter();
  const { orderType } = useOrderFormParam();
  // GET queryパラメーター(?screen=input)
  const screenType = router.query.screen;
  // 画面遷移後画面Topへ移動
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [screenType]);

  const steps =
    orderType === OrderType.singleOrder
      ? ['注文を入力する', '注文内容を確認する', '注文完了']
      : ['定期便注文を入力する', '注文内容を確認する', '申し込み完了'];

  switch (screenType) {
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
