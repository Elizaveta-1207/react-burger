describe('service is available', function () {
  it('should be available on localhost:3000', function () {
    cy.visit('http://localhost:3000');
  });

  it('should open constructor page by default', function () {
    cy.contains('Соберите бургер');
  });

  it('put ingredient to constructor', () => {
    cy.get('div').contains('Соус Spicy-X').as('ingredient');
    cy.get('div').get('#burgerConstructor-container').as('contructor_container');

    cy.get('@ingredient').trigger('dragstart');
    cy.get('@contructor_container').trigger('drop');

    cy.get('@contructor_container').contains('Соус Spicy-X');
  });

  it('open ingredient modal', () => {
    cy.get('div').contains('Краторная булка N-200i').click();
    cy.get('#modal').contains('Детали ингредиента');
  });

  it('ingredient details', () => {
    cy.get('#ingredient-name').contains('Краторная булка N-200i');
    cy.get('#calories').contains('420');
    cy.get('#proteins').contains('80');
    cy.get('#fat').contains('24');
    cy.get('#carbohydrates').contains('53');
  });

  it('close ingredient modal', () => {
    cy.get('#close-btn').click();
    cy.get('#root').not('#modal');
  });

  it('log in page', () => {
    cy.get('p').contains('Личный кабинет').click();
    cy.contains('Вход');
  });

  it('put data log in', () => {
    cy.get('input').first().as('email');
    cy.get('input').last().as('password');
    cy.get('.input__icon-action').first().as('email_btn');

    cy.get('@email_btn').click();
    cy.get('@email').type('elizaveta1207@gmail.com');

    cy.get('@password').click();
    cy.get('@password').type('12345');

    cy.get('@email').should('have.value', 'elizaveta1207@gmail.com');
    cy.get('@password').should('have.value', '12345');
  });

  it('log in', () => {
    cy.get('button').contains('Войти').click();
    cy.contains('Соберите бургер');
  });

  it('make an order', () => {
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', {
      fixture: 'order.json',
    });
    cy.get('button').contains('Оформить заказ').click();
    cy.get('#modal').contains('идентификатор заказа');
  });

  it('close order modal', () => {
    cy.get('#close-btn').click();
    cy.get('#root').not('#modal');
  });
});
