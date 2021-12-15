export const generateDeliveryMonths = (deliveryStartMonth: number, deliveryInterval: number): number[] => {
  const maxMonth = 12;
  if (maxMonth < deliveryStartMonth || maxMonth < deliveryInterval) {
    return [];
  }
  const addCount = Math.ceil(maxMonth / deliveryInterval);
  // let month = deliveryStartMonth;
  // let monthList: number[] = [];
  // for (let i = 0; i < addCount; i++) {
  //   if (i == 0) {
  //     monthList.push(month);
  //     continue;
  //   }
  //   month += deliveryInterval;
  //   if (maxMonth < month) {
  //     month -= maxMonth;
  //   }
  //   monthList.push(month);
  // }
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
  const maxMonth = 12;
  if (maxMonth < deliveryMonth || maxMonth < deliveryStartMonth || maxMonth < deliveryInterval) {
    return false;
  }
  return generateDeliveryMonths(deliveryStartMonth, deliveryInterval).includes(deliveryMonth);
};
