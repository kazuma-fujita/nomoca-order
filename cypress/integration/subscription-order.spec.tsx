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
    // 翌月
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 2);
    // 翌々月
    const monthAfterNext = new Date(now.getFullYear(), now.getMonth() + 3);

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
      cy.get('[data-testid="order-form-submit-button"]').should('be.visible').click();
      // cy.findByRole('button', { name: '確認する' }).click();
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
      // 画面要素確認
      cy.findByRole('button', { name: '定期便注文を入力する' });
      // 更新前商品プルダウン確認(MUIのプルダウン系の値はbuttonで取得)
      cy.findByLabelText('Now loading').should('not.exist');
      cy.findByRole('button', { name: '商品 定期便商品A' });
      cy.findByRole('button', { name: '数量 1' });
      cy.findByRole('button', { name: '商品追加' });
      // 変更前商品金額
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
      // 商品追加
      cy.findByRole('button', { name: '商品追加' }).click();
      cy.get('[name="products.1.productID"]').parent().click();
      cy.findByRole('option', { name: '定期便商品B' }).click();
      // 追加商品数量変更
      cy.get('[name="products.1.quantity"]').parent().click();
      cy.findByRole('option', { name: '2' }).click();
      // 変更後商品金額
      cy.findByRole('table').within(() => {
        cy.findByRole('row', { name: '商品 数量 単価(円) 金額(円)' });
        // 商品
        cy.findByRole('cell', { name: '定期便商品A' });
        cy.findByRole('cell', { name: '定期便商品B' });
        // 数量
        cy.findByRole('cell', { name: '1' });
        cy.findByRole('cell', { name: '2' });
        // 単価 金額
        cy.findAllByRole('cell', { name: '1,000' }).should('have.length', 2);
        cy.findByRole('cell', { name: '2,000' });
        cy.findByRole('cell', { name: '4,000' });
        // 小計
        cy.findByRole('cell', { name: '小計' });
        cy.findByRole('cell', { name: '5,000' });
        // 税
        cy.findByRole('cell', { name: '税' });
        cy.findByRole('cell', { name: '10 %' });
        cy.findByRole('cell', { name: '500' });
        // 合計
        cy.findByRole('cell', { name: '合計' });
        cy.findByRole('cell', { name: '5,500' });
      });
      // 配送開始月プルダウン選択
      cy.findByRole('button', { name: `配送開始月 ${nextMonth.getMonth()}月` }).click();
      // 翌々月を選択
      cy.findByRole('option', { name: `${monthAfterNext.getMonth()}月` }).click();
      cy.findByRole('button', { name: `配送開始月 ${monthAfterNext.getMonth()}月` });
      // 配送頻度プルダウン選択
      cy.findByRole('button', { name: '配送頻度 1ヶ月' }).click();
      // 半年後を選択
      cy.findByRole('option', { name: '6ヶ月' }).click();
      cy.findByRole('button', { name: '配送頻度 6ヶ月' });
      // 更新前配送先確認
      cy.findByTestId('clinic-detail').within(() => {
        cy.findByText('渋谷クリニック');
        cy.findByText('〒 1234567');
        cy.findByText('東京都渋谷区渋谷1-2-3 渋谷ビル203');
        cy.findByText('電話番号 0312345678');
      });
      // 配送先編集
      cy.findByRole('button', { name: '配送先を編集する' }).click();
      cy.findByRole('dialog').within(() => {
        cy.findByRole('heading', { name: '配送先を編集する' });
        // textbox更新前の値存在を確認後、値クリア、更新後の値を入力
        cy.findByRole('textbox', { name: '医院名' }).should('have.value', '渋谷クリニック').clear().type('虹の丘医院');
        cy.findByRole('textbox', { name: '郵便番号' }).should('have.value', '1234567').clear().type('7654321');
        cy.findByRole('textbox', { name: '都道府県' }).should('have.value', '東京都').clear().type('宮城県');
        cy.findByRole('textbox', { name: '市区町村' })
          .should('have.value', '渋谷区渋谷')
          .clear()
          .type('仙台市泉区虹の丘');
        cy.findByRole('textbox', { name: '番地' }).should('have.value', '1-2-3').clear().type('4-15-10');
        cy.findByRole('textbox', { name: '建物名・部屋番号' }).should('have.value', '渋谷ビル203').clear();
        cy.findByRole('textbox', { name: '電話番号' }).should('have.value', '0312345678').clear().type('01207654321');
        cy.findByRole('button', { name: '編集する' }).click();
      });
      cy.findByTestId('clinic-detail').within(() => {
        cy.findByText('虹の丘医院');
        cy.findByText('〒 7654321');
        cy.findByText('宮城県仙台市泉区虹の丘4-15-10');
        cy.findByText('電話番号 01207654321');
      });
      // 更新前発注担当者確認
      // cy.findByRole('button', { name: '発注担当者 佐藤 太郎' });
      // 担当者追加
      cy.findByRole('button', { name: '発注担当者を追加する' }).click();
      cy.findByRole('dialog').within(() => {
        cy.findByRole('heading', { name: '発注担当者を追加する' });
        cy.findByRole('textbox', { name: '性' }).type('鈴木');
        cy.findByRole('textbox', { name: '名' }).type('花子');
        cy.findByRole('button', { name: '追加する' }).click();
      });
      // ダイアログが確実に閉じた事を確認
      // cy.get('[data-testid="order-form-submit-button"]').should('be.visible');
      // 担当者プルダウンをクリックし作成した担当者を選択
      // cy.findByRole('button', { name: '発注担当者 佐藤 太郎' }).click();
      // cy.findByRole('option', { name: '鈴木 花子' }).click();
      // cy.findByRole('button', { name: '発注担当者 鈴木 花子' });
      // 確認画面へ遷移
      cy.get('[data-testid="order-form-submit-button"]').should('be.visible').click();
      // cy.findByRole('button', { name: '確認する' }).click();
      //////////////////////////////////////////////////
      // 定期便入力確認画面表示
      cy.url().should('include', `${Path.subscriptionOrder}?${FormScreenQuery.confirm}`);
      cy.findByRole('heading', { name: 'まだ定期便の内容変更は確定していません' });
      cy.findByRole('table').within(() => {
        cy.findByRole('cell', { name: '定期便商品A' });
      });
      // 変更後商品金額
      cy.findByRole('table').within(() => {
        cy.findByRole('row', { name: '商品 数量 単価(円) 金額(円)' });
        // 商品
        cy.findByRole('cell', { name: '定期便商品A' });
        cy.findByRole('cell', { name: '定期便商品B' });
        // 数量
        cy.findByRole('cell', { name: '1' });
        cy.findByRole('cell', { name: '2' });
        // 単価 金額
        cy.findAllByRole('cell', { name: '1,000' }).should('have.length', 2);
        cy.findByRole('cell', { name: '2,000' });
        cy.findByRole('cell', { name: '4,000' });
        // 小計
        cy.findByRole('cell', { name: '小計' });
        cy.findByRole('cell', { name: '5,000' });
        // 税
        cy.findByRole('cell', { name: '税' });
        cy.findByRole('cell', { name: '10 %' });
        cy.findByRole('cell', { name: '500' });
        // 合計
        cy.findByRole('cell', { name: '合計' });
        cy.findByRole('cell', { name: '5,500' });
      });
      cy.findByLabelText('配送開始月').should(
        'have.text',
        `${monthAfterNext.getFullYear()} / ${monthAfterNext.getMonth()}月`,
      );
      cy.findByLabelText('配送頻度').should('have.text', '6ヶ月');
      cy.findByTestId('clinic-detail').within(() => {
        cy.findByText('虹の丘医院');
        cy.findByText('〒 7654321');
        cy.findByText('宮城県仙台市泉区虹の丘4-15-10');
        cy.findByText('電話番号 01207654321');
      });
      // cy.findByText('鈴木 花子');
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
        cy.findAllByRole('cell', { name: `${monthAfterNext.getFullYear()}/${monthAfterNext.getMonth()}月` }).should(
          'have.length',
          2,
        );
        // 配送頻度
        cy.findByRole('cell', { name: '6ヶ月' });
        // ボタン
        cy.findByRole('cell', { name: '変更する' });
        cy.findByRole('cell', { name: '解約する' });
        // 商品表示
        cy.findByRole('button', { name: 'expand row' }).click();
        cy.findByRole('row', { name: '商品 数量 単価(円) 金額(円)' });
        // 商品
        cy.findByRole('cell', { name: '定期便商品A' });
        cy.findByRole('cell', { name: '定期便商品B' });
        // 数量
        cy.findByRole('cell', { name: '1' });
        cy.findByRole('cell', { name: '2' });
        // 単価 金額
        cy.findAllByRole('cell', { name: '1,000' }).should('have.length', 2);
        cy.findByRole('cell', { name: '2,000' });
        cy.findByRole('cell', { name: '4,000' });
        // 小計
        cy.findByRole('cell', { name: '小計' });
        cy.findByRole('cell', { name: '5,000' });
        // 税
        cy.findByRole('cell', { name: '税' });
        cy.findByRole('cell', { name: '10 %' });
        cy.findByRole('cell', { name: '500' });
        // 合計
        cy.findByRole('cell', { name: '合計' });
        cy.findByRole('cell', { name: '5,500' });
      });
      //////////////////////////////////////////////////
    });

    it('It deletes subscription order items.', () => {
      // 定期便一覧画面
      cy.url().should('include', `${Path.subscriptionOrder}`);
      // 解約するボタンクリック
      cy.findByRole('cell', { name: '解約する' }).click();
      // 解約ダイアログ
      cy.findByRole('dialog').within(() => {
        cy.findByRole('heading', { name: '定期便を解約する' });
        cy.findByRole('button', { name: '解約する' }).click();
      });
      // ダイアログが確実に閉じた事を確認
      cy.findByTestId('menu-icon').should('be.visible');
      // 一覧確認
      cy.findByRole('table').within(() => {
        cy.findByRole('cell', { name: '現在定期便の商品はありません' });
      });
    });
  });
});
