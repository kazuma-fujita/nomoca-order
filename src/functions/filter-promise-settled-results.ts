// 配送状況DB更新成功orderリスト抽出
export const filteredPromiseFulfilledResult = <T>(results: PromiseSettledResult<T>[]) =>
  results
    .filter((result) => result.status === 'fulfilled')
    .map((result) => {
      const fulfilled = result as PromiseFulfilledResult<T>;
      return fulfilled.value;
    });

export const filteredPromiseRejectedResult = <T>(results: PromiseSettledResult<T>[]) =>
  results
    .filter((result) => result.status === 'rejected')
    .map((result) => {
      const fulfilled = result as PromiseRejectedResult;
      return fulfilled.reason;
    });
