// @ts-ignore
const server = process.env.NEXT_PUBLIC_APP_URL || '';

describe('Navigation', () => {
  it('Navigate from home to signup', () => {
    cy.visit(server);
    cy.contains('SIGN UP').click();

    cy.url().should('include', '/signup');
  });
});
