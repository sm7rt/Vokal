/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to set credential in Redux Authentication Tree
     * @example cy.withCredential()
     */
    withCredential(): Chainable<Element>;
  }
}
