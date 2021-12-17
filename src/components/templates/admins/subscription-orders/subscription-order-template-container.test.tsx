import { act, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { wait } from '@testing-library/user-event/dist/utils';
import { API } from 'aws-amplify';
import { subscriptionOrderItems } from 'components/organisms/admins/subscription-orders/subscription-order-list/subscription-order-list.mock';
import { customRender } from 'utilities/tests/custom-render';
import { SubscriptionOrderTemplateContainer } from './subscription-order-template-container';

const render = () => customRender(<SubscriptionOrderTemplateContainer />);

const renderAllList = async () => {
  // It renders a list.
  render();
  screen.getByRole('table');
  screen.getAllByText('発送月');
  screen.getByRole('button', { name: '全件' });
  screen.getByRole('button', { name: '検索する' });
  await waitForElementToBeRemoved(() => screen.getByLabelText('Now loading'));
  const rows = screen.getAllByRole('row');
  expect(rows).toHaveLength(25);
  screen.queryByRole('cell', { name: '担当者0' });
  screen.getByRole('cell', { name: '担当者1' });
  screen.getByRole('cell', { name: '担当者1' });
  screen.getByRole('cell', { name: '担当者12' });
  screen.queryByRole('cell', { name: '担当者13' });
};

describe('SubscriptionOrderTemplateContainer', () => {
  const spy = jest.spyOn(API, 'graphql');

  afterEach(() => {
    spy.mockClear();
  });

  test('It searches a subscription order item with delivery month.', async () => {
    spy.mockResolvedValueOnce({ data: { listSubscriptionOrdersSortedByCreatedAt: { items: subscriptionOrderItems } } });
    await renderAllList();
    // It selects a delivery month from select box, then it pushes a search button.
    const selectButton = screen.getByRole('button', { name: '全件' });
    userEvent.click(selectButton);
    userEvent.click(screen.getByText('1月'));
    const searchButton = screen.getByRole('button', { name: '検索する' });
    userEvent.click(searchButton);
    // It waits for appearing the order list after searching it with a delivery month.
    await waitForElementToBeRemoved(screen.queryByRole('cell', { name: '2022/12月' }));
    // await screen.findByRole('cell', { name: '担当者1' });
    expect(screen.getAllByRole('row')).toHaveLength(3);
    screen.getByRole('cell', { name: '担当者1' });
    screen.queryByRole('cell', { name: '担当者2' });
    screen.queryByRole('cell', { name: '担当者12' });
    screen.getByRole('cell', { name: '2022/1月' });
    screen.queryByRole('cell', { name: '2022/2月' });
    screen.queryByRole('cell', { name: '2022/12月' });
    // It selects a delivery month from select box, then it pushes a search button.
    userEvent.click(screen.getByRole('button', { name: '1月' }));
    // userEvent.click(screen.getByRole('button', { name: '12月' }));
    userEvent.click(screen.getByText('12月'));
    // userEvent.click(searchButton);
    // userEvent.click(screen.getByRole('button', { name: '検索する' }));
    // screen.getByRole('button', { name: '検索する' });
    userEvent.click(screen.getByRole('button', { name: '検索する' }));
    // userEvent.click(await screen.findByRole('button', { name: '検索する' }));
    // await waitFor(() => {
    //   userEvent.click(screen.getByRole('button', { name: '検索する' }));
    // });
    await screen.findByRole('cell', { name: '担当者12' });
    // await wait();
    // // It waits for appearing the order list after searching it with a delivery month.
    // await screen.findByRole('button', { name: '検索する' });
    expect(screen.getAllByRole('row')).toHaveLength(3);
    screen.queryByRole('cell', { name: '担当者11' });
    screen.getByRole('cell', { name: '担当者12' });
    screen.queryByRole('cell', { name: '担当者1' });
    screen.queryByRole('cell', { name: '2022/11月' });
    screen.getByRole('cell', { name: '2022/12月' });
    screen.queryByRole('cell', { name: '2022/1月' });
    // // It selects a delivery month from select box, then it pushes a search button.
    // userEvent.click(selectButton);
    // userEvent.click(screen.getByText('全件'));
    // userEvent.click(searchButton);
    // await wait();
    // // It waits for appearing the order list after searching it with a delivery month.
    // await screen.findByRole('button', { name: '検索する' });
    // expect(screen.getAllByRole('row')).toHaveLength(12);
    // screen.getByRole('cell', { name: '担当者11' });
    // screen.getByRole('cell', { name: '担当者12' });
    // screen.getByRole('cell', { name: '担当者1' });
    // screen.getByRole('cell', { name: '2022/11月' });
    // screen.getByRole('cell', { name: '2022/12月' });
    // screen.getByRole('cell', { name: '2022/1月' });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  // test('It ocurred an error when it creates a staff.', async () => {
  //   spy
  //     .mockResolvedValueOnce({ data: { listStaffsSortedByViewOrder: { items: [] } } })
  //     .mockRejectedValueOnce(Error('It occurred an async error.'));

  //   await createStaff();
  //   // It waits for viewing alert.
  //   await waitFor(() => {
  //     const alert = screen.getByRole('alert');
  //     expect(alert).toHaveTextContent('It occurred an async error.');
  //   });
  //   expect(spy).toHaveBeenCalledTimes(2);
  // });

  // test('It renders a staff list after it updates a staff.', async () => {
  //   spy
  //     .mockResolvedValueOnce({ data: { listStaffsSortedByViewOrder: { items: [item] } } })
  //     .mockResolvedValueOnce({ data: { updateStaff: { ...item, name: '担当者B' } } });
  //   await updateStaff();
  //   // It waits for it to disappear dialog.
  //   await waitForElementToBeRemoved(() => screen.getByRole('dialog', { name: '担当者を編集する' }));
  //   const rows = screen.getAllByRole('row');
  //   // Below rows include a 'th' header row.
  //   expect(rows).toHaveLength(2);
  //   screen.getByRole('cell', { name: '担当者B' });
  //   screen.getByRole('cell', { name: '2021/12/03 18:08' });
  //   screen.getByRole('button', { name: '担当者を編集する' });
  //   screen.getByRole('checkbox', { name: 'activate-switch' });
  //   expect(spy).toHaveBeenCalledTimes(2);
  // });

  // test('It ocurred an error when it updates a staff.', async () => {
  //   spy
  //     .mockResolvedValueOnce({ data: { listStaffsSortedByViewOrder: { items: [item] } } })
  //     .mockRejectedValueOnce(Error('It occurred an async error.'));

  //   await updateStaff();
  //   // It waits for viewing alert.
  //   await waitFor(() => {
  //     const alert = screen.getByRole('alert');
  //     expect(alert).toHaveTextContent('It occurred an async error.');
  //   });
  //   expect(spy).toHaveBeenCalledTimes(2);
  // });
});
