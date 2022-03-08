import { OrderType } from 'API';
import { FormScreenQuery } from 'constants/form-screen-query';
import { Path } from 'constants/path';
import { addDeliveryFeeAndExpressObjectToProductList } from 'functions/orders/add-delivery-fee-and-express-object-to-product-list';
import { getDeliveryTypeLabel } from 'functions/orders/get-delivery-type-label';
import { mergeOrderFormProductList } from 'functions/orders/merge-order-form-product-list';
import { useCreateOrder } from 'hooks/orders/use-create-order';
import { useRouter } from 'next/router';
import { useOrderFormParam } from 'stores/use-order-form-param';
import { useProductList } from 'stores/use-product-list';
import { useStaffList } from 'stores/use-staff-list';

export const useConfirmOrder = () => {
  const router = useRouter();
  const { data: orderFormParam, orderType } = useOrderFormParam();
  const { data: productList } = useProductList();
  const { data: staffList } = useStaffList();
  const { createOrder, isLoading, error } = useCreateOrder();
  const basePath = orderType === OrderType.singleOrder ? Path.singleOrder : Path.subscriptionOrder;

  if (
    !orderFormParam ||
    !orderFormParam.products ||
    !orderFormParam.deliveryType ||
    !orderFormParam.staffID ||
    !productList ||
    !staffList
  ) {
    router.push(basePath);
  }

  // 入力された商品配列データをviewOrder順に並び替え、重複商品はquantityを合計してmergeし重複削除
  const mergedProducts = mergeOrderFormProductList(orderFormParam!.products!, productList!);
  const products = addDeliveryFeeAndExpressObjectToProductList(mergedProducts, orderFormParam!.deliveryType!);
  const submitHandler = async () => {
    try {
      // merge済みの商品を登録
      await createOrder(orderType, { ...orderFormParam, products: products });
      router.push(`${basePath}?${FormScreenQuery.complete}`, undefined, { shallow: true });
    } catch (error) {}
  };

  const staff = staffList!.find((staff) => staff.id === orderFormParam!.staffID);
  const deliveryTypeLabel = getDeliveryTypeLabel(orderFormParam!.deliveryType!);
  const deliveryStartLabel = `${orderFormParam!.deliveryStartYear} / ${orderFormParam!.deliveryStartMonth}月`;
  const deliveryIntervalLabel = `${orderFormParam!.deliveryInterval}ヶ月`;
  const staffName = staff!.name;
  return {
    products,
    deliveryTypeLabel,
    deliveryStartLabel,
    deliveryIntervalLabel,
    staffName,
    isLoading,
    error,
    submitHandler,
  };
};
