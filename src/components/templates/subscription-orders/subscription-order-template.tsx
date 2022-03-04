import { Grid } from '@mui/material';
import { SubscriptionOrder } from 'API';
import { StepperContainer } from 'components/molecules/stepper-container';
import { CompleteSingleOrderContainer } from 'components/organisms/single-orders/complete-single-order/complete-single-order-container';
import { ConfirmSingleOrderContainer } from 'components/organisms/single-orders/confirm-single-order/confirm-single-order-container';
import { CreateSubscriptionOrderButton } from 'components/organisms/subscription-orders/create-subscription-order/create-subscription-order-button';
import { SubscriptionOrderList } from 'components/organisms/subscription-orders/subscription-order-list/subscription-order-list';
import { FormScreenType } from 'constants/form-screen-query';
import { ExtendedOrder } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { FetchResponse } from 'hooks/swr/use-fetch';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { SingleOrderFormTemplateContainer } from '../single-orders/single-order-form-template/single-order-form-template-container';

const steps = ['定期便を入力する', '定期便内容を確認する', '申し込み完了'];

type Props = FetchResponse<ExtendedOrder<SubscriptionOrder>[]> & {
  currentScreen: string | string[] | undefined;
};

const Component = ({ currentScreen, ...rest }: Props) => {
  switch (currentScreen) {
    case undefined:
      return <SubscriptionOrderList {...rest} />;
    case FormScreenType.input:
      return (
        <StepperContainer steps={steps} activeStep={0}>
          <SingleOrderFormTemplateContainer />
        </StepperContainer>
      );
    case FormScreenType.confirm:
      return (
        <StepperContainer steps={steps} activeStep={1}>
          <ConfirmSingleOrderContainer />
        </StepperContainer>
      );
    case FormScreenType.complete:
      return (
        <StepperContainer steps={steps} activeStep={2}>
          <CompleteSingleOrderContainer />
        </StepperContainer>
      );
    default:
      return <Error statusCode={404} />;
  }
};

export const SubscriptionOrderTemplate = (props: FetchResponse<ExtendedOrder<SubscriptionOrder>[]>) => {
  const router = useRouter();
  return (
    <Grid container spacing={2} direction='column'>
      <Grid item>
        <Grid container justifyContent='flex-end'>
          <CreateSubscriptionOrderButton />
        </Grid>
      </Grid>
      <Grid item>
        <Grid item>
          <Component currentScreen={router.query.screen} {...props} />
        </Grid>
      </Grid>
    </Grid>
  );
};
