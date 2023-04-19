// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import '@testing-library/cypress/add-commands';

Cypress.Commands.add('withCredential', () => {
  cy.visit('/');
  // Launch SIGN_IN_REQUEST
  cy.window()
    .its('store')
    .invoke('dispatch', {
      type: 'SIGN_IN_REQUEST',
      email: 'flop-ad@yopmail.com',
      password: '!LovePoker1'
    });

  // Assert We are correctly redirect to user account
  cy.url().should('include', '/admin/users/account'); // => true
});
// const credential = require("../fixtures/credential.json") ;
