import Amplify from '@aws-amplify/core';
import { composeStories } from '@storybook/testing-react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import awsconfig from 'aws-exports';
import { staffListMock } from 'mocks/staff.mock';
import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import { StaffListContextProvider } from 'stores/use-staff-list';
import { customRender } from 'utilities/tests/custom-render';
import { StaffList } from './staff-list';
// import * as stories from './staff-list.stories';
// const { Default, Loading, Empty } = composeStories(stories);
// test('It renders the staff list.', async () => {
//   render(<Default />);
//   const rows = screen.getAllByRole('row');
//   // th 行も含める
//   expect(rows).toHaveLength(4);
//   expect(rows[1]).toHaveTextContent('担当者1');
//   expect(rows[2]).toHaveTextContent('担当者2');
//   expect(rows[3]).toHaveTextContent('担当者3');
//   expect(screen.getByRole('cell', { name: '担当者1' })).toBeTruthy();
//   // screen.debug();
// });
//   test('It renders a loading indicator.', async () => {
//     render(<Loading />);
//     screen.getByLabelText('Now loading');
//   });

//   test('It renders empty data.', async () => {
//     render(<Empty />);
//     screen.getByText('担当者を追加してください');
//   });
// });

// Cognito認証でAppSyncを実行するとNo current user errorが発生する為、API_KEY認証に切り替え
Amplify.configure({ ...awsconfig, aws_appsync_authenticationType: 'API_KEY' });

const handlers = [
  graphql.query('ListStaffSortedByViewOrder', (req, res, ctx) => {
    const response = {
      listStaffSortedByViewOrder: {
        items: staffListMock,
      },
    };
    return res(ctx.data(response));
  }),
];

const staffListContainerRender = () =>
  customRender(
    <StaffListContextProvider isFilterByActiveStaff={false}>
      <StaffList />
    </StaffListContextProvider>,
  );

describe('StaffListContainer', () => {
  const server = setupServer(...handlers);
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('It renders the staff list.', async () => {
    staffListContainerRender();
    await waitForElementToBeRemoved(() => screen.getByLabelText('Now loading'));
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(4);
    expect(rows[1]).toHaveTextContent('担当者1');
    expect(rows[2]).toHaveTextContent('担当者2');
    expect(rows[3]).toHaveTextContent('担当者3');
  });

  test('It renders empty data.', async () => {
    server.use(
      graphql.query('ListStaffSortedByViewOrder', (req, res, ctx) => {
        const response = { listStaffsSortedByViewOrder: { items: [] } };
        return res(ctx.data(response));
      }),
    );
    staffListContainerRender();
    await waitForElementToBeRemoved(() => screen.getByLabelText('Now loading'));
    expect(screen.getByText('担当者を追加してください')).toBeInTheDocument();
  });

  test('A network error occurred.', async () => {
    server.use(graphql.query('ListStaffSortedByViewOrder', (req, res, ctx) => res.networkError('')));
    staffListContainerRender();
    await waitForElementToBeRemoved(() => screen.getByLabelText('Now loading'));
    expect(screen.getByRole('alert')).toHaveTextContent('Network Error');
  });
});
