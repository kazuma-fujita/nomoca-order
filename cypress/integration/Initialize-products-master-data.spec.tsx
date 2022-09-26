context('Initialize the products master data', () => {
  it('Execute to initialize the products master data.', () => {
    // dynamoDBのレコード全削除
    cy.clearAllRecords();
    cy.wait(1000);
    // 注文・定期便商品マスターレコード挿入
    cy.putProducts();
  });
});
