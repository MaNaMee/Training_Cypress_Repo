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

import 'cypress-xpath';

import { generateCustomerData } from './utils';

Cypress.Commands.add('auth', (username, password) => { // FUNCTION OR METHOD FOR USER LOGIN
    cy.visit('https://www.saucedemo.com/', {timeout: 240000})
      cy.get('[data-test="username"]').type(username)
      cy.get('[data-test="password"]').type(password)
      cy.get('[data-test="login-button"]').click()  
});
 

Cypress.Commands.add('AddToCart', () => { // FUNCTION FOR ADDING A SAMPLE ITEM TO CART
  cy.get('[data-test="item-3-title-link"] > [data-test="inventory-item-name"]').click()
  cy.contains('Test.allTheThings()')
  cy.get('[data-test="add-to-cart"]').should('be.visible').should('not.be.disabled').click()
  cy.get('.shopping_cart_badge').should('contain', '1')
  cy.get('[data-test="shopping-cart-link"]').click()
  cy.get('.cart_item').should('have.length', 1)
  cy.get('[data-test="inventory-item-name"]').should(($el) => {//Checker if there is an existing product added to cart
    const text = $el.text();
    expect(text.includes('Sauce Labs') || text.includes('Test.allTheThings()')).to.be.true;
  });
  
});

Cypress.Commands.add('Checkout', () => { // FUNCTION FOR CHECKING OUT A SAMPLE ITEM 
  //Opening cart to proceed to first checkout step
  cy.get('[data-test="shopping-cart-link"]').click()
  cy.get('[data-test="title"]').should('be.visible')
  cy.contains('Your Cart').should('be.visible')
  cy.get('[data-test="inventory-item-name"]').should(($el) => {//Checker if there is an existing product added to cart
    const text = $el.text();
    expect(text.includes('Sauce Labs') || text.includes('Test.allTheThings()')).to.be.true;
  });
  cy.get('[data-test="checkout"]').should('not.be.disabled').click()

  //Add sample customer details to checkout
  cy.url().should('include','saucedemo.com/checkout-step-one.html')
  cy.get('[data-test="title"]').should('be.visible')
  cy.contains('Checkout: Your Information').should('be.visible')
  cy.get('[data-test="firstName"]').should('be.visible').type('Juan')
  cy.get('[data-test="lastName"]').should('be.visible').type('Dela Cruz')
  cy.get('[data-test="postalCode"]').should('be.visible').type('1116')
  cy.get('[data-test="continue"]').should('not.be.disabled').click()

  //Overview of checkout
  cy.contains('Checkout: Overview').should('be.visible')
  cy.url().should('include','saucedemo.com/checkout-step-two.html')
  cy.get('[data-test="payment-info-value"]').should('be.visible').should('contain', 'SauceCard #31337')
  cy.get('[data-test="finish"]').should('be.visible').should('not.be.disabled').click()

  // Assertion of confirmation message
  cy.get('[data-test="title"]').should('be.visible')
  cy.contains('Checkout: Complete!').should('be.visible')
  cy.get('[data-test="pony-express"]').should('be.visible')
  cy.contains('Thank you for your order!').should('be.visible')
  cy.screenshot()
  cy.get('[data-test="back-to-products"]').should('be.visible').click()

})

//Login function for Parabank activity
Cypress.Commands.add('PB_Login', (Username, pword) =>{
  cy.get('form > :nth-child(2) > .input').type(Username)
  cy.get(':nth-child(4) > .input').type(pword)
  cy.get(':nth-child(5) > .button').click()
})

Cypress.Commands.add('PB_LoginFixtures', (NewUser) =>{
  cy.get('form > :nth-child(2) > .input').type(NewUser.username)
  cy.get(':nth-child(4) > .input').type(NewUser.password)
  cy.get(':nth-child(5) > .button').click()
})

Cypress.Commands.add('generateFixtureData' , (NewUser) => {
  // let generatedSampleData = generateTestData()
  //cy.writeFile('cypress/fixtures/UserCredentials.json', generatedSampleData);
  cy.writeFile('cypress/fixtures/UserCredentials.json', NewUser);
});

