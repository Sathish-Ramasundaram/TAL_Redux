describe("Redux Loading Toggle", () => {
  it("toggles loading state", () => {
    cy.visit("/");

    cy.get('[data-testid="status-text"]')
      .should("contain", "INACTIVE");

    cy.get('[data-testid="start-btn"]').click();

    cy.get('[data-testid="status-text"]')
      .should("contain", "ACTIVE");

    cy.get('[data-testid="stop-btn"]').click();

    cy.get('[data-testid="status-text"]')
      .should("contain", "INACTIVE");
  });
});
