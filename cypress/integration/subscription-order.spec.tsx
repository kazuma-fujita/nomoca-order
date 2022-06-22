import { LoginInfo } from '../types/login-info';
import { Path } from 'constants/path';
import { ScreenName } from 'constants/screen-name';
import { FormScreenQuery } from 'constants/form-screen-query';

context('SubscriptionOrder', () => {
  before(() => {
    cy.initializeDynamoDB();
    cy.fixture('customer-user.json').then((loginInfo: LoginInfo) => {
      cy.login(loginInfo.username, loginInfo.password);
    });
  });

  // after(async () => {
  //   cy.clearAllData();
  // });

  // const expectTemplateElements = async () => {
  //   cy.findByRole('button', { name: '検索する' }).should('be.visible');
  //   cy.findByRole('button', { name: '全件' }).should('be.visible');
  //   cy.findByRole('button', { name: '2023年' }).should('be.visible');
  //   cy.url().should('include', '/admins/subscription-order');
  //   expectAllRows();
  // };

  // const expectAllRows = () => {
  //   cy.findAllByRole('row').should('have.length', 25);
  //   // staff
  //   cy.findByRole('cell', { name: '発注担当者1' });
  //   cy.findByRole('cell', { name: '発注担当者12' });
  // };

  // const reRenderAllRows = (selectedMonth: string) => {
  //   // post-processing
  //   cy.findByRole('button', { name: selectedMonth }).click({ force: true });
  //   cy.findByRole('option', { name: '全件' }).click();
  //   cy.findByRole('button', { name: '検索する' }).click({ force: true });
  //   expectAllRows();
  // };

  describe('It creates subscription order items.', () => {
    it('It views a subscription order list.', () => {
      // cy.url().should('include', '/single-order');
      // 注文画面表示
      cy.waitUntil(() => cy.url().then(($url: string) => $url.includes(Path.singleOrder)));
      cy.clock(new Date(2023, 0));
      cy.get('header').contains(ScreenName.singleOrder).should('be.visible');
      cy.get('[data-cy="menu-icon"]').click();
      cy.get(`[data-cy="${Path.subscriptionOrder}"]`).click();
      // 定期便画面表示
      cy.waitUntil(() => cy.url().then(($url: string) => $url.includes(Path.subscriptionOrder)));
      cy.get('header').contains(ScreenName.subscriptionOrder).should('be.visible');
      cy.findByRole('button', { name: '定期便を申し込む' }).click();
      cy.url().should('include', `${Path.subscriptionOrder}?${FormScreenQuery.input}`);
      cy.findByRole('button', { name: '定期便注文を入力する' });
      // cy.findByRole('combobox', { name: '商品' }).click({ force: true });
      cy.findByRole('button', { name: '商品' }).click({ force: true });
      cy.findByRole('option', { name: '定期便商品A' }).click();
      // cy.findByRole('button', { name: '検索する' }).click({ force: true });
      // cy.findAllByRole('row').should('have.length', 3);
      // cy.findByRole('cell', { name: '1ヶ月' });
      // cy.findByRole('cell', { name: '2022/1月' });
      // cy.findByRole('cell', { name: '2023/1月' });
      // reRenderAllRows('1月');
    });
  });
});
