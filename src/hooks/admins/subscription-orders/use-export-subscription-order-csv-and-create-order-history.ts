import { SendMailType, SubscriptionOrder } from 'API';
import { useExportOrderCSV } from 'hooks/admins/use-export-order-csv';
import { useSendMail } from 'hooks/commons/use-send-mail';
import { ExtendedOrder } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { useCallback, useState } from 'react';
import { parseResponseError } from 'utilities/parse-response-error';
import { useCreateSubscriptionOrderHistory } from './use-create-subscription-order-history';

export const useExportSubscriptionOrderCSVAndCreateOrderHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { exportCSV } = useExportOrderCSV();
  const { createOrderHistory } = useCreateSubscriptionOrderHistory();
  const { sendMail } = useSendMail();

  const exportSubscriptionOrderCSVAndCreateOrderHistory = async (orders: ExtendedOrder<SubscriptionOrder>[]) => {
    setIsLoading(true);
    try {
      //TODO: 内部的にPromise.allSettledで並列処置を入れる
      await createOrderHistory(orders);
      //TODO: 登録成功したデータのみCSV出力する。エラーのデータは画面表示 & Slack、cloudWatch送信
      await exportCSV(orders);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      const parsedError = parseResponseError(error);
      setError(parsedError);
      throw parsedError;
    }

    // メール送信は補助的な機能なので失敗してもDB登録処理をrollbackしない
    // Promise.allSettledでメール送信処理を同時並列実行
    const results = await Promise.allSettled(
      orders.map(
        async (order) =>
          // 注文配送メール送信
          await sendMail({
            sendMailType: SendMailType.deliveredSubscriptionOrder,
            products: order.normalizedProducts,
            clinic: order.clinic,
            staff: order.staff,
            deliveryStartYear: order.deliveryStartYear,
            deliveryStartMonth: order.deliveryStartMonth,
            deliveryInterval: order.deliveryInterval,
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

  return { exportSubscriptionOrderCSVAndCreateOrderHistory, isLoading, error, resetState };
};
