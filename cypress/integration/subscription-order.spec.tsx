import { LoginInfo } from '../types/login-info';
import { Path } from 'constants/path';
import { ScreenName } from 'constants/screen-name';

context('SubscriptionOrder', () => {
  before(() => {
    // cy.clearAllData();
    cy.fixture('customer-user.json').then((loginInfo: LoginInfo) => {
      cy.login(loginInfo.username, loginInfo.password);
    });
  });

  after(() => {
    cy.clearAllData();
  });

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
    // before(() => {});

    it('It views a subscription order list.', async () => {
      // cy.url().should('include', '/single-order');
      cy.waitUntil(() => cy.url().then(($url: string) => $url.includes(Path.singleOrder)));
      cy.clock(new Date(2023, 0));
      cy.get('header').contains(ScreenName.singleOrder).should('be.visible');
      cy.get('[data-cy="menu-icon"]').click();
      cy.get(`[data-cy="${Path.subscriptionOrder}"]`).click();
      cy.waitUntil(() => cy.url().then(($url: string) => $url.includes(Path.subscriptionOrder)));
      cy.get('header').contains(ScreenName.subscriptionOrder).should('be.visible');
      // expectTemplateElements();
      // cy.findByRole('button', { name: '全件' }).click();
      // cy.findByRole('option', { name: '1月' }).click();
      // cy.findByRole('button', { name: '検索する' }).click({ force: true });
      // cy.findAllByRole('row').should('have.length', 3);
      // cy.findByRole('cell', { name: '1ヶ月' });
      // cy.findByRole('cell', { name: '2022/1月' });
      // cy.findByRole('cell', { name: '2023/1月' });
      // reRenderAllRows('1月');
    });
  });
});
