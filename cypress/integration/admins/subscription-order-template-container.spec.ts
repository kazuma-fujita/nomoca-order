import { subscriptionOrderItems } from 'components/organisms/admins/subscription-orders/subscription-order-list/subscription-order-list.mock';

describe('Authenticator', function () {
  before(() => {
    cy.fixture('operation-user.json').then((loginInfo) => {
      cy.login(loginInfo.username, loginInfo.password);
    });
    const data = {
      data: { listSubscriptionOrdersSortedByCreatedAt: { items: subscriptionOrderItems } },
    };
    cy.mockQuery('listSubscriptionOrdersSortedByCreatedAt', JSON.stringify(data));
  });

  describe('Sign In', () => {
    it('allows a user to signin', () => {
      // cy.wait(1000);
      cy.get('header').contains('定期便管理').should('be.visible');
      cy.url().should('include', '/admins/subscription-order');
    });
  });
});
