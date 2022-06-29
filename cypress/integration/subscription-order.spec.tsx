import { LoginInfo } from '../types/login-info';
import { Path } from 'constants/path';
import { ScreenName } from 'constants/screen-name';
import { FormScreenQuery } from 'constants/form-screen-query';

context('SubscriptionOrder', () => {
  before(() => {
    cy.clearAllRecords();
    cy.wait(1000);
    cy.putProducts();
    // cy.fixture('customer-user.json').then((loginInfo: LoginInfo) => {
    //   cy.cognitoLogin(loginInfo.username, loginInfo.password);
    // });
  });

  after(() => {
    cy.clearLocalStorage();
  });

  describe('It creates subscription order items.', () => {
    before(() => {
      cy.fixture('customer-user.json').then((loginInfo: LoginInfo) => {
        cy.cognitoLogin(loginInfo.username, loginInfo.password);
      });
    });

    after(() => {
      cy.cognitoLogout();
    });

    it('It creates subscription order items.', () => {
      // 注文画面表示
      cy.visit(Path.singleOrder);
      cy.waitUntil(() => cy.url().then(($url: string) => $url.includes(Path.singleOrder)));
      cy.get('header').contains(ScreenName.singleOrder).should('exist');
      cy.findByTestId('menu-icon').click();
      cy.findByTestId(Path.subscriptionOrder).click();
      // 定期便一覧画面表示
      cy.clock(new Date(2022, 5));
      cy.waitUntil(() => cy.url().then(($url: string) => $url.includes(Path.subscriptionOrder)));
      cy.get('header').contains(ScreenName.subscriptionOrder).should('exist');
      cy.findByRole('button', { name: '定期便を申し込む' }).click();
      // 定期便入力画面表示
      cy.url().should('include', `${Path.subscriptionOrder}?${FormScreenQuery.input}`);
      // 画面要素確認
      cy.findByRole('button', { name: '定期便注文を入力する' });
      cy.findByRole('button', { name: '配送先を作成する' }).should('exist');
      cy.findByRole('button', { name: '発注担当者を追加する' }).should('exist');
      cy.findByRole('button', { name: '確認する' }).should('exist');
      // 商品プルダウン表示確認
      // cy.findByLabelText('Now loading').should('exist');
      cy.findByLabelText('Now loading').should('not.exist');
      cy.findByRole('button', { name: '商品追加' }).should('exist');
      // 商品プルダウン選択
      cy.get('[name="products.0.productID"]').parent().click();
      cy.findByRole('option', { name: '定期便商品A' }).click();
      // 画面下部のボタンまでScroll
      cy.findByRole('button', { name: '確認する' }).scrollIntoView().should('be.visible');
      // 配送先入力
      cy.findByRole('button', { name: '配送先を作成する' }).click({ force: true });
      cy.intercept('POST', '/graphql').as('createClinic');
      cy.findByRole('dialog').within(() => {
        cy.findByRole('heading', { name: '配送先を作成する' });
        cy.findByRole('textbox', { name: '医院名' }).type('渋谷クリニック');
        cy.findByRole('textbox', { name: '郵便番号' }).type('1234567');
        cy.findByRole('textbox', { name: '都道府県' }).type('東京都');
        cy.findByRole('textbox', { name: '市区町村' }).type('渋谷区渋谷');
        cy.findByRole('textbox', { name: '番地' }).type('1-2-3');
        cy.findByRole('textbox', { name: '建物名・部屋番号' }).type('渋谷ビル203');
        cy.findByRole('textbox', { name: '電話番号' }).type('0312345678');
        cy.findByRole('button', { name: '作成する' }).click();
      });
      cy.wait('@createClinic');
      cy.findByTestId('clinic-detail').within(() => {
        cy.findByText('渋谷クリニック');
        cy.findByText('〒 1234567');
        cy.findByText('東京都渋谷区渋谷1-2-3 渋谷ビル203');
        cy.findByText('電話番号 0312345678');
      });
      // 担当者入力
      cy.findByRole('button', { name: '発注担当者を追加する' }).click({ force: true });
      cy.intercept('POST', '/graphql').as('createStaff');
      cy.findByRole('dialog').within(() => {
        cy.findByRole('heading', { name: '発注担当者を追加する' });
        cy.findByRole('textbox', { name: '性' }).type('佐藤');
        cy.findByRole('textbox', { name: '名' }).type('太郎');
        cy.findByRole('button', { name: '追加する' }).click();
      });
      cy.wait('@createStaff');
      // waitしてもStaffDialogがアクティブなDomとして認識される為、findByRoleで確認するボタンが認識できない
      // 以下cy.getだとHTML表示中要素全てにアクセス可能。念の為be.visibleでDialogが閉じてボタンが表示されているか確認
      cy.findByTestId('order-input-form-button').should('be.visible').click({ force: true });
      // 定期便入力確認画面表示
      cy.url().should('include', `${Path.subscriptionOrder}?${FormScreenQuery.confirm}`);
      cy.findByRole('table').within(() => {
        cy.findByRole('cell', { name: '定期便商品A' });
      });
      cy.findByLabelText('配送開始月').should('have.text', '2022 / 7月');
      cy.findByLabelText('配送頻度').should('have.text', '1ヶ月');
      cy.findByTestId('clinic-detail').within(() => {
        cy.findByText('渋谷クリニック');
        cy.findByText('〒 1234567');
        cy.findByText('東京都渋谷区渋谷1-2-3 渋谷ビル203');
        cy.findByText('電話番号 0312345678');
      });
      // cy.findByLabelText('発注担当者').contains('p', '佐藤  太郎');
      // cy.findByLabelText('発注担当者').should('have.text', '佐藤  太郎');
      cy.findByRole('button', { name: '注文する' }).click();
      // 定期便入力完了画面表示
      cy.url().should('include', `${Path.subscriptionOrder}?${FormScreenQuery.complete}`);
      cy.findByRole('button', { name: 'Topへ戻る' }).click();
      // 定期便一覧画面表示
      cy.url().should('include', `${Path.subscriptionOrder}`);
      cy.findByRole('table').within(() => {
        cy.findAllByRole('cell', { name: '2022/7月' }).should('have.length', 2);
        // 商品表示
        cy.findByRole('button', { name: 'expand row' }).click();
        cy.findByRole('cell', { name: '定期便商品A' });
      });
    });
  });

  describe('It checks admin subscription order items.', () => {
    before(() => {
      cy.fixture('operation-user.json').then((loginInfo: LoginInfo) => {
        cy.cognitoLogin(loginInfo.username, loginInfo.password);
      });
    });

    after(() => {
      cy.cognitoLogout();
    });

    it('It checks admin subscription order items.', () => {
      // 定期便一覧画面表示
      cy.visit(Path.adminsSubscriptionOrder);
      cy.clock(new Date(2022, 5));
      cy.waitUntil(() => cy.url().then(($url: string) => $url.includes(Path.adminsSubscriptionOrder)));
      cy.get('header').contains(ScreenName.adminsSubscriptionOrder).should('exist');
      cy.findByRole('table').within(() => {
        cy.findAllByRole('cell', { name: '渋谷クリニック' }).should('exist');
        cy.findAllByRole('cell', { name: '2022/7月' }).should('have.length', 2);
        // 商品表示
        cy.findByRole('button', { name: 'expand row' }).click();
        cy.findByRole('cell', { name: '定期便商品A' });
      });
    });
  });
});
