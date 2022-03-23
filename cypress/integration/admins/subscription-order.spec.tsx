import { subscriptionOrderListMock } from 'components/organisms/admins/subscription-orders/subscription-order-list/subscription-order-list.mock';

context('SubscriptionOrder', () => {
  before(() => {
    cy.fixture('operation-user.json').then((loginInfo) => {
      cy.login(loginInfo.username, loginInfo.password);
    });
  });

  const expectTemplateElements = async () => {
    cy.findByRole('button', { name: '検索する' }).should('be.visible');
    cy.findByRole('button', { name: '全件' }).should('be.visible');
    cy.findByRole('button', { name: '2023年' }).should('be.visible');
    cy.url().should('include', '/admins/subscription-order');
    expectAllRows();
  };

  const expectAllRows = () => {
    cy.findAllByRole('row').should('have.length', 25);
    // staff
    cy.findByRole('cell', { name: '発注担当者1' });
    cy.findByRole('cell', { name: '発注担当者12' });
    // delivery start month
    cy.findByRole('cell', { name: '2022/1月' });
    cy.findByRole('cell', { name: '2022/2月' });
    cy.findByRole('cell', { name: '2022/3月' });
    cy.findByRole('cell', { name: '2022/4月' });
    cy.findByRole('cell', { name: '2022/5月' });
    cy.findByRole('cell', { name: '2022/6月' });
    cy.findByRole('cell', { name: '2022/7月' });
    cy.findByRole('cell', { name: '2022/8月' });
    cy.findByRole('cell', { name: '2022/9月' });
    cy.findByRole('cell', { name: '2022/10月' });
    cy.findByRole('cell', { name: '2022/11月' });
    cy.findByRole('cell', { name: '2022/12月' });
  };

  const reRenderAllRows = (selectedMonth: string) => {
    // post-processing
    cy.findByRole('button', { name: selectedMonth }).click({ force: true });
    cy.findByRole('option', { name: '全件' }).click();
    cy.findByRole('button', { name: '検索する' }).click({ force: true });
    expectAllRows();
  };

  describe('It searches a subscription order item', () => {
    before(() => {
      const data = {
        data: { listSubscriptionOrdersSortedByCreatedAt: { items: subscriptionOrderListMock } },
      };
      cy.mockQuery('listSubscriptionOrdersSortedByCreatedAt', JSON.stringify(data));
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
    it('with delivery month of January.', () => {
      cy.clock(new Date(2023, 0));
      cy.get('header').contains('定期便管理').should('be.visible');
      expectTemplateElements();
      cy.findByRole('button', { name: '全件' }).click();
      cy.findByRole('option', { name: '1月' }).click();
      cy.findByRole('button', { name: '検索する' }).click({ force: true });
      // cy.get('button').contains('検索する').click({ force: true });
      cy.findAllByRole('row').should('have.length', 3);
      cy.findByRole('cell', { name: '1ヶ月' });
      // delivery start month
      cy.findByRole('cell', { name: '2022/1月' });
      // next delivery month
      cy.findByRole('cell', { name: '2023/1月' });
      // post-processing
      reRenderAllRows('1月');
    });

    it('with delivery month of February.', async () => {
      // Current date is 2023/2.
      cy.clock(new Date(2023, 1));
      expectTemplateElements();
      cy.findByRole('button', { name: '全件' }).click({ force: true });
      cy.findByRole('option', { name: '2月' }).click();
      cy.findByRole('button', { name: '検索する' }).click({ force: true });
      cy.findAllByRole('row').should('have.length', 7);
      cy.findByRole('cell', { name: '1ヶ月' });
      cy.findByRole('cell', { name: '2ヶ月' });
      cy.findByRole('cell', { name: '7ヶ月' });
      // delivery start month
      cy.findByRole('cell', { name: '2022/1月' });
      cy.findByRole('cell', { name: '2022/2月' });
      cy.findByRole('cell', { name: '2022/7月' });
      // next delivery month
      cy.findAllByRole('cell', { name: '2023/2月' }).should('have.length', 3);
      // post-processing
      reRenderAllRows('2月');
    });

    // it('with delivery month of March.', async () => {
    //   mockQuery();
    //   // Current date is 2023/3.
    //   expectTemplateElements(new Date(2023, 2));
    //   cy.findByRole('button', { name: '全件' }).click();
    //   cy.findByRole('option', { name: '3月' }).click();
    //   cy.findByRole('button', { name: '検索する' }).click();
    //   cy.findAllByRole('row').should('have.length', 7);
    //   cy.findByRole('cell', { name: '1ヶ月' });
    //   cy.findByRole('cell', { name: '3ヶ月' });
    //   cy.findByRole('cell', { name: '5ヶ月' });
    //   cy.findByRole('cell', { name: '2022/1月' });
    //   cy.findByRole('cell', { name: '2022/3月' });
    //   cy.findByRole('cell', { name: '2022/5月' });
    //   // next delivery month
    //   cy.findAllByRole('cell', { name: '2023/3月' }).should('have.length', 3);
    //   // post-processing
    //   reRenderAllRows('3月');
    // });

    // it('with delivery month of April.', async () => {
    //   mockQuery();
    //   // Current date is 2023/4.
    //   expectTemplateElements(new Date(2023, 3));
    //   cy.findByRole('button', { name: '全件' }).click();
    //   cy.findByRole('option', { name: '4月' }).click();
    //   cy.findByRole('button', { name: '検索する' }).click();
    //   cy.findAllByRole('row').should('have.length', 9);
    //   cy.findByRole('cell', { name: '1ヶ月' });
    //   cy.findByRole('cell', { name: '2ヶ月' });
    //   cy.findByRole('cell', { name: '4ヶ月' });
    //   cy.findByRole('cell', { name: '8ヶ月' });
    //   cy.findByRole('cell', { name: '2022/1月' });
    //   cy.findByRole('cell', { name: '2022/2月' });
    //   cy.findByRole('cell', { name: '2022/4月' });
    //   cy.findByRole('cell', { name: '2022/8月' });
    //   // next delivery month
    //   cy.findAllByRole('cell', { name: '2023/4月' }).should('have.length', 4);
    //   // post-processing
    //   reRenderAllRows('4月');
    // });

    // it('with delivery month of May.', async () => {
    //   // Current date is 2023/5.
    //   expectTemplateElements(new Date(2023, 4));
    //   cy.findByRole('button', { name: '全件' }).click();
    //   cy.findByRole('option', { name: '5月' }).click();
    //   cy.findByRole('button', { name: '検索する' }).click();
    //   cy.findAllByRole('row').should('have.length', 5);
    //   cy.findByRole('cell', { name: '1ヶ月' });
    //   cy.findByRole('cell', { name: '5ヶ月' });
    //   cy.findByRole('cell', { name: '2022/1月' });
    //   cy.findByRole('cell', { name: '2022/5月' });
    //   // next delivery month
    //   cy.findAllByRole('cell', { name: '2023/5月' }).should('have.length', 2);
    //   // post-processing
    //   reRenderAllRows('5月');
    // });

    // it('with delivery month of June.', async () => {
    //   // Current date is 2023/6.
    //   expectTemplateElements(new Date(2023, 5));
    //   cy.findByRole('button', { name: '全件' }).click();
    //   cy.findByRole('option', { name: '6月' }).click();
    //   cy.findByRole('button', { name: '検索する' }).click();
    //   cy.findAllByRole('row').should('have.length', 11);
    //   cy.findByRole('cell', { name: '1ヶ月' });
    //   cy.findByRole('cell', { name: '2ヶ月' });
    //   cy.findByRole('cell', { name: '3ヶ月' });
    //   cy.findByRole('cell', { name: '6ヶ月' });
    //   cy.findByRole('cell', { name: '9ヶ月' });
    //   cy.findByRole('cell', { name: '2022/1月' });
    //   cy.findByRole('cell', { name: '2022/2月' });
    //   cy.findByRole('cell', { name: '2022/3月' });
    //   cy.findByRole('cell', { name: '2022/6月' });
    //   cy.findByRole('cell', { name: '2022/9月' });
    //   // next delivery month
    //   cy.findAllByRole('cell', { name: '2023/6月' }).should('have.length', 5);
    //   // post-processing
    //   reRenderAllRows('6月');
    // });

    // it('with delivery month of July.', async () => {
    //   // Current date is 2023/7.
    //   expectTemplateElements(new Date(2023, 6));
    //   cy.findByRole('button', { name: '全件' }).click();
    //   cy.findByRole('option', { name: '7月' }).click();
    //   cy.findByRole('button', { name: '検索する' }).click();
    //   cy.findAllByRole('row').should('have.length', 5);
    //   cy.findByRole('cell', { name: '1ヶ月' });
    //   cy.findByRole('cell', { name: '7ヶ月' });
    //   cy.findByRole('cell', { name: '2022/1月' });
    //   cy.findByRole('cell', { name: '2022/7月' });
    //   // next delivery month
    //   cy.findAllByRole('cell', { name: '2023/7月' }).should('have.length', 2);
    //   // post-processing
    //   reRenderAllRows('7月');
    // });

    // it('with delivery month of August.', async () => {
    //   // Current date is 2023/8.
    //   expectTemplateElements(new Date(2023, 7));
    //   cy.findByRole('button', { name: '全件' }).click();
    //   cy.findByRole('option', { name: '8月' }).click();
    //   cy.findByRole('button', { name: '検索する' }).click();
    //   cy.findAllByRole('row').should('have.length', 11);
    //   cy.findByRole('cell', { name: '1ヶ月' });
    //   cy.findByRole('cell', { name: '2ヶ月' });
    //   cy.findByRole('cell', { name: '4ヶ月' });
    //   cy.findByRole('cell', { name: '8ヶ月' });
    //   cy.findByRole('cell', { name: '10ヶ月' });
    //   cy.findByRole('cell', { name: '2022/1月' });
    //   cy.findByRole('cell', { name: '2022/2月' });
    //   cy.findByRole('cell', { name: '2022/4月' });
    //   cy.findByRole('cell', { name: '2022/8月' });
    //   cy.findByRole('cell', { name: '2022/10月' });
    //   // next delivery month
    //   cy.findAllByRole('cell', { name: '2023/8月' }).should('have.length', 5);
    //   // post-processing
    //   reRenderAllRows('8月');
    // });

    // it('with delivery month of September.', async () => {
    //   // Current date is 2023/9.
    //   expectTemplateElements(new Date(2023, 8));
    //   cy.findByRole('button', { name: '全件' }).click();
    //   cy.findByRole('option', { name: '9月' }).click();
    //   cy.findByRole('button', { name: '検索する' }).click();
    //   cy.findAllByRole('row').should('have.length', 7);
    //   cy.findByRole('cell', { name: '1ヶ月' });
    //   cy.findByRole('cell', { name: '3ヶ月' });
    //   cy.findByRole('cell', { name: '9ヶ月' });
    //   cy.findByRole('cell', { name: '2022/1月' });
    //   cy.findByRole('cell', { name: '2022/3月' });
    //   cy.findByRole('cell', { name: '2022/9月' });
    //   // next delivery month
    //   cy.findAllByRole('cell', { name: '2023/9月' }).should('have.length', 3);
    //   // post-processing
    //   reRenderAllRows('9月');
    // });

    // it('with delivery month of October.', async () => {
    //   // Current date is 2023/10.
    //   expectTemplateElements(new Date(2023, 9));
    //   cy.findByRole('button', { name: '全件' }).click();
    //   cy.findByRole('option', { name: '10月' }).click();
    //   cy.findByRole('button', { name: '検索する' }).click();
    //   cy.findAllByRole('row').should('have.length', 11);
    //   cy.findByRole('cell', { name: '1ヶ月' });
    //   cy.findByRole('cell', { name: '2ヶ月' });
    //   cy.findByRole('cell', { name: '5ヶ月' });
    //   cy.findByRole('cell', { name: '10ヶ月' });
    //   cy.findByRole('cell', { name: '11ヶ月' });
    //   cy.findByRole('cell', { name: '2022/1月' });
    //   cy.findByRole('cell', { name: '2022/2月' });
    //   cy.findByRole('cell', { name: '2022/5月' });
    //   cy.findByRole('cell', { name: '2022/10月' });
    //   cy.findByRole('cell', { name: '2022/11月' });
    //   // next delivery month
    //   cy.findAllByRole('cell', { name: '2023/10月' }).should('have.length', 5);
    //   // post-processing
    //   reRenderAllRows('10月');
    // });

    // it('with delivery month of November.', async () => {
    //   // Current date is 2023/11.
    //   expectTemplateElements(new Date(2023, 10));
    //   cy.findByRole('button', { name: '全件' }).click();
    //   cy.findByRole('option', { name: '11月' }).click();
    //   cy.findByRole('button', { name: '検索する' }).click();
    //   cy.findAllByRole('row').should('have.length', 5);
    //   cy.findByRole('cell', { name: '1ヶ月' });
    //   cy.findByRole('cell', { name: '11ヶ月' });
    //   cy.findByRole('cell', { name: '2022/1月' });
    //   cy.findByRole('cell', { name: '2022/11月' });
    //   // next delivery month
    //   cy.findAllByRole('cell', { name: '2023/11月' }).should('have.length', 2);
    //   // post-processing
    //   reRenderAllRows('11月');
    // });

    // it('with delivery month of December.', async () => {
    //   // Current date is 2023/12.
    //   expectTemplateElements(new Date(2023, 11));
    //   cy.findByRole('button', { name: '全件' }).click();
    //   cy.findByRole('option', { name: '12月' }).click();
    //   cy.findByRole('button', { name: '検索する' }).click();
    //   cy.findAllByRole('row').should('have.length', 13);
    //   cy.findByRole('cell', { name: '1ヶ月' });
    //   cy.findByRole('cell', { name: '2ヶ月' });
    //   cy.findByRole('cell', { name: '3ヶ月' });
    //   cy.findByRole('cell', { name: '4ヶ月' });
    //   cy.findByRole('cell', { name: '6ヶ月' });
    //   cy.findByRole('cell', { name: '12ヶ月' });
    //   cy.findByRole('cell', { name: '2022/1月' });
    //   cy.findByRole('cell', { name: '2022/2月' });
    //   cy.findByRole('cell', { name: '2022/3月' });
    //   cy.findByRole('cell', { name: '2022/4月' });
    //   cy.findByRole('cell', { name: '2022/6月' });
    //   cy.findByRole('cell', { name: '2022/12月' });
    //   // next delivery month
    //   cy.findAllByRole('cell', { name: '2023/12月' }).should('have.length', 6);
    //   // post-processing
    //   reRenderAllRows('12月');
    // });

    //   it('with delivery month of all month.', async () => {
    //     // Current date is 2023/12.
    //     expectTemplateElements(new Date(2023, 11));
    //     await expectTemplateElements();
    //     cy.findByRole('button', { name: '全件' }).click();
    //     userEvent.click(cy.findByRole('option', { name: '全件' }));
    //     cy.findByRole('button', { name: '検索する' }).click();
    //     expectAllRows();
    //   });
    // });

    // it('It ocurred an error when it fetches a list.', async () => {
    //   spy.mockRejectedValueOnce(Error('It occurred an async error.'));
    //   expectTemplateElements(new Date(2023, 11));
    //   // It waits for viewing alert.
    //   await waitFor(() => {
    //     const alert = cy.findByRole('alert');
    //     expect(alert).toHaveTextContent('It occurred an async error.');
    //   });
    //
    // });
  });
});
