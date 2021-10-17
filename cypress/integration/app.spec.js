const server = 'http://localhost:3000';

describe('Navigation', () => {
  it('Navigate from home to signup', () => {
    cy.visit(server);
    cy.contains('SIGN UP').click();

    cy.url().should('include', '/signup');
  });
});
