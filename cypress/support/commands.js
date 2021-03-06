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

import { AuthState, AUTH_STATE_CHANGE_EVENT, UI_AUTH_CHANNEL } from '@aws-amplify/ui-components';
import '@testing-library/cypress/add-commands';
import { Auth, Hub } from 'aws-amplify';
import { DynamoDB } from 'aws-sdk';
import 'cypress-localstorage-commands';
import 'cypress-wait-until';
import { seedProducts } from '../seeds/products';

//configures auth
const awsconfig = {
  aws_user_pools_id: Cypress.env('userPoolId'),
  aws_user_pools_web_client_id: Cypress.env('clientId'),
};
Auth.configure(awsconfig);

console.log('pool id', awsconfig.aws_user_pools_id);
console.log('client id', awsconfig.aws_user_pools_web_client_id);

Cypress.Commands.add('cognitoLogin', (username, password) => {
  cy.then(() => Auth.signIn(username, password)).then((cognitoUser) => {
    const idToken = cognitoUser.signInUserSession.idToken.jwtToken;
    const accessToken = cognitoUser.signInUserSession.accessToken.jwtToken;

    const makeKey = (name) =>
      `CognitoIdentityServiceProvider.${cognitoUser.pool.clientId}.${cognitoUser.username}.${name}`;

    cy.setLocalStorage(makeKey('accessToken'), accessToken);
    cy.setLocalStorage(makeKey('idToken'), idToken);
    cy.setLocalStorage(
      `CognitoIdentityServiceProvider.${cognitoUser.pool.clientId}.LastAuthUser`,
      cognitoUser.username,
    );
  });
  cy.saveLocalStorage();
});

Cypress.Commands.add('cognitoLogout', () => {
  cy.then(() => Auth.signOut()).then(() => {
    Hub.dispatch(UI_AUTH_CHANNEL, {
      event: AUTH_STATE_CHANGE_EVENT,
      message: AuthState.SignedOut,
    });
  });
  cy.clearLocalStorage();
});

const selectors = {
  usernameInput: '[data-test="sign-in-username-input"]',
  signInPasswordInput: '[data-test="sign-in-password-input"]',
  signInSignInButton: '[data-test="sign-in-sign-in-button"]',
};

Cypress.Commands.add('login', (username, password) => {
  cy.visit('/');
  cy.get(selectors.usernameInput).type(username);
  cy.get(selectors.signInPasswordInput).type(password, { force: true });
  cy.get(selectors.signInSignInButton).contains('????????????').click();
  return cy;
});

Cypress.Commands.add('mockQuery', (operationName, fixture) => {
  cy.intercept('POST', 'http://192.168.1.15:20002/graphql', (req) => {
    req.alias = operationName;
    req.reply(fixture);
  });
});

const db = new DynamoDB({
  endpoint: 'http://localhost:62224',
  region: 'us-fake-1',
  accessKeyId: 'fake',
  secretAccessKey: 'fake',
});

const listTables = async () => {
  try {
    return await db.listTables({ Limit: 20 }).promise();
  } catch (err) {
    throw err;
  }
};

const flatMapWithCount = (arr, size) =>
  arr.reduce((previous, _, i) => (i % size ? previous : [...previous, arr.slice(i, i + size)]), []);

const createParamsToPutProductRecords = (putItems) => {
  return {
    RequestItems: {
      ProductTable: putItems.map((item) => ({
        PutRequest: { Item: item },
      })),
    },
  };
};

const createParamsToDeleteRecords = (tableName, deleteItems) => {
  return {
    RequestItems: {
      [tableName]: deleteItems.map((item) => ({
        DeleteRequest: { Key: { id: item.id } },
      })),
    },
  };
};

const batchWriteLimit = 25;

const clearAllRecords = async () => {
  try {
    const list = await listTables();
    list.TableNames.map(async (tableName) => {
      const scan = await db.scan({ TableName: tableName }).promise();
      if (scan.Items && scan.Items.length > 0) {
        // BatchDelete????????????25?????????????????????????????????
        const deleteItemsList = flatMapWithCount(scan.Items, batchWriteLimit);
        console.log('tableName', tableName);
        deleteItemsList.map(async (deleteItems) => {
          console.log('deleteItems', deleteItems);
          const params = createParamsToDeleteRecords(tableName, deleteItems);
          console.log('delete params', params);
          await db.batchWriteItem(params).promise();
        });
      }
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const putProducts = async () => {
  try {
    const params = createParamsToPutProductRecords(seedProducts);
    console.log('insert params', params);
    await db.batchWriteItem(params).promise();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

Cypress.Commands.add('clearAllRecords', () => {
  try {
    clearAllRecords();
  } catch (err) {
    console.error(err);
  }
});

Cypress.Commands.add('putProducts', () => {
  try {
    putProducts();
  } catch (err) {
    console.error(err);
  }
});

Cypress.Commands.add('initializeDynamoDB', async () => {
  try {
    await clearAllRecords();
    await putProducts();
  } catch (err) {
    console.error(err);
  }
});
