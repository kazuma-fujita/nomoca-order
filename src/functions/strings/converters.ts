// 全角数字 -> 半角数字変換
export const numericZenkaku2Hankaku = (input: string) =>
  input.replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0));

// 全角ハイフン -> 半角ハイフン変換
export const hyphenZenkaku2Hankaku = (input: string) => input.replace(/[‐－―ー]/g, '-');
