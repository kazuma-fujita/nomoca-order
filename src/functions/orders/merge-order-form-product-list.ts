import { NormalizedProduct } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import { Product } from 'API';

export const mergeOrderFormProductList = (
  baseProducts: NormalizedProduct[],
  masterProducts: Product[],
): NormalizedProduct[] => {
  // DBに登録されているproductマスターデータから必要な商品情報を取得
  const normalizedProducts: NormalizedProduct[] = baseProducts.map((item) => {
    const product = masterProducts.find((product) => product.id === item.productID);
    return {
      relationID: product!.id,
      productID: product!.id,
      name: product!.name,
      unitPrice: product!.unitPrice,
      quantity: item.quantity!,
      viewOrder: product!.viewOrder,
    };
  });

  // DBに登録されているproductマスターデータのviewOrder昇順でsort
  const sortedProducts = normalizedProducts.sort((a, b) => (a.viewOrder! > b.viewOrder! ? -1 : 1));

  // 入力画面で同じ商品が複数選択されてる場合、個数を合算してlistをmerge
  const mergedProducts = sortedProducts.reduce(
    (results: NormalizedProduct[], current: NormalizedProduct, currentIndex: number) => {
      const prev = results.find((item) => item.viewOrder! === current.viewOrder!);
      if (currentIndex > 0 && prev) {
        const total = { ...prev, quantity: prev.quantity + current.quantity };
        return results.map((item) => (item.viewOrder! === current.viewOrder! ? total : item));
      } else {
        return [...results, current];
      }
    },
    [],
  );
  return mergedProducts;
};
