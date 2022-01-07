describe('Authenticator', function () {
  beforeEach(function () {
    cy.visit('/');
  });
  describe('Sign In', () => {
    it('allows a user to signin', () => {
      cy.get(selectors.usernameInput).type('kazuma.fujita+operator1@gm.genova.co.jp');
      cy.get(selectors.signInPasswordInput).type('Thunder4649');
      cy.get(selectors.signInSignInButton).contains('ログイン').click();
      cy.wait(1000);
      cy.get(selectors.root).contains('定期便管理');
    });
  });
});

export const selectors = {
  usernameInput: '[data-test="sign-in-username-input"]',
  signInPasswordInput: '[data-test="sign-in-password-input"]',
  signInSignInButton: '[data-test="sign-in-sign-in-button"]',
  root: '#root',
};
