describe('Ticket Management', () => {
    // Before each test, visit the home page
    beforeEach(() => {
        cy.visit('/');
    });

    it('should create a new ticket', () => {
        // Click on the "Add New Ticket" button
        cy.get('[data-testid="add-new-ticket-btn"]').first().click();

        // Fill in the ticket form
        cy.get('textarea[name="description"]').type('New Ticket from Cypress');
        cy.get('select[name="status"]').select('Open');

        // Submit the form
        cy.get('[data-testid="new-ticket-submit-btn"]').click();

        // Verify the ticket is added
        cy.get('[data-testid="tickets-list"]').should('contain', 'New Ticket from Cypress');
    });


    it('should update an existing ticket', () => {
        cy.get('tr td').contains('span', 'Update').click();

        // Update the ticket's description
        cy.get('textarea[name="description"]').clear().type('Updated Ticket from Cypress');
        cy.get('select[name="status"]').select('Open');


        // // Submit the update
        cy.get('[data-testid="update-ticket-submit-btn"]').click();

        // // Verify the update
        cy.get('[data-testid="tickets-list"]').should('contain', 'Updated Ticket from Cypress');
    });

    it('should delete a ticket', () => {
        cy.get('tr td').contains('span', 'Delete').click();


        cy.get('[data-testid="delete-ticket-btn"]').first().click();

        cy.get('[data-testid="tickets-list"]').should('not.contain', 'Updated Ticket from Cypress');

    });

});
