import { useOrderForm } from 'hooks/orders/use-order-form';
import { UseFieldArrayReturn } from 'react-hook-form';
import { useOrderFormParam } from 'stores/use-order-form-param';
import { SubscriptionOrderFormTemplate } from './subscription-order-form-template';

export const SubscriptionOrderFormTemplateContainer = () => {
  const { formReturn, fieldArrayReturn, submitHandler, cancelHandler } = useOrderForm();
  const { data } = useOrderFormParam();

  return (
    <SubscriptionOrderFormTemplate
      formReturn={formReturn}
      fieldArrayReturn={fieldArrayReturn as UseFieldArrayReturn}
      submitHandler={submitHandler}
      cancelHandler={cancelHandler}
      initialReceiptProducts={data!.products}
    />
  );
};
