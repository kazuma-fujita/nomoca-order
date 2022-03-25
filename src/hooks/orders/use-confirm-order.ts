import { OrderType } from 'API';
import { FormScreenQuery } from 'constants/form-screen-query';
import { Path } from 'constants/path';
import { addDeliveryFeeAndExpressObjectToProductList } from 'functions/orders/add-delivery-fee-and-express-object-to-product-list';
import { getDeliveryTypeLabel } from 'functions/orders/get-delivery-type-label';
import { useCreateOrder } from 'hooks/orders/use-create-order';
import { useRouter } from 'next/router';
import { useOrderFormParam } from 'stores/use-order-form-param';
import { useFetchProductList } from 'hooks/products/use-fetch-product-list';
import { useFetchStaffList } from 'hooks/staffs/use-fetch-staff-list';

export const useConfirmOrder = () => {
  const router = useRouter();
  const { data: orderFormParam, orderType } = useOrderFormParam();
  const { data: productList } = useFetchProductList();
  const { data: staffList } = useFetchStaffList();
  const { createOrder, isLoading, error } = useCreateOrder();
  const basePath = orderType === OrderType.singleOrder ? Path.singleOrder : Path.subscriptionOrder;

  if (!orderFormParam || !orderFormParam.products || !orderFormParam.staffID || !productList || !staffList) {
    router.push(basePath);
  }

  if (orderType === OrderType.singleOrder && (!orderFormParam || !orderFormParam.deliveryType)) {
    router.push(basePath);
  }
  if (
    orderType === OrderType.subscriptionOrder &&
    (!orderFormParam ||
      !orderFormParam.deliveryStartYear ||
      !orderFormParam.deliveryStartMonth ||
      !orderFormParam.deliveryInterval)
  ) {
    router.push(basePath);
  }
  // 通常注文の場合、速達料金、配送手数料を配列に追加
  const products =
    orderType === OrderType.singleOrder
      ? addDeliveryFeeAndExpressObjectToProductList(orderFormParam!.products!, orderFormParam!.deliveryType!)
      : orderFormParam!.products!;

  // 注文ボタン押下処理
  const submitHandler = async () => {
    try {
      // 重複商品配列はuseOrderFormでmerge済み。更に速達、配送手数料を加えた商品配列を登録
      await createOrder(orderType, { ...orderFormParam, products: products });
      router.push(`${basePath}?${FormScreenQuery.complete}`, undefined, { shallow: true });
    } catch (error) {}
  };
  // 修正するボタン押下時処理。shallow=true でSPA画面遷移
  const cancelHandler = () => {
    router.push(`${basePath}?${FormScreenQuery.input}`, undefined, { shallow: true });
  };
  // 確認画面表示label取得
  const deliveryTypeLabel = getDeliveryTypeLabel(orderFormParam!.deliveryType!);
  const deliveryStartLabel = `${orderFormParam!.deliveryStartYear} / ${orderFormParam!.deliveryStartMonth}月`;
  const deliveryIntervalLabel = `${orderFormParam!.deliveryInterval}ヶ月`;
  const staff = staffList!.find((staff) => staff.id === orderFormParam!.staffID);
  const staffName = `${staff!.lastName}  ${staff!.firstName}`;
  return {
    products,
    deliveryTypeLabel,
    deliveryStartLabel,
    deliveryIntervalLabel,
    staffName,
    isLoading,
    error,
    submitHandler,
    cancelHandler,
  };
};
