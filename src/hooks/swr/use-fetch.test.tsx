import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { DefaultRequestBody, rest, graphql } from 'msw';
import { setupServer } from 'msw/node';
import fetch from 'node-fetch';
import { useFetch } from './use-fetch';

type User = {
  id: number;
  name: string;
};

const handlers = [
  rest.get<DefaultRequestBody, User[]>('https://mock.api.com/users', (req, res, ctx) => {
    const data = [...Array(3)].map((_, i) => ({ id: i + 1, name: `user-${i + 1}` }));
    return res(ctx.json(data));
  }),
];

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const UserList = () => {
  const { data, error, isLoading, isEmpty } = useFetch<User[]>(`https://mock.api.com/users`, fetcher);
  if (error) return <div role='alert'>{error.message}</div>;
  if (isLoading) return <div>Now Loading...</div>;
  if (isEmpty) return <div>List is empty.</div>;
  if (!data) return <div>Users data is notfound.</div>;
  return (
    <>
      {data && <h1>Users data exists.</h1>}
      <ul role='list'>
        {data.map((user) => (
          <li key={user.id} role='listitem'>
            {user.name}
          </li>
        ))}
      </ul>
    </>
  );
};

describe('UserList', () => {
  const server = setupServer(...handlers);
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  test('It renders the users list.', async () => {
    render(<UserList />);
    await waitForElementToBeRemoved(() => screen.getByText('Now Loading...'));
    expect(screen.getByRole('heading')).toHaveTextContent('Users data exists.');
    const users = screen.getAllByRole('listitem');
    expect(users).toHaveLength(3);
    expect(users[0]).toHaveTextContent('user-1');
    expect(users[1]).toHaveTextContent('user-2');
    expect(users[2]).toHaveTextContent('user-3');
  });

  test('A network error occurred.', async () => {
    server.use(
      rest.get<DefaultRequestBody, { message: string }>('https://mock.api.com/users', (req, res, ctx) =>
        res.networkError('Failed to connect.'),
      ),
    );
    render(<UserList />);
    await waitForElementToBeRemoved(() => screen.getByText('Now Loading...'));
    expect(screen.getByRole('alert')).toHaveTextContent(
      'request to https://mock.api.com/users failed, reason: Failed to connect',
    );
  });

  // test('A graphql error occurred.', async () => {
  //   server.use(
  //     graphql.query('https://mock.api.com/users', (req, res, ctx) =>
  //       res(ctx.errors([{ message: 'Failed to fetch user list.' }])),
  //     ),
  //   );
  //   render(<UserList />);
  //   await waitForElementToBeRemoved(() => screen.getByText('Now Loading...'));
  //   expect(screen.getByRole('alert')).toHaveTextContent('Failed to fetch user list.');
  // });
});
