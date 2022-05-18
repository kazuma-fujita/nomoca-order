import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { DefaultRequestBody, rest } from 'msw';
import { setupServer } from 'msw/node';
import fetch from 'node-fetch';
import { customRender } from 'utilities/tests/custom-render';
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
  const { data, error, isLoading, isEmptyList } = useFetch<User[]>(`https://mock.api.com/users`, fetcher);
  if (error) return <div role='alert'>{error.message}</div>;
  if (isLoading) return <div>Now Loading...</div>;
  if (isEmptyList) return <div>List is empty.</div>;
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

describe('UseFetch', () => {
  const server = setupServer(...handlers);
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('It renders the users list.', async () => {
    customRender(<UserList />);
    await waitForElementToBeRemoved(() => screen.getByText('Now Loading...'));
    expect(screen.getByRole('heading')).toHaveTextContent('Users data exists.');
    const users = screen.getAllByRole('listitem');
    expect(users).toHaveLength(3);
    expect(users[0]).toHaveTextContent('user-1');
    expect(users[1]).toHaveTextContent('user-2');
    expect(users[2]).toHaveTextContent('user-3');
  });

  test('It renders empty data.', async () => {
    server.use(
      rest.get<DefaultRequestBody, User[]>('https://mock.api.com/users', (req, res, ctx) => res(ctx.json([]))),
    );
    customRender(<UserList />);
    await waitForElementToBeRemoved(() => screen.getByText('Now Loading...'));
    expect(screen.getByText('List is empty.')).toBeInTheDocument();
  });

  test('A network error occurred.', async () => {
    server.use(
      rest.get<DefaultRequestBody, { message: string }>('https://mock.api.com/users', (req, res, ctx) =>
        res.networkError('Failed to connect.'),
      ),
    );
    customRender(<UserList />);
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
