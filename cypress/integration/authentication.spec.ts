/// <reference types="cypress" />
/**
 * Authentication Module End to End Tests
 */
context('Authentication Module End to End Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Try to Login', () => {
    // Fill Email
    cy.findByTestId('email').type('flop-ad@yopmail.com');

    // Fill Password
    cy.findByTestId('password').type('!LovePoker1');

    // Try To Login
    cy.findByTestId('signin-button').click();

    // Assert We are correctly redirect to user account
    cy.url().should('include', '/admin/users/account'); // => true
  });

  it('Try to Signup', () => {
    cy.visit('/auth/account');

    // Fill Licence Authority
    cy.findByTestId('licenceAuthority').type('My License autority');

    // Fill reference number
    cy.findByTestId('referenceNumber').type('231564897');
  });
});
