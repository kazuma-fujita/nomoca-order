export const generateDeliveryMonths = (deliveryStartMonth: number, deliveryInterval: number): number[] => {
  const minMonth = 1;
  const maxMonth = 12;
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
  console.log(months);
  return months;
};

export const isFilterWithDeliveryMonth = (
  deliveryMonth: number,
  deliveryStartMonth: number,
  deliveryInterval: number,
): boolean => {
  const minMonth = 1;
  const maxMonth = 12;
  if (
    deliveryMonth < minMonth ||
    maxMonth < deliveryMonth ||
    deliveryStartMonth < minMonth ||
    maxMonth < deliveryStartMonth ||
    deliveryInterval < minMonth ||
    maxMonth < deliveryInterval
  ) {
    return false;
  }
  return generateDeliveryMonths(deliveryStartMonth, deliveryInterval).includes(deliveryMonth);
};
