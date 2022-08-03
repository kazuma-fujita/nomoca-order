import { DeliveryStatus, Order, SendMailType } from 'API';
import { useExportOrderCSV } from 'hooks/admins/use-export-order-csv';
import { useSendMail } from 'hooks/commons/use-send-mail';
import { ExtendedOrder } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { useCallback, useState } from 'react';
import { parseResponseError } from 'utilities/parse-response-error';
import { useUpdateSingleOrderDeliveryStatus } from './use-update-single-order-delivery-status';

export const useExportSingleOrderCSVAndUpdateDeliveryStatus = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { exportCSV } = useExportOrderCSV();
  const { updateOrderDeliveryStatus } = useUpdateSingleOrderDeliveryStatus();
  const { sendMail } = useSendMail();

  const exportSingleOrderCSVAndUpdateDeliveryStatus = async (orders: ExtendedOrder<Order>[]) => {
    setIsLoading(true);
    // 未発送ステータスのorderのみステータス変更、CSV出力、メール送信実行。発送済、注文キャンセルステータスは除外
    const filteredOrders = orders.filter((order) => order.deliveryStatus === DeliveryStatus.ordered);
    try {
      // TODO:  内部実装にPromise.allSettledで並列処理を入れる
      await updateOrderDeliveryStatus(filteredOrders);
      //TODO: 登録成功したデータのみCSV出力する。エラーのデータは画面表示 & Slack、cloudWatch送信
      await exportCSV(filteredOrders);
    } catch (error) {
      setIsLoading(false);
      const parsedError = parseResponseError(error);
      setError(parsedError);
      throw parsedError;
    }

    // メール送信は補助的な機能なので失敗してもDB登録処理をrollbackしない
    // Promise.allSettledでメール送信処理を同時並列実行
    const results = await Promise.allSettled(
      filteredOrders.map(
        async (order) =>
          // 注文配送メール送信
          await sendMail({
            sendMailType: SendMailType.deliveredSingleOrder,
            products: order.normalizedProducts,
            clinic: order.clinic,
            staff: order.staff,
            deliveryType: order.deliveryType,
          }),
      ),
    );
    // TODO: resultsを解析してエラー時はSlack通知 and CloudWatchに保存
    console.log('send mail result', results);
  };

  const resetState = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return { exportSingleOrderCSVAndUpdateDeliveryStatus, isLoading, error, resetState };
};
