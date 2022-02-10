import { FormScreenQuery } from 'constants/form-screen-query';
import { Path } from 'constants/path';
import { addDeliveryFeeAndExpressObjectToProductList } from 'functions/orders/add-delivery-fee-and-express-object-to-product-list';
import { getDeliveryTypeLabel } from 'functions/orders/get-delivery-type-label';
import { useCreateOrder } from 'hooks/orders/use-create-order';
import { useRouter } from 'next/router';
import { useOrderFormParam } from 'stores/use-order-form-param';
import { useStaffList } from 'stores/use-staff-list';
import { ConfirmSingleOrder } from './confirm-single-order';

export const ConfirmSingleOrderContainer = () => {
  const router = useRouter();
  const { data: orderFormParam } = useOrderFormParam();
  const { data: staffList } = useStaffList();
  const { createOrder, isLoading, error } = useCreateOrder();

  if (
    !orderFormParam ||
    !orderFormParam.products ||
    !orderFormParam.deliveryType ||
    !orderFormParam.staffID ||
    !staffList
  ) {
    router.push(Path.singleOrder);
    return <></>;
  }

  const staff = staffList.find((staff) => staff.id === orderFormParam.staffID);

  const submitHandler = async () => {
    try {
      // merge済みの商品を登録
      await createOrder(orderFormParam);
      router.push(`${Path.singleOrder}?${FormScreenQuery.complete}`, undefined, { shallow: true });
    } catch (error) {}
  };

  return (
    <ConfirmSingleOrder
      products={addDeliveryFeeAndExpressObjectToProductList(orderFormParam.products, orderFormParam.deliveryType)}
      deliveryTypeLabel={getDeliveryTypeLabel(orderFormParam.deliveryType)}
      staffName={staff!.name}
      isLoading={isLoading}
      error={error}
      submitHandler={submitHandler}
    />
  );
};
