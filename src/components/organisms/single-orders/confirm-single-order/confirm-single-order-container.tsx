import { FormScreenQuery } from 'constants/form-screen-query';
import { Path } from 'constants/path';
import { addDeliveryFeeAndExpressObjectToProductList } from 'functions/orders/add-delivery-fee-and-express-object-to-product-list';
import { getDeliveryTypeLabel } from 'functions/orders/get-delivery-type-label';
import { useCreateOrder } from 'hooks/orders/use-create-order';
import { NormalizedProduct } from 'hooks/orders/use-fetch-order-list';
import { useRouter } from 'next/router';
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

  // const normalizedProducts: NormalizedProduct[] = orderFormParam.products.map((item) => {
  //   const product = productList.find((product) => product.id === item.productID);
  //   return {
  //     relationID: product!.id,
  //     productID: product!.id,
  //     name: product!.name,
  //     unitPrice: product!.unitPrice,
  //     quantity: item.quantity!,
  //     viewOrder: product!.viewOrder,
  //   };
  // });

  // const sortedProducts = normalizedProducts.sort((a, b) => (a.viewOrder! > b.viewOrder! ? -1 : 1));

  // const mergedProducts = sortedProducts.reduce(
  //   (results: NormalizedProduct[], current: NormalizedProduct, currentIndex: number) => {
  //     const prev = results.find((item) => item.viewOrder! === current.viewOrder!);
  //     if (currentIndex > 0 && prev) {
  //       const total = { ...prev, quantity: prev.quantity + current.quantity };
  //       return results.map((item) => (item.viewOrder! === current.viewOrder! ? total : item));
  //     } else {
  //       return [...results, current];
  //     }
  //   },
  //   [],
  // );

  const staff = staffList.find((staff) => staff.id === orderFormParam.staffID);

  const submitHandler = async () => {
    try {
      // merge済みの商品を登録
      // await createOrder({ ...orderFormParam, products: mergedProducts });
      await createOrder(orderFormParam);
      router.push(`${Path.singleOrder}?${FormScreenQuery.complete}`, undefined, { shallow: true });
    } catch (error) {}
  };

  return (
    <ConfirmSingleOrder
      // products={addDeliveryFeeAndExpressObjectToProductList(mergedProducts, orderFormParam.deliveryType)}
      products={addDeliveryFeeAndExpressObjectToProductList(orderFormParam.products, orderFormParam.deliveryType)}
      deliveryTypeLabel={getDeliveryTypeLabel(orderFormParam.deliveryType)}
      staffName={staff!.name}
      isLoading={isLoading}
      error={error}
      submitHandler={submitHandler}
    />
  );
};
