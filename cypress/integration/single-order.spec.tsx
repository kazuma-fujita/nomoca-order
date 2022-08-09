import { FormScreenQuery } from 'constants/form-screen-query';
import { Path } from 'constants/path';
import { ScreenName } from 'constants/screen-name';
import { LoginInfo } from '../types/login-info';

context('SingleOrder', () => {
  before(() => {
    // dynamoDBのレコード全削除
    cy.clearAllRecords();
    cy.wait(1000);
    // 注文・定期便商品マスターレコード挿入
    cy.putProducts();
  });

  after(() => {
    // ブラウザローカルDB(IndexedDB)レコードを全削除してcognitoログイン情報をクリア
    cy.clearLocalStorage();
  });

  describe('It executes to create single order items.', () => {
    beforeEach(() => {
      // aws-sdkを直接実行しsign in
      cy.fixture('customer-user.json').then((loginInfo: LoginInfo) => {
        cy.cognitoLogin(loginInfo.username, loginInfo.password);
      });
    });

    after(() => {
      // aws-sdkを直接実行しsign out
      cy.cognitoLogout();
    });

    it('It creates single order items.', () => {
      // 注文画面表示
      cy.visit(Path.singleOrder);
      cy.waitUntil(() => cy.url().then(($url: string) => $url.includes(Path.singleOrder)));
      // 注文一覧
      cy.get('header').contains(ScreenName.singleOrder).should('exist');
      cy.findByRole('table').within(() => {
        cy.findByRole('row', { name: '商品 注文日時 配送方法 発送状況 発送日時' });
        cy.findByRole('cell', { name: '現在注文の商品はありません' });
      });
      // 注文ボタン押下
      cy.findByRole('button', { name: '商品を注文する' }).click();
      //////////////////////////////////////////////////
      // 注文入力画面表示
      cy.url().should('include', `${Path.singleOrder}?${FormScreenQuery.input}`);
      // 画面要素確認
      cy.get('header').contains(ScreenName.singleOrder).should('exist');
      cy.findByRole('button', { name: '注文を入力する' });
      // 配送方法
      cy.findByRole('radiogroup', { name: '配送方法' });
      //　通常配送チェック状態
      cy.findByRole('radio', { name: '通常配送' }).should('be.checked');
      cy.findByRole('radio', { name: '速達配送 +1,000円(税抜)' }).should('not.be.checked');
      // 入力フォームの要素確認、値の入力、確認するボタン押下処理
      cy.expectInputOrderForm('注文');
      cy.get('[data-testid="order-form-submit-button"]').should('be.visible').click();
      // cy.findByRole('button', { name: '確認する' }).click();
      //////////////////////////////////////////////////
      // 入力確認画面表示
      cy.url().should('include', `${Path.singleOrder}?${FormScreenQuery.confirm}`);
      cy.findByRole('heading', { name: 'まだ注文は確定していません' });
      cy.findByRole('table').within(() => {
        cy.findByRole('row', { name: '商品 数量 単価(円) 金額(円)' });
        // 商品
        cy.findByRole('cell', { name: '注文商品A' });
        cy.findByRole('cell', { name: '配送手数料' });
        // 数量
        cy.findAllByRole('cell', { name: '1' }).should('have.length', 2);
        // 単価 金額
        cy.findAllByRole('cell', { name: '1,000' }).should('have.length', 4);
        cy.findByRole('cell', { name: '小計' });
        // 小計
        cy.findByRole('cell', { name: '2,000' });
        // 税
        cy.findByRole('cell', { name: '税' });
        cy.findByRole('cell', { name: '10 %' });
        cy.findByRole('cell', { name: '200' });
        // 合計
        cy.findByRole('cell', { name: '合計' });
        cy.findByRole('cell', { name: '2,200' });
      });
      // 配送方法
      cy.findByText('通常配送');
      // 配送先
      cy.findByTestId('clinic-detail').within(() => {
        cy.findByText('渋谷クリニック');
        cy.findByText('〒 1234567');
        cy.findByText('東京都渋谷区渋谷1-2-3 渋谷ビル203');
        cy.findByText('電話番号 0312345678');
      });
      // 担当者
      cy.findByText('佐藤 太郎');
      cy.findByRole('button', { name: '注文する' }).click();
      //////////////////////////////////////////////////
      // 入力完了画面表示
      cy.url().should('include', `${Path.singleOrder}?${FormScreenQuery.complete}`);
      cy.findByRole('button', { name: '注文履歴を見る' }).click();
      //////////////////////////////////////////////////
      // 一覧画面表示
      cy.url().should('include', `${Path.singleOrder}`);
      cy.findByRole('table').within(() => {
        // 配送方法
        cy.findByRole('cell', { name: '通常配送' });
        // 発送状況
        cy.findByRole('cell', { name: '未発送' });
        // 発送日時
        cy.findByRole('cell', { name: '-' });
        // ボタン
        cy.findByRole('button', { name: '注文キャンセル' });
        // 商品表示
        cy.findByRole('button', { name: 'expand row' }).click();
        cy.findByRole('row', { name: '商品 数量 単価(円) 金額(円)' });
        // 商品
        cy.findByRole('cell', { name: '注文商品A' });
        cy.findByRole('cell', { name: '配送手数料' });
        // 数量
        cy.findAllByRole('cell', { name: '1' }).should('have.length', 2);
        // 単価 金額
        cy.findAllByRole('cell', { name: '1,000' }).should('have.length', 4);
        cy.findByRole('cell', { name: '小計' });
        // 小計
        cy.findByRole('cell', { name: '2,000' });
        // 税
        cy.findByRole('cell', { name: '税' });
        cy.findByRole('cell', { name: '10 %' });
        cy.findByRole('cell', { name: '200' });
        // 合計
        cy.findByRole('cell', { name: '合計' });
        cy.findByRole('cell', { name: '2,200' });
      });
      //////////////////////////////////////////////////
    });
  });

  describe('It checks admin single order items.', () => {
    before(() => {
      cy.fixture('operation-user.json').then((loginInfo: LoginInfo) => {
        cy.cognitoLogin(loginInfo.username, loginInfo.password);
      });
    });

    after(() => {
      cy.cognitoLogout();
    });

    it('It checks admin single order items.', () => {
      // 一覧画面表示
      cy.visit(Path.adminsSingleOrder);
      cy.waitUntil(() => cy.url().then(($url: string) => $url.includes(Path.adminsSingleOrder)));
      cy.get('header').contains(ScreenName.adminsSingleOrder).should('exist');
      cy.findByRole('table').within(() => {
        // 発送チェックボックス
        cy.findByRole('checkbox', { name: '' });
        // 医院名
        cy.findByRole('cell', { name: '渋谷クリニック' });
        // 電話番号
        cy.findByRole('cell', { name: '0312345678' });
        // 配送方法
        cy.findByRole('cell', { name: '通常配送' });
        // 発送状況
        cy.findByRole('cell', { name: '未発送' });
        // 発送日時
        cy.findByRole('cell', { name: '-' });
        // 商品表示
        cy.findByRole('button', { name: 'expand row' }).click();
        cy.findByRole('row', { name: '商品 数量 単価(円) 金額(円)' });
        // 商品
        cy.findByRole('cell', { name: '注文商品A' });
        cy.findByRole('cell', { name: '配送手数料' });
        // 数量
        cy.findAllByRole('cell', { name: '1' }).should('have.length', 2);
        // 単価 金額
        cy.findAllByRole('cell', { name: '1,000' }).should('have.length', 4);
        cy.findByRole('cell', { name: '小計' });
        // 小計
        cy.findByRole('cell', { name: '2,000' });
        // 税
        cy.findByRole('cell', { name: '税' });
        cy.findByRole('cell', { name: '10 %' });
        cy.findByRole('cell', { name: '200' });
        // 合計
        cy.findByRole('cell', { name: '合計' });
        cy.findByRole('cell', { name: '2,200' });
      });
      // 配送先ポップアップ表示
      cy.findByRole('button', { name: '配送先' }).click();
      // 配送先
      cy.findByTestId('clinic-detail').within(() => {
        cy.findByText('渋谷クリニック');
        cy.findByText('〒 1234567');
        cy.findByText('東京都渋谷区渋谷1-2-3 渋谷ビル203');
        cy.findByText('電話番号 0312345678');
        cy.findByText('発注担当者 佐藤 太郎');
      });
      // 配送先ポップアップ非表示
      cy.get('body').click(0, 0);
      // チェックボックス押下
      cy.get('[type="checkbox"]').check({ force: true });
      cy.findByRole('button', { name: '選択した注文をCSV出力して顧客に発送通知をする' }).click();
      cy.findByRole('dialog').within(() => {
        cy.findByRole('heading', { name: 'CSVを出力する前に必ず以下を確認してください' });
        cy.findByRole('button', { name: '発送済みにする' }).click();
      });
    });
  });
});
