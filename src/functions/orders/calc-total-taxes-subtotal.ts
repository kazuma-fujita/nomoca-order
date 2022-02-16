import { taxRate } from 'constants/tax-rate';
import { NormalizedProduct } from 'hooks/orders/use-fetch-order-list';

export type Receipt = { total: number; taxes: number; subtotal: number };

const calcTotalFromSubtotal = (subtotal: number): Receipt => {
  const taxes = taxRate * subtotal;
  const total = taxes + subtotal;
  return { total, taxes, subtotal };
};

export const calcTotalFromPriceAndQuantity = (unitPrice: number, quantity: number): Receipt => {
  const subtotal = unitPrice * quantity;
  const { total, taxes } = calcTotalFromSubtotal(subtotal);
  return { total, taxes, subtotal };
};

export const calcTotalFromProductList = (products: NormalizedProduct[]): Receipt => {
  const subtotal = calcSubtotalFromProductList(products);
  const { total, taxes } = calcTotalFromSubtotal(subtotal);
  return { total, taxes, subtotal };
};

export const calcSubtotalFromProductList = (products: NormalizedProduct[]): number =>
  products.map((product) => product.unitPrice * product.quantity).reduce((sum, value) => sum + value, 0);
