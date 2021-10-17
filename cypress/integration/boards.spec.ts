// @ts-ignore
describe('Create board modal', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/boards');
    cy.get('.css-1isfmoz > :nth-child(1) > .chakra-icon').click();
  });

  it('Open modal', () => {
    cy.get('.chakra-modal__content-container').should('be.visible');
  });

  it('Invalid empty form', () => {
    cy.get('.css-j7qwjs > .chakra-button').click();

    cy.get('#field-17-feedback')
      .should('be.visible')
      .should('have.text', 'Board name is required');
  });

  it('Close modal', () => {
    cy.get('.chakra-modal__close-btn').click();

    cy.get('.chakra-modal__content-container').should('not.exist');
  });
});

describe('Show header menu', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/boards');
  });

  it('Show profile menu', () => {
    cy.get('.chakra-menu__menu-button').click();

    cy.get('.chakra-menu__menu-list').should('be.visible');
  });
});
