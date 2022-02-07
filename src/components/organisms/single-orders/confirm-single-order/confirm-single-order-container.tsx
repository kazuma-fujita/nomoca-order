import { FormScreenQuery } from 'constants/form-screen-query';
import { Path } from 'constants/path';
import { addDeliveryFeeAndExpressObjectToProductList } from 'functions/orders/add-delivery-fee-and-express-object-to-product-list';
import { getDeliveryTypeLabel } from 'functions/orders/get-delivery-type-label';
import { useCreateOrder } from 'hooks/orders/use-create-order';
import { NormalizedProduct } from 'hooks/orders/use-fetch-order-list';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useOrderFormParam } from 'stores/use-order-form-param';
import { useProductList } from 'stores/use-product-list';
import { useStaffList } from 'stores/use-staff-list';
import { ConfirmSingleOrder } from './confirm-single-order';

export const ConfirmSingleOrderContainer = () => {
  const router = useRouter();
  const { data: orderFormParam } = useOrderFormParam();
  const { data: productList } = useProductList();
  const { data: staffList } = useStaffList();
  const { createOrder, isLoading, error } = useCreateOrder();

  const submitHandler = useCallback(async () => {
    try {
      await createOrder(orderFormParam!);
      router.push(`${Path.singleOrder}?${FormScreenQuery.complete}`, undefined, { shallow: true });
    } catch (error) {}
  }, [createOrder, orderFormParam, router]);

  if (
    !orderFormParam ||
    !orderFormParam.products ||
    !orderFormParam.deliveryType ||
    !orderFormParam.staffID ||
    !productList ||
    !staffList
  ) {
    router.push(Path.singleOrder);
    return <></>;
  }

  const filteredProducts = productList.filter((product) =>
    orderFormParam.products!.some((item) => product.id === item.productID),
  );

  const staffs = staffList.filter((product) => product.id === orderFormParam.staffID);

  if (filteredProducts.length !== productList.length || staffs.length !== 1) {
    router.push(Path.singleOrder);
    return <></>;
  }

  const normalizedProducts: NormalizedProduct[] = orderFormParam.products.map((item, index) => ({
    relationID: item.relationID!,
    productID: filteredProducts[index].id,
    name: filteredProducts[index].name,
    unitPrice: filteredProducts[index].unitPrice,
    quantity: item.quantity!,
  }));

  return (
    <ConfirmSingleOrder
      products={addDeliveryFeeAndExpressObjectToProductList(normalizedProducts, orderFormParam.deliveryType)}
      deliveryTypeLabel={getDeliveryTypeLabel(orderFormParam.deliveryType)}
      staffName={staffs[0].name}
      isLoading={isLoading}
      error={error}
      submitHandler={submitHandler}
    />
  );
};
