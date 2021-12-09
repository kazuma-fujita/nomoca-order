import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { API } from 'aws-amplify';
import { ObjectType } from 'constants/object-type';
import { customRender } from 'utilities/tests/custom-render';
import { StaffTemplate } from './staff-template';

const render = () => customRender(<StaffTemplate />);

describe('CreateStaffTemplate', () => {
  test('It creates a staff.', async () => {
    const spy = jest
      .spyOn(API, 'graphql')
      .mockResolvedValueOnce({
        data: { listStaffsSortedByViewOrder: { items: [] } },
      })
      .mockResolvedValueOnce({
        data: {
          createStaff: {
            __typename: ObjectType.Staff,
            id: 'dummyID-1',
            name: '担当者A',
            type: ObjectType.Staff,
            viewOrder: 1,
            disabled: false,
            createdAt: '2021-11-25T14:32:55.000Z',
            updatedAt: '2021-12-03T09:08:07.000Z',
          },
        },
      });

    render();

    await waitForElementToBeRemoved(() => screen.getByLabelText('Now loading'));
    screen.getByText('担当者を追加してください');
    // It views a dialog.
    userEvent.click(screen.getByRole('button', { name: '担当者を追加する' }));
    screen.getByRole('dialog', { name: '担当者を追加する' });
    screen.getByRole('textbox', { name: '担当者名' });
    const textbox = screen.getByRole('textbox', { name: '担当者名' });
    userEvent.type(textbox, '担当者A');
    // It submits form input values.
    const submitButton = screen.getByRole('button', { name: '追加する' });
    userEvent.click(submitButton);
    await waitForElementToBeRemoved(() => screen.getByRole('dialog', { name: '担当者を追加する' }));
    const rows = screen.getAllByRole('row');
    // Below rows include a 'th' header row.
    expect(rows).toHaveLength(2);
    expect(rows[1]).toHaveTextContent('担当者A');
    expect(rows[1]).toHaveTextContent('2021/12/03 09:08');
    expect(spy).toHaveBeenCalledTimes(2);
  });

  test('It renders an alert.', async () => {
    const spy = jest
      .spyOn(API, 'graphql')
      .mockResolvedValueOnce({
        data: { listStaffsSortedByViewOrder: { items: [] } },
      })
      .mockRejectedValueOnce(Error('It occurred an async error.'));

    render();

    await waitForElementToBeRemoved(() => screen.getByLabelText('Now loading'));
    screen.getByText('担当者を追加してください');
    // It views a dialog.
    userEvent.click(screen.getByRole('button', { name: '担当者を追加する' }));
    screen.getByRole('dialog', { name: '担当者を追加する' });
    screen.getByRole('textbox', { name: '担当者名' });
    const textbox = screen.getByRole('textbox', { name: '担当者名' });
    userEvent.type(textbox, '担当者A');
    // It submits form input values.
    const submitButton = screen.getByRole('button', { name: '追加する' });
    userEvent.click(submitButton);
    // It waits for viewing alert.
    await waitFor(() => {
      const alert = screen.getByRole('alert');
      expect(alert).toHaveTextContent('It occurred an async error.');
    });
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
