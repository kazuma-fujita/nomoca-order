/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async () => {
  const now = new Date();
  console.log('current date in lambda', now);
  return { currentDate: now };
  // return {
  //   statusCode: 200,
  //   body: JSON.stringify({ currentDate: now }),
  // };
};
