// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('auth', (username, password) => { // FUNCTION OR METHOD --> Then i-call natin sya sa spec or test file natin.
    cy.visit('https://www.saucedemo.com/', {timeout: 240000})
      cy.get('[data-test="username"]').type(username)
      cy.get('[data-test="password"]').type(password)
      cy.get('[data-test="login-button"]').click()  
}); // Try to create other Commands - pwedeng yung add to cart at checkout is gagawan natin ng commands
 

Cypress.Commands.add('AddToCart', () => {
  //cy.auth('standard_user', 'secret_sauce')
  //cy.visit('https://www.saucedemo.com/inventory.html', {timeout: 240000})
  cy.get('[data-test="item-0-title-link"] > [data-test="inventory-item-name"]').click();
  cy.contains('Sauce Labs Bike Light').should('be.visible')
  cy.get('[data-test="add-to-cart"]').should('be.visible').should('not.be.disabled').click()
  cy.get('.shopping_cart_badge').should('contain', '1')
  cy.get('[data-test="shopping-cart-link"]').click()
  cy.get('.cart_item').should('have.length', 1)
  cy.get('.inventory_item_name').should('contain', 'Sauce Labs Bike Light')
});

Cypress.Commands.add('Checkout', () => {
  //cy.auth('standard_user', 'secret_sauce')
  //cy.visit('https://www.saucedemo.com/inventory.html', {timeout: 240000})
  //cy.AddToCart()
  cy.get('[data-test="shopping-cart-link"]').click()
  cy.get('[data-test="title"]').should('be.visible')
  cy.contains('Your Cart').should('be.visible')
  cy.contains('Sauce Labs Bike Light').should('be.visible')
  cy.get('[data-test="checkout"]').should('not.be.disabled').click()
  cy.get('[data-test="title"]').should('be.visible')
  cy.contains('Checkout: Your Information').should('be.visible')
  cy.get('[data-test="firstName"]').should('be.visible').type('Juan')
  cy.get('[data-test="lastName"]').should('be.visible').type('Dela Cruz')
  cy.get('[data-test="postalCode"]').should('be.visible').type('1116')
  cy.get('[data-test="continue"]').should('not.be.disabled').click()
  cy.contains('Checkout: Overview').should('be.visible')
  cy.get('[data-test="finish"]').should('be.visible').click()
  cy.get('[data-test="title"]').should('be.visible')
  cy.contains('Checkout: Complete!').should('be.visible')
  cy.get('[data-test="pony-express"]').should('be.visible')
  cy.contains('Thank you for your order!').should('be.visible')
  cy.get('[data-test="back-to-products"]').should('be.visible').click()
})