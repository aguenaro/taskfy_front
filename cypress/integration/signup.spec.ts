describe('Sign Up', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/signup');
  });

  it('Invalid all sign up form', () => {
    cy.contains('criar minha conta!').click();

    cy.get('#field-1-feedback')
      .should('be.visible')
      .should('have.text', 'Campo obrigatório');
    cy.get('#field-2-feedback')
      .should('be.visible')
      .should('have.text', 'Campo obrigatório');
    cy.get('#field-3-feedback')
      .should('be.visible')
      .should('have.text', 'Campo obrigatório');
    cy.get('#field-4-feedback')
      .should('be.visible')
      .should('have.text', 'Campo obrigatório');
    cy.get('#field-5-feedback')
      .should('be.visible')
      .should('have.text', 'Campo obrigatório');
  });

  it('Input an invalid email', () => {
    cy.get('#email').type('Email inválido');
    cy.contains('criar minha conta!').click();

    cy.get('#field-4-feedback')
      .should('be.visible')
      .should('have.text', 'Email inválido');
  });

  it('Input differents password', () => {
    cy.get('#password').type('password1');
    cy.get('#passwordConfirmation').type('password2');
    cy.contains('criar minha conta!').click();

    cy.get('#field-6-feedback')
      .should('be.visible')
      .should('have.text', 'Senhas diferentes');
  });

  it('Create an account', () => {
    cy.get('#firstName').type('firstname');
    cy.get('#lastName').type('lastname');
    cy.get('#username').type('username');
    cy.get('#email').type('email@gmail.com');
    cy.get('#password').type('password');
    cy.get('#passwordConfirmation').type('password');
    cy.contains('criar minha conta!').click();

    cy.wait(10000);
    cy.url().should('include', '/signin');
  });
});
