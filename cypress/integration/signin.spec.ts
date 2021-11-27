describe('Sign In', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/signin');
  });

  it('Navigate to home', () => {
    cy.get('[alt="logo taskfy branca"]').click();

    cy.wait(10000);
    cy.url().should('include', '/');
  });

  it('Navigate to sign up', () => {
    cy.contains('Crie').click();

    cy.wait(10000);
    cy.url().should('include', '/signup');
  });

  it('Invalid all sign in form', () => {
    cy.get('.chakra-button').click();

    cy.get('#field-1-feedback')
      .should('be.visible')
      .should('have.text', 'Campo obrigatório');
    cy.get('#field-2-feedback')
      .should('be.visible')
      .should('have.text', 'Campo obrigatório');
  });

  it('sign in', () => {
    cy.get('#emailOrUsername').type('test123');
    cy.get('#password').type('123123');

    cy.get('.chakra-button').click();

    cy.wait(10000);
    cy.url().should('include', '/boards');
  });
});
