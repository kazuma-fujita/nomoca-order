import { Header } from '../../../src/components/molecules/header';
describe('Authenticator', function () {
  before(() => {
    cy.fixture('operation-user.json').then((loginInfo) => {
      cy.login(loginInfo.username, loginInfo.password);
    });
  });

  describe('Sign In', () => {
    it('allows a user to signin', () => {
      // cy.wait(1000);
      cy.get('header').contains('定期便管理').should('be.visible');
      cy.url().should('include', '/admins/subscription-order');
    });
  });
});
