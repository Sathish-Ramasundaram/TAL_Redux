describe('Redux Saga Demo', () => {
  it('fetches data when button clicked', () => {
    cy.visit('http://localhost:3000');

    cy.get('[data-testid="fetch-btn"]').click();

    cy.contains('Loading...').should('exist');

    cy.contains('Hello from Saga').should('exist');
  });
});
