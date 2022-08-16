/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async () => {
  // UTC時間を返却
  const now = new Date();
  console.log('current date in lambda', now);
  return { currentDate: now };
};
