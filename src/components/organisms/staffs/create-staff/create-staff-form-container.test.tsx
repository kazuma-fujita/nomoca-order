import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { customRender } from 'utilities/tests/custom-render';
import { CreateStaffFormContainer } from './create-staff-form-container';
import { API } from 'aws-amplify';
import userEvent from '@testing-library/user-event';
import { graphql } from 'msw';
import { setupServer } from 'msw/node';

const render = () => customRender(<CreateStaffFormContainer on={true} toggle={jest.fn()} />);

const handlers = [graphql.mutation('CreateStaff', (req, res, ctx) => res.networkError(''))];

describe('CreateStaffFormContainer', () => {
  const server = setupServer(...handlers);
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  test('It renders an error alert.', async () => {
    // const spy = jest.spyOn(API, 'graphql').mockRejectedValue(new Error('It occurred an async error.'));
    render();
    const textbox = screen.getByRole('textbox', { name: '担当者名' });
    userEvent.type(textbox, '担当者A');
    const submitButton = screen.getByRole('button', { name: '追加する' });
    await waitFor(async () => {
      userEvent.click(submitButton);
    });
    // screen.queryByText('担当者名を入力してください');
    // expect(spy).toHaveBeenCalledTimes(1);
    expect(screen.findByRole('alert')).toHaveTextContent('It occurred an async error.');
  });
});
