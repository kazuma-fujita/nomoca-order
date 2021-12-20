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
  expectAllList();
};

const expectAllList = () => {
  const rows = screen.getAllByRole('row');
  expect(rows).toHaveLength(25);
  screen.queryByRole('cell', { name: '担当者0' });
  screen.getByRole('cell', { name: '担当者1' });
  screen.getByRole('cell', { name: '担当者12' });
  screen.getByRole('cell', { name: '2022/1月' });
  screen.getByRole('cell', { name: '2022/12月' });
  screen.queryByRole('cell', { name: '担当者13' });
};

describe('SubscriptionOrderTemplateContainer', () => {
  const spy = jest.spyOn(API, 'graphql');

  afterEach(() => {
    spy.mockClear();
  });

  describe('It searches a subscription order item', () => {
    beforeEach(async () => {
      spy.mockResolvedValueOnce({
        data: { listSubscriptionOrdersSortedByCreatedAt: { items: subscriptionOrderItems } },
      });
      await renderAllList();
    });

    /*
			テストデータ構造
			配送開始月:配送頻度=[開始月x配送頻度]
			1月:1ヶ月=[1,2,3,4,5,6,7,8,9,10,11,12]
			2月:2ヶ月=[2,4,6,8,10,12]
			3月:3ヶ月=[3,6,9,12]
			4月:4ヶ月=[4,8,12]
			5月:5ヶ月=[5,10,3]
			6月:6ヶ月=[6,12]
			7月:7ヶ月=[7,2]
			8月:8ヶ月=[8,4]
			9月:9ヶ月=[9,6]
			10月:10ヶ月=[10,8]
			11月:11ヶ月=[11,10]
			12月:12ヶ月=[12]
		*/

    test('with delivery month of January.', async () => {
      // It selects a delivery month from select box, then it pushes a search button.
      userEvent.click(screen.getByRole('button', { name: '全件' }));
      userEvent.click(screen.getByRole('option', { name: '1月' }));
      await act(async () => {
        userEvent.click(screen.getByRole('button', { name: '検索する' }));
        // It waits for appearing the order list after searching it with a delivery month.
        await wait();
      });
      expect(screen.getAllByRole('row')).toHaveLength(3);
      screen.getByRole('cell', { name: '1ヶ月' });
      screen.getByRole('cell', { name: '2022/1月' });
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('with delivery month of February.', async () => {
      userEvent.click(screen.getByRole('button', { name: '全件' }));
      userEvent.click(screen.getByRole('option', { name: '2月' }));
      await act(async () => {
        userEvent.click(screen.getByRole('button', { name: '検索する' }));
        await wait();
      });
      expect(screen.getAllByRole('row')).toHaveLength(7);
      screen.getByRole('cell', { name: '1ヶ月' });
      screen.getByRole('cell', { name: '2ヶ月' });
      screen.getByRole('cell', { name: '7ヶ月' });
      screen.getByRole('cell', { name: '2022/1月' });
      screen.getByRole('cell', { name: '2022/2月' });
      screen.getByRole('cell', { name: '2022/7月' });
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('with delivery month of March.', async () => {
      userEvent.click(screen.getByRole('button', { name: '全件' }));
      userEvent.click(screen.getByRole('option', { name: '3月' }));
      await act(async () => {
        userEvent.click(screen.getByRole('button', { name: '検索する' }));
        await wait();
      });
      expect(screen.getAllByRole('row')).toHaveLength(7);
      screen.getByRole('cell', { name: '1ヶ月' });
      screen.getByRole('cell', { name: '3ヶ月' });
      screen.getByRole('cell', { name: '5ヶ月' });
      screen.getByRole('cell', { name: '2022/1月' });
      screen.getByRole('cell', { name: '2022/3月' });
      screen.getByRole('cell', { name: '2022/5月' });
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('with delivery month of April.', async () => {
      userEvent.click(screen.getByRole('button', { name: '全件' }));
      userEvent.click(screen.getByRole('option', { name: '4月' }));
      await act(async () => {
        userEvent.click(screen.getByRole('button', { name: '検索する' }));
        await wait();
      });
      expect(screen.getAllByRole('row')).toHaveLength(9);
      screen.getByRole('cell', { name: '1ヶ月' });
      screen.getByRole('cell', { name: '2ヶ月' });
      screen.getByRole('cell', { name: '4ヶ月' });
      screen.getByRole('cell', { name: '8ヶ月' });
      screen.getByRole('cell', { name: '2022/1月' });
      screen.getByRole('cell', { name: '2022/2月' });
      screen.getByRole('cell', { name: '2022/4月' });
      screen.getByRole('cell', { name: '2022/8月' });
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('with delivery month of May.', async () => {
      userEvent.click(screen.getByRole('button', { name: '全件' }));
      userEvent.click(screen.getByRole('option', { name: '5月' }));
      await act(async () => {
        userEvent.click(screen.getByRole('button', { name: '検索する' }));
        await wait();
      });
      expect(screen.getAllByRole('row')).toHaveLength(5);
      screen.getByRole('cell', { name: '1ヶ月' });
      screen.getByRole('cell', { name: '5ヶ月' });
      screen.getByRole('cell', { name: '2022/1月' });
      screen.getByRole('cell', { name: '2022/5月' });
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('with delivery month of June.', async () => {
      userEvent.click(screen.getByRole('button', { name: '全件' }));
      userEvent.click(screen.getByRole('option', { name: '6月' }));
      await act(async () => {
        userEvent.click(screen.getByRole('button', { name: '検索する' }));
        await wait();
      });
      expect(screen.getAllByRole('row')).toHaveLength(11);
      screen.getByRole('cell', { name: '1ヶ月' });
      screen.getByRole('cell', { name: '2ヶ月' });
      screen.getByRole('cell', { name: '3ヶ月' });
      screen.getByRole('cell', { name: '6ヶ月' });
      screen.getByRole('cell', { name: '9ヶ月' });
      screen.getByRole('cell', { name: '2022/1月' });
      screen.getByRole('cell', { name: '2022/2月' });
      screen.getByRole('cell', { name: '2022/3月' });
      screen.getByRole('cell', { name: '2022/6月' });
      screen.getByRole('cell', { name: '2022/9月' });
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('with delivery month of July.', async () => {
      userEvent.click(screen.getByRole('button', { name: '全件' }));
      userEvent.click(screen.getByRole('option', { name: '7月' }));
      const searchButton = screen.getByRole('button', { name: '検索する' });
      await act(async () => {
        userEvent.click(searchButton);
        await wait();
      });
      expect(screen.getAllByRole('row')).toHaveLength(5);
      screen.getByRole('cell', { name: '1ヶ月' });
      screen.getByRole('cell', { name: '7ヶ月' });
      screen.getByRole('cell', { name: '2022/1月' });
      screen.getByRole('cell', { name: '2022/7月' });
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('with delivery month of August.', async () => {
      userEvent.click(screen.getByRole('button', { name: '全件' }));
      userEvent.click(screen.getByRole('option', { name: '8月' }));
      const searchButton = screen.getByRole('button', { name: '検索する' });
      await act(async () => {
        userEvent.click(searchButton);
        await wait();
      });
      expect(screen.getAllByRole('row')).toHaveLength(11);
      screen.getByRole('cell', { name: '1ヶ月' });
      screen.getByRole('cell', { name: '2ヶ月' });
      screen.getByRole('cell', { name: '4ヶ月' });
      screen.getByRole('cell', { name: '8ヶ月' });
      screen.getByRole('cell', { name: '10ヶ月' });
      screen.getByRole('cell', { name: '2022/1月' });
      screen.getByRole('cell', { name: '2022/2月' });
      screen.getByRole('cell', { name: '2022/4月' });
      screen.getByRole('cell', { name: '2022/8月' });
      screen.getByRole('cell', { name: '2022/10月' });
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('with delivery month of September.', async () => {
      userEvent.click(screen.getByRole('button', { name: '全件' }));
      userEvent.click(screen.getByRole('option', { name: '9月' }));
      const searchButton = screen.getByRole('button', { name: '検索する' });
      await act(async () => {
        userEvent.click(searchButton);
        await wait();
      });
      expect(screen.getAllByRole('row')).toHaveLength(7);
      screen.getByRole('cell', { name: '1ヶ月' });
      screen.getByRole('cell', { name: '3ヶ月' });
      screen.getByRole('cell', { name: '9ヶ月' });
      screen.getByRole('cell', { name: '2022/1月' });
      screen.getByRole('cell', { name: '2022/3月' });
      screen.getByRole('cell', { name: '2022/9月' });
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('with delivery month of October.', async () => {
      userEvent.click(screen.getByRole('button', { name: '全件' }));
      userEvent.click(screen.getByRole('option', { name: '10月' }));
      const searchButton = screen.getByRole('button', { name: '検索する' });
      await act(async () => {
        userEvent.click(searchButton);
        await wait();
      });
      expect(screen.getAllByRole('row')).toHaveLength(11);
      screen.getByRole('cell', { name: '1ヶ月' });
      screen.getByRole('cell', { name: '2ヶ月' });
      screen.getByRole('cell', { name: '5ヶ月' });
      screen.getByRole('cell', { name: '10ヶ月' });
      screen.getByRole('cell', { name: '11ヶ月' });
      screen.getByRole('cell', { name: '2022/1月' });
      screen.getByRole('cell', { name: '2022/2月' });
      screen.getByRole('cell', { name: '2022/5月' });
      screen.getByRole('cell', { name: '2022/10月' });
      screen.getByRole('cell', { name: '2022/11月' });
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('with delivery month of November.', async () => {
      userEvent.click(screen.getByRole('button', { name: '全件' }));
      userEvent.click(screen.getByRole('option', { name: '11月' }));
      const searchButton = screen.getByRole('button', { name: '検索する' });
      await act(async () => {
        userEvent.click(searchButton);
        await wait();
      });
      expect(screen.getAllByRole('row')).toHaveLength(5);
      screen.getByRole('cell', { name: '1ヶ月' });
      screen.getByRole('cell', { name: '11ヶ月' });
      screen.getByRole('cell', { name: '2022/1月' });
      screen.getByRole('cell', { name: '2022/11月' });
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('with delivery month of December.', async () => {
      userEvent.click(screen.getByRole('button', { name: '全件' }));
      userEvent.click(screen.getByRole('option', { name: '12月' }));
      await act(async () => {
        userEvent.click(screen.getByRole('button', { name: '検索する' }));
        await wait();
      });
      expect(screen.getAllByRole('row')).toHaveLength(13);
      screen.getByRole('cell', { name: '1ヶ月' });
      screen.getByRole('cell', { name: '2ヶ月' });
      screen.getByRole('cell', { name: '3ヶ月' });
      screen.getByRole('cell', { name: '4ヶ月' });
      screen.getByRole('cell', { name: '6ヶ月' });
      screen.getByRole('cell', { name: '12ヶ月' });
      screen.getByRole('cell', { name: '2022/1月' });
      screen.getByRole('cell', { name: '2022/2月' });
      screen.getByRole('cell', { name: '2022/3月' });
      screen.getByRole('cell', { name: '2022/4月' });
      screen.getByRole('cell', { name: '2022/6月' });
      screen.getByRole('cell', { name: '2022/12月' });
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('with delivery month of all month.', async () => {
      userEvent.click(screen.getByRole('button', { name: '全件' }));
      userEvent.click(screen.getByRole('option', { name: '全件' }));
      await act(async () => {
        userEvent.click(screen.getByRole('button', { name: '検索する' }));
        await wait();
      });
      expectAllList();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  test('It ocurred an error when it fetches a list.', async () => {
    spy.mockRejectedValueOnce(Error('It occurred an async error.'));

    render();
    // It waits for viewing alert.
    await waitFor(() => {
      const alert = screen.getByRole('alert');
      expect(alert).toHaveTextContent('It occurred an async error.');
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
