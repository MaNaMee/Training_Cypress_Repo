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
import { faker } from '@faker-js/faker';


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
  cy.writeFile('cypress/fixtures/UserCredentials.json', NewUser);
});

Cypress.Commands.add('saveCart', () => {
  cy.window().then((win) => {
    const cart = win.localStorage.getItem('cart-contents') || '[]';
    Cypress.env('savedCart', cart);
  });
});

Cypress.Commands.add('restoreCart', () => {
  const cart = Cypress.env('savedCart') || '[]';
  cy.window().then((win) => {
    win.localStorage.setItem('cart-contents', cart);
  });
});

Cypress.Commands.add('generateUserInfo', (NewUser) => {
  cy.writeFile('cypress/fixtures/RegisteredUser.json', NewUser);
})

Cypress.Commands.add('AE_CreateUser', () => {

  cy.readFile('cypress/fixtures/RegisteredUser.json').then((UserInformation) => {
    const RandomYear = faker.number.int({min: 1900, max: 2021})
    const SelectedYear = RandomYear.toString()
    cy.url().should('include','/login')
    cy.get('[data-qa="signup-name"]').should('be.visible').should('not.be.disabled').and('have.value', '')
    cy.get('[data-qa="signup-name"]').should('be.visible').type(UserInformation.username)
    cy.get('[data-qa="signup-name"]', { timeout: 1500 }).should('have.value', UserInformation.username)
    cy.get('[data-qa="signup-email"]').should('be.visible').should('not.be.disabled').and('have.value', '')
    // cy.get('[data-qa="signup-email"]').should('be.visible').type(UserInformation.email)
    cy.get('[data-qa="signup-email"]').should('be.visible').type(UserInformation.email)
    cy.get('[data-qa="signup-email"]', { timeout: 1500 }).should('have.value', UserInformation.email)
    cy.get('[data-qa="signup-button"]').should('contain', 'Signup').should('not.be.disabled').click()
  
    //Account Creation
    cy.get(':nth-child(3) > .top').should('not.be.disabled').click() // Mr/Ms Radio button
    // cy.get(':nth-child(3) > .top').should('be.checked')
    cy.get('[data-qa="password"]').should('be.visible').should('not.be.disabled').should('have.value', '')
    cy.get('[data-qa="password"]').type(UserInformation.password)
    cy.get('[data-qa="password"]', { timeout: 1500 }).should('have.value', UserInformation.password)
    cy.get('[data-qa="days"]').select(UserInformation.days).find('option:selected').should('have.value', UserInformation.days) 

    cy.get('[data-qa="months"]').select(UserInformation.month)
 //   cy.get('[data-qa="months"]')
    cy.get('[data-qa="years"]').select(UserInformation.year).find('option:selected').should('have.value', UserInformation.year) 
    cy.get('[data-qa="first_name"]').should('be.visible').should('not.be.disabled').should('have.value', '')
    cy.get('[data-qa="first_name"]').should('not.be.disabled').type(UserInformation.fname)
    cy.get('[data-qa="first_name"]').should('have.value', UserInformation.fname)
    cy.get('[data-qa="last_name"]').should('be.visible').should('not.be.disabled').should('have.value', '')
    cy.get('[data-qa="last_name"]').should('not.be.disabled').type(UserInformation.lname)
    cy.get('[data-qa="last_name"]').should('have.value', UserInformation.lname)
    cy.get('[data-qa="address"]').should('be.visible').should('not.be.disabled').should('have.value', '')
    cy.get('[data-qa="address"]').should('not.be.disabled').type(UserInformation.address)
    cy.get('[data-qa="address"]').should('have.value', UserInformation.address)
    cy.get('[data-qa="address2"]').should('be.visible').should('not.be.disabled').should('have.value', '')
    cy.get('[data-qa="address2"]').should('not.be.disabled').type(UserInformation.address2)
    cy.get('[data-qa="address2"]').should('have.value', UserInformation.address2)
    cy.get('[data-qa="country"]').should('be.visible').should('not.be.disabled').should('have.value', 'India')
    cy.get('[data-qa="country"]').should('not.be.disabled').select(UserInformation.random_country)
    cy.get('[data-qa="country"]').should('have.value', UserInformation.random_country)
    cy.get('[data-qa="state"]').should('be.visible').should('not.be.disabled').should('have.value', '')
    cy.get('[data-qa="state"]').should('not.be.disabled').type(UserInformation.state)
    cy.get('[data-qa="state"]').should('have.value', UserInformation.state)
    cy.get('[data-qa="city"]').should('be.visible').should('not.be.disabled').should('have.value', '')
    cy.get('[data-qa="city"]').should('not.be.disabled').type(UserInformation.city)
    cy.get('[data-qa="city"]').should('have.value', UserInformation.city)
    cy.get('[data-qa="zipcode"]').should('be.visible').should('not.be.disabled').should('have.value', '')
    cy.get('[data-qa="zipcode"]').should('not.be.disabled').type(UserInformation.zipcode)
    cy.get('[data-qa="zipcode"]').should('have.value', UserInformation.zipcode)
    cy.get('[data-qa="mobile_number"]').should('be.visible').should('not.be.disabled').should('have.value', '')
    cy.get('[data-qa="mobile_number"]').should('not.be.disabled').type(UserInformation.mobile_number)
    cy.get('[data-qa="mobile_number"]').should('have.value', UserInformation.mobile_number)
    cy.get('[data-qa="create-account"]').should('contain', 'Create Account').should('not.be.disabled').should('be.visible').click()
  })
})

