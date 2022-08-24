import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Staff, Type } from 'API';
import { API, Amplify } from 'aws-amplify';
import { StaffListContextProvider } from 'hooks/staffs/use-fetch-staff-list';
import { customRender } from 'utilities/tests/custom-render';
import { StaffTemplate } from './staff-template';
import awsconfig from 'aws-exports';

// Cognito認証でAppSyncを実行するとNo current user errorが発生する為、API_KEY認証に切り替え
Amplify.configure({ ...awsconfig, aws_appsync_authenticationType: 'API_KEY' });

const item: Staff = {
  __typename: 'Staff',
  id: 'dummyID-1',
  lastName: '発注担当者',
  firstName: 'A',
  type: Type.staff,
  viewOrder: 1,
  disabled: false,
  createdAt: '2021-11-25T14:32:55.000Z',
  updatedAt: '2021-12-03T09:08:07.000Z',
};

const render = () =>
  customRender(
    <StaffListContextProvider isFilterByActiveStaff={false}>
      <StaffTemplate />
    </StaffListContextProvider>,
  );

const createStaff = async () => {
  // It renders a staff list.
  render();
  screen.getByRole('table', { name: 'staffs table' });
  await waitForElementToBeRemoved(() => screen.getByLabelText('Now loading'));
  screen.getByText('発注担当者を追加してください');

  // It views a dialog.
  userEvent.click(screen.getByRole('button', { name: '発注担当者を追加する' }));
  screen.getByRole('heading', { name: '発注担当者を追加する' });
  const lastNameTextbox = screen.getByRole('textbox', { name: '性' });
  const firstNameTextbox = screen.getByRole('textbox', { name: '名' });
  userEvent.type(lastNameTextbox, '発注担当者性');
  userEvent.type(firstNameTextbox, 'A');
  // It submits form input values.
  const submitButton = screen.getByRole('button', { name: '追加する' });
  userEvent.click(submitButton);
};

const updateStaff = async () => {
  // It renders a staff list.
  render();
  screen.getByRole('table', { name: 'staffs table' });
  await waitForElementToBeRemoved(() => screen.getByLabelText('Now loading'));
  expect(screen.getAllByRole('row')).toHaveLength(2);
  screen.getByRole('cell', { name: '発注担当者 A' });
  const editButton = screen.getByRole('button', { name: '発注担当者を編集する' });
  // It views a dialog.
  userEvent.click(editButton);
  screen.getByRole('heading', { name: '発注担当者を編集する' });
  const lastNameTextbox = screen.getByRole('textbox', { name: '性' });
  const firstNameTextbox = screen.getByRole('textbox', { name: '名' });
  userEvent.type(lastNameTextbox, '発注担当者性');
  userEvent.type(firstNameTextbox, 'B');
  // It submits form input values.
  const submitButton = screen.getByRole('button', { name: '編集する' });
  userEvent.click(submitButton);
};

describe('StaffTemplate', () => {
  const spy = jest.spyOn(API, 'graphql');

  afterEach(() => {
    spy.mockClear();
  });

  test.skip('It renders a staff list after it creates a staff.', async () => {
    spy
      .mockResolvedValueOnce({ data: { listStaffSortedByViewOrder: { items: [] } } })
      .mockResolvedValueOnce({ data: { createStaff: item } });
    await createStaff();
    // It waits for it to disappear dialog.
    await waitForElementToBeRemoved(() => screen.getByRole('heading', { name: '発注担当者を追加する' }));
    const rows = screen.getAllByRole('row');
    // Below rows include a 'th' header row.
    expect(rows).toHaveLength(2);
    screen.getByRole('cell', { name: '発注担当者 A' });
    // screen.getByRole('cell', { name: '2021/12/03 18:08' });
    screen.getByRole('button', { name: '発注担当者を編集する' });
    // screen.getByRole('checkbox', { name: 'activate-switch' });
    expect(spy).toHaveBeenCalledTimes(2);
  });

  test('It ocurred an error when it creates a staff.', async () => {
    spy
      .mockResolvedValueOnce({ data: { listStaffSortedByViewOrder: { items: [] } } })
      .mockRejectedValueOnce(Error('It occurred an async error.'));

    await createStaff();
    // It waits for viewing alert.
    await waitFor(() => {
      const alert = screen.getByRole('alert');
      expect(alert).toHaveTextContent('It occurred an async error.');
    });
    expect(spy).toHaveBeenCalledTimes(3);
  });

  test.skip('It renders a staff list after it updates a staff.', async () => {
    spy
      .mockResolvedValueOnce({ data: { listStaffSortedByViewOrder: { items: [item] } } })
      .mockResolvedValueOnce({ data: { updateStaff: { ...item, lastName: '発注担当者', firstName: 'B' } } });
    await updateStaff();
    // It waits for it to disappear dialog.
    await waitForElementToBeRemoved(() => screen.getByRole('heading', { name: '発注担当者を編集する' }));
    const rows = screen.getAllByRole('row');
    // Below rows include a 'th' header row.
    expect(rows).toHaveLength(2);
    screen.getByRole('cell', { name: '発注担当者 B' });
    // screen.getByRole('cell', { name: '2021/12/03 18:08' });
    screen.getByRole('button', { name: '発注担当者を編集する' });
    // screen.getByRole('checkbox', { name: 'activate-switch' });
    expect(spy).toHaveBeenCalledTimes(3);
  });

  test('It ocurred an error when it updates a staff.', async () => {
    spy
      .mockResolvedValueOnce({ data: { listStaffSortedByViewOrder: { items: [item] } } })
      .mockRejectedValueOnce(Error('It occurred an async error.'));

    await updateStaff();
    // It waits for viewing alert.
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('It occurred an async error.');
    });
    expect(spy).toHaveBeenCalledTimes(3);
  });
});
