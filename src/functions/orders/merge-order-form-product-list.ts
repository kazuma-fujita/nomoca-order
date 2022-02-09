import { NormalizedProduct } from 'hooks/orders/use-fetch-order-list';
import { Product } from 'API';

export const mergeOrderFormProductList = (
  baseProducts: NormalizedProduct[],
  masterProducts: Product[],
): NormalizedProduct[] => {
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

  const sortedProducts = normalizedProducts.sort((a, b) => (a.viewOrder! > b.viewOrder! ? -1 : 1));

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
