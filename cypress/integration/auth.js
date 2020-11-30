// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

describe('Login and Logout flows', () => {
  beforeEach('do credentialed login', () => {
    cy.visit('api/auth/signin');
    cy.contains('button', 'Sign in with Credentials');

    cy.get('#input-username-for-credentials-provider').type('bob@burgers.com');
    cy.get('#input-password-for-credentials-provider').type('password123{enter}');

    // cy.contains('h1', 'Hello J Smith')
  });

  it('lists all the boards', () => {
    cy.visit('/cheer/');
    cy.get('.list-group .list-group-item').should('have.length.gt', 1).and('be.visible')
      .first()
      .find('svg')
      .click();
    cy.url().should('match', /\/cheer\/\w+$/)
  });

  it('can create a new board and navigate to it', () => {
    cy.visit('/cheer/');
    cy.contains('a', 'New Cheer').should('be.visible')
      .click();
    // const submit = cy.contains('button', 'Save changes')

    cy.get('[name=recipientFirstName]').type('Linda');
    cy.get('[name=recipientLastName]').type('Belcher');
    cy.get('[name=title]').type('Some Title{enter}');

    cy.contains('button', 'Save Changes').should('be.visible').click();
    cy.url().should('match', /\/cheer\/\w+$/);

    // TODO make this a separate test
    cy.contains('button', 'Add a cheer!').should('be.visible').click();
    cy.url().should('match', /\/cheer\/\w+\/add$/);

    cy.get('[name=message]').type('Multi{enter}line message');
    cy.contains('button', 'Post').should('be.visible').click();

    cy.get('.card').should('be.visible');

    // TODO drag and drop test https://www.google.com/search?q=cypress+drag+and+drop
    // cy.get('.card').click().trigger('mousedown', { which: 1, pageX:0, pageY:0});
    // cy.get('.col:nth-child(3) .muuri')
    //     .trigger("mousemove", 50, 50)
    //     .trigger("mouseup")
  })
});
