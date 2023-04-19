/// <reference types="cypress" />

/**
 * Administration Module End to End Tests
 */
context('Administration Module End to End Tests', () => {
  beforeEach(() => {
    // Set Credential
    cy.withCredential();
  });

  it('Display User Managment', () => {
    cy.visit('/admin/administration/users');

    // Assert we have one 5 users in datatable
    cy.get('.ant-table-row').should('have.length', 5);
  });
});
