describe('Todo App Home Page', () => {
  const getHeader = () => cy.findByRole('heading', { name: /todos/i });
  const getGoodsButton = () => cy.findByRole('button', { name: /goods/i });
  const getClearButton = () => cy.findByRole('button', { name: /clear/i });
  const getTodoListItems = () => cy.findByRole('list');
  const getMessage = () => cy.findByRole('alert');

  it('should work', () => {
    cy.visit('/');
    getHeader().should('contain', 'My Todos');

    getGoodsButton().click();
    getTodoListItems().should('be.visible');

    getClearButton().click();
    getTodoListItems().should('not.be.visible');

    getMessage().should('be.visible').should('not.exist');
  });
});
