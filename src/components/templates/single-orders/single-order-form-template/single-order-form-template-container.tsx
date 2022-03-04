import { useOrderForm } from 'hooks/orders/use-order-form';
import { UseFieldArrayReturn } from 'react-hook-form';
import { useOrderFormParam } from 'stores/use-order-form-param';
import { SingleOrderFormTemplate } from './single-order-form-template';

export const SingleOrderFormTemplateContainer = () => {
  const { formReturn, fieldArrayReturn, submitHandler, cancelHandler } = useOrderForm();
  const { data } = useOrderFormParam();

  return (
    <SingleOrderFormTemplate
      formReturn={formReturn}
      fieldArrayReturn={fieldArrayReturn as UseFieldArrayReturn}
      submitHandler={submitHandler}
      cancelHandler={cancelHandler}
      initialReceiptProducts={data!.products}
    />
  );
};
