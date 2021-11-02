describe('Sign Up', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/signin');
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
