describe('Ticket Management', () => {
    // Before each test, visit the home page
    beforeEach(() => {
        cy.visit('/');
    });

    it('should create a new ticket', () => {
        // Click on the "Add New Ticket" button
        cy.get('[data-testid="add-new-ticket-btn"]').click();

        // Fill in the ticket form
        // cy.get('input[name="description"]').type('New Ticket from Cypress');
        // cy.get('select[name="status"]').select('Open');

        // // Submit the form
        // cy.get('[data-testid="submit-ticket-btn"]').click();

        // // Verify the ticket is added
        // cy.get('.ticket-list').should('contain', 'New Ticket from Cypress');
    });
});
