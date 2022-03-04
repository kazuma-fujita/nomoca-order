import { Grid } from '@mui/material';
import { SubscriptionOrder } from 'API';
import { StepperContainer } from 'components/molecules/stepper-container';
import { CreateSubscriptionOrderButton } from 'components/organisms/subscription-orders/create-subscription-order/create-subscription-order-button';
import { SubscriptionOrderList } from 'components/organisms/subscription-orders/subscription-order-list/subscription-order-list';
import { FormScreenType } from 'constants/form-screen-query';
import { ExtendedOrder } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { FetchResponse } from 'hooks/swr/use-fetch';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { useState, ReactElement } from 'react';
import { SubscriptionOrderFormTemplateContainer } from '../subscription-orders/subscription-order-form-template/subscription-order-form-template-container';

const steps = ['定期便を入力する', '定期便内容を確認する', '申し込み完了'];

type Props = FetchResponse<ExtendedOrder<SubscriptionOrder>[]> & {
  currentScreen: string | string[] | undefined;
};

const Component = ({ currentScreen, ...rest }: Props) => {
  const [component, setComponent] = useState<ReactElement | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  if (currentScreen === undefined) {
    return <SubscriptionOrderList {...rest} />;
  }
  switch (currentScreen) {
    case FormScreenType.input:
      setActiveStep(0);
      setComponent(<SubscriptionOrderFormTemplateContainer />);
    case FormScreenType.confirm:
      setActiveStep(1);
    // setComponent(<ConfirmSubscriptionOrderContainer />);
    case FormScreenType.complete:
      setActiveStep(2);
    // setComponent(<CompleteSubscriptionOrderContainer />);
    default:
      setComponent(null);
  }
  return component ? (
    <StepperContainer steps={steps} activeStep={activeStep}>
      {component}
    </StepperContainer>
  ) : (
    <Error statusCode={404} />
  );
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
