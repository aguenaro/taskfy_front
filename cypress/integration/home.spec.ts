describe('Home', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Navigate to signup with header', () => {
    cy.contains('SIGN UP').click();
    cy.wait(5000);
    cy.url().should('include', '/signup');
  });

  it('Navigate from home with landing button', () => {
    cy.contains('melhorar a produtividade da minha equipe').click();
    cy.wait(5000);
    cy.url().should('include', '/signup');
  });
});
