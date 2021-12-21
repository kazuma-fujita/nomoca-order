import { act, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { wait } from '@testing-library/user-event/dist/utils';
import { API } from 'aws-amplify';
import { subscriptionOrderItems } from 'components/organisms/admins/subscription-orders/subscription-order-list/subscription-order-list.mock';
import { customRender } from 'utilities/tests/custom-render';
import { SubscriptionOrderTemplateContainer } from './subscription-order-template-container';

const expectTemplateElements = async () => {
  screen.getByRole('table');
  screen.getByRole('button', { name: '定期便を申し込む' });
  await waitForElementToBeRemoved(() => screen.getByLabelText('Now loading'));
  expectAllList();
};

const expectAllList = () => {
  const rows = screen.getAllByRole('row');
  expect(rows).toHaveLength(25);
  // staff
  screen.queryByRole('cell', { name: '担当者0' });
  screen.getByRole('cell', { name: '担当者1' });
  screen.getByRole('cell', { name: '担当者12' });
  screen.queryByRole('cell', { name: '担当者13' });
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

describe('SubscriptionOrderTemplateContainer', () => {
  const spy = jest.spyOn(API, 'graphql');

  afterEach(() => {
    spy.mockClear();
  });

  describe('It renders a subscription order list', () => {
    beforeEach(async () => {
      spy.mockResolvedValueOnce({
        data: { listSubscriptionOrdersSortedByCreatedAt: { items: subscriptionOrderItems } },
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

    test('in January, 2023.', async () => {
      // Current date is 2023/1.
      customRender(<SubscriptionOrderTemplateContainer now={new Date(2023, 0)} />);
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
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('in February, 2023.', async () => {
      // Current date is 2023/2.
      customRender(<SubscriptionOrderTemplateContainer now={new Date(2023, 1)} />);
      await expectTemplateElements();
      // next delivery month
      expect(screen.getAllByRole('cell', { name: '2023/2月' })).toHaveLength(3);
      expect(screen.getAllByRole('cell', { name: '2023/3月' })).toHaveLength(2);
      expect(screen.getAllByRole('cell', { name: '2023/4月' })).toHaveLength(2);
      expect(screen.getAllByRole('cell', { name: '2023/6月' })).toHaveLength(2);
      screen.getByRole('cell', { name: '2023/8月' });
      screen.getByRole('cell', { name: '2023/10月' });
      screen.getByRole('cell', { name: '2023/12月' });
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('in March, 2023.', async () => {
      // Current date is 2023/3.
      customRender(<SubscriptionOrderTemplateContainer now={new Date(2023, 2)} />);
      await expectTemplateElements();
      // next delivery month
      expect(screen.getAllByRole('cell', { name: '2023/3月' })).toHaveLength(3);
      expect(screen.getAllByRole('cell', { name: '2023/4月' })).toHaveLength(3);
      expect(screen.getAllByRole('cell', { name: '2023/6月' })).toHaveLength(2);
      screen.getByRole('cell', { name: '2023/7月' });
      screen.getByRole('cell', { name: '2023/8月' });
      screen.getByRole('cell', { name: '2023/10月' });
      screen.getByRole('cell', { name: '2023/12月' });
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('in April, 2023.', async () => {
      // Current date is 2023/4.
      customRender(<SubscriptionOrderTemplateContainer now={new Date(2023, 3)} />);
      await expectTemplateElements();
      // next delivery month
      expect(screen.getAllByRole('cell', { name: '2023/4月' })).toHaveLength(4);
      screen.getByRole('cell', { name: '2023/5月' });
      expect(screen.getAllByRole('cell', { name: '2023/6月' })).toHaveLength(3);
      screen.getByRole('cell', { name: '2023/7月' });
      screen.getByRole('cell', { name: '2023/8月' });
      screen.getByRole('cell', { name: '2023/10月' });
      screen.getByRole('cell', { name: '2023/12月' });
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('in May, 2023.', async () => {
      // Current date is 2023/5.
      customRender(<SubscriptionOrderTemplateContainer now={new Date(2023, 4)} />);
      await expectTemplateElements();
      // next delivery month
      expect(screen.getAllByRole('cell', { name: '2023/5月' })).toHaveLength(2);
      expect(screen.getAllByRole('cell', { name: '2023/6月' })).toHaveLength(4);
      screen.getByRole('cell', { name: '2023/7月' });
      expect(screen.getAllByRole('cell', { name: '2023/8月' })).toHaveLength(3);
      screen.getByRole('cell', { name: '2023/10月' });
      screen.getByRole('cell', { name: '2023/12月' });
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('in June, 2023.', async () => {
      // Current date is 2023/6.
      customRender(<SubscriptionOrderTemplateContainer now={new Date(2023, 5)} />);
      await expectTemplateElements();
      // next delivery month
      expect(screen.getAllByRole('cell', { name: '2023/6月' })).toHaveLength(5);
      screen.getByRole('cell', { name: '2023/7月' });
      expect(screen.getAllByRole('cell', { name: '2023/8月' })).toHaveLength(3);
      expect(screen.getAllByRole('cell', { name: '2023/10月' })).toHaveLength(2);
      screen.getByRole('cell', { name: '2023/12月' });
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('in July, 2023.', async () => {
      // Current date is 2023/7.
      customRender(<SubscriptionOrderTemplateContainer now={new Date(2023, 6)} />);
      await expectTemplateElements();
      // next delivery month
      expect(screen.getAllByRole('cell', { name: '2023/7月' })).toHaveLength(2);
      expect(screen.getAllByRole('cell', { name: '2023/8月' })).toHaveLength(4);
      expect(screen.getAllByRole('cell', { name: '2023/9月' })).toHaveLength(2);
      expect(screen.getAllByRole('cell', { name: '2023/10月' })).toHaveLength(2);
      expect(screen.getAllByRole('cell', { name: '2023/12月' })).toHaveLength(2);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('in August, 2023.', async () => {
      // Current date is 2023/8.
      customRender(<SubscriptionOrderTemplateContainer now={new Date(2023, 7)} />);
      await expectTemplateElements();
      // next delivery month
      expect(screen.getAllByRole('cell', { name: '2023/8月' })).toHaveLength(5);
      expect(screen.getAllByRole('cell', { name: '2023/9月' })).toHaveLength(2);
      expect(screen.getAllByRole('cell', { name: '2023/10月' })).toHaveLength(2);
      expect(screen.getAllByRole('cell', { name: '2023/12月' })).toHaveLength(2);
      screen.getByRole('cell', { name: '2024/2月' });
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('in September, 2023.', async () => {
      // Current date is 2023/9.
      customRender(<SubscriptionOrderTemplateContainer now={new Date(2023, 8)} />);
      await expectTemplateElements();
      // next delivery month
      expect(screen.getAllByRole('cell', { name: '2023/9月' })).toHaveLength(3);
      expect(screen.getAllByRole('cell', { name: '2023/10月' })).toHaveLength(4);
      expect(screen.getAllByRole('cell', { name: '2023/12月' })).toHaveLength(3);
      screen.getByRole('cell', { name: '2024/2月' });
      screen.getByRole('cell', { name: '2024/4月' });
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('in October, 2023.', async () => {
      // Current date is 2023/10.
      customRender(<SubscriptionOrderTemplateContainer now={new Date(2023, 9)} />);
      await expectTemplateElements();
      // next delivery month
      expect(screen.getAllByRole('cell', { name: '2023/10月' })).toHaveLength(5);
      expect(screen.getAllByRole('cell', { name: '2023/12月' })).toHaveLength(4);
      screen.getByRole('cell', { name: '2024/2月' });
      screen.getByRole('cell', { name: '2024/4月' });
      screen.getByRole('cell', { name: '2024/6月' });
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('in November, 2023.', async () => {
      // Current date is 2023/11.
      customRender(<SubscriptionOrderTemplateContainer now={new Date(2023, 10)} />);
      await expectTemplateElements();
      // next delivery month
      expect(screen.getAllByRole('cell', { name: '2023/11月' })).toHaveLength(2);
      expect(screen.getAllByRole('cell', { name: '2023/12月' })).toHaveLength(5);
      screen.getByRole('cell', { name: '2024/2月' });
      screen.getByRole('cell', { name: '2024/3月' });
      screen.getByRole('cell', { name: '2024/4月' });
      screen.getByRole('cell', { name: '2024/6月' });
      screen.getByRole('cell', { name: '2024/8月' });
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('in December, 2023.', async () => {
      // Current date is 2023/12.
      customRender(<SubscriptionOrderTemplateContainer now={new Date(2023, 11)} />);
      await expectTemplateElements();
      // next delivery month
      expect(screen.getAllByRole('cell', { name: '2023/12月' })).toHaveLength(6);
      screen.getByRole('cell', { name: '2024/2月' });
      screen.getByRole('cell', { name: '2024/3月' });
      screen.getByRole('cell', { name: '2024/4月' });
      screen.getByRole('cell', { name: '2024/6月' });
      screen.getByRole('cell', { name: '2024/8月' });
      screen.getByRole('cell', { name: '2024/10月' });
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  test('It ocurred an error when it fetches a list.', async () => {
    spy.mockRejectedValueOnce(Error('It occurred an async error.'));
    customRender(<SubscriptionOrderTemplateContainer now={new Date(2023, 11)} />);
    // It waits for viewing alert.
    await waitFor(() => {
      const alert = screen.getByRole('alert');
      expect(alert).toHaveTextContent('It occurred an async error.');
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
