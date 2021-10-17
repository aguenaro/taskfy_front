describe('Home', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Navigate to signup with header', () => {
    cy.contains('SIGN UP').click();

    cy.url().should('include', '/signup');
  });

  it('Navigate from home with landing button', () => {
    cy.contains('improve my tech productivity').click();

    cy.url().should('include', '/signup');
  });
});
