/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async () => {
  // UTC時間を返却
  const now = new Date();
  return { currentDate: now };
};
