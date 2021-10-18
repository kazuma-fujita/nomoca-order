import { GraphQLResult } from '@aws-amplify/api';
import { CreateStaffInput, CreateStaffMutation, CreateStaffMutationVariables, Staff } from 'API';
import { API, graphqlOperation } from 'aws-amplify';
import { SWRKey } from 'constants/swr-key';
import { createStaff as createStaffQuery } from 'graphql/mutations';
import { useCallback, useState } from 'react';
import { useSWRConfig } from 'swr';

export const useCreateStaff = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  const onCreateStaff =
    (name: string) =>
    async (data: Staff[]): Promise<Staff[]> => {
      const staff: CreateStaffInput = { name: name };
      const variables: CreateStaffMutationVariables = { input: staff };
      const result = (await API.graphql(
        graphqlOperation(createStaffQuery, variables)
      )) as GraphQLResult<CreateStaffMutation>;
      setIsLoading(false);
      setError(null);
      if (result.data && result.data.createStaff) {
        console.log('newStaff:', result.data.createStaff);
        return [...data, result.data.createStaff];
      } else {
        throw Error('The API created data but it returned null.');
      }
    };

  const createStaff = useCallback(async (data: Staff) => {
    setIsLoading(true);
    try {
      mutate(SWRKey.StaffList, onCreateStaff(data.name), false);
    } catch (error) {
      setIsLoading(false);
      setError(error as Error);
      console.error('create error:', error);
    }
  }, []);
  return { createStaff, isLoading, error };
};
