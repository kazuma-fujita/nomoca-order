import { Clinic } from 'API';
import { useCallback } from 'react';
import { geocodeAPI } from 'utilities/gecode-api';
import { Logger } from 'utilities/logger';

export const getAddress = async (postalCode: string): Promise<SearchAddress | null> => {
  const result = await geocodeAPI.get('/json', { params: { address: postalCode } });
  if (result.data.status !== 'OK') throw Error(`Google geocode api error status:${result.data.status}`);
  if (result.data.results.length !== 1) throw Error('Google geocode api result code array is not 1 length.');
  const components = result.data.results[0].address_components as AddressComponent[];

  // Geocode APIより返ってくるtype
  const typeKeys = [
    'administrative_area_level_1', // 都道府県
    'administrative_area_level_2', // 郡
    'locality', // 市区町村（東京都23区を含む）
    'sublocality_level_1', // 政令指定都市の区
    'sublocality_level_2', // 大字・町
    'sublocality_level_3', // 小字・丁目
    'sublocality_level_4', // 街区
  ];

  type AddressComponent = {
    long_name: string;
    short_name: string;
    types: [string];
  };

  type Address = {
    name: string;
    type: string;
  };

  // typeKeys配列順にAddress配列を生成。typeKeysに無い要素はAddress配列に含めない。
  const parseResult = typeKeys
    .map((key) => {
      const item = components.filter((component: AddressComponent) => component.types.indexOf(key) !== -1);
      return item.length === 1 ? { name: item[0].long_name, type: key } : null;
    })
    .filter((v) => v) as Address[]; // 最後にnull要素を取り除く

  // 配列数1以下は検索結果0件か都道府県しか値が無いためnullを返却
  if (parseResult.length < 2) {
    return null;
  }

  let state = '';
  let city = '';
  let address = '';
  parseResult.forEach((result) => {
    switch (result.type) {
      case 'administrative_area_level_1': // 都道府県
        state = result.name;
        break;
      case 'administrative_area_level_2': // 郡
      case 'locality': // 市区町村（東京都23区を含む）
      case 'sublocality_level_1': // 政令指定都市の区
      case 'sublocality_level_2': // 大字・町
        city += result.name;
        break;
      case 'sublocality_level_3': // 小字・丁目
      case 'sublocality_level_4': // 街区
        address += result.name;
        break;
      default:
        break;
    }
  });

  return { state: state, city: city, address: address };
};

export type SearchAddress = {
  state: string;
  city: string;
  address: string;
};

export const useSearchAddress = () => {
  const searchAddress = useCallback(async (postalCode: string) => {
    const logger = Logger();
    try {
      return await getAddress(postalCode);
    } catch (error) {
      // error発生時はログのみ出力
      logger.error(error);
    }
  }, []);
  return { searchAddress };
};
