"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNextDeliveryYearMonth = exports.generateDeliveryMonths = exports.maxMonth = exports.minMonth = void 0;
exports.minMonth = 1;
exports.maxMonth = 12;
const generateDeliveryMonths = (deliveryStartMonth, deliveryInterval) => {
    if (deliveryStartMonth < exports.minMonth ||
        exports.maxMonth < deliveryStartMonth ||
        deliveryInterval < exports.minMonth ||
        exports.maxMonth < deliveryInterval) {
        return [];
    }
    const addCount = Math.ceil(exports.maxMonth / deliveryInterval);
    const months = Array.from({ length: addCount }, (_, i) => {
        const month = i * deliveryInterval + deliveryStartMonth;
        return exports.maxMonth < month ? month - exports.maxMonth : month;
    });
    return months;
};
exports.generateDeliveryMonths = generateDeliveryMonths;
const generateNextDeliveryYearMonth = (deliveryStartYear, deliveryStartMonth, deliveryInterval, nowYear, nowMonth) => {
    if (new Date(nowYear, nowMonth).getTime() <= new Date(deliveryStartYear, deliveryStartMonth).getTime()) {
        return { nextDeliveryYear: deliveryStartYear, nextDeliveryMonth: deliveryStartMonth };
    }
    const months = (0, exports.generateDeliveryMonths)(deliveryStartMonth, deliveryInterval);
    if (!months.length) {
        throw Error('The delivery start month and interval are an invalid value.');
    }
    // 配送月リストを数値の昇順でsort
    const sorted = [...months].sort((a, b) => a - b);
    // 現在月より大きい月のみ抽出
    const filtered = sorted.filter((current) => nowMonth <= current);
    // 抽出リストが有れば現在年と抽出リストの先頭の値を返却。リスト無ければ翌年の値とsortリストの先頭の値を返却
    return filtered.length > 0
        ? { nextDeliveryYear: nowYear, nextDeliveryMonth: filtered[0] }
        : { nextDeliveryYear: nowYear + 1, nextDeliveryMonth: sorted[0] };
};
exports.generateNextDeliveryYearMonth = generateNextDeliveryYearMonth;
