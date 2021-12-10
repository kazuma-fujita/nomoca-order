import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { API } from 'aws-amplify';
import { ObjectType } from 'constants/object-type';
import { customRender } from 'utilities/tests/custom-render';
import { StaffTemplate } from './staff-template';

describe('CreateStaffTemplate', () => {
  const render = () => customRender(<StaffTemplate />);
  const spy = jest.spyOn(API, 'graphql');

  afterEach(() => {
    spy.mockClear();
  });

  const createStaff = async () => {
    // It renders a staff list.
    render();
    screen.getByRole('table', { name: 'staffs table' });
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
  };

  test('It renders a staff list after it creates a staff.', async () => {
    spy.mockResolvedValueOnce({ data: { listStaffsSortedByViewOrder: { items: [] } } }).mockResolvedValueOnce({
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
    await createStaff();
    // It waits for it to disappear dialog.
    await waitForElementToBeRemoved(() => screen.getByRole('dialog', { name: '担当者を追加する' }));
    const rows = screen.getAllByRole('row');
    // Below rows include a 'th' header row.
    expect(rows).toHaveLength(2);
    screen.getByRole('cell', { name: '担当者A' });
    screen.getByRole('cell', { name: '2021/12/03 18:08' });
    screen.getByRole('button', { name: '担当者を編集する' });
    screen.getByRole('checkbox', { name: 'activate-switch' });
    expect(spy).toHaveBeenCalledTimes(2);
  });

  test('It ocurred an error when it creates a staff.', async () => {
    spy
      .mockResolvedValueOnce({ data: { listStaffsSortedByViewOrder: { items: [] } } })
      .mockRejectedValueOnce(Error('It occurred an async error.'));

    await createStaff();
    // It waits for viewing alert.
    await waitFor(() => {
      const alert = screen.getByRole('alert');
      expect(alert).toHaveTextContent('It occurred an async error.');
    });
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
