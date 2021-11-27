// @ts-ignore
describe('Create board modal', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/boards/1');
  });

  // it('Create a new column', () => {
  //   cy.contains('adicionar coluna').click();

  //   cy.get('#board-columns').children().should('have.length', 6);
  // });

  // it('Open card modal details', () => {
  //   cy.get('[data-rbd-draggable-id="Tarefas"]')
  //     .contains('Correção na landing page')
  //     .dblclick();

  //   cy.get('.chakra-modal__content-container')
  //     .should('be.visible')
  //     .and('contain.text', 'Correção na landing page');
  // });

  it('Move card between columns', () => {
    // cy.get('[data-rbd-draggable-id="Correção na landing page"]')
    //   .focus()
    //   .trigger('keydown', { keyCode: 27 })
    //   .trigger('keydown', { keyCode: 39, force: true })
    //   // finishing before the movement time is fine - but this looks nice
    //   .wait(200)
    //   .trigger('keydown', { keyCode: 27, force: true });

    // cy.get('[data-rbd-droppable-id="Em execução"]')
    //   .trigger('drop')
    //   .trigger('dragend');

    // cy.get('[data-rbd-draggable-id="Correção na landing page"]').drag(
    //   '[data-rbd-droppable-id="Em execução"]'
    // );

    cy.contains('Correção na landing page').drag(
      '[data-rbd-droppable-id="Em execução"]'
    );

    // const dataTransfer = new DataTransfer();
    // cy.get('[data-rbd-draggable-id="Correção na landing page"]').trigger(
    //   'dragstart',
    //   { dataTransfer }
    // );
    // cy.get('[data-rbd-droppable-id="Em execução"]').trigger('drop', {
    //   dataTransfer,
    // });
  });
});
