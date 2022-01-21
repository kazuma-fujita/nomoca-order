// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import '@testing-library/cypress/add-commands';

const selectors = {
  usernameInput: '[data-test="sign-in-username-input"]',
  signInPasswordInput: '[data-test="sign-in-password-input"]',
  signInSignInButton: '[data-test="sign-in-sign-in-button"]',
};

Cypress.Commands.add('login', (username, password) => {
  cy.visit('/');
  cy.get(selectors.usernameInput).type(username);
  cy.get(selectors.signInPasswordInput).type(password, { force: true });
  cy.get(selectors.signInSignInButton).contains('ログイン').click();
  return cy;
});

Cypress.Commands.add('mockQuery', (operationName, fixture) => {
  cy.intercept('POST', 'http://192.168.1.15:20002/graphql', (req) => {
    req.alias = operationName;
    req.reply(fixture);
  });
});
