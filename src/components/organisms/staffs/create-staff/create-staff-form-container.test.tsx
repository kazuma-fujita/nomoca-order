import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { API } from 'aws-amplify';
import { customRender } from 'utilities/tests/custom-render';
import { CreateStaffFormContainer } from './create-staff-form-container';

describe('CreateStaffFormContainer', () => {
  const render = () => customRender(<CreateStaffFormContainer on={true} toggle={jest.fn()} />);
  test('It renders an error alert.', async () => {
    const spy = jest.spyOn(API, 'graphql').mockRejectedValueOnce(Error('It occurred an async error.'));
    render();
    const textbox = screen.getByRole('textbox', { name: '担当者名' });
    userEvent.type(textbox, '担当者A');
    const submitButton = screen.getByRole('button', { name: '追加する' });
    userEvent.click(submitButton);
    await waitFor(() => {
      const alert = screen.getByRole('alert');
      expect(alert).toHaveTextContent(`Cannot read properties of undefined (reading 'length')`);
    });
    // expect(spy).toHaveBeenCalledTimes(1);
  });
});
