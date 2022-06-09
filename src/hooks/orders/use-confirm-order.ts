import { OrderType } from 'API';
import { FormScreenQuery } from 'constants/form-screen-query';
import { Path } from 'constants/path';
import { addDeliveryFeeAndExpressObjectToProductList } from 'functions/orders/add-delivery-fee-and-express-object-to-product-list';
import { useCreateOrder } from 'hooks/orders/use-upsert-order';
import { useRouter } from 'next/router';
import { useOrderFormParam } from 'stores/use-order-form-param';

export const useConfirmOrder = () => {
  const router = useRouter();
  const { data: formParam, orderType } = useOrderFormParam();
  const { createOrder, isLoading, error } = useCreateOrder();
  const basePath = orderType === OrderType.singleOrder ? Path.singleOrder : Path.subscriptionOrder;

  // 注文ボタン押下処
  const submitHandler = async () => {
    try {
      if (!formParam || !formParam.products) {
        throw Error('Form Values and products data are not found.');
      }
      let products = formParam.products;
      if (orderType === OrderType.singleOrder && formParam.deliveryType) {
        // 通常注文の場合、速達料金、配送手数料を配列に追加
        products = addDeliveryFeeAndExpressObjectToProductList(formParam.products, formParam.deliveryType);
      }
      // 重複商品配列はuseOrderFormでmerge済み。更に速達、配送手数料を加えた商品配列を登録
      await createOrder(orderType, { ...formParam, products: products });
      router.push(`${basePath}?${FormScreenQuery.complete}`, undefined, { shallow: true });
    } catch (error) {}
  };
  // 修正するボタン押下時処理。shallow=true でSPA画面遷移
  const cancelHandler = () => {
    router.push(`${basePath}?${FormScreenQuery.input}`, undefined, { shallow: true });
  };
  return {
    isLoading,
    error,
    submitHandler,
    cancelHandler,
  };
};
