import { GraphQLResult } from '@aws-amplify/api';
import { GetOrderQuery, Order, OrderProduct } from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { DateFormat } from 'constants/date-format';
import { stringify } from 'csv-stringify/dist/cjs/sync';
import { format } from 'date-fns';
import { calcTotalFromPriceAndQuantity } from 'functions/orders/calc-total-taxes-subtotal';
import { getOrder } from 'graphql/queries';
import iconv from 'iconv-lite';
import { useCallback, useState } from 'react';
import { useNowDate } from 'stores/use-now-date';
import { parseResponseError } from 'utilities/parse-response-error';

export const useExportOrderCSV = () => {
  const { now } = useNowDate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const exportCSV = async (updateOrderIDs: string[]) => {
    setIsLoading(true);
    const exportData = [];
    try {
      if (updateOrderIDs.length === 0) {
        throw Error('It is empty that an ID list which export a csv file.');
      }

      for (const updateOrderID of updateOrderIDs) {
        const result = (await API.graphql(
          graphqlOperation(getOrder, { id: updateOrderID }),
        )) as GraphQLResult<GetOrderQuery>;

        if (!result.data || !result.data.getOrder || !result.data.getOrder.products) {
          throw Error('It returned null that an API which gets order data.');
        }
        const order: Order = result.data.getOrder;
        const orderProducts: (OrderProduct | null)[] = order.products!.items;
        for (const orderProduct of orderProducts) {
          if (!orderProduct) {
            throw Error('An order product is null.');
          }
          const { total, taxes, subtotal } = calcTotalFromPriceAndQuantity(
            orderProduct!.product.unitPrice,
            orderProduct!.quantity,
          );
          exportData.push({
            id: order.id,
            empty1: '',
            empty2: '',
            orderedAt: format(now, DateFormat.Date),
            empty3: '',
            empty4: '',
            empty5: '',
            empty6: '',
            productName: orderProduct!.product.name,
            empty7: '',
            empty8: '',
            empty9: '',
            quantity: orderProduct!.quantity,
            subtotal: subtotal,
            deliveryFee: 0,
            empty10: '',
            empty11: '',
            empty12: '',
            empty13: '',
            empty14: '',
            empty15: '',
            empty16: '',
            empty17: '',
            empty18: '',
            empty19: '',
            total: total,
            tax: taxes,
            empty20: '',
            empty21: '',
            empty22: '',
            empty23: '',
            empty24: '',
            empty25: '',
            toLastName: '',
            toFirstName: '',
            toPostalCode: '1234567',
            toPref: '東京都',
            toAddress: '杉並区荻窪1-1-20 Hey Build 1F',
            toPhoneNumber: '0312345678',
            empty26: '',
            empty27: '',
            fromLastName: '',
            fromFirstName: '',
            fromPostalCode: '1234567',
            fromPref: '東京都',
            fromAddress: '杉並区荻窪1-1-20 Hey Build 1F',
            fromPhoneNumber: '0312345678',
            empty28: '',
            toCompanyName: '国分寺クリニック',
            fromCompanyName: '株式会社GENOVA',
            empty29: '',
          });
        }
      }
      setIsLoading(false);
      setError(null);
      const outputUTF8 = stringify(exportData, {
        header: true,
        quoted_string: true,
        quoted_empty: false,
        record_delimiter: 'windows',
        columns: {
          id: 'オーダー番号',
          empty1: '',
          empty2: '',
          orderedAt: 'オーダー日',
          empty3: '',
          empty4: '',
          empty5: '',
          empty6: '',
          productName: 'アイテム名',
          empty7: '',
          empty8: '',
          empty9: '',
          quantity: '個数',
          subtotal: '小計',
          deliveryFee: '配送料',
          empty10: '',
          empty11: '',
          empty12: '',
          empty13: '',
          empty14: '',
          empty15: '',
          empty16: '',
          empty17: '',
          empty18: '',
          empty19: '',
          total: '合計',
          tax: '内消費税',
          empty20: '',
          empty21: '',
          empty22: '',
          empty23: '',
          empty24: '',
          empty25: '',
          toLastName: '氏(配送先)',
          toFirstName: '名(配送先)',
          toPostalCode: '郵便番号(配送先)',
          toPref: '都道府県(配送先)',
          toAddress: '住所(配送先)',
          toPhoneNumber: '電話番号(配送先)',
          empty26: '',
          empty27: '',
          fromLastName: '氏(請求先)',
          fromFirstName: '名(請求先)',
          fromPostalCode: '郵便番号(請求先)',
          fromPref: '都道府県(請求先)',
          fromAddress: '住所(請求先)',
          fromPhoneNumber: '電話番号(請求先)',
          empty28: '',
          toCompanyName: '法人名(配送先)',
          fromCompanyName: '法人名(請求先)',
          empty29: '',
        },
      });
      console.log('output:', outputUTF8);
      const outputSJIS = iconv.encode(outputUTF8, 'Shift_JIS');
      const blob = new Blob([outputSJIS], { type: 'application/octet-binary' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sampleData.csv';
      a.click();
      a.remove();
    } catch (error) {
      setIsLoading(false);
      const parsedError = parseResponseError(error);
      setError(parsedError);
      throw parsedError;
    }
  };

  const resetState = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return { exportCSV, isLoading, error, resetState };
};
