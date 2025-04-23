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
import SignupForm from "../support/pages/signup.pages";
import AE_RegistrationPage from "../support/pages/AE_Register.page"
import CCPage from './pages/CC.page';
import CheckoutPage from './pages/Checkout.page';
import CartPage from './pages/Cart.page';
import registrationPage from './pages/registration.page';


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

Cypress.Commands.add('generateLocalAPIFile', (NewLocalUser) => {
  cy.writeFile('cypress/fixtures/LocalUser.json', NewLocalUser)
})

Cypress.Commands.add('AE_CreateUser', () => {

  cy.readFile('cypress/fixtures/RegisteredUser.json').then((UserInformation) => {
    const RandomYear = faker.number.int({min: 1900, max: 2021})
    const SelectedYear = RandomYear.toString()

    //Initial Signup Form
    cy.get('.shop-menu > .nav > :nth-child(4) > a').should('contain','Signup / Login').and('be.visible').click()
    cy.url().should('include','/login')
    SignupForm.fillSignUpForm(UserInformation)
    SignupForm.checkUsernameField(UserInformation.username)
    SignupForm.checkEmailField(UserInformation.email)
    SignupForm.submitSignUpForm()
    
    //Account Creation
    AE_RegistrationPage.fillSignUpForm(UserInformation)
    AE_RegistrationPage.checkNamefield(UserInformation.username)
    AE_RegistrationPage.checkEmailField(UserInformation.email)
    AE_RegistrationPage.checkPasswordField(UserInformation.password)
    AE_RegistrationPage.checkDOBFields(UserInformation.days, UserInformation.year)
    AE_RegistrationPage.checkFnameField(UserInformation.fname)
    AE_RegistrationPage.checkLnameField(UserInformation.lname)
    AE_RegistrationPage.checkAddressField(UserInformation.address)
    AE_RegistrationPage.checkAddress2Field(UserInformation.address2)
    AE_RegistrationPage.checkCountryField(UserInformation.random_country)
    AE_RegistrationPage.checkStateField(UserInformation.state)
    AE_RegistrationPage.checkCityField(UserInformation.city)
    AE_RegistrationPage.checkZIPField(UserInformation.zipcode)
    AE_RegistrationPage.checkNumField(UserInformation.mobile_number)
    AE_RegistrationPage.submitRegForm()
    AE_RegistrationPage.assertAccountCreation()
    AE_RegistrationPage.verifyLogInSuccess()
  })
})

Cypress.Commands.add('AE_Checkout', (testcasenumber) => {
  cy.readFile('cypress/fixtures/RegisteredUser.json').then((RegUser) => {
      CheckoutPage.assertDeliveryInvoice('delivery', RegUser)
      CheckoutPage.assertDeliveryInvoice('invoice', RegUser)
  })
  CheckoutPage.checkAnyProductInCart()
  CheckoutPage.writeComment(testcasenumber)
  CheckoutPage.placeOrder()
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
    CCPage.fillCCForm(CC_Info)
    CCPage.checkCCName(CC_Info.username)
    CCPage.checkCCNumber(CC_Info.cc_number)
    CCPage.checkCC_CVV(CC_Info.cc_cvv)
    CCPage.checkCCMonth(CC_Info.cc_exp_month)
    CCPage.checkCCYear(CC_Info.cc_exp_year)
    CCPage.submitCCForm()
    CCPage.assertOrderConfirmation()
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
  cy.get('.shop-menu > .nav > :nth-child(4) > a').should('contain','Signup / Login').and('be.visible').click()
  cy.url().should('include', '/login')
  cy.readFile('cypress/fixtures/RegisteredUser.json').then(LoginCreds => {
    // cy.get('[data-qa="login-email"]').should('be.visible').should('not.be.disabled')
    // cy.get('[data-qa="login-email"]').type(LoginCreds.email)
    // cy.get('[data-qa="login-password"]').should('be.visible').and('not.be.disabled')
    // cy.get('[data-qa="login-password"]').type(LoginCreds.password)
    // cy.get('[data-qa="login-button"]').should('be.visible').should('contain', 'Login').and('not.be.disabled')
    // cy.get('[data-qa="login-button"]').click()
    // cy.get(':nth-child(10) > a').should('contain', `Logged in as ${LoginCreds.username}`)

    SignupForm.loginUser(LoginCreds)
    SignupForm.checkLoginEmailField(LoginCreds.email)
    SignupForm.checkLoginPwordField(LoginCreds.password)
    SignupForm.submitLoginDetails()
  })

} )

Cypress.Commands.add('AE_Cart', () => {
  CartPage.navigateToCart()
  CartPage.verifyCartPage()
  CartPage.checkAnyProductInCart()
  CartPage.proceedToCheckout()
})