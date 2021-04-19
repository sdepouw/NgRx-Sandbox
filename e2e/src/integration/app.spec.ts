describe('Todo App Home Page', () => {
  const getHeader = () => cy.get('h1');
  const getGoodsButton = () => cy.get('button').first();
  const getTodoListItems = () => cy.get('li');

  it('should work', () => {
    cy.visit('/');
    getHeader().should('contain', 'My Todos');

    getGoodsButton().click();

    getTodoListItems().should('be.visible');
  });
});
