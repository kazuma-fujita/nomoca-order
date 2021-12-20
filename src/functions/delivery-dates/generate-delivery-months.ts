export const minMonth = 1;
export const maxMonth = 12;

export const generateDeliveryMonths = (deliveryStartMonth: number, deliveryInterval: number): number[] => {
  if (
    deliveryStartMonth < minMonth ||
    maxMonth < deliveryStartMonth ||
    deliveryInterval < minMonth ||
    maxMonth < deliveryInterval
  ) {
    return [];
  }
  const addCount = Math.ceil(maxMonth / deliveryInterval);
  const months = Array.from({ length: addCount }, (_, i) => {
    const month = i * deliveryInterval + deliveryStartMonth;
    return maxMonth < month ? month - maxMonth : month;
  });
  return months;
};
