import { GraphQLResult } from '@aws-amplify/api';
import {
  DeliveryStatus,
  Order,
  SendMailType,
  UpdateOrderInput,
  UpdateOrderMutation,
  UpdateOrderMutationVariables,
} from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { SWRKey } from 'constants/swr-key';
import { updateOrder as updateOrderQuery } from 'graphql/mutations';
import { useSendMail } from 'hooks/commons/use-send-mail';
import { useCallback, useState } from 'react';
import { useSWRConfig } from 'swr';
import { parseResponseError } from 'utilities/parse-response-error';
import { ExtendedOrder } from '../subscription-orders/use-fetch-subscription-order-list';

export const useCancelOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();
  const { sendMail } = useSendMail();

  const cancelOrder = async (item: ExtendedOrder<Order>) => {
    setIsLoading(true);
    try {
      const input: UpdateOrderInput = { id: item.id, deliveryStatus: DeliveryStatus.canceled };
      const variables: UpdateOrderMutationVariables = { input: input };

      const result = (await API.graphql(
        graphqlOperation(updateOrderQuery, variables),
      )) as GraphQLResult<UpdateOrderMutation>;

      if (!result.data || !result.data.updateOrder) {
        throw Error('The API deleted data but it returned null.');
      }
      setError(null);
      console.log('canceledOrder:', result.data.updateOrder);
      // 再フェッチ実行
      mutate(SWRKey.orderList);
    } catch (error) {
      setIsLoading(false);
      setError(parseResponseError(error));
      console.error('cancel error:', error);
      return error;
    }

    // メール送信は補助的な機能なので失敗してもDB登録処理をrollbackしない
    try {
      // 注文キャンセルメール送信
      await sendMail({
        sendMailType: SendMailType.canceledSingleOrder,
        products: item.normalizedProducts,
        clinic: item.clinic,
        staff: item.staff,
        deliveryType: item.deliveryType,
      });
    } catch (err) {
      const error = err as Error;
      // TODO: Slack or CloudWatch通知
      console.error('It failed sending an email after ordering a single order item', error);
    }
  };

  const resetState = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return { cancelOrder, isLoading, error, resetState };
};
