import React from 'react';
import { subscriptionOrderItems } from 'components/organisms/admins/subscription-orders/subscription-order-list/subscription-order-list.mock';
import { mount } from '@cypress/react';
import { NowDateContextProvider } from 'stores/use-now-date';
import { SubscriptionOrderTemplateContainer } from 'components/templates/admins/subscription-orders/subscription-order-template-container';
import Amplify from 'aws-amplify';
import awsconfig from 'aws-exports';

describe('SubscriptionOrderTemplateContainer', () => {
  before(() => {
    // Cognito認証でAppSyncを実行するとNo current user errorが発生する為、API_KEY認証に切り替え
    Amplify.configure({ ...awsconfig, aws_appsync_authenticationType: 'API_KEY' });

    // cy.fixture('operation-user.json').then((loginInfo) => {
    //   cy.login(loginInfo.username, loginInfo.password);
    // });
    const data = {
      data: { listSubscriptionOrdersSortedByCreatedAt: { items: subscriptionOrderItems } },
    };
    cy.mockQuery('listSubscriptionOrdersSortedByCreatedAt', JSON.stringify(data));
  });

  describe('It searches a subscription order item', () => {
    it('with delivery month of January.', () => {
      // Current date is 2023/1.
      mount(
        <NowDateContextProvider now={new Date(2023, 0)}>
          <SubscriptionOrderTemplateContainer />
        </NowDateContextProvider>,
      );
      // cy.wait(1000);
      // cy.get('header').contains('定期便管理').should('be.visible');
      cy.url().should('include', '/admins/subscription-order');
      cy.get('[name="searchDeliveryYear"]').parent().click();
      // cy.get('[name="searchDeliveryMonth"]').parent().click();
    });
  });
});
