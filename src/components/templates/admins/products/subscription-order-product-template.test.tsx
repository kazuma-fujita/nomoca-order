import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OrderType, Type } from 'API';
import { API } from 'aws-amplify';
import { ProductListContextProvider } from 'stores/use-product-list';
import { customRender } from 'utilities/tests/custom-render';
import { ProductTemplate } from './product-template';

const item = {
  __typename: 'Product',
  id: 'dummyID-1',
  name: '商品A',
  unitPrice: 1000,
  type: Type.product,
  orderType: OrderType.subscriptionOrder,
  viewOrder: 1,
  disabled: false,
  createdAt: '2021-11-25T14:32:55.000Z',
  updatedAt: '2021-12-03T09:08:07.000Z',
};

const render = () =>
  customRender(
    <ProductListContextProvider orderType={OrderType.subscriptionOrder} isFilterByActiveProduct={false}>
      <ProductTemplate />
    </ProductListContextProvider>,
  );

const renderList = async () => {
  // It renders a list.
  render();
  screen.getByRole('table', { name: 'products table' });
  await waitForElementToBeRemoved(() => screen.getByLabelText('Now loading'));
};

const create = async () => {
  await renderList();
  screen.getByText('商品を追加してください');
  // It views a dialog.
  userEvent.click(screen.getByRole('button', { name: '商品を追加する' }));
  screen.getByRole('dialog', { name: '商品を追加する' });
  // It submits form input values.
  userEvent.type(screen.getByRole('textbox', { name: '商品名' }), '商品A');
  userEvent.type(screen.getByRole('spinbutton', { name: '単価' }), '1000');
  userEvent.click(screen.getByRole('button', { name: '追加する' }));
};

const update = async () => {
  await renderList();
  // It renders a staff list.
  expect(screen.getAllByRole('row')).toHaveLength(2);
  screen.getByRole('cell', { name: '商品A' });
  // It views a dialog.
  userEvent.click(screen.getByRole('button', { name: '商品を編集する' }));
  screen.getByRole('dialog', { name: '商品を編集する' });
  // It submits form input values.
  userEvent.type(screen.getByRole('textbox', { name: '商品名' }), '商品B');
  userEvent.type(screen.getByRole('spinbutton', { name: '単価' }), '1000000');
  userEvent.click(screen.getByRole('button', { name: '編集する' }));
};

describe('SubscriptionOrderProductTemplate', () => {
  const spy = jest.spyOn(API, 'graphql');

  afterEach(() => {
    spy.mockClear();
  });

  test('It ocurred an error when it renders a product list.', async () => {
    spy.mockRejectedValueOnce(Error('It occurred an async error.'));
    await renderList();
    // It waits for viewing alert.
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('It occurred an async error.');
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('It renders a product list after it creates a product.', async () => {
    spy
      .mockResolvedValueOnce({ data: { listProductsSortedByViewOrder: { items: [] } } })
      .mockResolvedValueOnce({ data: { createProduct: item } });
    await create();
    // It waits for it to disappear dialog.
    await waitForElementToBeRemoved(() => screen.getByRole('dialog', { name: '商品を追加する' }));
    const rows = screen.getAllByRole('row');
    // Rows below include a 'th' header row.
    expect(rows).toHaveLength(2);
    screen.getByRole('cell', { name: '商品A' });
    screen.getByRole('cell', { name: '1,000' });
    screen.getByRole('cell', { name: '2021/12/03 18:08' });
    screen.getByRole('button', { name: '商品を編集する' });
    screen.getByRole('checkbox', { name: 'activate-switch' });
    expect(spy).toHaveBeenCalledTimes(2);
  });

  test('It ocurred an error when it creates a product.', async () => {
    spy
      .mockResolvedValueOnce({ data: { listProductsSortedByViewOrder: { items: [] } } })
      .mockRejectedValueOnce(Error('It occurred an async error.'));
    await create();
    // It waits for viewing alert.
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('It occurred an async error.');
    });
    expect(spy).toHaveBeenCalledTimes(2);
  });

  test('It renders a staff list after it updates a product.', async () => {
    spy
      .mockResolvedValueOnce({ data: { listProductsSortedByViewOrder: { items: [item] } } })
      .mockResolvedValueOnce({ data: { updateProduct: { ...item, name: '商品B', unitPrice: 1000000 } } });
    await update();
    // It waits for it to disappear dialog.
    await waitForElementToBeRemoved(() => screen.getByRole('dialog', { name: '商品を編集する' }));
    const rows = screen.getAllByRole('row');
    // Below rows include a 'th' header row.
    expect(rows).toHaveLength(2);
    screen.getByRole('cell', { name: '商品B' });
    screen.getByRole('cell', { name: '1,000,000' });
    screen.getByRole('cell', { name: '2021/12/03 18:08' });
    screen.getByRole('button', { name: '商品を編集する' });
    screen.getByRole('checkbox', { name: 'activate-switch' });
    expect(spy).toHaveBeenCalledTimes(2);
  });

  test('It ocurred an error when it updates a products.', async () => {
    spy
      .mockResolvedValueOnce({ data: { listProductsSortedByViewOrder: { items: [item] } } })
      .mockRejectedValueOnce(Error('It occurred an async error.'));
    await update();
    // It waits for viewing alert.
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('It occurred an async error.');
    });
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
