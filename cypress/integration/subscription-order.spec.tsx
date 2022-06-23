import { LoginInfo } from '../types/login-info';
import { Path } from 'constants/path';
import { ScreenName } from 'constants/screen-name';
import { FormScreenQuery } from 'constants/form-screen-query';

context('SubscriptionOrder', () => {
  before(() => {
    cy.clearAllRecords();
    cy.wait(1000);
    cy.putProducts();
    cy.fixture('customer-user.json').then((loginInfo: LoginInfo) => {
      cy.login(loginInfo.username, loginInfo.password);
    });
  });

  describe('It creates subscription order items.', () => {
    it('It views a subscription order list.', () => {
      // 注文画面表示
      cy.waitUntil(() => cy.url().then(($url: string) => $url.includes(Path.singleOrder)));
      cy.clock(new Date(2023, 0));
      cy.get('header').contains(ScreenName.singleOrder).should('exist');
      cy.get('[data-cy="menu-icon"]').click();
      cy.get(`[data-cy="${Path.subscriptionOrder}"]`).click();
      // 定期便画面表示
      cy.waitUntil(() => cy.url().then(($url: string) => $url.includes(Path.subscriptionOrder)));
      cy.get('header').contains(ScreenName.subscriptionOrder).should('exist');
      cy.findByRole('button', { name: '定期便を申し込む' }).click();
      cy.url().should('include', `${Path.subscriptionOrder}?${FormScreenQuery.input}`);
      cy.findByRole('button', { name: '定期便注文を入力する' });
      // 商品プルダウン表示確認
      cy.findByLabelText('Now loading').should('exist');
      cy.findByLabelText('Now loading').should('not.exist');
      cy.findByRole('button', { name: '商品追加' }).should('exist');
    });

    it('It fills down the order form.', () => {
      // 商品プルダウン選択
      cy.get('[name="products.0.productID"]').parent().click();
      cy.findByRole('option', { name: '定期便商品A' }).click();
      // 担当者入力
      cy.findByRole('button', { name: '発注担当者を追加する' }).click();
      cy.findByRole('dialog');
      cy.findByRole('heading', { name: '発注担当者を追加する' });
      cy.findByRole('textbox', { name: '性' }).type('佐藤');
      cy.findByRole('textbox', { name: '名' }).type('太郎');
      cy.findByRole('button', { name: '追加する' }).click();
      cy.findByRole('dialog').should('not.exist');
      cy.get('[name="staffID"]').parent().should('have.value', '佐藤  太郎');
      // 配送先入力
      // cy.findByRole('button', { name: '配送先を作成する' }).click();
    });
  });
});
