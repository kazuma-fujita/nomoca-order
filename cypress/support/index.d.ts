declare namespace Cypress {
  interface Chainable<Subject> {
    login(username: string, password: string): void;
    cognitoLogin(username: string, password: string): Chainable<any>;
    mockQuery(operationName: string, fixture: string): void;
    listTable(): void;
    // putProducts(): void;
    putProducts(): Chainable<boolean>;
    // clearAllData(): Chainable<any>;
    // clearAllData(): void;
    clearAllRecords(): Chainable<boolean>;
    initializeDynamoDB(): void;
  }
}
