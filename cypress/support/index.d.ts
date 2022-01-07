declare namespace Cypress {
  interface Chainable<Subject> {
    login(username: string, password: string): Chainable<any>;
    mockQuery(operationName: string, fixture: string): void;
  }
}
