/// <reference types="cypress" />

/**
 * CashGame Module End to End Tests
 */
context('CashGame Module End to End Tests', () => {
  beforeEach(() => {
    // Set Credential
    cy.withCredential();
  });

  it('Display Interest List', () => {
    cy.visit('/admin/cashgames/managment');

    cy.wait(2000);
  });
});
