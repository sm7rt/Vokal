/// <reference types="cypress" />

/**
 * Events Module End to End Tests
 */
context('Events Module End to End Tests', () => {
  beforeEach(() => {
    // Set Credential
    cy.withCredential();
  });

  it('Display Events List', () => {
    cy.visit('/admin/events/managment');

    // Assert we have one Event Card
    cy.get('.event-card').should('have.length', 1);
  });
});
