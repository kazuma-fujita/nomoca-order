import { LoginInfo } from '../types/login-info';
import { Path } from 'constants/path';
import { ScreenName } from 'constants/screen-name';
import { FormScreenQuery } from 'constants/form-screen-query';

context('SubscriptionOrder', () => {
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

  describe('It creates subscription order items.', () => {
    // 配送開始年月確認用
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 2);

    before(() => {
      // aws-sdkを直接実行しsign in
      cy.fixture('customer-user.json').then((loginInfo: LoginInfo) => {
        cy.cognitoLogin(loginInfo.username, loginInfo.password);
      });
    });

    after(() => {
      // aws-sdkを直接実行しsign out
      cy.cognitoLogout();
    });

    it('It creates subscription order items.', () => {
      // 注文画面表示
      cy.visit(Path.singleOrder);
      cy.waitUntil(() => cy.url().then(($url: string) => $url.includes(Path.singleOrder)));
      cy.get('header').contains(ScreenName.singleOrder).should('exist');
      cy.findByTestId('menu-icon').click();
      cy.findByTestId(Path.subscriptionOrder).click();
      //////////////////////////////////////////////////
      // 定期便一覧画面表示
      cy.waitUntil(() => cy.url().then(($url: string) => $url.includes(Path.subscriptionOrder)));
      cy.get('header').contains(ScreenName.subscriptionOrder).should('exist');
      cy.findByRole('button', { name: '定期便を申し込む' }).click();
      //////////////////////////////////////////////////
      // 定期便入力画面表示
      cy.url().should('include', `${Path.subscriptionOrder}?${FormScreenQuery.input}`);
      // 入力フォームの要素確認、値の入力、確認するボタン押下処理。注文入力画面と共通処理。order-commands.js参照
      cy.expectInputOrderForm('定期便');
      //////////////////////////////////////////////////
      // 定期便入力確認画面表示
      cy.url().should('include', `${Path.subscriptionOrder}?${FormScreenQuery.confirm}`);
      cy.findByRole('heading', { name: 'まだ定期便の申し込みは確定していません' });
      // 商品合計
      cy.findByRole('table').within(() => {
        cy.findByRole('cell', { name: '定期便商品A' });
      });
      cy.findByRole('table').within(() => {
        cy.findByRole('row', { name: '商品 数量 単価(円) 金額(円)' });
        // 商品
        cy.findByRole('cell', { name: '定期便商品A' });
        // 数量
        cy.findByRole('cell', { name: '1' });
        // 単価 金額 小計
        cy.findByRole('cell', { name: '小計' });
        cy.findAllByRole('cell', { name: '1,000' }).should('have.length', 3);
        // 税
        cy.findByRole('cell', { name: '税' });
        cy.findByRole('cell', { name: '10 %' });
        cy.findByRole('cell', { name: '100' });
        // 合計
        cy.findByRole('cell', { name: '合計' });
        cy.findByRole('cell', { name: '1,100' });
      });
      // 配送開始日
      cy.findByLabelText('配送開始月').should('have.text', `${nextMonth.getFullYear()} / ${nextMonth.getMonth()}月`);
      // 配送頻度
      cy.findByLabelText('配送頻度').should('have.text', '1ヶ月');
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
      // 定期便入力完了画面表示
      cy.url().should('include', `${Path.subscriptionOrder}?${FormScreenQuery.complete}`);
      cy.findByRole('button', { name: 'Topへ戻る' }).click();
      //////////////////////////////////////////////////
      // 定期便一覧画面表示
      cy.url().should('include', `${Path.subscriptionOrder}`);
      cy.findByRole('table').within(() => {
        // 配送開始月 and 次回配送予定月
        cy.findAllByRole('cell', { name: `${nextMonth.getFullYear()}/${nextMonth.getMonth()}月` }).should(
          'have.length',
          2,
        );
        // 配送頻度
        cy.findByRole('cell', { name: '1ヶ月' });
        // ボタン
        cy.findByRole('cell', { name: '変更する' });
        cy.findByRole('cell', { name: '解約する' });
        // 商品表示
        cy.findByRole('button', { name: 'expand row' }).click();
        cy.findByRole('row', { name: '商品 数量 単価(円) 金額(円)' });
        // 商品
        cy.findByRole('cell', { name: '定期便商品A' });
        // 数量
        cy.findByRole('cell', { name: '1' });
        // 単価 金額 小計
        cy.findByRole('cell', { name: '小計' });
        cy.findAllByRole('cell', { name: '1,000' }).should('have.length', 3);
        // 税
        cy.findByRole('cell', { name: '税' });
        cy.findByRole('cell', { name: '10 %' });
        cy.findByRole('cell', { name: '100' });
        // 合計
        cy.findByRole('cell', { name: '合計' });
        cy.findByRole('cell', { name: '1,100' });
      });
      //////////////////////////////////////////////////
    });

    it('It updates subscription order items.', () => {
      /////////////////////////////////////////////////
      // 定期便一覧画面
      cy.url().should('include', `${Path.subscriptionOrder}`);
      cy.findByRole('cell', { name: '変更する' }).click();
      //////////////////////////////////////////////////
      // 定期便入力画面表示
      cy.url().should('include', `${Path.subscriptionOrder}?${FormScreenQuery.input}`);
      // 配送開始月プルダウン
      cy.findByRole('button', { name: `配送開始月 ${nextMonth.getMonth()}月` });
      // 配送頻度プルダウン
      cy.findByRole('button', { name: '配送頻度 1ヶ月' });
      ////////////////////////////////////////////////////////////
      // 画面要素確認
      cy.findByRole('button', { name: '定期便注文を入力する' });
      cy.findByRole('button', { name: '確認する' }).should('exist');
      // 商品プルダウン(MUIのプルダウン系の値はbuttonで取得)
      cy.findByLabelText('Now loading').should('not.exist');
      cy.findByRole('button', { name: '商品 定期便商品A' });
      cy.findByRole('button', { name: '数量 1' });
      cy.findByRole('button', { name: '商品追加' });
      // 配送開始年(MUIのTextFieldを使用)
      cy.findByRole('textbox', { name: '' }).should('have.value', nextMonth.getFullYear());
      // 商品金額
      cy.findByRole('table').within(() => {
        cy.findByRole('row', { name: '商品 数量 単価(円) 金額(円)' });
        // 商品
        cy.findByRole('cell', { name: '定期便商品A' });
        // 数量
        cy.findByRole('cell', { name: '1' });
        // 単価 金額 小計
        cy.findByRole('cell', { name: '小計' });
        cy.findAllByRole('cell', { name: '1,000' }).should('have.length', 3);
        // 税
        cy.findByRole('cell', { name: '税' });
        cy.findByRole('cell', { name: '10 %' });
        cy.findByRole('cell', { name: '100' });
        // 合計
        cy.findByRole('cell', { name: '合計' });
        cy.findByRole('cell', { name: '1,100' });
      });
      // 配送先
      cy.findByRole('button', { name: '配送先を編集する' });
      cy.findByTestId('clinic-detail').within(() => {
        cy.findByText('渋谷クリニック');
        cy.findByText('〒 1234567');
        cy.findByText('東京都渋谷区渋谷1-2-3 渋谷ビル203');
        cy.findByText('電話番号 0312345678');
      });
      // 発注担当者
      cy.findByRole('button', { name: '発注担当者を追加する' });
      cy.findByRole('button', { name: '発注担当者 佐藤 太郎' });
      ////////////////////////////////////////////////////////////
      // 商品プルダウン選択
      cy.get('[name="products.0.productID"]').parent().click();
      cy.findByRole('option', { name: '定期便商品A' }).click();
      // 画面下部のボタンまでScroll
      cy.findByRole('button', { name: '確認する' }).scrollIntoView().should('be.visible');
      // 配送先入力
      cy.findByRole('button', { name: '配送先を編集する' }).click({ force: true });
      cy.findByRole('dialog').within(() => {
        cy.findByRole('heading', { name: '配送先を編集する' });
        cy.findByRole('textbox', { name: '医院名' }).should('have.value', '渋谷クリニック');
        cy.findByRole('textbox', { name: '郵便番号' }).should('have.value', '1234567');
        cy.findByRole('textbox', { name: '都道府県' }).should('have.value', '東京都');
        cy.findByRole('textbox', { name: '市区町村' }).should('have.value', '渋谷区渋谷');
        cy.findByRole('textbox', { name: '番地' }).should('have.value', '1-2-3');
        cy.findByRole('textbox', { name: '建物名・部屋番号' }).should('have.value', '渋谷ビル203');
        cy.findByRole('textbox', { name: '電話番号' }).should('have.value', '0312345678');
        // cy.findByRole('textbox', { name: '医院名' }).type('渋谷クリニック');
        // cy.findByRole('textbox', { name: '郵便番号' }).type('1234567');
        // cy.findByRole('textbox', { name: '都道府県' }).type('東京都');
        // cy.findByRole('textbox', { name: '市区町村' }).type('渋谷区渋谷');
        // cy.findByRole('textbox', { name: '番地' }).type('1-2-3');
        // cy.findByRole('textbox', { name: '建物名・部屋番号' }).type('渋谷ビル203');
        // cy.findByRole('textbox', { name: '電話番号' }).type('0312345678');
        cy.findByRole('button', { name: '編集する' }).click();
      });
      cy.findByTestId('clinic-detail').within(() => {
        cy.findByText('渋谷クリニック');
        cy.findByText('〒 1234567');
        cy.findByText('東京都渋谷区渋谷1-2-3 渋谷ビル203');
        cy.findByText('電話番号 0312345678');
      });
      // 担当者入力
      cy.findByRole('button', { name: '発注担当者を追加する' }).click({ force: true });
      cy.findByRole('dialog').within(() => {
        cy.findByRole('heading', { name: '発注担当者を追加する' });
        cy.findByRole('textbox', { name: '性' }).type('鈴木');
        cy.findByRole('textbox', { name: '名' }).type('花子');
        cy.findByRole('button', { name: '追加する' }).click();
      });
      // waitしてもStaffDialogがアクティブなDomとして認識される為、findByRoleで確認するボタンが認識できない
      // 以下cy.getだとHTML表示中要素全てにアクセス可能。念の為be.visibleでDialogが閉じてボタンが表示されているか確認
      cy.findByTestId('order-input-form-button').should('be.visible').click({ force: true });
      // まだプルダウンに作成した担当者名がセットされる前なのでvalidationが発生する
      cy.findByText('発注担当者を選択してください');
      // 改めて確認するボタンクリック
      cy.findByTestId('order-input-form-button').should('be.visible').click({ force: true });
      //////////////////////////////////////////////////
      // 定期便入力確認画面表示
      cy.url().should('include', `${Path.subscriptionOrder}?${FormScreenQuery.confirm}`);
      cy.findByRole('table').within(() => {
        cy.findByRole('cell', { name: '定期便商品A' });
      });
      cy.findByRole('table').within(() => {
        cy.findByRole('row', { name: '商品 数量 単価(円) 金額(円)' });
        // 商品
        cy.findByRole('cell', { name: '定期便商品A' });
        // 数量
        cy.findByRole('cell', { name: '1' });
        // 単価 金額 小計
        cy.findByRole('cell', { name: '小計' });
        cy.findAllByRole('cell', { name: '1,000' }).should('have.length', 3);
        // 税
        cy.findByRole('cell', { name: '税' });
        cy.findByRole('cell', { name: '10 %' });
        cy.findByRole('cell', { name: '100' });
        // 合計
        cy.findByRole('cell', { name: '合計' });
        cy.findByRole('cell', { name: '1,100' });
      });
      cy.findByLabelText('配送開始月').should('have.text', `${nextMonth.getFullYear()} / ${nextMonth.getMonth()}月`);
      cy.findByLabelText('配送頻度').should('have.text', '1ヶ月');
      cy.findByTestId('clinic-detail').within(() => {
        cy.findByText('渋谷クリニック');
        cy.findByText('〒 1234567');
        cy.findByText('東京都渋谷区渋谷1-2-3 渋谷ビル203');
        cy.findByText('電話番号 0312345678');
      });
      cy.findByRole('button', { name: '注文する' }).click();
      //////////////////////////////////////////////////
      // 定期便入力完了画面表示
      cy.url().should('include', `${Path.subscriptionOrder}?${FormScreenQuery.complete}`);
      cy.findByRole('button', { name: 'Topへ戻る' }).click();
      //////////////////////////////////////////////////
      // 定期便一覧画面表示
      cy.url().should('include', `${Path.subscriptionOrder}`);
      cy.findByRole('table').within(() => {
        // 配送開始月 and 次回配送予定月
        cy.findAllByRole('cell', { name: `${nextMonth.getFullYear()}/${nextMonth.getMonth()}月` }).should(
          'have.length',
          2,
        );
        // 配送頻度
        cy.findByRole('cell', { name: '1ヶ月' });
        // ボタン
        cy.findByRole('cell', { name: '変更する' });
        cy.findByRole('cell', { name: '解約する' });
        // 商品表示
        cy.findByRole('button', { name: 'expand row' }).click();
        cy.findByRole('row', { name: '商品 数量 単価(円) 金額(円)' });
        // 商品
        cy.findByRole('cell', { name: '定期便商品A' });
        // 数量
        cy.findByRole('cell', { name: '1' });
        // 単価 金額 小計
        cy.findByRole('cell', { name: '小計' });
        cy.findAllByRole('cell', { name: '1,000' }).should('have.length', 3);
        // 税
        cy.findByRole('cell', { name: '税' });
        cy.findByRole('cell', { name: '10 %' });
        cy.findByRole('cell', { name: '100' });
        // 合計
        cy.findByRole('cell', { name: '合計' });
        cy.findByRole('cell', { name: '1,100' });
      });
      //////////////////////////////////////////////////
    });
  });

  describe.skip('It checks admin subscription order items.', () => {
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
