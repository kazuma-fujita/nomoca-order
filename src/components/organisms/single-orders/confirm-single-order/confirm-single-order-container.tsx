import { FormScreenQuery } from 'constants/form-screen-query';
import { Path } from 'constants/path';
import { useCreateOrder } from 'hooks/orders/use-create-order';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { ProductRelation, useOrderFormParam } from 'stores/use-order-form-param';
import { useProductList } from 'stores/use-product-list';
import { useStaffList } from 'stores/use-staff-list';
import { ConfirmSingleOrder } from './confirm-single-order';

export type DisplayProduct = ProductRelation & {
  name: string;
  unitPrice: number;
};

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

  if (!orderFormParam || !orderFormParam.products || !orderFormParam.staffID || !productList || !staffList) {
    router.push(Path.singleOrder);
    return <></>;
  }

  const products = productList.filter((product) =>
    orderFormParam.products!.some((item) => product.id === item.productID),
  );
  const staffs = staffList.filter((product) => product.id === orderFormParam.staffID);

  if (products.length !== productList.length || staffs.length !== 1) {
    router.push(Path.singleOrder);
    return <></>;
  }
  const displayProducts = orderFormParam.products.map((item, index) => ({
    ...item,
    name: products[index].name,
    unitPrice: products[index].unitPrice,
  }));

  return (
    <ConfirmSingleOrder
      products={displayProducts}
      staffName={staffs[0].name}
      isLoading={isLoading}
      error={error}
      submitHandler={submitHandler}
    />
  );
};
