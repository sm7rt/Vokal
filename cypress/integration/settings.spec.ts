/// <reference types="cypress" />

/**
 * Settings Module End to End Tests
 */
context('Settings Module End to End Tests', () => {
  beforeEach(() => {
    // Set Credential
    cy.withCredential();
  });

  it('Display Settings List', () => {
    cy.visit('/admin/account/settings/casino');

    cy.findByTestId('settings-page').should('have.length', 1);
  });
});
