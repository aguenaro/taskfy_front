const server = Cypress.env('server');

describe('Navigation', () => {
  it('Navigate from home to signup', () => {
    cy.visit(server);
    cy.contains('SIGN UP').click();

    cy.url().should('include', '/signup');
  });

  it('Navigate from landing page card to signup', () => {
    cy.visit(server);
    cy.contains('improve my tech productivity').click();

    cy.url().should('include', '/signup');
  });

  it('Navigate from singup to signin', () => {
    cy.visit(server);
    cy.contains('sign in').click();

    cy.url().should('include', '/signin');
  });

  it('Navigate from singup to home', () => {
    cy.visit(server);
    cy.get('[alt="Logo taskfy"]').click();

    cy.url().should('eq', `${server}`);
  });
});
