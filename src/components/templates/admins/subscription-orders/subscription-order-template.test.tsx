import { act, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { wait } from '@testing-library/user-event/dist/utils';
import { API } from 'aws-amplify';
import { subscriptionOrderListMock } from 'mocks/subscription-order-list.mock';
import { NowDateContextProvider } from 'stores/use-now-date';
import { customRender } from 'utilities/tests/custom-render';
import { SubscriptionOrderTemplate } from './subscription-order-template';

const expectTemplateElements = async () => {
  screen.getByRole('table');
  screen.getAllByText('配送月');
  screen.getByRole('button', { name: '全件' });
  screen.getByRole('button', { name: '検索する' });
  await waitForElementToBeRemoved(() => screen.getByLabelText('Now loading'));
  expectAllList();
};

const expectAllList = () => {
  const rows = screen.getAllByRole('row');
  expect(rows).toHaveLength(25);
  // staff
  screen.queryByRole('cell', { name: '発注担当者0' });
  screen.getByRole('cell', { name: '発注担当者1' });
  screen.getByRole('cell', { name: '発注担当者12' });
  screen.queryByRole('cell', { name: '発注担当者13' });
  // delivery start month
  screen.getByRole('cell', { name: '2022/1月' });
  screen.getByRole('cell', { name: '2022/2月' });
  screen.getByRole('cell', { name: '2022/3月' });
  screen.getByRole('cell', { name: '2022/4月' });
  screen.getByRole('cell', { name: '2022/5月' });
  screen.getByRole('cell', { name: '2022/6月' });
  screen.getByRole('cell', { name: '2022/7月' });
  screen.getByRole('cell', { name: '2022/8月' });
  screen.getByRole('cell', { name: '2022/9月' });
  screen.getByRole('cell', { name: '2022/10月' });
  screen.getByRole('cell', { name: '2022/11月' });
  screen.getByRole('cell', { name: '2022/12月' });
};

describe.skip('SubscriptionOrderTemplate', () => {
  const spy = jest.spyOn(API, 'graphql');

  afterEach(() => {
    spy.mockClear();
  });

  describe('It searches a subscription order item', () => {
    beforeEach(async () => {
      spy.mockResolvedValueOnce({
        data: { listSubscriptionOrdersSortedByCreatedAt: { items: subscriptionOrderListMock } },
      });
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
      // Current date is 2023/1.
      customRender(
        <NowDateContextProvider now={new Date(2023, 0)}>
          <SubscriptionOrderTemplate />
        </NowDateContextProvider>,
      );
      await expectTemplateElements();
      // It selects a delivery month from select box, then it pushes a search button.
      userEvent.click(screen.getByRole('button', { name: '全件' }));
      userEvent.click(screen.getByRole('option', { name: '1月' }));
      await act(async () => {
        userEvent.click(screen.getByRole('button', { name: '検索する' }));
        // It waits for appearing the order list after searching it with a delivery month.
        // await wait(100);
      });
      expect(screen.getAllByRole('row')).toHaveLength(3);
      screen.getByRole('cell', { name: '1ヶ月' });
      // delivery start month
      screen.getByRole('cell', { name: '2022/1月' });
      // next delivery month
      screen.getByRole('cell', { name: '2023/1月' });
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('with delivery month of February.', async () => {
      // Current date is 2023/2.
      customRender(
        <NowDateContextProvider now={new Date(2023, 1)}>
          <SubscriptionOrderTemplate />
        </NowDateContextProvider>,
      );
      await expectTemplateElements();
      // next delivery month
      screen.getByRole('cell', { name: '2023/1月' });
      expect(screen.getAllByRole('cell', { name: '2023/2月' })).toHaveLength(2);
      expect(screen.getAllByRole('cell', { name: '2023/3月' })).toHaveLength(2);
      expect(screen.getAllByRole('cell', { name: '2023/4月' })).toHaveLength(2);
      expect(screen.getAllByRole('cell', { name: '2023/6月' })).toHaveLength(2);
      screen.getByRole('cell', { name: '2023/8月' });
      screen.getByRole('cell', { name: '2023/10月' });
      screen.getByRole('cell', { name: '2023/12月' });
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
      // next delivery month
      expect(screen.getAllByRole('cell', { name: '2023/2月' })).toHaveLength(3);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('with delivery month of March.', async () => {
      // Current date is 2023/3.
      customRender(
        <NowDateContextProvider now={new Date(2023, 2)}>
          <SubscriptionOrderTemplate />
        </NowDateContextProvider>,
      );
      await expectTemplateElements();
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
      // next delivery month
      expect(screen.getAllByRole('cell', { name: '2023/3月' })).toHaveLength(3);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('with delivery month of April.', async () => {
      // Current date is 2023/4.
      customRender(
        <NowDateContextProvider now={new Date(2023, 3)}>
          <SubscriptionOrderTemplate />
        </NowDateContextProvider>,
      );
      await expectTemplateElements();
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
      // next delivery month
      expect(screen.getAllByRole('cell', { name: '2023/4月' })).toHaveLength(4);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('with delivery month of May.', async () => {
      // Current date is 2023/5.
      customRender(
        <NowDateContextProvider now={new Date(2023, 4)}>
          <SubscriptionOrderTemplate />
        </NowDateContextProvider>,
      );
      await expectTemplateElements();
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
      // next delivery month
      expect(screen.getAllByRole('cell', { name: '2023/5月' })).toHaveLength(2);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('with delivery month of June.', async () => {
      // Current date is 2023/6.
      customRender(
        <NowDateContextProvider now={new Date(2023, 5)}>
          <SubscriptionOrderTemplate />
        </NowDateContextProvider>,
      );
      await expectTemplateElements();
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
      // next delivery month
      expect(screen.getAllByRole('cell', { name: '2023/6月' })).toHaveLength(5);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('with delivery month of July.', async () => {
      // Current date is 2023/7.
      customRender(
        <NowDateContextProvider now={new Date(2023, 6)}>
          <SubscriptionOrderTemplate />
        </NowDateContextProvider>,
      );
      await expectTemplateElements();
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
      // next delivery month
      expect(screen.getAllByRole('cell', { name: '2023/7月' })).toHaveLength(2);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('with delivery month of August.', async () => {
      // Current date is 2023/8.
      customRender(
        <NowDateContextProvider now={new Date(2023, 7)}>
          <SubscriptionOrderTemplate />
        </NowDateContextProvider>,
      );
      await expectTemplateElements();
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
      // next delivery month
      expect(screen.getAllByRole('cell', { name: '2023/8月' })).toHaveLength(5);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('with delivery month of September.', async () => {
      // Current date is 2023/9.
      customRender(
        <NowDateContextProvider now={new Date(2023, 8)}>
          <SubscriptionOrderTemplate />
        </NowDateContextProvider>,
      );
      await expectTemplateElements();
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
      // next delivery month
      expect(screen.getAllByRole('cell', { name: '2023/9月' })).toHaveLength(3);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('with delivery month of October.', async () => {
      // Current date is 2023/10.
      customRender(
        <NowDateContextProvider now={new Date(2023, 9)}>
          <SubscriptionOrderTemplate />
        </NowDateContextProvider>,
      );
      await expectTemplateElements();
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
      // next delivery month
      expect(screen.getAllByRole('cell', { name: '2023/10月' })).toHaveLength(5);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('with delivery month of November.', async () => {
      // Current date is 2023/11.
      customRender(
        <NowDateContextProvider now={new Date(2023, 10)}>
          <SubscriptionOrderTemplate />
        </NowDateContextProvider>,
      );
      await expectTemplateElements();
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
      // next delivery month
      expect(screen.getAllByRole('cell', { name: '2023/11月' })).toHaveLength(2);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('with delivery month of December.', async () => {
      // Current date is 2023/12.
      customRender(
        <NowDateContextProvider now={new Date(2023, 11)}>
          <SubscriptionOrderTemplate />
        </NowDateContextProvider>,
      );
      await expectTemplateElements();
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
      // next delivery month
      expect(screen.getAllByRole('cell', { name: '2023/12月' })).toHaveLength(6);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('with delivery month of all month.', async () => {
      // Current date is 2023/12.
      customRender(
        <NowDateContextProvider now={new Date(2023, 11)}>
          <SubscriptionOrderTemplate />
        </NowDateContextProvider>,
      );
      await expectTemplateElements();
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
    customRender(
      <NowDateContextProvider now={new Date(2023, 11)}>
        <SubscriptionOrderTemplate />
      </NowDateContextProvider>,
    );
    // It waits for viewing alert.
    await waitFor(() => {
      const alert = screen.getByRole('alert');
      expect(alert).toHaveTextContent('It occurred an async error.');
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