Cypress.Commands.add('Verify_Delivery_Invoice', (type, RegisteredUser) => {
  
    cy.get(`#address_${type} > .address_firstname`)
        .should('contain', ` ${RegisteredUser.fname} ${RegisteredUser.lname}`);
   
    cy.get(`#address_${type} > :nth-child(4)`).should('contain', RegisteredUser.address);
    cy.get(`#address_${type} > :nth-child(5)`).should('contain', RegisteredUser.address2);

    cy.get(`#address_${type} > .address_city`).should('contain', RegisteredUser.city);
    cy.get(`#address_${type} > .address_state_name`).should('contain', RegisteredUser.state);
    cy.get(`#address_${type} > .address_postcode`).should('contain', RegisteredUser.zipcode);

    cy.get(`#address_${type} > .address_country_name`).should('contain', RegisteredUser.random_country);
    cy.get(`#address_${type} > .address_phone`).should('contain', RegisteredUser.mobile_number);
})

Cypress.Commands.add('AddProduct', (ProdID) => {


  cy.get(`:nth-child(${ProdID}) > .product-image-wrapper > .choose > .nav > li > a`).should('contain', 'View Product').should('not.be.disabled').click()
  //View Product page assertion and details
  cy.url().should('include', '/product_details')
  cy.get('.view-product > img').should('be.visible')
  cy.get('#quantity').should('have.value', 1)
  cy.get(':nth-child(5) > .btn').should('not.be.disabled').click()

  //Modal confirmation for added product
  cy.get('.icon-box > .material-icons').should('be.visible')
  cy.get('.modal-body > :nth-child(1)').should('contain','Your product has been added to cart.').and('be.visible')
  cy.get('.modal-footer > .btn').should('be.visible').should('not.be.disabled').click()

  cy.get('.shop-menu > .nav > :nth-child(1) > a').should('contain', 'Home').click()

})

Cypress.Commands.add('Add_CCinfo' ,() => {

  cy.readFile('cypress/fixtures/RegisteredUser.json').then((CC_Info) => {

  cy.get('[data-qa="name-on-card"]').should('be.visible').should('not.be.disabled')
  cy.get('[data-qa="name-on-card"]').type(CC_Info.username)
  cy.get('[data-qa="card-number"]').should('be.visible').should('not.be.disabled')
  cy.get('[data-qa="card-number"]').type(CC_Info.cc_number)
  cy.get('[data-qa="cvc"]').should('be.visible').should('not.be.disabled')
  cy.get('[data-qa="cvc"]').type(CC_Info.cc_cvv)
  cy.get('[data-qa="expiry-month"]').should('be.visible').should('not.be.disabled')
  cy.get('[data-qa="expiry-month"]').type(CC_Info.cc_exp_month)
  cy.get('[data-qa="expiry-year"]').should('be.visible').should('not.be.disabled')
  cy.get('[data-qa="expiry-year"]').type(CC_Info.cc_exp_year)
  cy.get('[data-qa="pay-button"]').should('be.visible').and('contain','Pay and Confirm Order')
  cy.get('[data-qa="pay-button"]').click() 

  cy.get('[data-qa="order-placed"] > b').should('contain','Order Placed!').should('be.visible')
  cy.get('.col-sm-9 > p').should('contain','Congratulations! Your order has been confirmed!').should('be.visible')
  cy.get('[data-qa="continue-button"]').should('be.visible').should('not.be.disabled').and('contain', 'Continue')
  cy.get('[data-qa="continue-button"]').click()
  })
})

Cypress.Commands.add('Delete_Account', () => {
  cy.get('.shop-menu > .nav > :nth-child(5) > a').should('be.visible').should('not.be.disabled').and('contain', 'Delete Account')
  cy.get('.shop-menu > .nav > :nth-child(5) > a').click()

  //Assert Account deletion
  cy.url().should('include','/delete_account')
  cy.get('b').should('contain', 'Account Deleted!').should('be.visible')
  cy.get('.col-sm-9 > :nth-child(2)').should('contain','Your account has been permanently deleted!').and('be.visible')
  cy.get('[data-qa="continue-button"]').should('contain', 'Continue').should('not.be.disabled').and('be.visible')
  cy.get('[data-qa="continue-button"]').click()
})


Cypress.Commands.add('AE_Login', () => {
  cy.url().should('include', '/login')
  cy.fixture('RegisteredUser.json').then(LoginCreds => {
    cy.get('[data-qa="login-email"]').should('be.visible').should('not.be.disabled')
    cy.get('[data-qa="login-email"]').type(LoginCreds.email)
    cy.get('[data-qa="login-password"]').should('be.visible').and('not.be.disabled')
    cy.get('[data-qa="login-password"]').type(LoginCreds.password)
    cy.get('[data-qa="login-button"]').should('be.visible').should('contain', 'Login').and('not.be.disabled')
    cy.get('[data-qa="login-button"]').click()
    cy.get(':nth-child(10) > a').should('contain', `Logged in as ${LoginCreds.username}`)
  })

} )
