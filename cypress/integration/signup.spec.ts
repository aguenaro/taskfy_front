describe('Sign Up', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/signup');
  });

  it('Invalid all sign up form', () => {
    cy.contains('Create my account!').click();

    cy.get('#field-1-feedback')
      .should('be.visible')
      .should('have.text', 'First name is required');
    cy.get('#field-2-feedback')
      .should('be.visible')
      .should('have.text', 'Last name is required');
    cy.get('#field-3-feedback')
      .should('be.visible')
      .should('have.text', 'Username is required');
    cy.get('#field-4-feedback')
      .should('be.visible')
      .should('have.text', 'Email is required');
    cy.get('#field-5-feedback')
      .should('be.visible')
      .should('have.text', 'Password is required');
  });

  it('Input an invalid email', () => {
    cy.get('#email').type('invalid-email');
    cy.contains('Create my account!').click();

    cy.get('#field-4-feedback')
      .should('be.visible')
      .should('have.text', 'Invalid email');
  });
});
