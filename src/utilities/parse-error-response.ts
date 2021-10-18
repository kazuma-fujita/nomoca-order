import { GraphQLResult } from '@aws-amplify/api';

export const parseErrorResponse = (error: any): Error | null => {
  if (!error) return null;
  const errorResult = error as Error;
  const graphqlResult = error as GraphQLResult;
  return Error(
    errorResult.message
      ? errorResult.message
      : graphqlResult.errors
      ? graphqlResult.errors.map((error) => error.message).join('\n')
      : 'The error object could not be parsed.'
  );
};
