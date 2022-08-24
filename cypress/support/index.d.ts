declare namespace Cypress {
  interface Chainable<Subject> {
    login(username: string, password: string): void;
    cognitoLogin(username: string, password: string): Chainable<any>;
    cognitoLogout(): Chainable<any>;
    mockQuery(operationName: string, fixture: string): void;
    putProducts(): Chainable<boolean>;
    clearAllRecords(): Chainable<boolean>;
    expectInputOrderForm(orderTypeLabel: string): void;
  }
}
