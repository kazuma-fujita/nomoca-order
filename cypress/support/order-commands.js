Cypress.Commands.add('expectInputOrderForm', (orderTypeLabel) => {
  // 商品プルダウン(MUIのプルダウン系の値はbuttonで取得)
  cy.findByLabelText('Now loading').should('not.exist');
  cy.findByRole('button', { name: '数量 1' });
  cy.findByRole('button', { name: '商品追加' });
  // 配送先
  cy.findByRole('button', { name: '配送先を作成する' });
  // 発注担当者
  cy.findByRole('button', { name: '発注担当者を追加する' });
  // 商品プルダウン選択
  cy.get('[name="products.0.productID"]').parent().click();
  cy.findByRole('option', { name: `${orderTypeLabel}商品A` }).click();
  // 商品金額
  cy.findByRole('table').within(() => {
    cy.findByRole('row', { name: '商品 数量 単価(円) 金額(円)' });
    // 商品
    cy.findByRole('cell', { name: `${orderTypeLabel}商品A` });
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
  // 画面下部のボタンまでScroll
  cy.findByRole('button', { name: '確認する' }).scrollIntoView().should('be.visible');
  // 配送先入力
  cy.findByRole('button', { name: '配送先を作成する' }).click({ force: true });
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
  // dialogが閉じて配送先がラベル表示されていることを確認
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
    cy.findByRole('textbox', { name: '性' }).type('佐藤');
    cy.findByRole('textbox', { name: '名' }).type('太郎');
    cy.findByRole('button', { name: '追加する' }).click();
  });
  // dialogが閉じて担当者がプルダウンにセットされていることを確認
  cy.findByRole('button', { name: '発注担当者 佐藤 太郎' });
  // waitしてもStaffDialogがアクティブなDomとして認識される為、findByRoleで確認するボタンが認識できない
  // 以下cy.getだとHTML表示中要素全てにアクセス可能。念の為be.visibleでDialogが閉じてボタンが表示されているか確認
  cy.findByRole('button', { name: '確認する' });
  cy.findByTestId('order-input-form-button').should('be.visible').click({ force: true });
});
