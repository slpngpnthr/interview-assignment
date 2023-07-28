// sample-test.spec.js

describe('MAAX Website - Search for Product', () => {
    beforeEach(() => {
        // Visit the MAAX website
      cy.visitMaaxUS('');
    });
  
    it('should display authorized dealers in user location', () => {
      // Click on the 'Where to Buy' section
      cy.contains('Where to Buy').click();
  
      // Wait for the 'Where to Buy' page to load
      cy.url().should('include', '/where-to-buy');
  
      // Allow the website to access user location (using Cypress' geolocation plugin)
      // Alternatively, you can mock user location using other Cypress plugins or custom commands.
      cy.allowGeolocation();
  
      // Perform the location-based search
      cy.get('[data-cy=location-search-input]').type('My City');
      cy.get('[data-cy=search-button]').click();
  
      // Verify the presence of authorized dealers in or near the specified location
      cy.get('[data-cy=dealer-list]').should('be.visible');
      cy.get('[data-cy=dealer-item]').should('have.length.greaterThan', 0);
    });
  
    it('should handle invalid location gracefully', () => {
      // Click on the 'Where to Buy' section
      cy.contains('Where to Buy').click();
  
      // Wait for the 'Where to Buy' page to load
      cy.url().should('include', '/where-to-buy');
  
      // Perform the search with an invalid location
      cy.get('[data-cy=location-search-input]').type('Invalid City');
      cy.get('[data-cy=search-button]').click();
  
      // Verify that the website displays appropriate feedback for the invalid location
      cy.get('[data-cy=error-message]').should('be.visible').contains('Invalid location');
    });
  });
  