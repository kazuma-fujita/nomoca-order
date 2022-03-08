import { Grid } from '@mui/material';
import { Order } from 'API';
import { StepperContainer } from 'components/molecules/stepper-container';
import { CreateSingleOrderButton } from 'components/organisms/single-orders/create-single-order-button';
import { SingleOrderList } from 'components/organisms/single-orders/single-order-list/single-order-list';
import { FormScreenType } from 'constants/form-screen-query';
import { ExtendedOrder } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { FetchResponse } from 'hooks/swr/use-fetch';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import { CompleteSingleOrderTemplate } from '../complete-single-order/complete-single-order-template';
import { ConfirmSingleOrderTemplate } from '../confirm-single-order-template/confirm-single-order-template';
import { SingleOrderFormTemplate } from '../single-order-form-template/single-order-form-template';

type Props = FetchResponse<ExtendedOrder<Order>[]> & {
  currentScreen: string | string[] | undefined;
};

const steps = ['注文を入力する', '注文内容を確認する', '注文完了'];

const Component = ({ currentScreen, ...rest }: Props) => {
  const [component, setComponent] = useState<ReactElement | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  if (currentScreen === undefined) {
    return <SingleOrderList {...rest} />;
  }
  switch (currentScreen) {
    case FormScreenType.input:
      setActiveStep(0);
      setComponent(<SingleOrderFormTemplate />);
    case FormScreenType.confirm:
      setActiveStep(1);
      setComponent(<ConfirmSingleOrderTemplate />);
    case FormScreenType.complete:
      setActiveStep(2);
      setComponent(<CompleteSingleOrderTemplate />);
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

export const SingleOrderTemplate = (props: FetchResponse<ExtendedOrder<Order>[]>) => {
  const router = useRouter();
  return (
    <Grid container spacing={2} direction='column'>
      <Grid item>
        <Grid container justifyContent='flex-end'>
          <CreateSingleOrderButton />
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
