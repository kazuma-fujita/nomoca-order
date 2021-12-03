import Amplify from '@aws-amplify/core';
import { composeStories } from '@storybook/testing-react';
import { render, RenderOptions, screen, waitForElementToBeRemoved } from '@testing-library/react';
import awsconfig from 'aws-exports';
import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import { ReactElement } from 'react';
import { StaffListContextProvider } from 'stores/use-staff-list';
import { SWRConfig } from 'swr';
import { StaffListContainer } from './staff-list-container';
import * as stories from './staff-list.stories';

// Cognito認証でAppSyncを実行するとNo current user errorが発生する為、API_KEY認証に切り替え
Amplify.configure({ ...awsconfig, aws_appsync_authenticationType: 'API_KEY' });

const { Default } = composeStories(stories);

const handlers = [
  graphql.query('ListStaffsSortedByViewOrder', (req, res, ctx) => {
    const response = {
      listStaffsSortedByViewOrder: {
        items: Default.args?.data,
      },
    };
    return res(ctx.data(response));
  }),
];

// jest.spyOn(API, 'graphql').mockReturnValue(
//   Promise.resolve({
//     data: {
//       listStaffsSortedByViewOrder: {
//         __typename: 'ModelStaffConnection',
//         items: Default.args?.data,
//       },
//     },
//   }),
// );

describe('StaffListContainer', () => {
  const server = setupServer(...handlers);
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('It renders the staff list.', async () => {
    customRender(
      <StaffListContextProvider filterWithActiveStaff={false}>
        <StaffListContainer />
      </StaffListContextProvider>,
    );
    await waitForElementToBeRemoved(() => screen.getByLabelText('Now loading'));
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(4);
    expect(rows[1]).toHaveTextContent('担当者1');
    expect(rows[2]).toHaveTextContent('担当者2');
    expect(rows[3]).toHaveTextContent('担当者3');
  });

  // test('It renders empty data.', async () => {
  //   server.use(
  //     rest.get<DefaultRequestBody, User[]>('https://mock.api.com/users', (req, res, ctx) => res(ctx.json([]))),
  //   );
  //   customRender(<UserList />);
  //   await waitForElementToBeRemoved(() => screen.getByText('Now Loading...'));
  //   expect(screen.getByText('List is empty.')).toBeInTheDocument();
  // });

  // test('A network error occurred.', async () => {
  //   server.use(
  //     rest.get<DefaultRequestBody, { message: string }>('https://mock.api.com/users', (req, res, ctx) =>
  //       res.networkError('Failed to connect.'),
  //     ),
  //   );
  //   customRender(<UserList />);
  //   await waitForElementToBeRemoved(() => screen.getByText('Now Loading...'));
  //   expect(screen.getByRole('alert')).toHaveTextContent(
  //     'request to https://mock.api.com/users failed, reason: Failed to connect',
  //   );
  // });
});

const AllTheProviders: React.FC = ({ children }) => (
  <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>{children}</SWRConfig>
);
const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });
