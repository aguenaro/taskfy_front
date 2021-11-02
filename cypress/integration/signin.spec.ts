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

  it('Input an invalid email', () => {
    cy.get('#email').type('Email inválido');
    cy.get('.chakra-button').click();

    cy.get('#field-1-feedback')
      .should('be.visible')
      .should('have.text', 'Email inválido');
  });

  it('sign in', () => {
    cy.get('#email').type('email@gmail.com');
    cy.get('#password').type('password');

    cy.get('.chakra-button').click();

    cy.wait(10000);
    cy.url().should('include', '/boards');
  });
});
